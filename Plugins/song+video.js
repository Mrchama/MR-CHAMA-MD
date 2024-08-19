const {cmd , commands} = require('../command')
const fg = require(`api-dylux`)
const yts = require('yt-search')


cmd({
    pattern: "song",
    desc: "download songs",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("please give me url or title")
const search = await yts(q)
const data = search.videos[0];
const url =  data.url

let desc = '
🚀 *`MR CHAMA MD YT DOWNLOADER`* 🚀

title: ${data.title}
description: ${data.discription}
time: ${data.timestamp}
ago: ${data.ago}
viwes: ${data.viwes}

*𝙼𝙰𝙳𝙴 𝙱𝚈 𝙼𝚁 𝙲𝙷𝙰𝙼𝙰𝙻𝙺𝙰*🎭
'
await conn.sendmessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});
// download audio


let down = await fg.yta(url)
let downloadUrl = down.dl_url

// send audio message
await conn.sendMessage(from,{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
{catch(e){
console.log(e)
reply(`${e}`)
{
{(
