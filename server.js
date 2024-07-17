const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const FILE_DIR = path.join(__dirname, 'files');
const FILE_LIST_PATH = path.join(FILE_DIR, 'fileList.json');

app.use(express.static(__dirname));
app.use(express.json());

if (!fs.existsSync(FILE_DIR)) {
    fs.mkdirSync(FILE_DIR);
}

function saveFileList(fileList) {
    fs.writeFileSync(FILE_LIST_PATH, JSON.stringify(fileList));
}

function loadFileList() {
    if (!fs.existsSync(FILE_LIST_PATH)) {
        saveFileList([]);
    }
    return JSON.parse(fs.readFileSync(FILE_LIST_PATH));
}

app.post('/create', (req, res) => {
    const { name } = req.body;
    const fileList = loadFileList();
    fileList.push({ name, data: '' });
    saveFileList(fileList);
    res.json({ message: 'File created: ' + name });
});

app.post('/write', (req, res) => {
    const { index, data } = req.body;
    const fileList = loadFileList();
    if (index < 0 || index >= fileList.length) {
        return res.status(400).json({ message: 'Invalid file index' });
    }
    fileList[index].data = data;
    saveFileList(fileList);
    res.json({ message: 'Data written to file index: ' + index });
});

app.get('/read', (req, res) => {
    const { index } = req.query;
    const fileList = loadFileList();
    if (index < 0 || index >= fileList.length) {
        return res.status(400).json({ message: 'Invalid file index' });
    }
    res.json({ data: fileList[index].data });
});

app.post('/delete', (req, res) => {
    const { index } = req.body;
    const fileList = loadFileList();
    if (index < 0 || index >= fileList.length) {
        return res.status(400).json({ message: 'Invalid file index' });
    }
    fileList.splice(index, 1);
    saveFileList(fileList);
    res.json({ message: 'File deleted at index: ' + index });
});

app.get('/list', (req, res) => {
    const fileList = loadFileList();
    res.json({ files: fileList });
});

app.post('/truncate', (req, res) => {
    const { index } = req.body;
    const fileList = loadFileList();
    if (index < 0 || index >= fileList.length) {
        return res.status(400).json({ message: 'Invalid file index' });
    }
    fileList[index].data = '';
    saveFileList(fileList);
    res.json({ message: 'File truncated at index: ' + index });
});

app.post('/modify', (req, res) => {
    const { index, data } = req.body;
    const fileList = loadFileList();
    if (index < 0 || index >= fileList.length) {
        return res.status(400).json({ message: 'Invalid file index' });
    }
    fileList[index].data = data;
    saveFileList(fileList);
    res.json({ message: 'File modified at index: ' + index });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
