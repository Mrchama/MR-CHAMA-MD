/**
* @project_name Mr Chama Md [WA Multi-device]
* @author MrChamalka <https://github.com/Mrchama>
* @description A WhatsApp based 3ʳᵈ party application that provide many services with a real-time automated conversational experience
* @link <https://github.com/Mrchama/MR-CHAMA-MD>
* @version 1.0.0
* @file  _anti_functions.js - MrChamaMd anti-bad words, anti-links

© 2024 Mr Chamalka , ANTECH. All rights reserved.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.*/

const { CHAMAMD, ChmaDB, antifunctions, Language  } = require('mr_chama_md_core/dist/scripts')
const { getSettings } = ChamaDB.settingsDB
const { getGrpSettings } = ChamaDB.grpSetDB
const Lang = Language.getString('anti_functions')

CHAMAMD({ onText: "all_words", cmdHideInMenu: true }, (async (MRCHAMAMDWA, textMSG) => {
    let { isSUDO, deleteKEY, isGroup, isGroupAdmin, isBotGroupAdmin, senderjid, sendText } = MRCHAMAMDWA.msgLayout;

    if (CHAMAMDWA.fromMe || !isGroup || !isBotGroupAdmin || isGroupAdmin || isSUDO) return;

    const antibad = await getGrpSettings('ANTI_BAD_WORDS', amdiWA.clientJID);

    const ANTIBADMSG = await getSettings('ANTIBADMSG');
    let antiBADMSG = !ANTIBADMSG.input ? Lang.badwordkick : ANTIBADMSG.input

    if (antibad.input !== "false") {
        const isBadWord = await antifunctions.antiBad(MRCHAMAMDWA, textMSG);
        if (isBadWord && antibad.input == "kick") {
            await sendText(`@${senderjid.split('@')[0]}, ${antiBADMSG}`, { mentionJIDS: [senderjid] });
            return await amdiWA.web.groupParticipantsUpdate(MRCHAMAMDWA.clientJID, [senderjid], "remove");
        }
        else if (isBadWord && antibad.input == "deletemsg") {
            await sendText(`@${senderjid.split('@')[0]}, ${antiBADMSG}`, { mentionJIDS: [senderjid] });
            return await deleteKEY(MRCHAMAMDWA.msg.key);
        }
        else if (isBadWord && antibad.input == "deletekick") {
            await sendText(`@${senderjid.split('@')[0]}, ${antiBADMSG}`, { mentionJIDS: [senderjid] });
            await deleteKEY(amdiWA.msg.key);
            return await amdiWA.web.groupParticipantsUpdate(amdiWA.clientJID, [senderjid], "remove");
        }
    }
}));


CHAMAMD({ onText: "all_words", cmdHideInMenu: true }, (async (MRCHAMAMDWA, textMSG) => {
    let { isSUDO, deleteKEY, isGroup, isGroupAdmin, isBotGroupAdmin, senderjid, sendText } = MRCHAMAMDWA.msgLayout;

    if (MRCHAMAMdWA.isCmd) return;
    if (MRCHAMAMDWA.fromMe || !isGroup || !isBotGroupAdmin || isGroupAdmin || isSUDO) return;

    const isAntiLink = await antifunctions.antiLink(textMSG, amdiWA.clientJID);
    if (!isAntiLink) return;

    const ANTILINKMSG = await getSettings('ANTIKICKMSG');
    let antiKICKMSG = !ANTILINKMSG.input ? Lang.antilinkkick : ANTILINKMSG.input

    if (isAntiLink === "kick") {
        await sendText(`@${senderjid.split('@')[0]}, ${antiKICKMSG}`, { mentionJIDS: [senderjid] });
        await MRCHAMAMDWA.web.groupParticipantsUpdate(amdiWA.clientJID, [senderjid], "remove");
        return await deleteKEY(MRCHAMAMDWA.msg.key);
    } else if (isAntiLink === "delete" || isAntiLink === "null") {
        await sendText(`@${senderjid.split('@')[0]}, ${antiKICKMSG}`, { mentionJIDS: [senderjid] });
        return await deleteKEY(MRCHAMAMDWA.msg.key);
    }
}));
