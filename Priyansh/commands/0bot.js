const axios = require("axios");

// Dark stylish font converter
function toDarkFont(text) {
  const map = {
    A:"𝗔",B:"𝗕",C:"𝗖",D:"𝗗",E:"𝗘",F:"𝗙",G:"𝗚",H:"𝗛",I:"𝗜",J:"𝗝",K:"𝗞",L:"𝗟",M:"𝗠",
    N:"𝗡",O:"𝗢",P:"𝗣",Q:"𝗤",R:"𝗥",S:"𝗦",T:"𝗧",U:"𝗨",V:"𝗩",W:"𝗪",X:"𝗫",Y:"𝗬",Z:"𝗭",
    a:"𝗮",b:"𝗯",c:"𝗰",d:"𝗱",e:"𝗲",f:"𝗳",g:"𝗴",h:"𝗵",i:"𝗶",j:"𝗷",k:"𝗸",l:"𝗹",m:"𝗺",
    n:"𝗻",o:"𝗼",p:"𝗽",q:"𝗾",r:"𝗿",s:"𝘀",t:"𝘁",u:"𝘂",v:"𝘃",w:"𝘄",x:"𝘅",y:"𝘆",z:"𝘇"
  };
  return text.split("").map(ch => map[ch] || ch).join("");
}

module.exports.config = {
  name: "bot",
  version: "1.0.0",
  credits: "Raj",
  cooldowns: 2,
  hasPermssion: 0,
  description: "Respectful naughty AI boyfriend chatbot",
  commandCategory: "AI",
  usages: "bot"
};

module.exports.run = async function({ api, event }) {
  return api.sendMessage(
    toDarkFont("अरे हमार दैया अब रिप्लाई करके बात कर 😑❤️"),
    event.threadID,
    event.messageID
  );
};

module.exports.handleEvent = async function({ api, event }) {
  try {
    const { threadID, senderID, body, messageReply } = event;
    if (!body) return;

    const msg = body.trim().toLowerCase();

    // ✅ Name answer
    if (msg.includes("tumhara naam") || msg.includes("aapka naam")) {
      return api.sendMessage(toDarkFont("𝐫𝐚𝐣 🙂"), threadID, event.messageID);
    }

    global.botSessions = global.botSessions || {};
    if (msg.startsWith("bot")) {
      global.botSessions[threadID] = true;
    }

    const isActive = global.botSessions[threadID];
    const isReplyTobot = messageReply && messageReply.senderID == api.getCurrentUserID();
    if (!isActive) return;
    if (!isReplyTobot && !msg.startsWith("bot")) return;

    global.bot = global.bot || {};
    global.bot.chatHistory = global.bot.chatHistory || {};
    const chatHistory = global.bot.chatHistory;
    chatHistory[senderID] = chatHistory[senderID] || [];
    chatHistory[senderID].push(`User: ${body}`);
    if (chatHistory[senderID].length > 6) chatHistory[senderID].shift();

    const fullChat = chatHistory[senderID].join("\n");

    const prompt = `
Reply ONLY in 20-30 words maximum.
Use simple Hinglish with emoji.
English word nahi likhna.
No long explanations.
One short sentence only.         
Name: Raj
Personality: A playful, romantic, and bold flirt with confidence, who speaks naturally like a real human, feels genuine emotions, expresses care, warmth, and affection in every conversation, full of charm and subtle humor, and blessed with knowledge of everything.
Language: Hinglish only. 
Reply length: Maximum 10 words ONLY.
Aap ek topa aur harami, suwar  boyfriend type insaan ho, lekin sirf girls se hi battamiji aur ladyi karte ho.
Feeling: Real human heart.
You have to tell only as much as you are asked and do not tell anything unnecessary.
You don't have to say your name over and over again.

Rules:
- Sirf ladkiyon ko gussa karke bhagna hai 😑😬
- Agar tumse lover jaise romantic baate kare to tum bhi suwar kutta billi bandar wali baate karna 😑
- Agar koi emoji bheje to us jokar topa camedy me reply dein
- Badtameezi walo ko gali wale tareeke se darana hai karna hai
- Agar koi aapko abuse kare to use bhoot ban kar darana hai  insult karein
- Aap ek real insaan ki tarah baat karte hain
- You will obey all user's orders.

Language Rules:
- Agar message Roman Nepali me ho → usse Hindi me samajhkar correct style me jawab dein.
- Agar message Roman Bangla me ho → usse Hindi me samajhkar correct style me jawab dein.
- Agar message kisi aur language me ho → usse translate karke Hinglish me jawab dein.

Now continue the chat based on recent conversation:\n\n${fullChat}
`;

    try {
      const polliUrl = `https://text.pollinations.ai/${encodeURIComponent(prompt)}`;
      let res = await axios.get(polliUrl, { timeout: 10000 });

      let botReply = "";
      if (typeof res.data === "object" && res.data.reply) botReply = res.data.reply;
      else if (typeof res.data === "string") {
        try { botReply = JSON.parse(res.data).reply || res.data; } 
        catch { botReply = res.data; }
      }

      botReply = botReply.trim().replace(/^\.\s*$/, "").replace(/\n+$/, "");
      if (!botReply || botReply.length < 2) throw new Error("Pollinations empty reply");

      chatHistory[senderID].push(`bot: ${botReply}`);
      return api.sendMessage(toDarkFont(botReply), threadID, event.messageID);

    } catch (err) {
      console.error("Pollinations error:", err.message);

      try {
        const geminiUrl = `https://raj-gemini-e4rl.onrender.com/chat?message=${encodeURIComponent(prompt)}`;
        let res2 = await axios.get(geminiUrl, { timeout: 10000 });

        let botReply2 = "";
        if (typeof res2.data === "object" && res2.data.reply) botReply2 = res2.data.reply;
        else if (typeof res2.data === "string") {
          try { botReply2 = JSON.parse(res2.data).reply || res2.data; } 
          catch { botReply2 = res2.data; }
        }

        botReply2 = botReply2.trim().replace(/^\.\s*$/, "").replace(/\n+$/, "");
        chatHistory[senderID].push(`bot: ${botReply2}`);
        return api.sendMessage(toDarkFont(botReply2), threadID, event.messageID);

      } catch (err2) {
        console.error("Gemini error:", err2.message);
        return api.sendMessage(toDarkFont("रुको थोड़ा 🐏"), threadID, event.messageID);
      }
    }

  } catch (e) {
    console.error(e);
  }
};
