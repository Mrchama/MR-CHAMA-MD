/**
* @project_name Mr Chama Md [WA Multi-device]
* @author MrChamalka <https://github.com/Mrchama>
* @description A WhatsApp based 3ʳᵈ party application that provide many services with a real-time automated conversational experience
* @link <https://github.com/Mrchama/MR-CHAMA-MD>
* @version 1.0.0
* @file  apkdl.js - MrChamaMd APK Downloaders

© 2024 Mr Chamalka , ANTECH. All rights reserved.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.*/

const { MR CHAMA MD, _default_list_sections, fmmod_com, Language, blackamda_API, apkDL_List } = require('mr_chama_md_core/dist/scripts')
const axios = require("axios")
const { fmmods_packages } = _default_list_sections
const Lang = Language.getString('misc');

CHAMAMD({ cmd: "fmmods", desc: "Fouad-whatsapp mods downloader", type: "download", react: "🚀" }, (async (chamamdWA) => {
    let { footerTXT, input, prefix, react, reply, sendDocument, sendListMsg } = chamamdWA.msgLayout;

    const fmmods = await fmmod_com();
    var listInfo = {}
    listInfo.title = '📲 Fouad-whatsapp mods downloader'
    listInfo.text = `
        Download FMWA latest version apk from here.

        By original fm Mods site:
        https://fmmods.com/fouad-whatsapp/
    `
    listInfo.buttonTXT = 'Choose a package'

    if (!input) {
        return await sendListMsg(listInfo, fmmods_packages(prefix));
    }

    await react("📥");
    try {
        switch (input) {
            case '1':
                await react("📤");
                await sendDocument({ url: fmmods['com.whatsapp'].link }, { mimetype: 'application/vnd.android.package-archive', fileName: fmmods['com.whatsapp'].name, caption: footerTXT, quoted: true });
                await react("✅");
                break;

            case '2':
                await react("📤");
                await sendDocument({ url: fmmods['com.fmwhatsapp'].link }, { mimetype: 'application/vnd.android.package-archive', fileName: fmmods['com.fmwhatsapp'].name, caption: footerTXT, quoted: true });
                await react("✅");
                break;

            case '3':
                await react("📤");
                await sendDocument({ url: fmmods['com.gbwhatsapp'].link }, { mimetype: 'application/vnd.android.package-archive', fileName: fmmods['com.gbwhatsapp'].name, caption: footerTXT, quoted: true });
                await react("✅");
                break;

            case '4':
                await react("📤");
                await sendDocument({ url: fmmods['com.yowhatsapp'].link }, { mimetype: 'application/vnd.android.package-archive', fileName: fmmods['com.yowhatsapp'].name, caption: footerTXT, quoted: true });
                await react("✅");
                break;
        }
    } catch (e) {
        console.log(e);
        return await reply("Error".fetchError(e), "⚠️", 1);
    }
}));


CHAMAMD({ cmd: "apk", desc: Lang.APKDL_DESC, type: "download", react: "🗃️" }, (async (chamamdWA) => {
    let { input, isPlaystore, sendCustomButton, sendListMsg, prefix, react, reply } = chamamdWA.msgLayout;

    if (!input) return await reply(Lang.APK_EXAMPLE, "❓");

    try {
        if (input && isPlaystore(input)) {
            const psAPI = await mrchamamlka_API("playstore", `package=${input}`, chamamdWA.botNumberJid);
            const response = await axios.get(psAPI);
            const json = response.data

            if (json.status.error) return await reply("Error".fetchError({ message: json.status.message }), "⚠️", 1);
            if (json.size.isLarge) return await reply(Lang.OVER_WA_FILE);

            await react("📥");
            const buttons = [
                { buttonId: `${prefix}ps ${input}`, buttonText: { displayText: '🗿 App Info' }, type: 1 }
            ]

            const text = `${Lang.APK_TITLE}
        📒 App name: ${json.app_name}
        🔖 Version: ${json.version}`

            await react("📤");
            await sendCustomButton(buttons, text, true, "apk", json.dl_link, `${json.app_name}.apk`);
            return await react("✅");
        } else if (input) {
            const psAPI = await mrchamalka_API("search", `platform=playstore&name=${input}`, chamamdWA.botNumberJid);
            const response = await axios.get(psAPI);
            const json = response.data

            if (json.status.error) return await reply("Error".fetchError({ message: json.status.message }), "⚠️", 1);

            var listInfo = {}
            listInfo.title = Lang.APK_TITLE
            listInfo.text = Lang.APK_TXT
            listInfo.buttonTXT = 'Select app'

            const sections = apkDL_List(prefix, json.data);

            return await sendListMsg(listInfo, sections)
        }
    } catch (e) {
        console.log(e);
        return await reply("Error".fetchError(e), "⚠️", 1);
    }
}));
