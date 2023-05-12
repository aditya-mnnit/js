const  inputslider=document.querySelector(".slider");
const pwdlen=document.querySelector(".pwdlen");
const  pwddisplay=document.querySelector(".pwddsiplay");
const copybtn=document.querySelector(".copybutton");
const datacopy=document.querySelector(".datacopy");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generatebtn = document.querySelector(".generatebutton");
const allchkbox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let pwd="";
let pwdlength=10;
let checkcount=1;
// set strength circle color to grey
function handleSlider()
{
    inputslider.value=pwdlength;
    pwdlen.innerText=pwdlength;
}
function setIndicator(color)
{
    indicator.style.backgroundColor = color;
}
function getRndInteger(min,max)
{
   Math.floor( Math.random()*(max-min))+min;
}
function generateRandomNumber()
{
    return getRndInteger(0,9);
}
function generateLowerCase()
{
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase() {  
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol()
{
    return symbols.charAt(getRndInteger(0,symbols.length));
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}
async function copyContent()
{
    try{
     await navigator.clipboard.writeText(pwddisplay.value);
    datacopy.innerText="Copied";
    }
    catch{
        datacopy.innerText="Failed";
    }
    datacopy.classList.add("active");
 
    setTimeout( () => {
        datacopy.classList.remove("active");
    },2000);
}
function f1(event)  
{
    pwdlength=event.target.value;
    handleSlider();
}
inputslider.addEventListener('input',f1);
function f2()
{
    if(pwddisplay.value)
    copyContent();
}
copybtn.addEventListener('click',f2);

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})
function f3()
{

}
generatebtn.addEventListener('click',f3);