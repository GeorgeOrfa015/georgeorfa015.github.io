let timerID = 1;

function save() {
    let timers = document.getElementsByClassName("timer-outer-container");
    let items = Object.keys(timers).length; 
    let saveCode = "";

    for (i=0;i<items;i++) {
        let savePart= "v3/:/"
        savePart+=timers[i].id.replace("TOC","")+"/:/";
        savePart+=timers[i].childNodes[3].innerHTML + "/:/"         // groupID
        savePart+=timers[i].childNodes[1].childNodes[0].value+"/:/" // date
        savePart+=timers[i].childNodes[2].childNodes[1].value+"/:/" // color
        savePart+=timers[i].childNodes[2].childNodes[3].value+"/:/" // border color
        savePart+=timers[i].childNodes[2].childNodes[5].value+"/:/" // text color
        savePart+=timers[i].childNodes[0].childNodes[1].value       // description
        saveCode+=savePart+"/;/";
    }
    
    localStorage.setItem("SavedTimers", saveCode);
    console.log(saveCode.split("/;/"))
    return saveCode;
}

function load() {
    let saveCode=localStorage.getItem("SavedTimers");

    let splitTimers = saveCode.split("/;/");

    let itemsToLoad = Object.keys(splitTimers).length-1;

    for (i=0;i<itemsToLoad;i++) {

        let splitTD = splitTimers[i].split("/:/");
        if (splitTD[0]=="v2") {
            let timerID_load = splitTD[1];
            let date_load = splitTD[2];
            let borderColor_load = splitTD[3]
            let color_load = splitTD[4];
            let textColor_load = splitTD[5];
            let description_load = splitTD[6];
            timerID = timerID_load;
            newTimer(1)
            document.getElementById("ID"+timerID_load).value=date_load;
            document.getElementById("C"+timerID_load).value=color_load;
            document.getElementById("BC"+timerID_load).value=borderColor_load;
            document.getElementById("TXTC"+timerID_load).value=textColor_load;
            document.getElementById("D"+timerID_load).value=description_load;
            setTimeout(function() {timerColor(timerID_load)}, 0);
        }else{
            //  v3/:/3/:/1/:/2058-01-08T00:45/:/blue/:/red/:/green/:/Description/;/
            if (splitTD[0]=="v3") {
                let timerID_load =      splitTD[1];
                let groupID_load =      splitTD[2];  
                let date_load =         splitTD[3]; 
                let borderColor_load =  splitTD[4];
                let color_load =        splitTD[5];    
                let textColor_load =    splitTD[6];    
                let description_load =  splitTD[7];
                timerID = timerID_load;
                newTimer(groupID_load)
                document.getElementById("ID"+timerID_load).value=date_load;
                document.getElementById("C"+timerID_load).value=color_load;
                document.getElementById("BC"+timerID_load).value=borderColor_load;
                document.getElementById("TXTC"+timerID_load).value=textColor_load;
                document.getElementById("D"+timerID_load).value=description_load;
                setTimeout(function() {timerColor(timerID_load)}, 0);
            }else{
                // original v1 code //
                let timerID_load = splitTD[0];
                let date_load = `${splitTD[1]}-${("0" + splitTD[2]).slice(-2)}-${("0" + splitTD[3]).slice(-2)}T${("0" + splitTD[4]).slice(-2)}:${("0" + splitTD[5]).slice(-2)}`
                let color_load = ""
                let borderColor_load = ""
                let description_load = splitTD[6]
                timerID = timerID_load
                newTimer(1);
                document.getElementById("ID"+timerID_load).value=date_load;
                document.getElementById("C"+timerID_load).value=color_load;
                document.getElementById("D"+timerID_load).value=description_load;
                setTimeout(function() {timerColor(timerID_load)}, 500);
            }
        }
    }
}

function exportCode() {
    let code = localStorage.getItem("SavedTimers");
    navigator.clipboard.writeText(code);
    document.getElementById("export-code-button").innerHTML="Code copied!";
    setTimeout(function() {document.getElementById("export-code-button").innerHTML="Export Save Code"}, 2000)
}

//      1/:/2025              /:/1                 /:/1        /:/00       /:/00               /:/2025         /;/
// v2/:/2/:/2058-01-08T00:45  /:/#38240c           /:/#0005    /:/#c29325  /:/Shit.            /;/
// v3/:/3/:/1                 /:/2058-01-08T00:45 /:/blue      /:/red      /:/green            /:/Description  /;/

function loadCode() {
    let code = document.getElementById("load-code-input").value;
    localStorage.setItem("SavedTimers", code);
    window.location.reload();
}

function updateTime(id) {
    let inputDate = document.getElementById("ID"+id).value;
    let output = document.getElementById("out"+id);
    let crTime = new Date();
    let cdTime = new Date(inputDate);
    let timeDifference = cdTime.getTime()-crTime.getTime()+1000;
    if (inputDate == "") {
        output.innerHTML = "Enter a date";
    }else{
        if (timeDifference>=0) {
            output.innerHTML = Math.floor(timeDifference/(24*60*60*1000)) + " Days ";
            output.innerHTML+= Math.floor(timeDifference%(24*60*60*1000)/(60*60*1000)) + "h ";
            output.innerHTML+= Math.floor(timeDifference%(60*60*1000)/(60*1000)) + "m ";
            output.innerHTML+= Math.floor(timeDifference%(60*1000)/1000) + "s";
            output.innerHTML+= "<br>until"
        }else{
            let timeDifferenceNegative = crTime.getTime() - cdTime.getTime();
            output.innerHTML = Math.floor(timeDifferenceNegative/(24*60*60*1000)) + " Days ";
            output.innerHTML+= Math.floor(timeDifferenceNegative%(24*60*60*1000)/(60*60*1000)) + "h ";
            output.innerHTML+= Math.floor(timeDifferenceNegative%(60*60*1000)/(60*1000)) + "m ";
            output.innerHTML+= Math.floor(timeDifferenceNegative%(60*1000)/1000) + "s";
            output.innerHTML+= "<br>since"
        }
    }
}



function delTimer(id) {
    let outerContainer = document.getElementById("TOC"+id);
    let timeStopScript = document.createElement("script");
    timeStopScript.innerHTML=`clearInterval(updateTimeInterval${id});`;
    document.body.appendChild(timeStopScript);
    outerContainer.innerHTML="";
    outerContainer.remove();
    timeStopScript.remove();
    setTimeout(save, 100);
}

function showSettings(id) {
    let settings = document.getElementById("SIC"+id);
    let controls = document.getElementById("CIC"+id)
    settings.style.display = "grid";
    controls.style.display = "none";
}
function hideSettings(id) {
    let settings = document.getElementById("SIC"+id);
    let controls = document.getElementById("CIC"+id)
    settings.style.display = "none";
    controls.style.display = "grid";
}

function timerColor(id) {
    let timer = document.getElementById("TC"+id);
    let color = document.getElementById("C"+id).value;
    let timerBorder = document.getElementById("TOC"+id);
    let borderColor = document.getElementById("BC"+id).value;
    let timeText = document.getElementById("out"+id);
    let description = document.getElementById("D"+id)
    let textColor = document.getElementById("TXTC"+id).value;
    let dateInput = document.getElementById("ID"+id);
    let showSettings = document.getElementById("SS"+id);
    timer.style.background = color;
    timerBorder.style.background = borderColor
    timeText.style.color = textColor
    description.style.color = textColor
    dateInput.style.color = textColor
    showSettings.style.color = textColor
    setTimeout(save, 100);
}
function changeGroup(groupID) {
    let containers = document.getElementsByClassName("outer-container");
    let groupButtons = document.getElementsByClassName("group-button");
    let contCount = containers.length
    let buttonCount = groupButtons.length
    for (i=0; i<contCount; i++) {
        containers[i].style.display = "none"
    }
    for (i=0; i<buttonCount; i++) {
        groupButtons[i].className = "group-button"
    }
    containers[groupID-1].style.display = "grid"
    document.getElementById("group-button-"+groupID).className = "group-button selected"
    let newTimerButton = document.getElementById("new-timer-button");
    newTimerButton.setAttribute("onclick", `newTimer(${groupID})`)
}
function newTimer(groupID) {
    // timer-outer-container
    let timerOuterContainer = document.createElement("div");
    timerOuterContainer.className="timer-outer-container";
    timerOuterContainer.id="TOC"+timerID;

    // timer-outer-contianer > time-cont
    let timeCont = document.createElement("div");
    timeCont.className="time-cont";
    timeCont.id="TC"+timerID;

    // timer-outer-container > time-cont > time
    let time = document.createElement("span");
    time.className="time";
    time.id="out"+timerID;

    // timer-outer-container > time-cont > description
    let description = document.createElement("input");
    description.className="description";
    description.id="D"+timerID;
    description.placeholder="Description..."
    description.setAttribute("oninput", `save()`)

    // timer-outer-container > controls-inner-cont
    let controlsInnerCont = document.createElement("div");
    controlsInnerCont.className="controls-inner-cont";
    controlsInnerCont.id="CIC"+timerID;

    // timer-outer-container > controls-inner-cont > datetime-local
    let dateInput = document.createElement("input");
    dateInput.type = "datetime-local"
    dateInput.id="ID"+timerID;
    dateInput.setAttribute("oninput", `save()`);
    
    // timer-outer-container > controls-inner-cont > button.f(showSettings(id))
    let showSettings = document.createElement("button");
    showSettings.id="SS"+timerID;
    showSettings.setAttribute("onclick", `showSettings(${timerID})`);
    showSettings.className = "show-settings";
    showSettings.innerHTML = "Settings";
    
    // timer-outer-container > settings-inner-cont
    let settingsInnerCont = document.createElement("div");
    settingsInnerCont.id = "SIC"+timerID;
    settingsInnerCont.className = "settings-inner-cont"

    // timer-outer-container > settings-inner-cont > settings-text-border-color
    let borderColorText = document.createElement("span");
    borderColorText.className = "settings-text";
    borderColorText.innerHTML = "Border Color"

    // timer-outer-container > settings-inner-cont > borderColor
    let borderColor = document.createElement("input");
    borderColor.id = "BC"+timerID;
    borderColor.setAttribute("oninput", `timerColor(${timerID})`);
    borderColor.placeholder = "Border Color...";
    borderColor.className = "border-color";

    // timer-outer-container > settings-inner-cont > settings-text-color
    let colorText = document.createElement("span");
    colorText.className = "settings-text";
    colorText.innerHTML = "Background Color"
    
    // timer-outer-container > settings-inner-cont > color
    let color = document.createElement("input");
    color.id = "C"+timerID;
    color.setAttribute("oninput", `timerColor(${timerID})`);
    color.placeholder="Background Color...";
    color.className = "color";

    // timer-outer-container > settings-inner-cont > settigns-text-text-color
    let textColorText = document.createElement("span");
    textColorText.className = "settings-text";
    textColorText.innerHTML = "Time Text Color";

    // timer-outer-container > settings-inner-cont > text-color
    let textColor = document.createElement("input");
    textColor.id="TXTC"+timerID;
    textColor.setAttribute("oninput", `timerColor(${timerID})`);
    textColor.placeholder="Text Color...";
    textColor.className = "text-color";
    
    // timer-outer-cont > settings-inner-cont > button.f(delTimer(id))
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", `delTimer(${timerID})`);
    deleteButton.innerHTML="Delete";
    deleteButton.className="delete-button";
    deleteButton.id = "DB"+timerID;
    
    // timer-outer-cont > settings-inner-cont > button.f(hideSettings(id))
    let backButton = document.createElement("button");
    backButton.id="BB"+timerID;
    backButton.setAttribute("onclick", `hideSettings(${timerID})`);
    backButton.innerHTML = "Back";
    backButton.className = "back-button";

    // timer-outer-cont > time-update-script
    let timeUpdateScript = document.createElement("script");
    timeUpdateScript.className="time-update-script";
    timeUpdateScript.id="TUS"+timerID;
    timeUpdateScript.innerHTML=`var updateTimeInterval${timerID} = setInterval(function(){updateTime(${timerID})}, 0)`;

    // timer-outer-cont > span-group-id
    let spanGroup = document.createElement("span");
    spanGroup.className="span-group";
    spanGroup.id="G"+timerID;
    spanGroup.innerHTML = groupID

    // Appending Children
    timerOuterContainer.appendChild(timeCont);
    timeCont.appendChild(time);
    timeCont.appendChild(description);
    timerOuterContainer.appendChild(controlsInnerCont);
    controlsInnerCont.appendChild(dateInput);
    controlsInnerCont.appendChild(showSettings);
    timerOuterContainer.appendChild(settingsInnerCont);
    settingsInnerCont.appendChild(borderColorText);
    settingsInnerCont.appendChild(borderColor);
    settingsInnerCont.appendChild(colorText);
    settingsInnerCont.appendChild(color);
    settingsInnerCont.appendChild(textColorText);
    settingsInnerCont.appendChild(textColor);
    settingsInnerCont.appendChild(backButton);
    settingsInnerCont.appendChild(deleteButton);
    timerOuterContainer.appendChild(spanGroup);
    timerOuterContainer.appendChild(timeUpdateScript);
    document.getElementById("group"+groupID).appendChild(timerOuterContainer);

    timerID = Number(timerID) + 1;
    setTimeout(save, 100);
}
setTimeout(load, 1);