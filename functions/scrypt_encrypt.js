const scrypt = require("scrypt-js"),
    crypto = require("crypto"),
    buffer = require('buffer')

const scrypt_encrypt = (username, password) => {
    const promise = new Promise((resolve, reject) => {
        // generate salt with crypto
        crypto.randomBytes(32, (err, salt) => {
            if (!err) {
                const passwordBuffer = Buffer.alloc(32, password.normalize("NFKC"), "ascii")
                const N = 1024, r = 8, p = 1;
                const dkLen = 32;

                // hash password with salt
                scrypt.scrypt(passwordBuffer, salt, N, r, p, dkLen)
                    .then(data => resolve(data.toString("hex")))
                    .catch(err => reject(err));
            } else {

            }
        })

    })
    return promise;
}

module.exports = scrypt_encrypt;