import { Client } from '@stomp/stompjs';
import { message } from 'antd';
import SockJS from 'sockjs-client';

class WebsocketService {
  constructor() {
    this.client = null;
    this.connected = false;
    this.subscriptions = {}; // Lưu các subscription
    this.destination = {};
  }

  connect(callback) {
    if (!this.client) {
      const socket = new SockJS('http://localhost:8081/ws-chat'); // URL backend
      this.client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000, // reconnect sau 5s nếu disconnect
      });

      this.client.onConnect = () => {
        this.connected = true;
        console.log('Connected to WebSocket');
        if (callback) callback(this.client);
      };

      this.client.onStompError = (error) => {
        this.connected = false;
        console.error('STOMP error:', error);
      };

      this.client.activate();
    }
  }

  subscribe(topic, callback) {
    if (this.client && this.connected) {
      console.log('Subscribed to', topic);
      return this.client.subscribe(topic, (message) => {
        callback(message.body);
      });
    } else {
      console.warn('WebSocket not connected yet');
    }
  }

  unsubscribe(topic) {
    const subscription = this.subscriptions[topic];
    if (subscription) {
      subscription.unsubscribe();
      delete this.subscriptions[topic];
      console.log('Unsubscribed from', topic);
    } else {
      console.warn(`No subscription found for ${topic}`);
    }
  }

  send(destination, message) {
    
    if (this.client && this.connected) {
      this.destination[destination] = destination;
      console.log('Sending message:', message, 'to', destination);
      this.client.publish({ destination, body: message });
    } else {
      console.warn('Cannot send message: WebSocket not connected');
    }
  }

  disconnect() {
    if (this.client) {
      // Unsubscribe tất cả trước khi disconnect
      Object.keys(this.subscriptions).forEach((topic) => {
        this.unsubscribe(topic);
      });

      this.client.deactivate();
      this.connected = false;
      this.client = null;
      console.log('Disconnected from WebSocket');
    }
  }
}

export default new WebsocketService();