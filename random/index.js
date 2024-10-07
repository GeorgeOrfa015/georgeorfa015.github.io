var copy_color = "";
var copy_gradient = "";
function randomNumber(min,max) {
    return Math.round(Math.random() * (max - min)) + Number(min);
}
function randomLetter() {
    let lettersStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let letters = lettersStr.split("");
    return letters[randomNumber(0,25)];
}
function randomColor() {
    let decR = randomNumber(0,255);
    let hexR = decR.toString(16);
    hexR = ("0" + hexR).slice(-2);
    let decG = randomNumber(0,255);
    let hexG = decG.toString(16);
    hexG = ("0" + hexG).slice(-2);
    let decB = randomNumber(0,255);
    let hexB = decB.toString(16);
    hexB = ("0" + hexB).slice(-2);
    return `#${hexR}${hexG}${hexB}`;
}

function randomNumberModule() {
    let min = document.getElementById("calc1in1").value;
    let max = document.getElementById("calc1in2").value;
    let out = document.getElementById("calc1out");
    out.innerHTML = randomNumber(min, max);
}
function randomStringModule() {
    let input = document.getElementById("calc2in").value;
    let out = document.getElementById("calc2out");
    let str = "";
    if (isNaN(input)) {
        out.innerHTML = "Please enter a valid number";
    }else{
        for (i=0;i<input;i++) {
            str += randomLetter();
        }
        out.innerHTML = str;
    }
}
function randomColorModule() {
    let out1 = document.getElementById("calc3out1");
    let out2 = document.getElementById("calc3out2");
    let color = randomColor();
    out1.style.background = color;
    out2.value = color;
    copy_color = color;
}
function randomGradientModule() {
    let colors = document.getElementById("calc4in1").value;
    let rotation = document.getElementById("calc4in2").value;
    let out1 = document.getElementById("calc4out1");
    let out2 = document.getElementById("calc4out2");
    if (isNaN(rotation)||rotation=="") {
        rotation = randomNumber(0,359);
    }
    let gradient = `linear-gradient(${rotation}deg, `;
    
    for (i=0;i<colors;i++) {
        gradient += randomColor() + ", ";
    }
    gradient = gradient.slice(0, -2);
    gradient += ")";
    out1.style.background = gradient;
    out2.value = gradient;
    if (colors<2) {
        out2.value = "ERR: Colors must be greater than 2"
    }
    copy_gradient = gradient;
}

function copyColor() {
    if (copy_color!="") {
        navigator.clipboard.writeText(copy_color);   
        document.getElementById("copyColorButton").innerHTML = "Copied!"
        setTimeout(function() {document.getElementById("copyColorButton").innerHTML = "Copy"}, 3000)     
    }
}
function copyGradient() {
    if (copy_gradient!="") {
        navigator.clipboard.writeText(copy_gradient);  
        document.getElementById("copyGradientButton").innerHTML = "Copied!"
        setTimeout(function() {document.getElementById("copyGradientButton").innerHTML = "Copy"}, 3000)           
    }
}