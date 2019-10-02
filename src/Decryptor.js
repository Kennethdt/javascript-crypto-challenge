const nacl = require('libsodium-wrappers');

beforeAll(
    async () => (
        await nacl.ready
    ));

let cryptKey;

module.exports = {
    decrypt : function (ciphertext, nonce) {
        if (cryptKey == null)
            throw "currently no key";

        return nacl.crypto_secretbox_open_easy(ciphertext, nonce, cryptKey);
    },
    setKey : function (key) {
        cryptKey = key;
    }
};