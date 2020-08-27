const Window = require("./Window")

let windowCountHistory = 0;

module.exports = class Program {
    constructor(_path, os) {
        this.os = os;
        this.path = _path
        this.os.openedPrograms.push(this);
        this.id = this.os.openedPrograms.length
        this.name = null;
        this.programMainFile = undefined
        this.startProgram()
    }
    startProgram() {
        const { name, main } = JSON.parse(fs.readFileSync(path.join(__dirname, "../" ,this.path, "settings.json"), { encoding: "utf8" }));
        this.name = name;
        this.programMainFile = require(path.join(__dirname, "../" ,this.path, main));
        this.programMainFile.main(this);
    }
    openWindow(_path, opts) {
        windowCountHistory++;
        return new Window(_path, opts, this, windowCountHistory);
    }
}