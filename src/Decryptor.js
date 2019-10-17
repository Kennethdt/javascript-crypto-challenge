const nacl = require('libsodium-wrappers');

async function init(){
    await nacl.ready;
}

let cryptKey;

module.exports = {
    decrypt : async function (ciphertext, nonce) {
        await init();
        if (cryptKey == null)
            throw "currently no key";

        return nacl.crypto_secretbox_open_easy(ciphertext, nonce, cryptKey);
    },
    setKey : async function (key) {
        cryptKey = key;
    }
};