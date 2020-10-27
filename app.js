var requestTeddies = new XMLHttpRequest();
requestTeddies.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var teddies = JSON.parse(this.responseText);
        console.log(teddies);
    }
};
requestTeddies.open("GET", " http://localhost:3000/api/teddies/");
requestTeddies.send();

const monDivPourJS = document.getElementById('divjs');
console.log(monDivPourJS);
monDivPourJS.innerHTML = "<h1>ours</>";
