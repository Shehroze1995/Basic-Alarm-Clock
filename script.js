const alarmTune = new Audio("alarm-clock-beep.wav");
alarmTune.loop = true;
const displayClock = document.getElementById("displayClock");
const timeForAlarm = document.getElementById("timeForAlarm");
const alarmConfirmation = document.getElementById("alarmConfirmation");
const alarmGif = document.getElementById("alarmGif");
const clearAlarm = document.getElementById("clearAlarm");
const overLay = document.querySelector(".overLay");
const error = document.querySelector(".error");
let alarmTime = null;
let alarmTimeOut = null;

document.addEventListener("DOMContentLoaded", timeUpdate);

function timeUpdate() {
  const hours = formatTime(new Date().getHours());
  const minutes = formatTime(new Date().getMinutes());
  const seconds = formatTime(new Date().getSeconds());

  displayClock.textContent = `${hours} : ${minutes} : ${seconds}`;
}

function formatTime(time) {
  if (time < 10) return "0" + time;
  return time;
}

setInterval(timeUpdate, 1000);

function setTimeForAlarm() {
  alarmTime = timeForAlarm.value;
}

function setAlarm() {
  if (!timeForAlarm.value) {
    overLay.classList.add("showOverLay");
    error.classList.add("showError");
    error.innerHTML = `<p>Kindly select time to set alarm..</p><span id="cancelPopup" onclick="hideOverLay()">&times;</span>`;
  }
  if (alarmTime) {
    const todayDate = new Date();
    const timeToSet = new Date(alarmTime);
    if (timeToSet < todayDate) {
      overLay.classList.add("showOverLay");
      error.classList.add("showError");
      error.innerHTML = `<p>Hey Yo! You cannot set alarm for past time!!</p><span id="cancelPopup" onclick="hideOverLay()">&times;</span>`;
    }
    if (timeToSet > todayDate) {
      alarmConfirmation.innerText = `Alarm has been set for ${alarmTime}`;
      alarmConfirmation.classList.add("text");
      const hitAlarmTime = timeToSet - todayDate;
      alarmTimeOut = setTimeout(() => {
        alarmGif.style.display = "block";
        alarmTune.play();
      }, hitAlarmTime);
    }
  }
}

function stopAlarm() {
  if (!alarmTime) {
    overLay.classList.add("showOverLay");
    error.classList.add("showError");
    error.innerHTML = `<p>Whoa there, eager beaver! You can't cancel an alarm that hasn't even been set yet.. Set it first, then hit cancel.</p><span id="cancelPopup" onclick="hideOverLay()">&times;</span>`;
  }
  alarmTune.pause();
  if (alarmTimeOut) {
    clearTimeout(alarmTimeOut);
    alarmTimeOut = null;
  }
  alarmTimeOut = null;
  alarmConfirmation.classList.remove("text");
  alarmTime = null;
  alarmGif.style.display = "none";
  timeForAlarm.value = "";
  alarmConfirmation.innerText = "";
}

overLay.addEventListener("click", hideOverLay);

function hideOverLay() {
  overLay.classList.remove("showOverLay");
  error.classList.remove("showError");
}
