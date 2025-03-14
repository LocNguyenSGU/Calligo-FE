import { Client } from '@stomp/stompjs';
import { message } from 'antd';
import SockJS from 'sockjs-client';

class WebsocketService {
  constructor() {
    this.client = null;
    this.connected = false;
  }

  connect(callback) {
    if (!this.client) {
      const socket = new SockJS('http://localhost:8081/ws-chat'); // Thay bằng URL server thực tế
      this.client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000, // Tự động kết nối lại sau 5s nếu mất kết nối
      });

      this.client.onConnect = () => {
        this.connected = true;
        console.log('Connected to WebSocket in webdockService');
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
        console.log('Received message:', message.body
        );
        callback(message.body);
      });
    } else {
      console.warn('WebSocket not connected yet');
    }
  }

  send(destination, message) {
    if (this.client && this.connected) {
      console.log('Sending message:', message, 'to', destination);
      this.client.publish({ destination, body: message });
    } else {
      console.warn('Cannot send message: WebSocket not connected');
    }
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.connected = false;
      this.client = null;
      console.log('Disconnected from WebSocket');
    }
  }
}

export default new WebsocketService();