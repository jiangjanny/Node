// server.js
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.type === "subscribe") {
      console.log(`Subscribed with email: ${data.email}`);
      ws.send("Subscription successful");
    }
  });

  setInterval(() => {
    const latestNews = `Latest news at ${new Date().toLocaleTimeString()}`;
    ws.send(latestNews);
  }, 5000);

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:3000");
