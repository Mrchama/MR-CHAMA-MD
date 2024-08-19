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
🚀 *`SONG DOWNLOADER`* 🚀

title: ${data.title}
description: ${data.discription}
time: ${data.timestamp}
ago: ${data.ago}
viwes: ${data.viwes}

*•ᴍʀ ᴄʜᴀᴍᴀʟᴋᴀ🎭*
'
await conn.sendmessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});
// download audio


let down = await fg.yta(url)
let downloadUrl = down.dl_url

// send audio + 𝚍𝚘𝚌𝚞𝚖𝚎𝚗𝚝 message
await conn.sendMessage(from,{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"audio/mpeg",FileName:data,title + ".mp3",caption:"*•ᴍʀ ᴄʜᴀᴍᴀʟᴋᴀ🎭*"},{quoted:mek})

{catch(e){
console.log(e)
reply(`${e}`)
{
{(

//***************video-dl**************

cmd({
    pattern: "video",
    desc: "download videos",
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
🚀 *`VIDEO DOWNLOADER`* 🚀

title: ${data.title}
description: ${data.discription}
time: ${data.timestamp}
ago: ${data.ago}
viwes: ${data.viwes}

*•ᴍʀ ᴄʜᴀᴍᴀʟᴋᴀ🎭*
'
await conn.sendmessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});
// download video


let down = await fg.ytv(url)
let downloadUrl = down.dl_url

// send video + document message
await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"video/mp4",FileName:data,title + ".mp4",cpation:"*•ᴍʀ ᴄʜᴀᴍᴀʟᴋᴀ🎭*"},{quoted:mek})
{catch(e){
console.log(e)
reply(`${e}`)
{
{(
