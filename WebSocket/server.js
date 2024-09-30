const WebSocket = require("ws");
const sqlite3 = require("sqlite3").verbose();

// 建立並連接 SQLite 資料庫
const db = new sqlite3.Database(":memory:");

// 建立 messages 表格
db.serialize(() => {
  db.run(
    "CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)"
  );
});

const wss = new WebSocket.Server({ port: 3000 });

let clients = [];

wss.on("connection", (ws) => {
  console.log("Client connected");
  clients.push(ws);

  // 從資料庫中撈取歷史訊息並發送給客戶端
  db.all("SELECT message FROM messages", [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      ws.send(row.message);
    });
  });

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);

    // 將訊息存入資料庫
    db.run("INSERT INTO messages (message) VALUES (?)", [message], (err) => {
      if (err) {
        return console.log(err.message);
      }
    });

    // 廣播訊息給所有客戶端
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    clients = clients.filter((client) => client !== ws);
  });
});

console.log("WebSocket server is running on ws://localhost:3000");
