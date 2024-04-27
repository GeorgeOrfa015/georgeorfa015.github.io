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
            }else if (n==0) {
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