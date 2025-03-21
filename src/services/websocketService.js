import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebsocketService {
  constructor() {
    this.client = null;
    this.connected = false;
    this.subscriptions = {};         // topic -> stomp subscription
    this.callbacks = {};             // topic -> array of callbacks
    this.pendingSubscriptions = [];  // Queue các sub đợi kết nối xong
  }

  connect(callback) {
    if (!this.client) {
      const socket = new SockJS('http://localhost:8081/ws-chat');
      this.client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
      });

      this.client.onConnect = () => {
        this.connected = true;
        console.log('✅ Connected to WebSocket');

        // Xử lý các subscription đợi kết nối
        this.pendingSubscriptions.forEach(({ topic, callback }) => {
          this._doSubscribe(topic, callback);
        });
        this.pendingSubscriptions = [];

        if (callback) callback(this.client);
      };

      this.client.onStompError = (error) => {
        this.connected = false;
        console.error('❌ STOMP error:', error);
      };

      this.client.activate();
    }
  }

  /**
   * Đăng ký một callback cho topic. Nếu chưa kết nối → đợi.
   */
  subscribe(topic, callback) {
    if (this.connected) {
      this._doSubscribe(topic, callback);
    } else {
      console.warn(`⏳ WebSocket not connected → Queue subscription for ${topic}`);
      this.pendingSubscriptions.push({ topic, callback });
    }
  }

  _doSubscribe(topic, callback) {
    if (!this.callbacks[topic]) {
      this.callbacks[topic] = [];
    }
  
    const alreadyExists = this.callbacks[topic].includes(callback);
    console.log(`👉 Subscribing callback to ${topic}, already exists: ${alreadyExists}`, callback);
  
    if (!alreadyExists) {
      this.callbacks[topic].push(callback);
    } else {
      console.log(`⚠️ Callback already exists for ${topic}, skipping push`);
    }
  
    // Nếu chưa sub vào topic này lần nào thì sub thật sự
    if (!this.subscriptions[topic]) {
      console.log('📡 Subscribing WebSocket to', topic);
      const subscription = this.client.subscribe(topic, (message) => {
        const parsedMessage = JSON.parse(message.body);
        console.log(`📨 Received message on ${topic}:`, parsedMessage);
        console.log('🧩 Executing callbacks for topic:', this.callbacks[topic]);
  
        this.callbacks[topic].forEach(cb => cb(parsedMessage));
      });
      this.subscriptions[topic] = subscription;
    } else {
      console.log(`🔄 Already subscribed WebSocket to ${topic}`);
    }
  }

  /**
   * Gỡ một callback khỏi topic. Không còn callback → unsubscribe WebSocket.
   */
  unsubscribe(topic, callback) {
    if (this.callbacks[topic]) {
      this.callbacks[topic] = this.callbacks[topic].filter(cb => cb !== callback);
      console.log(`🗑️ Removed one callback from ${topic}`);

      if (this.callbacks[topic].length === 0) {
        const subscription = this.subscriptions[topic];
        if (subscription) {
          subscription.unsubscribe();
          console.log(`🔌 Unsubscribed WebSocket from ${topic}`);
          delete this.subscriptions[topic];
        }
        delete this.callbacks[topic];
      }
    } else {
      console.warn(`⚠️ No callbacks found for ${topic}`);
    }
  }

  /**
   * Gửi tin nhắn tới destination.
   */
  send(destination, messageObject) {
    if (this.client && this.connected) {
      const messageString = JSON.stringify(messageObject);
      console.log(`📤 Sending message to ${destination}:`, messageObject);
      this.client.publish({ destination, body: messageString });
    } else {
      console.warn('⚠️ Cannot send message: WebSocket not connected');
    }
  }

  /**
   * Ngắt kết nối WebSocket, huỷ toàn bộ subscription và callback.
   */
  disconnect() {
    Object.keys(this.subscriptions).forEach(topic => {
      this.subscriptions[topic].unsubscribe();
      console.log(`🔌 Unsubscribed from ${topic}`);
    });

    this.client?.deactivate();
    this.client = null;
    this.connected = false;
    this.subscriptions = {};
    this.callbacks = {};
    this.pendingSubscriptions = [];

    console.log('🔻 Disconnected WebSocket');
  }
}

export default new WebsocketService();