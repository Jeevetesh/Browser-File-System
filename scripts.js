function createFile() {
    var fileName = document.getElementById('createName').value.trim();
    if (fileName === '') {
        alert('Please enter a valid file name.');
        return;
    }
    fetch('/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fileName })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}

function writeFile() {
    var fileIndex = document.getElementById('writeIndex').value;
    var data = document.getElementById('writeData').value;
    fetch('/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: fileIndex, data: data })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}

function readFile() {
    var fileIndex = document.getElementById('readIndex').value;
    fetch(`/read?index=${fileIndex}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('readOutput').innerText = data.data;
    })
    .catch(error => console.error('Error:', error));
}

function deleteFile() {
    var fileIndex = document.getElementById('deleteIndex').value;
    fetch('/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: fileIndex })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}

function listFiles() {
    fetch('/list')
    .then(response => response.json())
    .then(data => {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        data.files.forEach((file, index) => {
            const li = document.createElement('li');
            li.innerText = `${index}: ${file.name}`;
            fileList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

function truncateFile() {
    var fileIndex = document.getElementById('truncateIndex').value;
    fetch('/truncate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: fileIndex })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}

function modifyFile() {
    var fileIndex = document.getElementById('modifyIndex').value;
    var data = document.getElementById('modifyData').value;
    fetch('/modify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: fileIndex, data: data })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}
