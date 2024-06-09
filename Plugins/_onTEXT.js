/**
* @project_name Mr Chama Md [WA Multi-device]
* @author MrChamalka <https://github.com/Mrchama>
* @description A WhatsApp based 3ʳᵈ party application that provide many services with a real-time automated conversational experience
* @link <https://github.com/Mrchama/MR-CHAMA-MD>
* @version 1.0.0
* @file  _anti_functions.js - MrChamaMd on text commands

© 2024 Mr Chamalka , ANTECH. All rights reserved.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.*/


const { MR-CHAMA-MD, chamamdChat, Language } = require('mr_cham_md_core/dist/scripts')
const { semiAIchat } = amdiChat
const Lang = Language.getString('botCTRL');

CHAMAMD({ onText: "MR CHAMA MD", desc: Lang.AI_USAGE, example: Lang.AI_EXAMPLE, type: "primary", react: "👾" }, (async (chamamdWA) => {
    let { input, reply } = chamamdWA.msgLayout

    if (!input) return await reply(`${Lang.AI_USAGE}\n\nExample: ${Lang.AI_EXAMPLE}`);
    await semiAIchat( chamamdWA );
}));

CHAMAMD({ onText: "චමා", desc: "AI Chat bot", type: "primary", react: "👾", cmdHideInMenu: true }, (async (chamamdWA) => {
    let { input, reply } = chamamdWA.msgLayout

    if (!input) return await reply(`${Lang.AI_USAGE}\n\nExample: ${Lang.AI_EXAMPLE}`);
    await semiAIchat( chamamdWA );
}));
