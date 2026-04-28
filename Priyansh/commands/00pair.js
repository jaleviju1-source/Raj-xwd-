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
        const gifCute = ["https://ibb.co/gLZtTXn1?fbclid=IwZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMzUwNjg1NTMxNzI4AAEeRYU3Sn4QtajyxXj8U7xqb3TSd1hY9d7XukBkiSRo0psexU9GisapAu2b30Q_aem_f2hB4FVZKJBtaqdKNuTK5A","https://ibb.co/979rqCw?fbclid=IwZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMzUwNjg1NTMxNzI4AAEe34dtpx7dxkozWllI7EqKAVuhKT1NvqLI2FyyZE2zlvwQHw8b-mkxnlbQiQM_aem_RmnMJCeMw0kWGVMhxG7psA","https://ibb.co/N6SkGMZ5?fbclid=IwZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMzUwNjg1NTMxNzI4AAEeRGhnfNLZWZoTU6TCOvwKlhRx_ZPA6jCVLlNva6bBQVQbc1YEHZOTFfroi38_aem_OA4V3-CQrgnUyopcRrVRiw","https://ibb.co/kVzhdKBp?fbclid=IwZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMzUwNjg1NTMxNzI4AAEeh5WWOA57s0YtNs4PkoqXLnAmhuyZTQnbFXhH52KcGL0LUFLsPhniz5qh81A_aem_dIEQyKnAwRxNfrUQ2lxidQ","https://ibb.co/1t3M31HP?fbclid=IwZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMzUwNjg1NTMxNzI4AAEepVCPC0H7hmd-CFJWK9hlEvYM1HfLxS9GsGYkCNXW5innRt1tj8cyikOgEBo_aem_sB3GjLjNfoQP2xEVc7Y4Rw","https://ibb.co/NHfDYMn?fbclid=IwZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMzUwNjg1NTMxNzI4AAEe0KUkQ1jCC3DTOI0LG9LuwfVAjnAXVNr4Eg12SF3iJy_95_uzko8bVmr9VLc_aem_KJPjlrUt78nwLoxUcda4aA"];
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
