const nacl = require('libsodium-wrappers');
let key, verifyingKey;

beforeAll(
    async () => (
        await nacl.ready
    ));

module.exports = {
    verifyingKey : async function () {
        if (verifyingKey == null){
            const _keyPair = nacl.crypto_sign_keypair();
            key = _keyPair.publicKey;
            verifyingKey = _keyPair.privateKey;
        }
        return key;
    },
    sign : async function (msg) {
        return nacl.crypto_sign(msg, verifyingKey);
    }
};