const { Authflow, Titles } = require('prismarine-auth');
const crypto = require('crypto');
const curve = 'secp384r1';
const fs = require("fs");

async function getXBLToken(offset=13, force=false) {
    if (!(tokenExpired(force))) {
        console.info("Token is still valid, no need to reauthenticate. Exiting...")
        return 0;
    }
    const flow = new Authflow(null, "./", { authTitle: Titles.MinecraftNintendoSwitch, deviceType: 'Nintendo', flow: 'live' });
    const keypair = crypto.generateKeyPairSync('ec', { namedCurve: curve }).toString('base64');
    try {
        const xbl = await flow.getXboxToken('https://pocket.realms.minecraft.net/');
        const shiftedToken = shiftAscii(parseXBL(xbl), offset);
        fs.writeFileSync('./.xbl3', shiftedToken);
        fs.writeFileSync('./.expires', xbl.expiresOn);
        console.log('XBL token saved');
        return 0;
    } catch (error) {
        console.error('Failed to authenticate:', error);
        return 1;
    }
}

function parseXBL(xstsRes){
    try {
        return `XBL3.0 x=${xstsRes.userHash};${xstsRes.XSTSToken}`
    } catch (e) {
        console.error(e)
    }
}

function shiftAscii(str, amount) {
    try {
        return str.split('').map(char => String.fromCharCode(char.charCodeAt(0) + amount)).join('');
    } catch {
        return JSON.stringify(str).split('').map(char => String.fromCharCode(char.charCodeAt(0) + amount)).join('');
    }
}

function tokenExpired(force, fn="./.expires"){
    if (force || !(fs.existsSync(fn))) {
        return true;
    }
    try {
        let timestamp = fs.readFileSync(fn).toString();
        return new Date(timestamp) < new Date();
    } catch {
        return true;
    }
}

function __delCache(fn) {
    if (fn.endsWith("-cache.json")) {
        try {
            fs.unlinkSync(fn);
        } catch {}
    }
}

function deleteSavedTokens(clearXSTS=false, xbl3File="./.xbl3", expFile="./.expires") {
    console.info("Deleting token file and timestamp...")
    try {fs.unlinkSync(xbl3File)} catch {}
    try {fs.unlinkSync(expFile)} catch {}
    if (clearXSTS === true){
        console.info("Deleting MSAL cache...");
        fs.readdirSync("./").forEach(__delCache);
    }
    console.info("Token cache cleared!");
}

module.exports.XBL = getXBLToken;
module.exports.shiftAscii = shiftAscii;
module.exports.parseXBL = parseXBL;
module.exports.tokenExpired = tokenExpired;
module.exports.purgeCache = deleteSavedTokens;
