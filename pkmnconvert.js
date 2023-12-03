function handleConvert(val) {
    var output = document.getElementById("output");
    while(output.firstChild) {
        output.removeChild(output.firstChild);
    }

    const inputArea = document.getElementById("input-area");
    var lines = inputArea.value.split("\n");

    var jsonData;
    if(val === "tcg") {
        jsonData = "./pkmndata.json"
    } else if (val === "csi") {
        jsonData = "./csiData.json"
    }

    fetch(jsonData)
      .then((response) => response.json())
      .then((data) => {
        for (var j = 0; j < lines.length; j++) {
            var line = lines[j];
            var lineSplit = line.split(" ");
            if (lineSplit.length > 2) {
                var number = lineSplit.pop();
                var set_ = lineSplit.pop();

                var key = set_.concat(" ", number);
                var quantity = lineSplit[0];
                if (data.hasOwnProperty(key)) {
                    var tcgLine = quantity.concat(" ", data[key]);
                    output.innerHTML = output.innerHTML + tcgLine + "\n"
                }
            }
        }
      })
      .catch(console.error);
      output.scrollTop
}

function copyText() {
    var output = document.getElementById("output");
    navigator.clipboard.writeText(output.innerHTML);
}