function resaltarTexto() {
    document.getElementById("mouseMoveCarga").style.color = "blue";
}

function desresaltarTexto() {
    document.getElementById("mouseMoveCarga").style.color = "black";
}


document.getElementById("mouseMoveCarga").addEventListener("mouseover", resaltarTexto);
document.getElementById("mouseMoveCarga").addEventListener("mouseout", desresaltarTexto);

//Si lo quisiese hacer para cada titulo... hay q hacerlo uno por uno?

