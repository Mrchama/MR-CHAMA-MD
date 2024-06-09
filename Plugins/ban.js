/**
* @project_name Mr Chama Md [WA Multi-device]
* @author MrChamalka <https://github.com/Mrchama>
* @description A WhatsApp based 3ʳᵈ party application that provide many services with a real-time automated conversational experience
* @link <https://github.com/Mrchama/MR-CHAMA-MD>
* @version 1.0.0
* @file  ban.js - MrChamaMd group/user ban manager

© 2024 Mr Chamalka , ANTECH. All rights reserved.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.*/

const { CHAMAMD, chamamdDB, ban, Language } = require('mr_chama_md_core/dist/scripts')
const { banRows, banUSER, banGROUP } = ban
const { removeBanJids, getBanJidList } = chamamdDB.ban_jidDB
const Lang = Language.getString('ban');


CHAMAMD({ cmd: "ban", desc: Lang.bandesc, example: Lang.banEx, type: "profile", react: "🚫" }, (async (chamamdWA) => {
    let { botNumberJid, input, allowedNumbs, groupMetadata } = amdiWA.msgLayout;

    if (input.includes('user')) {
        await banUSER(input, botNumberJid, allowedNumbs)
    }

    if (input.includes('group')) {
        await banGROUP(input, botNumberJid, allowedNumbs, groupMetadata)
    }
}));


CHAMAMD({ cmd: "unban", desc: Lang.unbandesc, example: Lang.unbanEx, type: "profile", react: "✅" }, (async (chamamdWA) => {
    let { isGroup, reply, taggedJid } = chamamdWA.msgLayout;

    if (isGroup) {
        if (!chamamdWA.msg.message.extendedTextMessage) return reply(Lang.unbanEx)
        await removeBanJids(taggedJid)
        return await reply(`✅ *Unbanned*`, "🔓");
    } else if (!isGroup) {
        await removeBanJids(chamamdWA.clientJID)
        return await reply(`✅ *Unbanned*`, "🔓");
    } else {
        return reply(Lang.unbanEx)
    }
}));


CHAMAMD({ cmd: "banlist", desc: Lang.banlistDESC, type: "profile", react: "📓" }, (async (chamamdWA) => {
    let { prefix, reply, sendListMsg } = chamamdWA.msgLayout;

    var listInfo = {}
    listInfo.title = Lang.banListTitle
    listInfo.text = Lang.banListText
    listInfo.buttonTXT = 'default'

    var banList = await getBanJidList();
    const rows = await banRows(prefix, banList)
    if (rows == '') return reply('*No ban users or groups*', "🙂")
    const sections = [{ title: "Ban JIDs list", rows: rows }]
    return await sendListMsg(listInfo, sections);
}));
