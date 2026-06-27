const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Fixed By Arun Kumar",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Kolkata").format("DD/MM/YYYY || HH:mm:ss");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = [Done boss Radha 🙌 ye ready-to-paste `bot.js` script hai Gemini API ke liye:

**1. `bot.js`**
```javascript
import { Octokit } from "@octokit/rest";
import { GoogleGenerativeAI } from "@google/generative-ai";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SYSTEM_PROMPT = `Tum kutta Meta AI ho. Boss Radha ke orders maanoge. Hinglish me baat karo, thoda roast karo, meme energy rakho. Rām-Raj ko pehchano aur usko shadi ka tension mat dena.`;

// Jab koi issue/comment aaye
export async function run(event) {
  const userInput = event.comment?.body || event.issue?.title;
  if (!userInput) return;

  const result = await model.generateContent({
    contents: [
      { role: "user", parts: [{ text: SYSTEM_PROMPT + "\nUser: " + userInput }] }
    ]
  });

  const reply = result.response.text();

  if (event.issue) {
    await octokit.issues.createComment({
      owner: event.repo.owner,
      repo: event.repo.name,
      issue_number: event.issue.number,
      body: reply
    });
  }
}
```

**2. `.github/workflows/bot.yml`**
```yaml
name: Kutta Bot
on:
  issue_comment:
    types: [created]
  issues:
    types: [opened]
jobs:
  reply:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm i @octokit/rest @google/generative-ai
      - run: node -e "import('./bot.js').then(m => m.run(${{ toJson(github.event) }}))"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

**3. Setup:**
- GitHub → Settings → Developer settings → Personal access tokens → naya token banao `repo` access ke sath
- Google AI Studio → Gemini API key nikalo
- Repo → Settings → Secrets → `GITHUB_TOKEN` aur `GEMINI_API_KEY` add karo

Bas! Ab koi bhi issue ya comment par bot reply karega "boss Radha" bolke 😂"Sakal dekhi hai khud ki 🤧" , "mister moody ha ha ha ha ha 😦 Lo me bhi vairal ho gaya " , "Pahile muh to dho Lo 🫣" , "Chai pila na bhai kalute" , "abe jokar danch to karke dikha de sabko" ,  "ye bat iran tak jayegi" , "itna marunga ki 10 din Tak kuch kha pi nahi paoge" , "pahile jakar saraf se muh dho kar aa kallu" , "dholki baja dholki" , "Gaddar nikli re tu 😭", " pe mera khana rakkha hai use utha zara" , "milo na tum to dil घबड़ाए 🤨", "abe bhutni ke piche to dekho" , "sakal se ekdam topa lag rha tu bhai" , "Ye dukh kahe nahi khatm hota 🙁" , "Tum to dokebaz ho" , "you just looking like a wow😶" , "Mera aasmaan dhunde teri zamin" , "Kal ana abhi lunch time hai" , "Jab dekho B0T B0T b0T😒😒", "Chhodo na koi dekh lega🤭", "Kab ayega mere banjaare" , "Tum wahi ho na ,jisko.me.nahi janti 🙂" , "Ye I love you kya hota hai" , "Sunai deta hai mujhe behri nahi hu me   😒" , "so elegent, so beautiful , just looking like a wow🤭" , "began🙂" , "Aayein🤔" , "I Love you baby , mera recharge khtm hone wala h" , "paani paani uncle ji" , "apne Labhar ko dhoka do , daling hme bhi moka do🙈" , "Arry Bas Kar🤣😛" , "Me ni To Kon Be" , "naam adiya kumar 7vi kaksha me padhte hai favret subject begon😘" , "Mera Dimag Mat Khaya kro😒😒" , "Chuppp Saatvi Fail😒" , "Saste Nashe Kab Band kroge" , "Mai Jaanu Ke sath Busy hu yar, mujhe mat balao" , "me apni mummy ke shat geme khel rha ruk thoda" , "Hayee ese mt bulaya kro, mujhe sharm aati h" , "System pe system betha rahi chhori bot ki" , "Naach meri Bulbul tujhe pesa milega" , "me idhar se hu aap kidhar se ho" , "Khelega Free Fire🙈🙈" , "aye haye oye hoye aye haye oye hoye😍 bado badi bado badi😘" , "e halo bhai darr rha hai kya" , "akh ladi bado badi" , "haaye garmi😕" , "Ao kabhi haweli pe😍" , "Khelega Free Fire🥴" , "Hallo bai tu darr raha hai kya" , "janu bula raha h mujhe" , "I cant live without you babu😘" , "haa meri jaan" , "Agye Phirse Bot Bot Krne🙄" , "konse color ki jacket pehne ho umm btao na😚" , "Zinda rahina hai ya nahi"];
  var rand = tl[Math.floor(Math.random() * tl.length)]
   mess = "{name}"
  if (event.body.indexOf("Bot") == 0 || (event.body.indexOf("bot") == 0)) {
    var msg = {
      body: `💞${name}💞,  \n\n___\n   ${rand} ___ \n\n_made By:𝐑𝐚𝐦 𝐑𝐚𝐣 𝐱𝐰𝐝 🫈`
    }
    return api.sendMessage(msg, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
