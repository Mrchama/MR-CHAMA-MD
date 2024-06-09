/**
* @project_name Mr Chama Md [WA Multi-device]
* @author MrChamalka <https://github.com/Mrchama>
* @description A WhatsApp based 3ʳᵈ party application that provide many services with a real-time automated conversational experience
* @link <https://github.com/Mrchama/MR-CHAMA-MD>
* @version 1.0.0
* @file  settings.js - MrChamaMd bot settings

© 2024 Mr Chamalka , ANTECH. All rights reserved.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.*/

const { CHAMAMD, chamamdDB, _default_list_sections, Language } = require('mr_chama_md_core/dist/scripts')
const { settingList, applyList } = _default_list_sections
const { inputSettings } = chamamdDB.settingsDB
const Lang = Language.getString('settings');


CHAMAMD({ cmd: "apply", desc: Lang.setDesc, type: "profile", react: "👨‍🔧" }, (async (chamamdWA) => {
    let { prefix, isReply, reply, replied_text, sendListMsg  } = chamamdWA.msgLayout;

    if (!isReply) return reply(Lang.needReplymsg)

    var listInfo = {}
    listInfo.title = Lang.applyTitle
    listInfo.text = Lang.applyText
    listInfo.buttonTXT = 'default'  

    const sections = await applyList(prefix, replied_text);
    return await sendListMsg(listInfo, sections);
}));


CHAMAMD({ cmd: "settings", desc: Lang.setDesc, type: "profile", react: "⚙️" }, (async (chamamdWA) => {
    let { prefix, sendListMsg } = chamamdWA.msgLayout;

    var listInfo = {}
    listInfo.title = Lang.setListTitle
    listInfo.text = Lang.setListText
    listInfo.buttonTXT = 'default'  

    const sections = settingList(prefix, amdiWA.clientJID);
    return await sendListMsg(listInfo, sections);
}));


CHAMAMD({ cmd: "button", desc: Lang.BTN_TOGGLE_DESC, type: "profile", react: "☢️" }, (async (chamamdWA) => {
    let { input, reply } = chamamdWA.msgLayout;

    if (!input) return await reply('*Button On or off ?*', "❓");

    await inputSettings("NON_BUTTONS", input === "on" ? "false" : "true");
    return await reply('```' + "NON_BUTTONS" + ' ⮕ ' + input + '```' + Lang.settingAdded, "✅")
}));
