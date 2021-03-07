// DEPENDENCIES
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT

// FUNCTIONS
const bcrypt_encrypt = require("./functions/bcrypt_encrypt");
const pbkdf2_encrypt = require("./functions/pbdf2_encrypt");
const scrypt_encrypt = require("./functions/scrypt_encrypt");

// MIDDLEWARE
const app = express();
app.use(cors())

// ======================
// HASHING FUNCTIONS 
// ======================

// responds with brcrypt hashed password.
app.get("/bcrypt", (req, res, next) => {
    bcrypt_encrypt("user1234", "password123")
        .then((data) => res.json({
            hash: data,
            hashType: "BRYPT"
        }))
        .catch(err => console.log(err));
});

// reponds with PBKDF2 hashed password.
app.get("/PBKDF2", (req, res, next) => {
    pbkdf2_encrypt("user1234", "password1234")
        .then(data => res.json({
            hash: data,
            hashType: "PBKDF2"
        }))
        .catch(err => console.log(err));
});


// reponds with scrypt hashed password.
app.get("/scrypt", (req, res, next) => {
    scrypt_encrypt("user1234", "password1234")
        .then(data => res.json({
            hash: data,
            hashType: "Scrypt"
        }))
        .catch(err => console.log(err))

});


app.listen(PORT, () => console.log(`Server is running on ${PORT}!`));

