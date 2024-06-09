/**
* @project_name Mr Chama Md [WA Multi-device]
* @author MrChamalka <https://github.com/Mrchama>
* @description A WhatsApp based 3ʳᵈ party application that provide many services with a real-time automated conversational experience
* @link <https://github.com/Mrchama/MR-CHAMA-MD>
* @version 1.0.0
* @file  _bot_control.js - MrChamaMd bot control commands

© 2024 Mr Chamalka , ANTECH. All rights reserved.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.*/


const { CHAMAMD, ChamamdDB, _default, _default_list_sections, Language, restore } = require('mr_chama_md_core/dist/scripts')
const { addStarRates, checkJID, getStarRates, resetRates } = ChamamdDB.rateDB
const { getAntiLink, insertAntiLink, resetAntiLinkDB } = ChamamdDB.antilinkDB
const { inputSettings, getSettingsList, resetSettingsDB } = ChamamdDB.settingsDB
const { getGrpSettingsList, resetGrpSettingsDB } = ChamamdDB.grpSetDB
const { getMiscData, getMiscDataList } = ChamamdDB.miscDB
const { getAllDelJids, getBanJidList, resetBanDB, resetDelAllDB } = ChamamdDB.ban_jidDB
const { getAllWelcome, getAllBye, resetWelcomeDB, resetByeDB } = ChamamdDB.greetingsDB
const { rateList, reactList, resetLIST, rateText } = _default_list_sections
const getRandom = (ext) => { return `${Math.floor(Math.random() * 10000)}${ext}` };
const fs = require('fs');
const { writeFile } = require('fs/promises');
const Lang = Language.getString('botCTRL');

CHAMAMD({ cmd: "restart", desc: "Restart the bot", type: "profile", react: "🔄" }, (async (ChamamdWA) => {
    let { reply, restart_sys } = ChamamdWA.msgLayout

    await reply('*Restarting...*');
    await restart_sys();
}));


CHAMAMD({ cmd: "stop", desc: "Stop the bot", type: "profile", react: "📴" }, (async (ChamamdWA) => {
    let { reply } = amdiWA.msgLayout

    await reply('*Bot is shutting down...*\n\n_(You have to manually turn on the bot!)_');
    process.exit(1);
}));


CHAMAMD({ cmd: "backup", desc: Lang.backupDESC, type: "profile", react: "📤" }, (async (ChamamdWA) => {
    let { reply, sendDocument } = ChamamdWA.msgLayout
    
    try {    
        const settingsDB = await getSettingsList();
        const settingsFILE = `SettingsBackup_${amdiWA.msg.messageTimestamp}.Chamamd`
        const contentset = JSON.stringify(settingsDB)
        let bufferset = Buffer.from(contentset)
        await writeFile(settingsFILE, bufferset);
        await sendDocument(fs.readFileSync('./' + settingsFILE), { mimetype: _default.amdiMIMETYPE, fileName: settingsFILE, quoted: true });

        const grpsettingsDB = await getGrpSettingsList();
        const grpsettingsFILE = `GroupSettingsBackup_${ChamamdWA.msg.messageTimestamp}.Chamamd`
        const grpcontentset = JSON.stringify(grpsettingsDB)
        let buffergrpset = Buffer.from(grpcontentset)
        await writeFile(grpsettingsFILE, buffergrpset);
        await sendDocument(fs.readFileSync('./' + grpsettingsFILE), { mimetype: _default.amdiMIMETYPE, fileName: grpsettingsFILE, quoted: true });

        const ratingsDB = await getStarRates();
        const ratingsFILE = `RatesBackup_${ChamamdWA.msg.messageTimestamp}.Chamamd`
        const ratingscontent = JSON.stringify(ratingsDB)
        let bufferratings = Buffer.from(ratingscontent)
        await writeFile(ratingsFILE, bufferratings);
        await sendDocument(fs.readFileSync('./' + ratingsFILE), { mimetype: _default.ChamamdMIMETYPE, fileName: ratingsFILE, quoted: true });

        const delallDB = await getAllDelJids();
        const delallFILE = `DelAllJIDBackup_${ChamamdWA.msg.messageTimestamp}.Chamamd`
        const contentdel = JSON.stringify(delallDB)
        let bufferdel = Buffer.from(contentdel)
        await writeFile(delallFILE, bufferdel);
        await sendDocument(fs.readFileSync('./' + delallFILE), { mimetype: _default.amdiMIMETYPE, fileName: delallFILE, quoted: true });

        const banDB = await getBanJidList();
        const banFILE = `BanJIDBackup_${ChamamdWA.msg.messageTimestamp}.Chamamd`
        const contentban = JSON.stringify(banDB)
        let bufferban = Buffer.from(contentban)
        await writeFile(banFILE, bufferban);
        await sendDocument(fs.readFileSync('./' + banFILE), { mimetype: _default.ChamamdMIMETYPE, fileName: banFILE, quoted: true });

        const welcomeDB = await getAllWelcome();
        const welcomeFILE = `WelcomeNoteBackup_${ChamamdWA.msg.messageTimestamp}.Chamamd`
        const contentwelcome = JSON.stringify(welcomeDB)
        let bufferwelcome = Buffer.from(contentwelcome)
        await writeFile(welcomeFILE, bufferwelcome);
        await sendDocument(fs.readFileSync('./' + welcomeFILE), { mimetype: _default.ChamamdMIMETYPE, fileName: welcomeFILE, quoted: true });

        const byeDB = await getAllBye();
        const byeFILE = `ByeNoteBackup_${ChamamdWA.msg.messageTimestamp}.Chamamd`
        const contentbye = JSON.stringify(byeDB)
        let bufferbye = Buffer.from(contentbye)
        await writeFile(byeFILE, bufferbye);
        return await sendDocument(fs.readFileSync('./' + byeFILE), { mimetype: _default.ChamamdMIMETYPE, fileName: byeFILE, quoted: true });
    } catch (e) {
        console.log(e);
        return await reply("Error".fetchError(e), "⚠️", 1);
    }
}));


CHAMAMD({ cmd: "restore", desc: Lang.restoreDESC, type: "profile", react: "📥" }, (async (ChamamdWA) => {
    await restore();
}));


CHAMAMD({ cmd: "reset", desc: Lang.resetDESC, type: "profile", react: "🚮" }, (async (ChamamdWA) => {
    let { input, prefix, reply, sendListMsg, resetconnectionDB } = ChamamdWA.msgLayout

    try {
        switch (input) { 
            default:
                var listInfo = {}
                listInfo.title = Lang.resetDBtitle
                listInfo.text = Lang.resetDBtxt
                listInfo.buttonTXT = 'default'  
                await sendListMsg(listInfo, resetLIST(prefix));
            break;

            case 'connectionDB': 
                await reply(Lang.resetted.format(input), "✅");
                await reply('Bot disconnected!', "❌")
                await resetconnectionDB();
            break;
            
            case 'BanDB': 
                await resetBanDB();
                await reply(Lang.resetted.format(input), "✅");
            break;
            
            case 'DellAllDB': 
                await resetDelAllDB();
                await reply(Lang.resetted.format(input), "✅");
            break;
            
            case 'WelcomeDB': 
                await resetWelcomeDB();
                await reply(Lang.resetted.format(input), "✅");
            break;
            
            case 'ByeDB': 
                await resetByeDB();
                await reply(Lang.resetted.format(input), "✅");
            break;
            
            case 'SettingsDB': 
                await resetSettingsDB();
                await inputSettings('WORK_TYPE', 'private');
                await inputSettings('PREFIX', '.');
                await inputSettings('MODERATOR', 'no moderators added')
                await reply(Lang.resetted.format(input), "✅");
            break;
            
            case 'GroupSettingsDB': 
                await resetGrpSettingsDB();
                await reply(Lang.resetted.format(input), "✅");
            break;
            
            case 'RatesDB': 
                await resetRates();
                await reply(Lang.resetted.format(input), "✅");
            break;

            case 'AntiLinkDB': 
                await resetAntiLinkDB();
                await reply(Lang.resetted.format(input), "✅");
            break;
            
            case 'allDB':
                await resetAntiLinkDB();
                await resetBanDB();
                await resetDelAllDB();
                await resetWelcomeDB();
                await resetGrpSettingsDB();
                await resetByeDB();
                await resetSettingsDB();
                await resetRates();
                await reply(Lang.allDB, "✅");
                await resetconnectionDB();
            break;
        };
    } catch (e) {
        console.log(e);
        return await reply("Error".fetchError(e), "❌", 1);
    }
}));


CHAMAMD({ cmd: "rate", desc: Lang.rateDESC, type: "primary", react: "✨" }, (async (ChamamdWA) => {
    let { input, prefix, reply, sender, sendButtonMsg, sendListMsg } = ChamamdWA.msgLayout

    if (!input) {
        const botname = await getMiscData('BOTNAME');
        let BOTNAME = !botname.data ? 'MR CHAMA MD' : botname.data

        var listInfo = {}
        listInfo.title = Lang.ratesTitle.format(BOTNAME)
        listInfo.buttonTXT = 'Select a rating' 
        listInfo.text = await rateText();
        return await sendListMsg(listInfo, rateList(prefix));
    }

    switch (input) { case 'one': case 'two': case 'three': case 'four': case 'five':
            const isRated = await checkJID(sender, input);
            if (isRated) return await reply(Lang.alreadyRATED.format(input));
            console.log(sender)
            await addStarRates(sender, input);
            await reply(Lang.rated.format(input, input == 'five' ? '😍' : '😁'), "✅");
            //await sendButtonMsg(yesorno(prefix, 'rate', 'thankyou'), Lang.rated.format(input), tagMsg = true);
        break;
    };
}));

CHAMAMD({ cmd: "clear", desc: Lang.clearDESC, type: "profile", react: "🚮" }, (async (ChamamdWA) => {
    let { lastMessage, reply } = ChamamdWA.msgLayout;
    
    await ChamamdWA.web.chatModify({ delete: true, lastMessages: lastMessage}, ChamamdWA.clientJID);
    return reply("🚮 Chat Cleared!");
}));

CHAMAMD({ cmd: "reacts", desc: Lang.RL_DESC, type: "profile", reac:"💗" }, (async (ChamamdWA) => {
    let { input, prefix, sendListMsg } = ChamamdWA.msgLayout

    if (!input) {
        const botname = await getMiscData('BOTNAME');
        const miscData = await getMiscDataList();
        let BOTNAME = !botname.data ? 'MR CHAMA MD' : botname.data

        var listInfo = {}
        listInfo.title = Lang.RL_Title.format(BOTNAME)
        listInfo.buttonTXT = 'default' 
        listInfo.text = Lang.RL_Text;
        return await sendListMsg(listInfo, reactList(prefix, miscData));
    }
}));

CHAMAMD({ cmd: "clean", desc: "Reset process control limits", type: "profile", react: "♻️" }, (async (ChamamdWA) => {
    let { clearProcess, reply } = ChamamdWA.msgLayout;
    
    clearProcess();
    return reply("♻️ Reset process controller!");
}));
