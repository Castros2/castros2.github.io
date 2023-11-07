function handleConvert() {
    var output = document.getElementById("output");
    while(output.firstChild) {
        output.removeChild(output.firstChild);
    }

    const inputArea = document.getElementById("input-area");
    var lines = inputArea.value.split("\n");
    for (var j = 0; j < lines.length; j++) {
        var content = document.createTextNode(lines[j] + "\n");
        output.appendChild(content);
    }

    fetch("./data.json").then(r=>output.appendChild(r.text()))
}