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

                // Pop off "PH" that PTCGL adds at the end for parallel holos
                if(number === "PH") {
                    number = lineSplit.pop();
                }
                
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

function showSnackbar() {
    var snackbar = document.getElementById("snackbar");

    // Add the "show" class to DIV
    snackbar.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

function copyText() {
    var output = document.getElementById("output");
    navigator.clipboard.writeText(output.innerHTML);
    showSnackbar();
}