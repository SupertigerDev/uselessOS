
module.exports = class Window {
    constructor(_path, opts = {}, program, id) {
        this.program = program;
        this.title = opts.title || this.program.name
        this.os = this.program.os;
        this._height = opts.height || "600px";
        this._width = opts.width || "600px";
        this._bottom = opts.bottom;
        this.alwaysOnTop = opts.alwaysOnTop;
        this._left = opts.left;
        this._backgroundBlur = opts.backgroundBlur || false;
        this._radius = opts.radius || "5px";
        this._frame = opts.frame === undefined ? true : opts.frame;
        this.path = _path;
        this.os.openedWindows.set(id, this);
        this.ignoreFocus = opts.ignoreFocus || false;
        this.id = id
        this.os._focusedWindowIDList.push(this.id)
        this.iframe = null;
        this.openWindow();
    }
    openWindow() {

        const window = document.createElement('div');
        window.setAttribute('class', `window`);
        window.setAttribute('id', `window-${this.program.id}-${this.id}`);

        window.style.bottom = this._bottom
        window.style.left = this._left
        window.style.borderRadius = this._radius
        window.style.width = this._width
        window.style.height = this._height;
        if (this._frame && this._height.endsWith("px")) {
            window.style.background = "rgba(48, 48, 48, 0.5)";
            window.style.height = (parseInt(this._height.split("px")[0]) + 35) + "px"
        }
        if (this._backgroundBlur) {
            window.style.backdropFilter = "blur(10px)";

        }
        window.style.zIndex = this.id;



        const ifrm = document.createElement('iframe');
        ifrm.setAttribute('class', `content`);

        if (this._frame) {
            const titleBar = document.createElement("div");
            titleBar.setAttribute('class', `title-bar`);
            titleBar.innerHTML = titleBarContent(this.title);
            if (this._backgroundBlur) {
                titleBar.style.background = "initial";
                titleBar.style.backdropFilter = "initial";
            }
            window.appendChild(titleBar)
        }

        window.appendChild(ifrm);
        
        document.body.appendChild(window);

        ifrm.setAttribute('src', this.path);
        this.iframe = ifrm;
        this.os.setFocusedWindow(this, true);
        this.iframe.onload = () => {
            this.setEvents()
        }
    }
    closeWindow() {
        if (this.program.programMainFile.beforeCloseWindow) {
            const preventDefault = this.program.programMainFile.beforeCloseWindow();
            if (preventDefault === false) return;
        }

        this.iframe.parentElement.remove();
        this.os.openedWindows.delete(this.id);
        this.os._focusedWindowIDList  = this.os._focusedWindowIDList.filter(w => w !== this.id);


        this.os.setFocusedWindow(this.os.openedWindows.find(w => this.os._focusedWindowIDList[this.os._focusedWindowIDList.length - 1] === w.id));
    }
    setEvents() {
        // iframe events
        this.iframe.contentWindow.document.onclick = (event) => {
            this.os.windowClicked(this, event);
        }
        this.iframe.contentWindow.document.onmousedown = (event) => {
            this.os.windowMouseDown(this, event);
        }
        this.iframe.contentWindow.document.onmousemove = (event) => {
            this.os.windowMouseMove(this, event);
        }
        this.iframe.contentWindow.document.onmouseup = (event) => {
            this.os.windowMouseUp(this, event);
        }
    }
}

function titleBarContent(name) {
    return `
    <div class="title">${name}</div>
    <div class="buttons">
        <div class="button minimize"></div>
        <div class="button maximize"></div>
        <div class="button close"></div>
    </div>
    `
}