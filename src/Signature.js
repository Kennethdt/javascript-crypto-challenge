const nacl = require('libsodium-wrappers');
let key, verifyingKey;

async function init(){
    await nacl.ready;
}

module.exports = {
    verifyingKey : async function () {
        await init();
        if (verifyingKey == null){
            const _keyPair = nacl.crypto_sign_keypair();
            key = _keyPair.publicKey;
            verifyingKey = _keyPair.privateKey;
        }
        return key;
    },
    sign : async function (msg) {
        await init();
        return nacl.crypto_sign(msg, verifyingKey);
    }
};