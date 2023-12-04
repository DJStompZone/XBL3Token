const {XBL, shiftAscii} = require("./auth");

console.log("Authenticating...")
try { 
    XBL();
    console.info("Success!");
} catch (e) {
    console.error("Auth failed!", e);
}