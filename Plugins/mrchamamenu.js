/**
▒▉▀▅▀▉ ▒▉▀▀▉ ── ▒▉▀▀▀ ▒▉─▒▉ ─▉▀▀▉ ▒▉▀▅▀▉ ─▉▀▀▉ ── ▒▉▀▅▀▉ ▒▉▀▀▅
▒▉▒▉▒▉ ▒▉▅▅▀ ▀▀ ▒▉─── ▒▉▀▀▉ ▒▉▅▅▉ ▒▉▒▉▒▉ ▒▉▅▅▉ ▀▀ ▒▉▒▉▒▉ ▒▉─▒▉
▒▉──▒▉ ▒▉─▒▉ ── ▒▉▅▅▅ ▒▉─▒▉ ▒▉─▒▉ ▒▉──▒▉ ▒▉─▒▉ ── ▒▉──▒▉ ▒▉▅▅▀
 __  __       _ _   _       ____             _          
|  \/  |_   _| | |_(_)     |  _ \  _____   _(_) ___ ___ 
| |\/| | | | | | __| |_____| | | |/ _ \ \ / / |/ __/ _ \
| |  | | |_| | | |_| |_____| |_| |  __/\ V /| | (_|  __/
|_|  |_|\__,_|_|\__|_|     |____/ \___| \_/ |_|\___\___|
* @project_name Mr Chama Md [WA Multi-device]
* @author MrChamalka <https://github.com/Mrchama>
* @description A WhatsApp based 3ʳᵈ party application that provide many services with a real-time automated conversational experience
* @link <https://github.com/Mrchama/MR-CHAMA-MD>
* @version 1.0.0
* @file  _amdi_menu.js - MrChamaMd bot main menu

© 2024 Mr Chamalka , ANTECH. All rights reserved.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.*/

const { MRCHAMAMD,MRCHAMAMDDB, _default, _default_list_sections, Language } = require('mr_chama_md_core/dist/scripts');
const { getSettings } = mrchamamdDB.settingsDB
const { panelList } = _default_list_sections
const Lang = Language.getString('MrchamamdMenu');

/**
 * @cmdInfos { cmd, desc, example, type, react, cmdHideInMenu }
 * @cmdTypes primary, download, logo, profile, admin
*/

MRCHAMAMD{cmd:["pane", "lit", "mnu"],esc: "MR CHAMA MD Main Menu", type: "primary", react: "📜" }, (async (mrchamamdWA) => {
    let { input, prefix, sendAudioMsg, sendListMsg, msgDevice, sendername } = mrchamamdWA.msgLayout;
   
    if (input) return;

    const pttStatus = true
    let mimeType = msgDevice == 'ios' ? 'mp3/mp4' : 'audio/ogg; codecs=opus'
    await sendAudioMsg({ url: audioURL }, {mimetype: mimeType, ptt: pttStatus});
    const PANEL_HEADER = await getSettings('PANEL_HEADER');
    let text = !PANEL_HEADER.input || PANEL_HEADER.input == 'default' ? `\n*Hello!* ${sendername}` + Lang.panelText : PANEL_HEADER.input.keywords();

    var listInfo = {}
    listInfo.title = Lang.panelTitle
    listInfo.text = text
    listInfo.buttonTXT = 'Select category'

    const sections = panelList(prefix);
    return await sendListMsg(listInfo, sections);
}));
