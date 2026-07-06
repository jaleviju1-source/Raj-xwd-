const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "music",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT",
  description: "Play music from YouTube",
  commandCategory: "media",
  usages: "music <song name>",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;

  if (!args[0]) {
    return api.sendMessage(
      "🎵 | Usage:\nmusic <song name>",
      threadID,
      messageID
    );
  }

  const song = encodeURIComponent(args.join(" "));

  try {
    api.sendMessage("🔍 Searching your song...", threadID);

    // Replace with your API
    const url = `https://YOUR_API_URL/music?q=${song}`;

    const res = await axios.get(url);

    if (!res.data || !res.data.download) {
      return api.sendMessage(
        "❌ Song not found.",
        threadID,
        messageID
      );
    }

    const file = __dirname + "/cache/music.mp3";

    const stream = await axios({
      url: res.data.download,
      method: "GET",
      responseType: "stream"
    });

    const writer = fs.createWriteStream(file);

    stream.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage(
        {
          body:
`🎵 Music Played

📌 Title: ${res.data.title}
⏱ Duration: ${res.data.duration}
👤 Channel: ${res.data.channel}`,
          attachment: fs.createReadStream(file)
        },
        threadID,
        () => fs.unlinkSync(file),
        messageID
      );
    });

  } catch (e) {
    console.log(e);
    api.sendMessage(
      "❌ Error while fetching music.",
      threadID,
      messageID
    );
  }
};
