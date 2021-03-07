// DEPENDENCIES

const crypto = require("crypto");

const pbkdf2_encrypt = (username, password) => {
    const promise = new Promise((resolve, reject) => {
        crypto.randomBytes(32, (err, salt) => {
            if (!err) {
                crypto.pbkdf2(password, salt, 4096, 512, 'sha512', (err, key) => {
                    if (!err) {
                        resolve(key.toString("hex"));
                    } else {
                        reject(err);
                    }
                })
            } else {
                reject(err);
            }
        })
    })
    return promise;
}

module.exports = pbkdf2_encrypt;