let timerID = 1;
    
function save() {
    let timers = document.getElementsByClassName("timer-outer-cont");
    let items = Object.keys(timers).length; 
    let saveCode = "";

    for (i=0;i<items;i++) {
        let savePart=timers[i].id.replace("TOC","")+"/:/";
        savePart+=timers[i].childNodes[1].childNodes[0].value+"/:/" // year
        savePart+=timers[i].childNodes[1].childNodes[1].value+"/:/" // month
        savePart+=timers[i].childNodes[1].childNodes[2].value+"/:/" // day
        savePart+=timers[i].childNodes[1].childNodes[3].value+"/:/" // hour
        savePart+=timers[i].childNodes[1].childNodes[4].value+"/:/" // minute
        savePart+=timers[i].childNodes[0].childNodes[1].value
        saveCode+=savePart+"/;/";
    }
    
    localStorage.setItem("SavedTimers", saveCode);
    console.log(saveCode.split("/;/"))
    return saveCode;
}

function load() {
    let saveCode=localStorage.getItem("SavedTimers");

    let splitTimers = saveCode.split("/;/");
    console.log(splitTimers);

    let itemsToLoad = Object.keys(splitTimers).length-1;

    for (i=0;i<itemsToLoad;i++) {

        let splitTimerData = splitTimers[i].split("/:/");
        let timerID_load = splitTimerData[0];
        let year_load = splitTimerData[1];
        let month_load = splitTimerData[2];
        let day_load = splitTimerData[3];
        let hour_load = splitTimerData[4];
        let minute_load = splitTimerData[5];
        let timerDesc_load = splitTimerData[6];
        timerID = timerID_load;
        newTimer();
        document.getElementById("year"+timerID_load).value=year_load;
        document.getElementById("month"+timerID_load).value=month_load;
        document.getElementById("day"+timerID_load).value=day_load;
        document.getElementById("hour"+timerID_load).value=hour_load;
        document.getElementById("minute"+timerID_load).value=minute_load;
        document.getElementById("TD"+timerID_load).value=timerDesc_load;
    }
}

function exportCode() {
    let code = localStorage.getItem("SavedTimers");
    navigator.clipboard.writeText(code);
    document.getElementById("export-code-button").innerHTML="Code copied!";
    setTimeout(function() {document.getElementById("export-code-button").innerHTML="Export Save Code"}, 2000)
}

function loadCode() {
    let code = document.getElementById("load-code-input").value;
    localStorage.setItem("SavedTimers", code);
    window.location.reload();
}

function updateTime(id) {
    let year = document.getElementById("year"+id).value;
    let month = document.getElementById("month"+id).value;
    let day = document.getElementById("day"+id).value;
    let hour = document.getElementById("hour"+id).value;
    let minute = document.getElementById("minute"+id).value;
    let output = document.getElementById("out"+id);
    let crTime = new Date();
    let cdTime = new Date(year,month-1,day,hour,minute,0);
    let timeDifference = cdTime.getTime()-crTime.getTime()+1000;
    if (year==""||month==""||day==""||hour==""||minute==""||isNaN(year)||isNaN(month)||isNaN(day)||isNaN(hour)||isNaN(minute)) {
        output.innerHTML = "Please enter a valid date";
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



function newTimer() {
    // timer-outer-cont
    let timerOuterCont = document.createElement("div");
    timerOuterCont.className="timer-outer-cont";
    timerOuterCont.id="TOC"+timerID;

    // timer-outer-cont > time-inner-cont
    let timeInnerCont = document.createElement("div");
    timeInnerCont.className="time-inner-cont";
    timeInnerCont.id="TIC"+timerID;

    // timer-outer-cont > time-inner-cont > time
    let time = document.createElement("span");
    time.className="time";
    time.id="out"+timerID;

    // timer-outer-cont > time-inner-cont > timer-desc
    let timerDesc = document.createElement("input");
    timerDesc.className="timer-desc";
    timerDesc.id="TD"+timerID;
    timerDesc.placeholder="Description..."
    timerDesc.setAttribute("oninput", `save()`)

    // timer-outer-cont > settings-inner-cont
    let settingsInnerCont = document.createElement("div");
    settingsInnerCont.className="settings-inner-cont";
    settingsInnerCont.id="SIC"+timerID;

    // timer-outer-cont > settings-inner-cont > input#year
    let yearInput = document.createElement("input");
    yearInput.id="year"+timerID;
    yearInput.setAttribute("oninput", `save()`);
    yearInput.placeholder="Year";
    
    // timer-outer-cont > settings-inner-cont > input#month
    let monthInput = document.createElement("input");
    monthInput.id="month"+timerID;
    monthInput.setAttribute("oninput", `save()`);
    monthInput.placeholder="Month";
    
    // timer-outer-cont > settings-inner-cont > input#day
    let dayInput = document.createElement("input");
    dayInput.id="day"+timerID;
    dayInput.setAttribute("oninput", `save()`);
    dayInput.placeholder="Day";

    // timer-outer-cont > settings-inner-cont > input#hour
    let hourInput = document.createElement("input");
    hourInput.id="hour"+timerID;
    hourInput.setAttribute("oninput", `save()`);
    hourInput.placeholder="Hour";

    // timer-outer-cont > settings-inner-cont > input#minute
    let minuteInput = document.createElement("input");
    minuteInput.id="minute"+timerID;
    minuteInput.setAttribute("oninput", `save()`);
    minuteInput.placeholder="Minute";

    // timer-outer-cont > settings-inner-cont > button.f(delTimer(id))
    let buttonDelete = document.createElement("button");
    buttonDelete.setAttribute("onclick", `delTimer(${timerID})`);
    buttonDelete.innerHTML="&#x2715;";
    buttonDelete.className="settings delete";

    // timer-outer-cont > time-update-script
    let timeUpdateScript = document.createElement("script");
    timeUpdateScript.className="time-update-script";
    timeUpdateScript.id="TUS"+timerID;
    timeUpdateScript.innerHTML=`var updateTimeInterval${timerID} = setInterval(function(){updateTime(${timerID})}, 100)`;

    // Appending Children
    timerOuterCont.appendChild(timeInnerCont);
    timeInnerCont.appendChild(time);
    timeInnerCont.appendChild(timerDesc);
    timerOuterCont.appendChild(settingsInnerCont);
    settingsInnerCont.appendChild(yearInput);
    settingsInnerCont.appendChild(monthInput);
    settingsInnerCont.appendChild(dayInput);
    settingsInnerCont.appendChild(hourInput);
    settingsInnerCont.appendChild(minuteInput);
    settingsInnerCont.appendChild(buttonDelete);
    timerOuterCont.appendChild(timeUpdateScript);
    document.getElementById("outer-container").appendChild(timerOuterCont);

    timerID = Number(timerID) + 1;
    setTimeout(save, 100);
}
setTimeout(load, 1);