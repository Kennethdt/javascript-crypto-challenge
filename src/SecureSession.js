const nacl = require('libsodium-wrappers');

async function init() {
    await nacl.ready
}

let key, serverPublicKey, serverVerifyingKey;
let rx, tx;

module.exports = {
    setClientPublicKey: function (clientPublicKey) {
        if (key != null && key !== clientPublicKey)
            throw "client public key already set";
        else
            key = clientPublicKey;
    },

    serverPublicKey: async function () {
        await init();
        const _keyPair = nacl.crypto_kx_keypair();
        serverVerifyingKey = _keyPair.privateKey;
        serverPublicKey = _keyPair.publicKey;

        const _sharedKeys = nacl.crypto_kx_server_session_keys(
            serverPublicKey,
            serverVerifyingKey,
            key
        );
        rx = _sharedKeys.sharedRx;
        tx = _sharedKeys.sharedTx;

        return serverPublicKey;
    },

    decrypt: async function (ciphertext, nonce) {
        await init();
        return nacl.crypto_secretbox_open_easy(ciphertext, nonce, rx);
    },

    encrypt: async function (msg) {
        await init();
        let nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES);
        let ciphertext = nacl.crypto_secretbox_easy(msg, nonce, tx);
        return {ciphertext, nonce};
    }
};