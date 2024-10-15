let numarVictorii=0;
let HPplayer;
let HPenemy;
let okay = 0;
let timp=0;

function navigare() {
    window.location.href = "https://localhost:44348/PaginaWeb.html";
}

window.addEventListener('load', () => {
    $('#exit').click(navigare);
    $('.jucatoranimatie').after(`<h3 class="playername">${window.sessionStorage.getItem("nume")}­</h3>`);
    HPplayer = document.getElementById("vietijucator");
    HPenemy = document.getElementById("vietioponent");
    document.getElementById("monster").src = "../Images-and-sprites/monster" + Math.floor(Math.random() * 10) + ".png";
});

function tick() {
    timp += 1000;
    timpInSecunde = Math.floor(timp / 1000);
    $('#timpInSesiune').text(timpInSecunde);
}

if (sessionStorage.getItem("timpPetrecut") != null) {
    timp = Number(new Date() - new Date(sessionStorage.getItem("timpPetrecut")));
} else { sessionStorage.setItem("timpPetrecut", new Date()); }

setInterval(tick, 1000);

class Entitate {
    constructor(denumire, punctevitale) {
        this.denumire = denumire;
        this.punctevitale = punctevitale;
    }
}

let Jucator = new Entitate(""+window.sessionStorage.getItem("nume"), 10);
let Mob = new Entitate("Monster", 3);

function jucatorLovit() {
    Jucator.punctevitale--;
    $('#playerhurt').fadeIn(500);
    $('#playerhurt').fadeOut(500);
    HPplayer.removeChild(HPplayer.lastChild);
    HPplayer.removeChild(HPplayer.lastChild);
}

function monstruLovit() {
    Mob.punctevitale--;
    if (Mob.punctevitale != 0) {
        $('#monsterhurt').fadeIn(500);
        $('#monsterhurt').fadeOut(500);
    }
    if (okay == 0) {
        HPenemy.removeChild(HPenemy.lastChild);
    }
    HPenemy.removeChild(HPenemy.lastChild);
}

function verificareJucatorMort() {
    if (Jucator.punctevitale == 0) {
        if (numarVictorii > window.localStorage.getItem("record")) {
            window.localStorage.setItem("record", numarVictorii);
            alert("Felicitari! Ai un nou record! (" + window.localStorage.getItem("record") + ")");
        } else alert("Ai pierdut!");
        window.location.href = "https://localhost:44348/PaginaWeb.html";
    }
}

function verificareMonstruMort() {
    if (Mob.punctevitale == 0) {
        okay = 1;
        $('#deathanimation').fadeIn(500);
        $('#deathanimation').fadeOut(200);
        numarVictorii++;
        Mob = new Entitate("Monster", 3);
        $('#monster').fadeOut(300);
        let svgns = "http://www.w3.org/2000/svg";
        for (var x = 10; x < 60; x += 22) {
            let circle = document.createElementNS(svgns, 'circle');
            circle.setAttributeNS(null, 'cx', x);
            circle.setAttributeNS(null, 'cy', 20);
            circle.setAttributeNS(null, 'r', 10);
            circle.setAttributeNS(null, 'style', 'fill: green; stroke: black; stroke-width: 1px;');
            HPenemy.appendChild(circle);
        }
        setTimeout(() => {
            $('#monster').fadeIn(2000); document.getElementById("monster").src =
                "../Images-and-sprites/monster" + Math.floor(Math.random() * 10) + ".png";
        }, 600);
    }
}

function alegere(miscare) {
    let miscareJucator;
    let informare;
    console.log(miscare);
    switch (miscare) {
        case "Piatra": miscareJucator = 0; break;
        case "Hartie": miscareJucator = 1; break;
        case "Foarfece": miscareJucator = 2; break;
    }
    console.log(miscareJucator);
    let miscareOponent = Math.floor(Math.random() * 3);
    console.log(miscareOponent);
    if (miscareJucator == 0 && miscareOponent == 0) {
        informare = "Piatra --><-- Piatra";
    }
    if (miscareJucator == 0 && miscareOponent == 1) {
        jucatorLovit();
        informare = "Piatra <-- Hartie";
    }
    if (miscareJucator == 0 && miscareOponent == 2) {
        monstruLovit();
        informare = "Piatra --> Foarfece";
    }
    if (miscareJucator == 1 && miscareOponent == 0) {
        monstruLovit();
        informare = "Hartie --> Piatra";
    }
    if (miscareJucator == 1 && miscareOponent == 1) {
        informare = "Hartie --><-- Hartie";
    }
    if (miscareJucator == 1 && miscareOponent == 2) {
        jucatorLovit();
        informare = "Hartie <-- Foarfece";
    }
    if (miscareJucator == 2 && miscareOponent == 0) {
        jucatorLovit();
        informare = "Foarfece <-- Piatra";
    }
    if (miscareJucator == 2 && miscareOponent == 1) {
        monstruLovit();
        informare = "Foarfece --> Hartie";
    }
    if (miscareJucator == 2 && miscareOponent == 2) {
        informare = "Foarfece --><--Foarfece";
    }
    $('#informaremiscari').text(informare);

    verificareJucatorMort();
    verificareMonstruMort();
    
    $('#numarwins').text(numarVictorii);
}

function lovesteJucator() {
    jucatorLovit();
    informare = "Jucatorul a primit o lovitura de nicaieri!"
    verificareJucatorMort();
    console.log("Te-ai lovit singur..");
    $('#informaremiscari').text(informare);
}

function lovesteOponent() {
    monstruLovit();
    informare = "Monstrul a primit o lovitura de nicaieri!"
    verificareMonstruMort();
    console.log("Ai lovit monstrul! ☺");
    $('#numarwins').text(numarVictorii);
    $('#informaremiscari').text(informare);
}
