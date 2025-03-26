function sCopy(outputID) {
    navigator.clipboard.writeText(document.getElementById(`scalc${outputID}out`).innerHTML);
    let button = document.getElementById(`c${outputID}`)
    button.innerHTML = "Copied!";
    button.className = "smallModuleButton smallModuleCopy active";
    setTimeout(function() {
        button.innerHTML = "Copy"; 
        button.className = "smallModuleButton smallModuleCopy"
    }, 1000)
    
}
function scalc1() {
    let in1 = Number(document.getElementById("scalc1in1").value);
    let in2 = Number(document.getElementById("scalc1in2").value);
    let out = document.getElementById("scalc1out");
    if (in1 % 1 != 0||in2 % 1 != 0) {
        // // out.style.fontSize = "1.3vw"
        out.style.color = "#bbb"
        out.innerHTML = "Decimals not allowed"
    }else{
        // // out.style.fontSize = "1.5vw"
        out.style.color = "#fff"
        if (in1==0&&in2==0) {
            out.innerHTML = "";
        }else{
            out.innerHTML = in1 + in2;
        }
    }
}
function scalc2() {
    let in1 = Number(document.getElementById("scalc2in1").value);
    let in2 = Number(document.getElementById("scalc2in2").value);
    let out = document.getElementById("scalc2out");
    if (in1 % 1 != 0||in2 % 1 != 0) {
        // out.style.fontSize = "1.3vw"
        out.style.color = "#bbb"
        out.innerHTML = "Decimals not allowed"
    }else{
        // out.style.fontSize = "1.5vw"
        out.style.color = "#fff"
        if (in1==0&&in2==0) {
            out.innerHTML = "";
        }else{
            out.innerHTML = in1 - in2;
        }
    }
}
function scalc3() {
    let in1 = Number(document.getElementById("scalc3in1").value);
    let in2 = Number(document.getElementById("scalc3in2").value);
    let out = document.getElementById("scalc3out");
    if (in1 % 1 != 0||in2 % 1 != 0) {
        // out.style.fontSize = "1.3vw"
        out.style.color = "#bbb"
        out.innerHTML = "Decimals not allowed"
    }else{
        // out.style.fontSize = "1.5vw"
        out.style.color = "#fff"
        if (in1==0&&in2==0) {
            out.innerHTML = "";
        }else{
            out.innerHTML = in1 * in2;
        }
    }
}
function scalc4() {
    let in1 = Number(document.getElementById("scalc4in1").value);
    let in2 = Number(document.getElementById("scalc4in2").value);
    let out = document.getElementById("scalc4out");
    if (in1 % 1 != 0||in2 % 1 != 0) {
        // out.style.fontSize = "1.3vw"
        out.style.color = "#bbb"
        out.innerHTML = "Decimals not allowed"
    }else{
        // out.style.fontSize = "1.5vw"
        out.style.color = "#fff"
        if (in1==0&&in2==0) {
            out.innerHTML = "";
        }else{
            if (in2 == 0) {
                out.innerHTML = "ERR: Division by 0"
                out.style.color = "#bbb"
            }else{
                out.innerHTML = parseFloat(Number((in1 / in2)).toFixed(12));
            }
        }
    }
}
function scalc5() {
    let in1 = Number(document.getElementById("scalc5in1").value);
    let in2 = Number(document.getElementById("scalc5in2").value);
    let out = document.getElementById("scalc5out");
    if (in1 % 1 != 0||in2 % 1 != 0) {
        // out.style.fontSize = "1.3vw"
        out.style.color = "#bbb"
        out.innerHTML = "Decimals not allowed"
    }else{
        // out.style.fontSize = "1.5vw"
        out.style.color = "#fff"
        if (in1==0&&in2==0) {
            out.innerHTML = "";
        }else{
            out.innerHTML = in1 ** in2;
        }
    }
}
function scalc6() {
    let in2 = Number(document.getElementById("scalc6in2").value);
    let in1 = Number(document.getElementById("scalc6in1").value);
    let out = document.getElementById("scalc6out");
    if (in1 % 1 != 0||in2 % 1 != 0) {
        // out.style.fontSize = "1.3vw"
        out.style.color = "#bbb"
        out.innerHTML = "Decimals not allowed"
    }else{
        // out.style.fontSize = "1.5vw"
        out.style.color = "#fff"
        if (in1==0&&in2==0) {
            out.innerHTML = "";
        }else{
            out.innerHTML = in2 ** (1/in1);
        }
    }
}
function scalc7() {
    let in2 = Number(document.getElementById("scalc7in2").value);
    let in1 = Number(document.getElementById("scalc7in1").value);
    let out = document.getElementById("scalc7out");
    if (in1 % 1 != 0||in2 % 1 != 0) {
        // out.style.fontSize = "1.3vw"
        out.style.color = "#bbb"
        out.innerHTML = "Decimals not allowed"
    }else{
        // out.style.fontSize = "1.5vw"
        out.style.color = "#fff"
        if (in1==0&&in2==0) {
            out.innerHTML = "";
        }else{
            if (in2 == 0) {
                out.style.color = "#bbb"
                out.innerHTML = "ERR: Division by 0"
            }else{
                out.innerHTML = in1 % in2;
            }
        }
    }
}
function scalc8() {
    let in2 = Number(document.getElementById("scalc8in2").value);
    let in1 = Number(document.getElementById("scalc8in1").value);
    let out = document.getElementById("scalc8out");
    if (in1 % 1 != 0||in2 % 1 != 0) {
        // out.style.fontSize = "1.3vw"
        out.style.color = "#bbb"
        out.innerHTML = "Decimals not allowed"
    }else{
        // out.style.fontSize = "1.5vw"
        out.style.color = "#fff"
        if (in1==0&&in2==0) {
            out.innerHTML = "";
        }else{
            out.innerHTML = parseFloat(Number((in1/100 * in2)).toFixed(12));
        }
    }
}
function calc1() {
    let input = document.querySelector("#calc1in");
    let output = document.querySelector("#calc1out"); 
    let factors = "";
    if (input.value!=0||!isNaN(input.value)){
        for (i=1;i<=input.value;i++) {
            if (input.value%i==0) {
                factors+=i+", ";
            };
        };
        factors = factors.slice(0, -2); 
    }else{
        factors = "undefined";
    };
    output.innerHTML=factors;
}
function calc2() {
    let a1 = Number(document.getElementById("calc2in1").value);
    let d = Number(document.getElementById("calc2in2").value);
    let n = Number(document.getElementById("calc2in3").value);
    let out1 = document.getElementById("calc2out1");
    let out2 = document.getElementById("calc2out2");
    let an = a1 + (n-1) * d;
    let a2 = a1 + d;
    let a3 = a2 + d;
    let a4 = a3 + d;
    if (a1==""&&d=="") {
        out1.innerHTML = "";
        if (n!="") {
            out1.innerHTML = "ERR: Please define a progression."
        };
        out2.innerHTML = "";
    }else if (a1==""||d==""||isNaN(a1)||isNaN(d)) {
        out1.innerHTML = "ERR: Please define the progression correctly.";
        out2.innerHTML = "";
    }else{
        if (isNaN(n)) {
            out1.innerHTML = 'ERR: Please input a number into the "n" field.';
            out2.innerHTML = "";
        }else if(n=="") {
            out1.innerHTML = `${a1}, ${a2}, ${a3}, ${a4} ... a<sub>n</sub>`;
            out2.innerHTML = `a<sub>n</sub> = ${a1} + (n - 1) × ${d}`;
        }else{
            if (n>=6) {
                out1.innerHTML = `${a1}, ${a2}, ${a3}, ${a4} ... ${an}`;
                out2.innerHTML = `a<sub>${n}</sub> = ${a1} + (${n} - 1) × ${d} = <b>${an}</b>`;
            }else if (n==5) {
                out1.innerHTML = `${a1}, ${a2}, ${a3}, ${a4}, ${an}`;
                out2.innerHTML = `a<sub>${n}</sub> = ${a1} + (${n} - 1) × ${d} = <b>${an}</b>`;
            }else if (n==4) {
                out1.innerHTML = `${a1}, ${a2}, ${a3}, ${an}`;
                out2.innerHTML = `a<sub>${n}</sub> = ${a1} + (${n} - 1) × ${d} = <b>${an}</b>`;
            }else if (n==3) {
                out1.innerHTML = `${a1}, ${a2}, ${an}`;
                out2.innerHTML = `a<sub>${n}</sub> = ${a1} + (${n} - 1) × ${d} = <b>${an}</b>`;
            }else if (n==2) {
                out1.innerHTML = `${a1}, ${an}`;
                out2.innerHTML = `a<sub>${n}</sub> = ${a1} + (${n} - 1) × ${d} = <b>${an}</b>`;
            }else if (n==1) {
                out1.innerHTML = `${an}`;
                out2.innerHTML = `a<sub>${n}</sub> = ${a1} + (${n} - 1) × ${d} = <b>${an}</b>`;
            }else if (n>=0) {
                out1.innerHTML = "ERR: a<sub>n</sub> with n less or equal to 0 is not defined."
                out2.innerHTML = "";
            }
        }
    }
}
function calc3() {
    let input = document.querySelector("#calc3in").value;
    let output = document.querySelector("#calc3out");
    let factorial = 1;
    let desc = "";
    for (i=1;i<=input;i++) {
        factorial*=i;
    }
    desc = desc.slice(0, -2);
    
    if (input==0) {
        factorial=1;
    }
    if (isNaN(input)||input==""){
        output.innerHTML="";
    }else{
        output.innerHTML=input+"! = "+factorial;
        
    };
}
function calc4() {
    function lcm(numList) {
        let multiple = Math.max.apply(null,numList);

        while (!allFactors(numList, multiple)) {
            multiple += 1
        }
        
        return multiple;
    }
    function allFactors(numList, x){
        for (let number of numList){
            if (x % number != 0) {
                return false;
            }
        }
        return true;
    }
    let input = document.querySelector("#calc4in").value;
    let output = document.querySelector("#calc4out");
    if (input==""){
        output.innerHTML=""; //empty input
    }else if (input.split(" ").includes("")) { //has empty element
        output.innerHTML="Error: Extra space character detected."; //error empty element
    }else if (input==0||input.split(" ").includes("0")){ //is or includes 0
        output.innerHTML="Error: The LCM of 0 is not defined." //error 0 not defined
    }else if (input.split(" ").length<2) { //has less than 2 elements or is empty
        if(!isNaN(input)){ //is a number
            output.innerHTML="LCM("+input+") = "+input;//success 1 element
        }else{ //is not a number
            output.innerHTML="Error: Input contains text."; //error not a number
        }
    }else{ // has 2 or more elements
        if (input.split(" ").every((element) => !isNaN(element))) { //array does not include text
            output.innerHTML="LCM("+input.replace(/ /g, ", ")+") = " + lcm(input.split(" ")); //success 2 or more elements
        }else{ //array includes text
            output.innerHTML="Error: Input contains text." //error text in array
        }
    }
    
}
function calc5() {
    let a1 = Number(document.getElementById("calc5in1").value);
    let d = Number(document.getElementById("calc5in2").value);
    let n = Number(document.getElementById("calc5in3").value);
    let out1 = document.getElementById("calc5out1");
    let out2 = document.getElementById("calc5out2");
    let an = a1 + (n-1) * d;
    let a2 = a1 + d;
    let a3 = a2 + d;
    let a4 = a3 + d;
    let sn = n * (2*a1+(n-1)*d) / 2
    if (a1==""&&d=="") {
        out1.innerHTML = "";
        if (n!="") {
            out1.innerHTML = "ERR: Please define a progression."
        };
        out2.innerHTML = "";
    }else if (a1==""||d==""||isNaN(a1)||isNaN(d)) {
        out1.innerHTML = "ERR: Please define the progression correctly.";
        out2.innerHTML = "";
    }else{
        if (isNaN(n)) {
            out1.innerHTML = 'ERR: Please input a number into the "n" field.';
            out2.innerHTML = "";
        }else if(n=="") {
            out1.innerHTML = `S<sub>n</sub> = ${a1} + ${a2} + ${a3} + ${a4} + ... + a<sub>n</sub>`;
            out2.innerHTML = `S<sub>n</sub> = n × (2 × ${a1} + (n - 1) × ${d}) ÷ 2`;
        }else{
            if (n>=6) {
                out1.innerHTML = `S<sub>${n}</sub> = ${a1} + ${a2} + ${a3} + ${a4} + ... + ${an}`;
                out2.innerHTML = `S<sub>${n}</sub> = ${n} × (2 × ${a1} + (${n} - 1) × ${d}) ÷ 2 = <b>${sn}</b>`;
            }else if (n==5) {
                out1.innerHTML = `S<sub>${n}</sub> = ${a1} + ${a2} + ${a3} + ${a4} + ${an}`;
                out2.innerHTML = `S<sub>${n}</sub> = ${n} × (2 × ${a1} + (${n} - 1) × ${d}) ÷ 2 = <b>${sn}</b>`;
            }else if (n==4) {
                out1.innerHTML = `S<sub>${n}</sub> = ${a1} + ${a2} + ${a3} + ${an}`;
                out2.innerHTML = `S<sub>${n}</sub> = ${n} × (2 × ${a1} + (${n} - 1) × ${d}) ÷ 2 = <b>${sn}</b>`;
            }else if (n==3) {
                out1.innerHTML = `S<sub>${n}</sub> = ${a1} + ${a2} + ${an}`;
                out2.innerHTML = `S<sub>${n}</sub> = ${n} × (2 × ${a1} + (${n} - 1) × ${d}) ÷ 2 = <b>${sn}</b>`;
            }else if (n==2) {
                out1.innerHTML = `S<sub>${n}</sub> = ${a1} + ${an}`;
                out2.innerHTML = `S<sub>${n}</sub> = ${n} × (2 × ${a1} + (${n} - 1) × ${d}) ÷ 2 = <b>${sn}</b>`;
            }else if (n==1) {
                out1.innerHTML = `S<sub>${n}</sub> = ${an}`;
                out2.innerHTML = `S<sub>${n}</sub> = ${n} × (2 × ${a1} + (${n} - 1) × ${d}) ÷ 2 = <b>${sn}</b>`;
            }else if (n>=0) {
                out1.innerHTML = "ERR: a<sub>n</sub> with n less or equal to 0 is not defined."
                out2.innerHTML = "";
            }
        }
    }
}
function calc6() {
    let input = document.getElementById("calc6in").value;
    console.log(input)
    let output = document.getElementById("calc6out");
    factor = 2
    let outputV = ""
    if (input == "-") {
        return 0
    }
    if (input!=0) {
        while (input != 1) {
            power = 0
            while (input % factor == 0) {
                input /= factor
                power += 1
            }
            if (power > 0) {
                if (power == 1) {
                    outputV += factor + " × "
                }else{
                    outputV += factor + "<sup>" + power + "</sup> × "
                }    
            }
            factor += 1
        }
        output.innerHTML = outputV.slice(0, -3)
    }else{
        output.innerHTML = ""
    }
}