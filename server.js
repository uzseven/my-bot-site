const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname)); // HTML va CSS fayllarni ko‘rsatadi

// 🔥 O'zingizning token va chat id ni qo'ying
const BOT_TOKEN = "8666110549:AAFJJPvI26rmx-SwDf1OSRKXNOiUjh2BZXk";
const CHAT_ID = "8026244494";

// POST endpoint foydalanuvchi formani yuborishi uchun
app.post("/send", async (req, res) => {
    const { ism, yosh } = req.body;
    const message = `📩 Yangi foydalanuvchi:\nIsm: ${ism}\nYosh: ${yosh}`;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message
        });
        res.sendStatus(200);
    } catch (err) {
        console.error("Xato:", err.message);
        res.sendStatus(500);
    }
});

// Server 3000-portda ishlaydi
app.listen(3000, () => {
    console.log("✅ Server 3000-portda ishlayapti");
});
