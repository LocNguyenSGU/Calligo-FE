import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebsocketService {
  constructor() {
    this.client = null;
    this.connected = false;
  }

  connect(callback) {
    if (!this.client) {
      const socket = new SockJS("http://localhost:8081/ws-call");
      this.client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
      });

      this.client.onConnect = () => {
        this.connected = true;
        console.log("✅ Connected to WebSocket (Call 1-1)");
        if (callback) callback(this.client);
      };

      this.client.onStompError = (error) => {
        this.connected = false;
        console.error("❌ STOMP error:", error);
      };

      this.client.activate();
    }
  }

  send(destination, messageObject) {
    if (this.client && this.connected) {
      const messageString = JSON.stringify(messageObject);
      console.log(`📤 Sending message to ${destination}:`, messageObject);
      this.client.publish({ destination, body: messageString });
    } else {
      console.warn("⚠️ Cannot send message: WebSocket not connected");
    }
  }

  callUser(targetUserId, offer) {
    this.send(`/app/call/${targetUserId}`, { type: "offer", sdp: offer });
  }

  answerCall(targetUserId, answer) {
    this.send(`/app/call/${targetUserId}`, { type: "answer", sdp: answer });
  }

  sendICECandidate(targetUserId, candidate) {
    this.send(`/app/call/${targetUserId}`, {
      type: "ice-candidate",
      candidate,
    });
  }

  disconnect() {
    this.client?.deactivate();
    this.client = null;
    this.connected = false;
    console.log("🔻 Disconnected WebSocket (Call 1-1)");
  }
}

export default new WebsocketService();
