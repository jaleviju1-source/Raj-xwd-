module.exports.config = {
  name: "pair",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "pairing",
  commandCategory: "Love", 
  usages: "pair", 
  cooldowns: 10
};
module.exports.run = async function({ api, event,Threads, Users }) {
        const axios = global.nodemodule["axios"];
        const fs = global.nodemodule["fs-extra"];

        var { participantIDs } =(await Threads.getData(event.threadID)).threadInfo;
        var tle = Math.floor(Math.random() * 101);
        var namee = (await Users.getData(event.senderID)).name
        const botID = api.getCurrentUserID();
        const listUserID = event.participantIDs.filter(ID => ID != botID && ID != event.senderID);
        var id = listUserID[Math.floor(Math.random() * listUserID.length)];
        var name = (await Users.getData(id)).name
        var arraytag = [];
        const gifCute = ["https://i.imgur.com/JDJCNsL.gif","https://i.imgur.com/ZH5U3Vx.gif","https://i.imgur.com/RmEPAht.gif","https://i.imgur.com/qEVPDyH.gif","https://i.imgur.com/qEVPDyH.gif","https://ibb.co/NHfDYMn?fbclid=IwZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMzUwNjg1NTMxNzI4AAEe0KUkQ1jCC3DTOI0LG9LuwfVAjnAXVNr4Eg12SF3iJy_95_uzko8bVmr9VLc_aem_KJPjlrUt78nwLoxUcda4aA"];
                arraytag.push({id: event.senderID, tag: namee});
                arraytag.push({id: id, tag: name});


        let Avatar = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8") );

        let gifLove = (await axios.get(gifCute[Math.floor(Math.random() * gifCute.length)], { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/giflove.png", Buffer.from(gifLove, "utf-8") );

        let Avatar2 = (await axios.get( `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8") );

        var imglove = [];

              imglove.push(fs.createReadStream(__dirname + "/cache/avt.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/giflove.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));

        var msg = {body: `\n\n\n\n 𝐘𝐄 𝐋𝐎𝐕𝐄𝐑 𝐉𝐘𝐀𝐃𝐀 𝐃𝐈𝐍 𝐍𝐀𝐇𝐈 𝐑𝐀𝐇𝐈𝐍𝐆𝐄 ⚠️📵
\n ${namee} 💓 ${name}\n◈━━━━🩷😀\n➥𝗟𝗼𝘃𝗲 𝗥𝗮𝘁𝗶𝗼: ${tle}%\n◈━━━━━🧸🩷\n\n➺ 𓆩『 ⸙   ᴅᴇᴡᴀɴɪ ᴛᴇʀɪ.𓆪\n\n◈━━━━━🩷🧸\n\n「 -𝑴𝑨𝑫𝑬 𝑩𝒀\n\n◈━━━━━🩷🧸\n\𝐁𝐔𝐆𝐆𝐀 𝐗 𝐁𝐔𝐆𝐆𝐈 😂 ◈ ─── 🩷🦍- 」`, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID)
}
