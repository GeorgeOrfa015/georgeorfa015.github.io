
function save() {
    let bars = document.getElementsByClassName("bar-outer-cont");
    let items = Object.keys(bars).length; 
    let saveCode = "";

    for (i=0;i<items;i++) {
        let savePart= "v2/:/"
        savePart+=bars[i].id.replace("BOC","")+"/:/";
        savePart+=bars[i].childNodes[3].innerHTML+"/:/" // group
        savePart+=bars[i].childNodes[1].childNodes[0].value+"/:/" // value
        savePart+=bars[i].childNodes[1].childNodes[2].value+"/:/" // out of
        savePart+=bars[i].childNodes[1].childNodes[5].value+"/:/" // description
        savePart+=bars[i].childNodes[2].childNodes[0].value+"/:/" // color
        savePart+=bars[i].childNodes[2].childNodes[1].value+"/:/" // step
        saveCode+=savePart+"/;/";
    }
    
    localStorage.setItem("SavedBars", saveCode);
    console.log(saveCode.split("/;/"))
    return saveCode;
}

// 1/:/16/:/34/:/Description/:/linear-gradient(45deg, #450, #864)/://://;/
function load() {
    let saveCode=localStorage.getItem("SavedBars");

    let splitBars = saveCode.split("/;/");
    console.log(splitBars);

    let itemsToLoad = Object.keys(splitBars).length-1;

    for (i=0;i<itemsToLoad;i++) {

        let splitBarData = splitBars[i].split("/:/");
        if (splitBarData[0]=="v2") {
            let barID_load = splitBarData[1];
            let groupID_load = splitBarData[2];
            let value_load = splitBarData[3];
            let outOf_load = splitBarData[4];
            let barDesc_load = splitBarData[5];
            let color_load = splitBarData[6];
            let step_load = splitBarData[7];
            barID = barID_load;
            newBar(groupID_load);
            document.getElementById("in1_"+barID_load).value=value_load;
            document.getElementById("in2_"+barID_load).value=outOf_load;
            document.getElementById("BN"+barID_load).value=barDesc_load;
            document.getElementById("CI"+barID_load).value=color_load;
            document.getElementById("SI"+barID_load).value=step_load;
            setTimeout(function() {updateBar(barID_load)}, 500);
            setTimeout(function() {barColor(barID_load)}, 500);
        }else{
            // v1 code
            let barID_load = splitBarData[0];
            let value_load = splitBarData[1];
            let outOf_load = splitBarData[2];
            let barDesc_load = splitBarData[3];
            let color_load = splitBarData[4];
            let step_load = splitBarData[5];
            barID = barID_load;
            newBar(1);
            document.getElementById("in1_"+barID_load).value=value_load;
            document.getElementById("in2_"+barID_load).value=outOf_load;
            document.getElementById("BN"+barID_load).value=barDesc_load;
            document.getElementById("CI"+barID_load).value=color_load;
            document.getElementById("SI"+barID_load).value=step_load;
            setTimeout(function() {updateBar(barID_load)}, 500);
            setTimeout(function() {barColor(barID_load)}, 500);
        }
    }
}
function exportCode() {
    let code = localStorage.getItem("SavedBars");
    navigator.clipboard.writeText(code);
    document.getElementById("export-code-button").innerHTML="Code copied!";
    setTimeout(function() {document.getElementById("export-code-button").innerHTML="Export Save Code"}, 2000)
}
function loadCode() {
    let code = document.getElementById("load-code-input").value;
    localStorage.setItem("SavedBars", code);
    window.location.reload();
}

function revealSettings(id) {
    let settingsHiddenInnerCont = document.getElementById("SHIC"+id);
    let settingsButton = document.getElementById("SB"+id);
    settingsHiddenInnerCont.style.display="grid";
    settingsButton.setAttribute("onclick", `hideSettings(${id})`);
}
function hideSettings(id) {
    let settingsHiddenInnerCont = document.getElementById("SHIC"+id);
    let settingsButton = document.getElementById("SB"+id);
    settingsHiddenInnerCont.style.display="none";
    settingsButton.setAttribute("onclick", `revealSettings(${id})`);
}
function updateBar(id) {
    let value = document.getElementById("in1_"+id).value;
    let outOf = document.getElementById("in2_"+id).value;
    let bar = document.getElementById("bar"+id);
    if (outOf=="") {
        outOf = 100;
    }
    let valueEnd = (value * 100) / outOf;
    if (valueEnd < 0) {
        bar.style.width = "0%";
    }else{
        bar.style.width = valueEnd + "%";
    }
    bar.innerHTML = Math.round(valueEnd * 100) / 100 + "%";
    setTimeout(save, 100);
}
function addProg(id) {
    let output = document.getElementById("in1_"+id);
    let value = parseInt(output.value);
    let step = Number(document.getElementById("SI"+id).value);
    if (step==""||isNaN(step)) {
        step = 1;
    }
    if (isNaN(value)||value=="") {
        value = 0;
    }
    value += step;
    output.value = value;
    updateBar(id);
    setTimeout(save, 100);
}
function remProg(id) {
    let output = document.getElementById("in1_"+id);
    let value = parseInt(output.value);
    let step = Number(document.getElementById("SI"+id).value);
    if (step==""||isNaN(step)) {
        step = 1;
    }
    if (isNaN(value)||value=="") {
        value = 0;
    }
    value -= step;
    output.value = value;
    updateBar(id);
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
    let newBarButton = document.getElementById("new-bar-button");
    newBarButton.setAttribute("onclick", `newBar(${groupID})`)
}
let barID = 1;
function newBar(groupID) {
    // bar-outer-cont
    let barOuterCont = document.createElement("div");
    barOuterCont.className="bar-outer-cont";
    barOuterCont.id="BOC"+barID;

    // bar-outer-cont > bar-inner-cont
    let barInnerCont = document.createElement("div");
    barInnerCont.className="bar-inner-cont";
    barInnerCont.id="BIC"+barID;

    // bar-outer-cont > bar-inner-cont > bar
    let bar = document.createElement("div");
    bar.className="bar";
    bar.id="bar"+barID;
    bar.innerHTML="0%"

    // bar-outer-cont > settings-inner-cont
    let settingsInnerCont = document.createElement("div");
    settingsInnerCont.className="settings-inner-cont";
    settingsInnerCont.id="SIC"+barID;

    // bar-outer-cont > settings-inner-cont > input#in1_id
    let inputIn1 = document.createElement("input");
    inputIn1.className="number-input";
    inputIn1.id="in1_"+barID;
    inputIn1.placeholder="0";
    inputIn1.setAttribute("oninput", `updateBar(${barID})`);

    // bar-outer-cont > settings-inner-cont > out-of-text
    let outOfText = document.createElement("span");
    outOfText.innerHTML="out of";
    outOfText.className="out-of-text";
    outOfText.id="OOT"+barID;

    // bar-outer-cont > settings-inner-cont > input#in2_id
    let inputIn2 = document.createElement("input");
    inputIn2.className="number-input";
    inputIn2.id="in2_"+barID;
    inputIn2.placeholder="100";
    inputIn2.setAttribute("oninput", `updateBar(${barID})`);

    // bar-outer-cont > settings-inner-cont > button.f(remProg(id))
    let remButton = document.createElement("button");
    remButton.className="add-remove-button";
    remButton.id="RB"+barID;
    remButton.setAttribute("onclick", `remProg(${barID})`);
    remButton.innerHTML="-"

    // bar-outer-cont > settings-inner-cont > button.f(addProg(id))
    let addButton = document.createElement("button");
    addButton.className="add-remove-button";
    addButton.id="AB"+barID;
    addButton.setAttribute("onclick", `addProg(${barID})`);
    addButton.innerHTML="+"
    
    // bar-outer-cont > settings-inner-cont > input#BNid
    let barName = document.createElement("input");
    barName.className="bar-name";
    barName.placeholder="Description..."
    barName.id="BN"+barID;
    barName.setAttribute("oninput", "save()");

    // bar-outer-cont > settings-inner-cont > button.f(revealSettings(id))
    let settingsButton = document.createElement("button");
    settingsButton.className="settings-button";
    settingsButton.id="SB"+barID;
    settingsButton.setAttribute("onclick", `revealSettings(${barID})`);
    settingsButton.innerHTML="Settings";

    // bar-outer-cont > settings-hidden-inner-cont
    let settingsHiddenInnerCont = document.createElement("div");
    settingsHiddenInnerCont.className="settings-hidden-inner-cont";
    settingsHiddenInnerCont.id="SHIC"+barID;

    // bar-outer-cont > settings-hidden-inner-cont > input#CIid
    let colorInput = document.createElement("input");
    colorInput.className="color-input";
    colorInput.id="CI"+barID;
    colorInput.placeholder="Color"
    colorInput.setAttribute("oninput", `barColor(${barID})`);

    // bar-outer-cont > settings-hidden-inner-cont > input#SIid
    let stepInput = document.createElement("input");
    stepInput.className="step-input";
    stepInput.id="SI"+barID;
    stepInput.placeholder="Step";
    stepInput.setAttribute("oninput", "save()");

    // bar-outer-cont > settings-hidden-inner-cont > button.f(deleteBar(id))
    let deleteButton = document.createElement("button");
    deleteButton.className="delete-button";
    deleteButton.id="DB"+barID;
    deleteButton.setAttribute("onclick", `deleteBar(${barID})`);
    deleteButton.innerHTML="Delete";

    // bar-outer-cont > span-group-id
    let spanGroup = document.createElement("span");
    spanGroup.className="span-group";
    spanGroup.id="G"+barID;
    spanGroup.innerHTML = groupID;
    spanGroup.style.display = "none"

    // Appending Children
    barOuterCont.appendChild(barInnerCont);
    barInnerCont.appendChild(bar);
    barOuterCont.appendChild(settingsInnerCont);
    settingsInnerCont.appendChild(inputIn1);
    settingsInnerCont.appendChild(outOfText);
    settingsInnerCont.appendChild(inputIn2);
    settingsInnerCont.appendChild(remButton);
    settingsInnerCont.appendChild(addButton);
    settingsInnerCont.appendChild(barName);
    settingsInnerCont.appendChild(settingsButton);
    barOuterCont.appendChild(settingsHiddenInnerCont);
    settingsHiddenInnerCont.appendChild(colorInput);
    settingsHiddenInnerCont.appendChild(stepInput);
    settingsHiddenInnerCont.appendChild(deleteButton);
    barOuterCont.appendChild(spanGroup);
    document.getElementById("group"+groupID).appendChild(barOuterCont);
    barID = Number(barID) + 1;
    setTimeout(save, 100);
}

function deleteBar(id) {
    let outerContainer = document.getElementById("BOC"+id);
    outerContainer.innerHTML="";
    outerContainer.remove();
    setTimeout(save, 100);
}

function barColor(id) {
    let bar = document.getElementById("bar"+id);
    let color = document.getElementById("CI"+id).value;
    bar.style.background=color;
    setTimeout(save, 100);
}


setTimeout(load, 1)