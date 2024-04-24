function calc1() {
    let input = document.querySelector("#calc1in");
    let output = document.querySelector("#calc1out"); 
    let factors = "";
    if (input.value!=0||!isNaN(input.value)){
        for (i=1;i<=Math.floor(input.value/2+1);i++) {
            if (input.value%i==0) {
                factors+=i+", ";
            };
        };
        factors = factors+=input.value+", ";
        factors = factors.slice(0, -2); 
    }else{
        factors = "undefined";
    };
    output.innerHTML=factors;
}
function calc2() {
    let input = document.querySelector("#calc2in").value;
    let output = document.querySelector("#calc2out");
    let sum = 0;
    let desc = "";
    for (i=1;i<=input;i++) {
        sum+=i
        desc+=i+" + "
    }
    desc = desc.slice(0, -2);

    if (desc=="") {
        desc = 0
    }
    if (input=="") {
        output.innerHTML="";
    }else{
        output.innerHTML=sum+" = "+desc;
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