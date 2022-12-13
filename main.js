const time = document.querySelector('#time');
const greeting = document.querySelector('#greeting');
const name = document.querySelector('#name');
const focus = document.querySelector('#focus');
const tasks = document.querySelector('#tasks');
const task = document.querySelector('#task');
const amPm = document.querySelector('#amPm');

function updateTextColor() {
  let today = new Date();
  let Hours = today.getHours();
  let color = Hours < 12 ? '#111' : '#fff';
  time.style.color = `${color}`;
  greeting.style.color = `${color}`;
  name.style.color = `${color}`;
  focus.style.color = `${color}`;
  task.style.color = `${color}`;
  if (tasks) tasks.style.color = `${color}`;
  if (amPm) amPm.style.color = `${color}`;
}

function showTime() {
  // get today date and time
  let today = new Date();
  let Hour = today.getHours();
  let Min = today.getMinutes();
  let Sec = today.getSeconds();
  // A.M OR P.M
  let amPm = Hour > 12 ? 'P.M' : 'A.M';
  // show the time
  time.innerHTML = `${Hour}<span>:</span>${showZero(
    Min
  )}<span>:</span>${showZero(
    Sec
  )} <span id="amPm" style="color:inherit">${amPm}</span>`;
  // 12H format
  Hour = Hour % 12 || 12;
  // invoke the function recursevly every one second
  setTimeout(showTime, 1000);
}

function showZero(number) {
  return number >= 10 ? number : `0${number}`;
}

function showBgImge() {
  let today = new Date();
  let Hours = today.getHours();
  if (Hours < 12) {
    // this is morning
    document.body.style.cssText += `background-image:url(imgs/morning-1.jpg);`;
    greeting.textContent = `Good morning`;
    updateTextColor();
  } else if (Hours < 18) {
    // this is afternoon
    document.body.style.cssText += `background-image:url(imgs/afternoon.jpg);`;
    greeting.textContent = `Good afternoon`;
    updateTextColor();
  } else {
    // this is evening
    updateTextColor();
    document.body.style.cssText += `background-image:url(imgs/evening.jpg);`;
    greeting.textContent = `Good evening`;
  }
}
// set The name
function setName(e) {
  if (e.type === 'keypress') {
    // it's a key
    if (e.which === 13 || e.keyCode === 13) {
      // if it's an Enter
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    //it's a blur
    localStorage.setItem('name', e.target.innerText);
  }
}

// get name
function getName() {
  if (localStorage.getItem('name') === null)
    name.textContent = `[Enter your Name]`;
  else name.textContent = localStorage.getItem('name');
  updateTextColor();
}

// set the focus
function setFocus(e) {
  if (e.type === 'keypress') {
    //check if the event is keypress
    if (e.which === 13 || e.keyCode === 13) {
      // if the key is enter only
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    // the event is a blur 'click outside'
    localStorage.setItem('focus', e.target.innerText);
  }
}

// get today's task
function getFocus() {
  if (localStorage.getItem('focus') === null)
    focus.textContent = `[Enter your main task]`;
  else focus.textContent = localStorage.getItem('focus');
  updateTextColor();
}

function init() {
  name.addEventListener('keypress', setName);
  name.addEventListener('blur', setName); //if we click outside
  focus.addEventListener('keypress', setFocus);
  focus.addEventListener('blur', setFocus); // if we click outside

  showTime();
  showBgImge();
  getName();
  getFocus();
}

init();
