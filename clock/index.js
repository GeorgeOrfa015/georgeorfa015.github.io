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
let date = document.querySelector("#outputDate");
let randomOutput = document.querySelector("#randomStatus");
function solidSubmit() {
    let colorSolid = document.querySelector("#solidIn").value;
    localStorage.setItem("colorSolid", colorSolid);
    clock.style.background = colorSolid;
    clock.style["-webkit-text-fill-color"] = "transparent";
    clock.style["-webkit-background-clip"] = "text";
    clock.style["background-clip"] = "text";
    date.style.background = colorSolid;
    date.style["-webkit-text-fill-color"] = "transparent";
    date.style["-webkit-background-clip"] = "text";
    date.style["background-clip"] = "text";
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
        date.style.background = `linear-gradient(180deg, ${colorGradient1}, ${colorGradient2})`
    }else{
        clock.style.background = `linear-gradient(${rotationGradient}deg, ${colorGradient1}, ${colorGradient2})`
        date.style.background = `linear-gradient(${rotationGradient}deg, ${colorGradient1}, ${colorGradient2})`
    }
    clock.style["-webkit-text-fill-color"] = "transparent";
    clock.style["-webkit-background-clip"] = "text";
    clock.style["background-clip"] = "text";
    date.style["-webkit-text-fill-color"] = "transparent";
    date.style["-webkit-background-clip"] = "text";
    date.style["background-clip"] = "text";
    colorSelection="1";
    localStorage.setItem('colorSelection', 1);
    randomOutput.innerHTML="Disabled"  

}
function randomSubmit() {
    let colorRandom1 = randomColor();
    let colorRandom2 = randomColor();
    let rotationRandom = randomnumber(0,360);
    clock.style.background = `linear-gradient(${rotationRandom}deg, ${colorRandom1}, ${colorRandom2})`
    date.style.background = `linear-gradient(${rotationRandom}deg, ${colorRandom1}, ${colorRandom2})`
    clock.style["-webkit-text-fill-color"] = "transparent";
    clock.style["-webkit-background-clip"] = "text";
    clock.style["background-clip"] = "text";
    date.style["-webkit-text-fill-color"] = "transparent";
    date.style["-webkit-background-clip"] = "text";
    date.style["background-clip"] = "text";
    colorSelection="2"
    localStorage.setItem('colorSelection', 2);     
    randomOutput.innerHTML="Enabled"  
}
function gettime() {
    let date = new Date();
    currentMinutes = date.getMinutes();
    currentMinutes = ("0" + currentMinutes).slice(-2);
    
    currentHours = date.getHours();
    currentHours = ("0" + currentHours).slice(-2);
    document.getElementById("output").innerHTML=currentHours+":"+currentMinutes;
}
var datemode = localStorage.getItem("dateMode");
function dateFormat(mode) {
    datemode = mode;
    localStorage.setItem("dateMode", datemode);
    getdate();
}
function getdate() {
    let date = new Date();
    currentDay = date.getDate();
    currentMonth = date.getMonth()+1
    currentYear = date.getFullYear();
    if (datemode==0||datemode==undefined) {
        document.getElementById("outputDate").innerHTML = currentDay+"-"+currentMonth+"-"+currentYear
    }else if (datemode==1) {
        document.getElementById("outputDate").innerHTML = currentMonth+"-"+currentDay+"-"+currentYear
    }
}


document.querySelector("#solidIn").value = localStorage.getItem("colorSolid");
document.querySelector("#gradientIn1").value = localStorage.getItem("colorGradient1");
document.querySelector("#gradientIn2").value = localStorage.getItem("colorGradient2");
document.querySelector("#gradientRotationIn").value = localStorage.getItem("rotationGradient");


if(colorSelection==0||colorSelection==undefined){
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
getdate();
setInterval(gettime, 1000);
setInterval(getdate, 1000);
setInterval(reload, 30*60*1000);