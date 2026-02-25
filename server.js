
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

// Static fayllar
app.use(express.static(__dirname));
app.use(bodyParser.json());

// 🔥 Environment Variables orqali olish
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// / route
app.get("/", (req, res) => {
    res.send("Server ishlayapti!");
});

// /send route
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

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server ${PORT}-portda ishlayapti`);
});
