const Collection = require("@discordjs/collection")
module.exports = class OS {
    constructor(systemVariables) {
        this.systemVariables = systemVariables;
        this.openedPrograms = [];
        this.openedWindows = new Collection();
        this._focusedWindow = null;
        this._focusedWindowIDList = [];


        this.draggingWindow = undefined

        this.xOffset = 0;
        this.yOffset = 0;

        document.addEventListener("mousedown", (e) =>  this.mouseDownEvent(e))
        document.addEventListener("mouseup", (e) =>  this.mouseUpEvent(e))
        document.addEventListener("mousemove", (e) => this.mouseMoveEvent(e))
        document.addEventListener("click", (e) => this.mouseClickEvent(e))

    }
    windowClicked(window, event) {
        for (let i = 0; i < this.openedPrograms.length; i++) {
            const program = this.openedPrograms[i];
            if (program.programMainFile.click) {
                program.programMainFile.click(window, event.target)
            }
        }
    }
    windowMouseDown(window, event) {
        this.setFocusedWindow(window)
        for (let i = 0; i < this.openedPrograms.length; i++) {
            const program = this.openedPrograms[i];
            if (program.programMainFile.click) {
                program.programMainFile.mouseDown(window, event.target)
            }
        }
    }
    windowMouseMove(window, event) {
        this.mouseMoveEvent(event, window)
    }
    windowMouseUp(window, event) {
        this.mouseUpEvent(event, window)
    }


    setFocusedWindow(window, force = false) {
        if (window.ignoreFocus && force === false) return;
        this._focusedWindow = window;
        this._focusedWindowIDList.push(this._focusedWindowIDList.splice(this._focusedWindowIDList.indexOf(window.id), 1)[0]);


        for (let index = 0; index < this._focusedWindowIDList.length; index++) {
            const id = this._focusedWindowIDList[index];
            const window = this.openedWindows.get(id);
            window.iframe.parentElement.style.zIndex = index + 1;
            if (window.alwaysOnTop) {
                window.iframe.parentElement.style.zIndex = 999999999;
            }
        }
    }


    mouseUpEvent(e) {
        this.draggingWindow = undefined;
        this.currentX = undefined;
        this.currentY = undefined;
        this.initialX = undefined;
        this.initialY = undefined;
        this.xOffset = 0;
        this.yOffset = 0;
    }
    mouseClickEvent(e) {
        const titleBar = e.target.closest(".title-bar");
        if (titleBar) {
            const id = titleBar.parentElement.id;
            const windowID = parseInt(id.split("-")[2])
            const window = this.openedWindows.get(windowID);
            if (e.target.closest(".button.close")) {
                window.closeWindow();
            }
        }
    }
    mouseDownEvent(e) {
        const titleBar = e.target.closest(".title-bar");
        if (titleBar) {
            const id = titleBar.parentElement.id;
            const windowID = parseInt(id.split("-")[2])
            const window = this.openedWindows.get(windowID);
            if (e.target.closest(".button")) return;
            
            this.yOffset= e.clientY-parseInt(window.iframe.parentElement.offsetTop);
            this.xOffset= e.clientX-parseInt(window.iframe.parentElement.offsetLeft);
            os.windowMouseDown(window, e);
            this.draggingWindow = window;
        }
    }
    mouseMoveEvent(e, window) {
        if (this.draggingWindow) {
            const frame = this.draggingWindow.iframe.parentElement;
            if (window) {
                const customOffsetTop = window.iframe.parentElement.offsetTop
                const customOffsetLeft = window.iframe.parentElement.offsetLeft
                frame.style.top = (e.clientY-this.yOffset) + (customOffsetTop + 30) + 'px';
                frame.style.left = (e.clientX-this.xOffset) + (customOffsetLeft) + 'px';
            } else {
                frame.style.top = (e.clientY-this.yOffset) + 'px';
                frame.style.left = (e.clientX-this.xOffset) + 'px';
            }
            frame.style.bottom = "initial"
            frame.style.right = "initial"
        }
    }



}