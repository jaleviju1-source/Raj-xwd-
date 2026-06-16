const schedule = require('node-schedule');
const moment = require('moment-timezone');
const chalk = require('chalk');

module.exports.config = {
    name: 'autosent',
    version: '10.0.0',
    hasPermssion: 0,
    credits: '𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭',
    description: 'Set Karne Ke Bad Automatically Msg Send Karega',
    commandCategory: 'group messenger',
    usages: '[]',
    cooldowns: 3
};

const messages = [
    { time: '12:00 AM', message: '──── •🦢• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 12:00 𝗔𝐌 🤑 सब मिल कर बोलो हिंदू मुस्लिम सब भाई भाई 😵😆' },
    { time: '1:00 AM', message: '──── •🪲• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 1:00 A𝐌 🤥 1 बजे कौनकौन जाग रहा 🙆' },
    { time: '2:00 AM', message: '──── •💜• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 2:00 A𝐌 😵‍💫 में इस देश का प्रधान मंत्री हु मेरी बात मानो उठ जाओ अब 😶‍🌫️' },
    { time: '3:00 AM', message: '──── •🦃• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 3:00 A𝐌 😎 अरे भाई कितना फेसबुक चलता है बे तुम सब 😭' },
    { time: '4:00 AM', message: '──── •🐩• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 4:00 A𝐌 🙉 बकरी चोर हो क्या सब ' },
    { time: '5:00 AM', message: '──── •🐄• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 5:00 𝗔𝐌 😪 मुर्गी चोर' },
    { time: '6:00 AM', message: '──── •🦥• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 6:00 A𝐌 🙂 WO bhai uth ja' },
    { time: '7:00 AM', message: '──── •🐃• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 7:00 A𝐌 😷 आज पूरा दिन पनौती का दिन है 🥺' },
    { time: '8:00 AM', message: '──── •🦬• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 8:00 A𝐌 😤 यहाँ सब भालू 🦍 है भागो ☹️' },
    { time: '9:00 AM', message: '──── •🐏• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 9:00 A𝐌 🙈 मुझे किस भालू ने बनाया है मै बहुत  बड़ा harami hu 😵' },
    { time: '10:00 AM', message: '──── •🦡• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 10:00 A𝐌 😾 आज ग्रुप में कोई आईसी गलती मत करना जिससे आपकi 🆔 उड़े 🤭' },
    { time: '11:00 PM', message: '──── •🐪• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 11:00 A𝐌 😕 तुम लोग फिर से चलो हो गये 😆' },
    { time: '12:00 PM', message: '──── •🐓• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 12:00 𝐏𝐌 🙊' },
    { time: '1:00 PM', message: '──── •🦢• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 1:00 𝐏𝐌 👁️  जो लोग खाना खाने जा रहे उनसे मेरी एक गुजारिश है कृपया अपना मुंह बंद करके खाना खाए 🥀🙊' },
    { time: '2:00 PM', message: '──── •🐦• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 2:00 𝐏𝐌 😴 किस किस  तूतिया को नींद लग रहा अपना हाथ ऊपर करे 🙆──── •💜• ────' },
    { time: '3:00 PM', message: '──── •🐘• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 3:00 𝐏𝐌 🥺 तुम सब मिल कर मुझे पागल कर दोगे by 😫' },
    { time: '4:00 PM', message: '──── •🦥• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 4:00 𝐏𝐌 🤫 पल पल न माने तोपा जिया इश्क़ का मंजन घिसे है पिया 😎' },
    { time: '5:00 PM', message: '──── •🐍• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 5:00 𝐏𝐌 😋 यहां सबसे बड़ा गधा कौन है बताओ 😒' },
    { time: '6:00 PM', message: '──── •🐈‍⬛• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 6:00 𝐏𝐌 🙂 चला जा बोतलीके 😏' },
    { time: '7:00 PM', message: '──── •🐸• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 7:00 𝐏𝐌 🫣 तुम लोग तोपा हो क्या 🦍' },
    { time: '8:00 PM', message: '──── •🦁• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 8:00 𝐏𝐌 😶‍🌫️ तुम लोग इतना फेसबुक यूजिंग करते हो कि फेसबुक वाला रोने लगता है 😭
    { time: '9:00 PM', message: '──── •🙉• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 9:00 𝐏𝐌 🦍 जल्दी जल्दी सो जाओ भालू पकड़ लेजाएगा अपने घर🧐' },
    { time: '10:00 PM', message: '──── •🐯• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 10:00 𝐏𝐌 🥱 मुझे लगता है तू आज बाथरूम नहीं गया 🤮' },
    { time: '11:00 PM', message: '──── •🐼• ──── 𝐍𝐨𝐰 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 11:00 𝐏𝐌 🙉 अरे भाई खाना तो खा लो __🤭' }
];

module.exports.onLoad = ({ api }) => {
    console.log(chalk.bold.hex("#00c300")("============ SUCCESFULLY LOADED THE AUTOSENT COMMAND ============"));

    messages.forEach(({ time, message }) => {
        const [hour, minute, period] = time.split(/[: ]/);
        let hour24 = parseInt(hour, 10);
        if (period === 'PM' && hour !== '12') {
            hour24 += 12;
        } else if (period === 'AM' && hour === '12') {
            hour24 = 0;
        }

        const scheduledTime = moment.tz({ hour: hour24, minute: parseInt(minute, 10) }, 'Asia/Kolkata').toDate();

        schedule.scheduleJob(scheduledTime, () => {
            global.data.allThreadID.forEach(threadID => {
                api.sendMessage(message, threadID, (error) => {
                    if (error) {
                        console.error(`Failed to send message to ${threadID}:`, error);
                    }
                });
            });
        });
    });
};

module.exports.run = () => {
    // This function can be left empty as the main logic is handled in onLoad
};
