let bal=1000000;
let balOut=document.querySelector('#balance');

let button=document.querySelector('#button');
let buttonSize=20;

let sizeUpIn=document.querySelector('#sizeUp')
let sizeUpOut=document.querySelector('#sizeUpOut');
let sizeLvl=document.querySelector('#sizeLvl');

let balanceGainUpOut=document.querySelector('#balanceGainUpOut');
let balanceGain=1;

let newButtonUpOut=document.getElementById("newButtonUpOut");
let buttonNumber=1;

let color=1;
let theme=0;
/* Setup Upgrade Text */
sizeUpOut.innerHTML=buttonSize+"px";
balanceGainUpOut.innerHTML=balanceGain+" per hover";
newButtonUpOut.innerHTML=buttonNumber+" button"
/* Setup Functions */
function randomnumber(min,max) {
    return Math.round(Math.random() * (max - min)) + min;
}

/* Upgrade Show */
function revealUp1() {
    document.documentElement.style.setProperty("--up1display","block");
}
function revealUp2() {
    document.documentElement.style.setProperty("--up2display","block");
}
/* Upgrade */
function sizeUp() {
    if(buttonSize<=145) {
        if(bal>=20) {
            sizeUpOut.style.color="#fff";
            buttonSize=buttonSize+5;
            button.style.width=buttonSize;
            button.style.height=buttonSize;
            sizeUpOut.innerHTML=buttonSize+"px";
            bal=bal-20;
            updateBalance();
            if(buttonSize==150) {
                sizeUpOut.innerHTML+="<br>Max level reached";
                sizeUpIn.disabled="true";
            }
        }else{
            sizeUpOut.innerHTML=buttonSize+"px";
            sizeUpOut.innerHTML+="<br>Balance too low";
            sizeUpOut.style.color="#faa";
        }
    }
}
function sizeUpMax() {
    while(bal>=20) {
        sizeUp();
        if (buttonSize>145) break;
    }
}
function balanceGainUp() {
    if(bal>=50) {
        balanceGainUpOut.style.color="#fff";
        balanceGain=balanceGain+1;
        balanceGainUpOut.innerHTML="";
        balanceGainUpOut.innerHTML=balanceGain+" per hover"
        bal=bal-50;
        updateBalance();
    }else{
        balanceGainUpOut.innerHTML=balanceGain+" per hover";
        balanceGainUpOut.innerHTML+="<br>Balance too low";
        balanceGainUpOut.style.color="#faa";
    }
}
function balanceGainUpMax() {
    while (bal>=50) {
        balanceGainUp();
    }
    balanceGainUp()
}
function newButtonUp() {
    if (buttonNumber<=3) {
        if (bal>=100) {
            newButtonUpOut.color = "#fff"
            buttonNumber+=1
            let newButton = document.createElement("button");
            newButton.id = "button"+buttonNumber;
            newButton.setAttribute("onclick", "move()");
            newButton.setAttribute("onmouseenter", "move()");
            document.body.appendChild(newButton);

        }
    }
}
/* Button Functions */
function move() {                
    bal=bal+balanceGain;
    button.style.position="fixed";
    button.style.top=randomnumber((window.innerHeight-buttonSize),0);
    button.style.left=randomnumber((window.innerWidth-buttonSize),0)
    updateBalance();
}

/* Balance Functions */
function updateBalance() {
    balOut.innerHTML="Balance: "+bal;
    if (bal>=5) {
        revealUp1();
    }
    if (buttonSize>=40) {
        revealUp2();
    }
}

/* Color Changes */
function changeColor() {
    let buttonBGColor = [
        "#b00",
        "#0f7a3c",
        "#1c1c85",
        "#fff"
    ]
    button.style.background=buttonBGColor[color];
    color=color+1;
    if (color>=buttonBGColor.length) {
        color=0;
    }
    
}
// function changeTheme() {
//     let themeBGColor = [
//         "#eee",
//         "#111"
//     ]
//     let themeBorderColor = [
//         "#fff",
//         "#555"
//     ]
//     let themeTextColor = [
//         "#000",
//         "#fff"
//     ]
//     let themeBGColorDisabled = [
//         "#ccc",
//         "#444"
//     ]
//     let themeBorderColorDisabled = [
//         "#ddd",
//         "#666"
//     ]
//     let themeTextColorDisabled = [
//         "#888",
//         "#aaa"
//     ]
//     let themeBGColorScrollbar = [
//         "#ccc",
//         "#222"
//     ]
//     document.documentElement.style.setProperty("--themeBGColor", themeBGColor[theme]);
//     document.documentElement.style.setProperty("--themeBorderColor", themeBorderColor[theme]);
//     document.documentElement.style.setProperty("--themeTextColor", themeTextColor[theme]);
//     document.documentElement.style.setProperty("--themeBGColorDisabled", themeBGColorDisabled[theme]);
//     document.documentElement.style.setProperty("--themeBorderColorDisabled", themeBorderColorDisabled[theme]);
//     document.documentElement.style.setProperty("--themeTextColorDisabled", themeTextColorDisabled[theme]);
//     document.documentElement.style.setProperty("--themeBGColorScrollbar", themeBGColorScrollbar[theme]);
//     theme=theme+1
//     if (theme>1) {
//         theme=0;
//     }
// }
function settings() {
    document.documentElement.style.setProperty("--setdisplay","block");

}
function hideSettings() {
    document.documentElement.style.setProperty("--setdisplay","none");
}