const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID,
ALIVE_EMG: process.env.ALIVE_IMG || "පොටෝ එකක Url එකක් දාන්න",
ALIVE_MSG: process.env.ALIVE_MSG || "Hello, I am Mrchamalka i am alive now!",
AUTO_READ_STATUS:process.env.AUTO_READ_STATUS || "true",
MOOD:process.env.MOOD || "public",
}:
