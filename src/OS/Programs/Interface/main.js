

let programsList = undefined;
let interface = undefined
let navBar = undefined
exports.main = (program) => {
    interface = program.openWindow(__dirname + "/index.html", {
        height: "100%",
        width: "100%",
        frame: false,
        radius: "0",
        ignoreFocus: true
    });

    navBar = program.openWindow(__dirname + "/nav-bar/nav-bar.html", {
        width: "100%",
        height: "50px",
        bottom: "0",
        frame: false,
        radius: "0",
        ignoreFocus: true,
        alwaysOnTop: true,
    });


    // open file browser
    program.openWindow(__dirname + "/file-manager/file-manager.html", {title: "File Browser", bottom:"100px", left: "20px", width: "900px", backgroundBlur: true});
    program.openWindow(__dirname + "/file-manager/file-manager.html", {title: "File Browser2", bottom:"200px", left: "500px", width: "900px", backgroundBlur: true});
}


exports.click = (window, target) => {
    // open menu
    if (!programsList && window === navBar && target.closest(".prg-list-button")) {
        programsList = window.program.openWindow(__dirname + "/programs-list/programs-list.html", {
            height: "500px",
            width: "535px",
            bottom: "55px",
            left: "5px",
            radius: "6px",
            frame: false,
            ignoreFocus: true
        });
    } else if (target.closest(".prg-list-button") && programsList) {
        programsList.closeWindow();
        programsList = undefined;
    }
}

exports.mouseDown = (window, target) => {
    // close menu
    if (!target.closest(".prg-list-button") && programsList && (programsList && window !== programsList)) {
        programsList.closeWindow();
        programsList = undefined;
    }
}
exports.beforeCloseWindow = () => {
    // change false to prevent the window from closing
    return true;
}
