let i = 0;

function animatie() {

    if (i == 6) {
        i = 0;
    }

    let impartire = "player-" + i;
    i++;
    document.getElementById("animatie").className = impartire;

}
window.setInterval("animatie()", 132);