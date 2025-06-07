const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadLine = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth= tempDate.getMonth();
let tempDay = tempDate.getDay();

// let futureDate = new Date(2025, 5, 4, 4, 30, 0);
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);            


const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth()
month = months[month]

const date = futureDate.getDate();

const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday} ${date} ${month} ${year} ${hours}:${minutes}am`;


// future time in ms 
const futureTime = futureDate.getTime();

function getRemanaingTime(){
  const today = new Date().getTime();
  const t = futureTime - today;


  // valus in ms 
  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMinute = 60*1000;

  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let mins = Math.floor((t % oneHour) / oneMinute);
  let secs = Math.floor((t % oneMinute)/1000);

  // set values array
  const values = [days, hours, mins,secs];

  function format(item){
    if(item<10){
      return (item = `0${item}`);
    }
    return item;
  };

  items.forEach(function(item, index){
    item.innerHTML = format(values[index]);
  });
  if(t<0){
    clearInterval(countdown);
    deadLine.innerHTML = `<h4 class="expired">sorry , this giveaway has expired</h4>`;
  }
}

let countdown = setInterval(getRemanaingTime,1000);


getRemanaingTime();