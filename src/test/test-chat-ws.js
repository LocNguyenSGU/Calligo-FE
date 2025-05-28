import ws from "k6/ws";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 100 }, // Tăng dần lên 100 VUs trong 30 giây
    { duration: "30s", target: 300 }, // Giữ 200 VUs trong 30 giây
    { duration: "30s", target: 700 }, // Giữ 300 VUs trong 30 giây
    { duration: "30s", target: 1000 }, // Tăng lên 500 VUs trong 30 giây
    { duration: "30s", target: 0 }, // Hạ VUs về 0 (giải phóng)
  ],
};

// export const options = {
//   vus: 1,
//   duration: '30s',
// };




export default function () {
  const url = "ws://localhost:8081/ws-chat-native";
  const res = ws.connect(url, {}, function (socket) {
    socket.on("open", function () {
      console.log("✅ WebSocket connection opened");

      const connectFrame = "CONNECT\naccept-version:1.2\nheart-beat:10000,10000\n\n\0";
      socket.send(connectFrame);
    });

    socket.on("message", function (message) {
      console.log("📩 Received: ", message);

      if (message.includes("CONNECTED")) {
        const subscribeFrame =
          "SUBSCRIBE\nid:sub-0\ndestination:/topic/conversation/conv001\n\n\0";
        socket.send(subscribeFrame);

        // Gửi 5 tin nhắn liên tiếp (không dùng setTimeout)
        for (let i = 1; i <= 5; i++) {
          const payload = JSON.stringify({
            idConversation: "conv001",
            idAccountSent: 6,
            content: `K6 test message ${i}`,
            type: "TEXT",
          });

          const sendFrame =
            `SEND\ndestination:/app/send/conv001\ncontent-type:application/json\n\n${payload}\0`;

          socket.send(sendFrame);
        }
      }
    });

    socket.on("close", () => console.log("❌ Disconnected"));
    socket.on("error", (e) => console.log("⚠️ WebSocket error: ", e));

    socket.setTimeout(() => {
      console.log("⏱ Timeout, closing socket.");
      socket.close();
    }, 5000); // giữ socket mở 5s để nhận phản hồi
  });

  check(res, { "status is 101": (r) => r && r.status === 101 });
}