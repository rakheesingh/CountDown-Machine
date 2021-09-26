//Counter Form Screen
const form = document.querySelector("#countdownForm");
const inputEl= document.querySelector("#title");
const datePickerEl= document.querySelector("#date-picker");
const submitButtonEl = document.querySelector("#submit-button");
const inputContainer= document.querySelector("#input-container");

//CountDown Screen
const countdownTitleEl= document.querySelector("#countdown-title");
const resetButton= document.querySelector("#countdown-button");
const timeEl= document.querySelectorAll("span");
const countDownContainer= document.querySelector("#countdown");

//Complete screen
const completeContainer= document.querySelector("#complete");
const countDownFinishMsg= document.querySelector("#countdown-finish");
const nextCountdownButton =document.querySelector("#next-countdowun");

let countDownTitle="";
let countdownDate="";
const seconds=1000;
const minutes= seconds*60;
const hours= 60*minutes;
const day= 24*hours;
let countDownValue= Date;
let countDownActive;
let savedCountDown={};
//Set date input minimum to todays date
let todayDate= new Date().toISOString().split('T')[0];
datePickerEl.setAttribute("min", todayDate);


function updateScreen(visibleContainer, hiddenContainer)
{
    //Hide Screen
    visibleContainer.setAttribute("hidden", true);
    //Expose Screen
    hiddenContainer.hidden= false;
}

function updateCountDownScreen()
{
    countdownTitleEl.textContent=countDownTitle;
    countDownActive= setInterval(()=> {
    countDownValue= new Date(countdownDate).getTime();
    const now= new Date().getTime();
    let distance= countDownValue-now;
    if(distance<0)
    {
      updateScreen(inputContainer,completeContainer);
      updateScreen(countDownContainer,completeContainer);
      clearInterval(countDownActive);
      countDownFinishMsg.textContent=`${countDownTitle} is finished on ${todayDate}`;
    }
    else{
    let totalDay= Math.floor(distance/day);
    let totalHours= Math.floor((distance%day)/hours);
    let totalMinutes= Math.floor((distance%hours)/minutes);
    let totalSecond= Math.floor((distance%minutes)/seconds);
    timeEl[0].textContent=totalDay;
    timeEl[1].textContent=totalHours;
    timeEl[2].textContent=totalMinutes;
    timeEl[3].textContent=totalSecond;
    updateScreen(inputContainer,countDownContainer);
   }
   });
}
function updateCountdown(e)
{
  e.preventDefault();
  countDownTitle=e.srcElement[0].value;
  countdownDate=e.srcElement[1].value;
  if(countdownDate==="") alert("Please select valid date") 
  else{
   savedCountDown={
       title:countDownTitle,
       date: countdownDate,
   }
   localStorage.setItem('countDown', JSON.stringify(savedCountDown));
  updateCountDownScreen();
}  
}

function stopCounter(){
  clearInterval(countDownActive);
  updateScreen(countDownContainer, inputContainer);
  countDownTitle="";
  countdownDate="";
}

function restorPreviousCountdown(){
    if(localStorage.getItem('countDown')){
      inputContainer.hidden=true;
      savedCountDown=localStorage.getItem('countDown');
      countdownDate=savedCountDown.date;
      countDownTitle=savedCountDown.title;
      updateCountDownScreen();
    }
}
restorPreviousCountdown();
//Event Listners
form.addEventListener("submit", updateCountdown);
resetButton.addEventListener("click", stopCounter);
nextCountdownButton.addEventListener("click", () =>{updateScreen(completeContainer,inputContainer)} )