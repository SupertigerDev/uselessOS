const path = require("path");
const fs = require("fs");
const systemVariables = require(path.join(__dirname, "OS", "system-variables.json"));
const startup = systemVariables.startup
const OS = require(path.join(__dirname, "js", "OS"));
const Program = require(path.join(__dirname, "js", "Program"));

const os = new OS(systemVariables);

window.os_path = path.join(__dirname, "OS")

// set background
document.body.style.backgroundImage = `url(${systemVariables.background.src})`
document.body.style.backgroundSize = systemVariables.background.size

// open startup programs
for (let i = 0; i < startup.length; i++) {
    const prgPath = startup[i];
    const program = new Program(prgPath, os);
}

