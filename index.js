const bcryptBtn = document.getElementById("brypt-btn");
const PBKDF2Btn = document.getElementById("PBKDF2-btn");
const scryptBtn = document.getElementById("scrypt-btn");
const hashDisplay = document.getElementById("hash-display");

const emptyDisplay = () => {
    hashDisplay.firstElementChild.textContent = "";
    hashDisplay.children[1].textContent = "";
}


bcryptBtn.addEventListener("click", () => {
    fetch("http://localhost:5000/bcrypt")
        .then(response => response.json())
        .then((data) => {
            emptyDisplay();
            hashDisplay.firstElementChild.append(data.hashType);
            hashDisplay.children[1].append(data.hash);
        })
});

PBKDF2Btn.addEventListener("click", () => {
    fetch("http://localhost:5000/PBKDF2")
        .then(response => response.json())
        .then((data) => {
            emptyDisplay();
            hashDisplay.firstElementChild.append(data.hashType);
            hashDisplay.children[1].append(data.hash);
        })
});

scryptBtn.addEventListener("click", () => {
    fetch("http://localhost:5000/scrypt")
        .then(response => response.json())
        .then((data) => {
            emptyDisplay();
            hashDisplay.firstElementChild.append(data.hashType);
            hashDisplay.children[1].append(data.hash);
        })
});
