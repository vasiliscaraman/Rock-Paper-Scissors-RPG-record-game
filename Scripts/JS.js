let timp = 0;
let timpInSecunde = 0;

function navigare() {
    console.log("Sa inceapa lupta");
    window.sessionStorage.setItem("nume", document.getElementById("numejucator").value);
    window.location.href = "https://localhost:44348/StartJoc.html";
    
}

window.addEventListener('load', () => {
    if (window.localStorage.getItem("record") == null) {
        window.localStorage.setItem("record", 0);
    }

    if (window.localStorage.getItem("record") != null) {
        $('#numarrecord').text(window.localStorage.getItem("record"));
    }

    $('#start').click(navigare)
    $('#reset').click(reset)
});

function tick() {
    timp+=1000;
    timpInSecunde = Math.floor(timp / 1000);
    $('#timpInSesiune').text(timpInSecunde);
}

if (sessionStorage.getItem("timpPetrecut") != null) {
    timp = Number(new Date() - new Date(sessionStorage.getItem("timpPetrecut")));
} else { sessionStorage.setItem("timpPetrecut", new Date()); }

setInterval(tick, 1000);

function reset() {
    localStorage.removeItem("record");
    $('#numarrecord').text(0);
}

