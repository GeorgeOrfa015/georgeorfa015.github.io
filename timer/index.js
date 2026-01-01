function randomnumber(min,max) {
    return Math.round(Math.random() * (max - min)) + min;
}    
function randomColor() {
    let decR = randomnumber(0,255);
    let hexR = decR.toString(16);
    hexR = ("0" + hexR).slice(-2);
    let decG = randomnumber(0,255);
    let hexG = decG.toString(16);
    hexG = ("0" + hexG).slice(-2);
    let decB = randomnumber(0,255);
    let hexB = decB.toString(16);
    hexB = ("0" + hexB).slice(-2);
    return `#${hexR}${hexG}${hexB}`;
}

let colorSelection = localStorage.getItem("colorSelection");
let clock = document.querySelector("#output");
let randomOutput = document.querySelector("#randomStatus");
function solidSubmit() {
    let colorSolid = document.querySelector("#solidIn").value;
    localStorage.setItem("colorSolid", colorSolid);
    clock.style.background = colorSolid;
    clock.style["-webkit-text-fill-color"] = "transparent";
    clock.style["-webkit-background-clip"] = "text";
    clock.style["background-clip"] = "text";
    colorSelection="0";
    localStorage.setItem('colorSelection', 0);


    randomOutput.innerHTML="Disabled"  
}
function gradientSubmit() {
    let colorGradient1 = document.querySelector("#gradientIn1").value;
    let colorGradient2 = document.querySelector("#gradientIn2").value;
    let rotationGradient = document.querySelector("#gradientRotationIn").value;
    localStorage.setItem("colorGradient1", colorGradient1);
    localStorage.setItem("colorGradient2", colorGradient2);
    localStorage.setItem("rotationGradient", rotationGradient);
    if(isNaN(rotationGradient)||rotationGradient=="") {
        clock.style.background = `linear-gradient(180deg, ${colorGradient1}, ${colorGradient2})`
    }else{
        clock.style.background = `linear-gradient(${rotationGradient}deg, ${colorGradient1}, ${colorGradient2})`
    }
    clock.style["-webkit-text-fill-color"] = "transparent";
    clock.style["-webkit-background-clip"] = "text";
    clock.style["background-clip"] = "text";
    colorSelection="1";
    localStorage.setItem('colorSelection', 1);

    randomOutput.innerHTML="Disabled"  
}
function randomSubmit() {
    let colorRandom1 = randomColor();
    let colorRandom2 = randomColor();
    let rotationRandom = randomnumber(0,360);
    clock.style.background = `linear-gradient(${rotationRandom}deg, ${colorRandom1}, ${colorRandom2})`
    clock.style["-webkit-text-fill-color"] = "transparent";
    clock.style["-webkit-background-clip"] = "text";
    clock.style["background-clip"] = "text";
    colorSelection="2"
    localStorage.setItem('colorSelection', 2);     
    randomOutput.innerHTML="Enabled"  
}
function gettime() {
    let crTime = new Date();
    let cdTime = new Date(2027,0,1,0,0,0);
    let timeDifference = cdTime.getTime()-crTime.getTime();
    if (timeDifference>=0) {
        clock.innerHTML = Math.floor(timeDifference/(24*60*60*1000)) + " Days ";
        clock.innerHTML+= Math.floor(timeDifference%(24*60*60*1000)/(60*60*1000)) + "h ";
        clock.innerHTML+= Math.floor(timeDifference%(60*60*1000)/(60*1000)) + "m ";
        clock.innerHTML+= Math.floor(timeDifference%(60*1000)/1000) + "s";
    }else{
        clock.innerHTML = "Happy New Year!"
    }
}
var datemode = localStorage.getItem("dateMode");



document.querySelector("#solidIn").value = localStorage.getItem("colorSolid");
document.querySelector("#gradientIn1").value = localStorage.getItem("colorGradient1");
document.querySelector("#gradientIn2").value = localStorage.getItem("colorGradient2");
document.querySelector("#gradientRotationIn").value = localStorage.getItem("rotationGradient");


if(colorSelection==0){
    localStorage.setItem("colorGradient1", "");
    localStorage.setItem("colorGradient2", "");
    localStorage.setItem("rotationGradient", "");
    solidSubmit();
}else if(colorSelection==1){
    localStorage.setItem("colorSolid", "");
    gradientSubmit();
}else{
    localStorage.setItem("colorGradient1", "");
    localStorage.setItem("colorGradient2", "");
    localStorage.setItem("rotationGradient", "");
    localStorage.setItem("colorSolid", "");
    randomSubmit();
 }



function reload() {
    location.reload();
}


gettime();
setInterval(gettime, 1000);
setInterval(reload, 60*60*1000);