// DEPENDENCIES
const bcrypt = require("bcrypt");


const bcrypt_encrypt = (username, password) => {
    const promise = new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (!err) {
                bcrypt.hash(password, salt, (err, key) => {
                    if (!err) {
                        // store the username, hashed password and salt in database;
                        resolve(key)
                    } else {
                        reject(err)
                    }
                })
            } else {
                reject(err);
            }
        })
    });
    return promise;
}

module.exports = bcrypt_encrypt;