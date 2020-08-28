
const path = top.require('path');
const fs = top.require('fs');

const filesListDiv = document.getElementById("files-list");



setTimeout(() => {
    loadFolder(top.os_path);
}, 500);



async function loadFolder(_path) {
    const folderFiles = await getFolderFiles(_path);
    let elements = ""
    for (let index = 0; index < folderFiles.length; index++) {
        const file = folderFiles[index];
        elements = elements + createFileElement({fileName: file.fileName, isFolder: file.isFolder})
    }
    filesListDiv.innerHTML = elements;
    
}

document.body.addEventListener('dblclick', event => {
    console.log(event)
})

async function getFolderFiles(_path) {
    console.log("awaiting")
    const files = await readDirAsync(_path);
    console.log(files)
    return await Promise.all(files.map(async fileName => {
        const filePath = path.join(_path, fileName);
        let json = {
            fileName,
            filePath,
            isFolder: false,
        }
        try{
            const fileContent = await readDirAsync(filePath);
            json.isFolder = true;
        } catch(e) {}
        return json
    }))
}


function createFileElement({isFolder, fileName}) {
    return `
    <div class="file${isFolder? ' folder' : ''}">
        <div class="image"></div>
        <div class="name">${fileName}</div>
    </div>
    `

}



function readDirAsync(_path) {
    return new Promise((res, rej) => {
        fs.readdir(_path, (err, files) => {
            if (err) {
                rej(err);
                return
            }
            else res(files);
        })
    })
}
