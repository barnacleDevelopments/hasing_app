const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();

const PORT = process.env.PORT


app.use(cors())

// ======================
// HASHING FUNCTIONS 
// ======================


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

app.get("/bcrypt", (req, res, next) => {
    // brcrypt 
    bcrypt_encrypt("user1234", "password123")
        .then((data) => res.json({
            hash: data,
            hashType: "BRYPT"
        }))
        .catch(err => console.log(err));
});

// PBKDF2 s
app.get("/PBKDF2", (req, res, next) => {
    pbkdf2_encrypt("user1234", "password1234")
        .then(data => res.json({
            hash: data,
            hashType: "PBKDF2"
        }))
        .catch(err => console.log(err));

});


// PBKDF2 s
app.get("/scrypt", (req, res, next) => {


});


app.listen(PORT, () => console.log(`Server is running on ${PORT}!`));

