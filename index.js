// let apikey = "6e35ec85966933fe78031a18b1e94845";
 let apikey="fe4feefa8543e06d4f3c66d92c61b69c"

// for writed city
let input = document.querySelector(" .search input");

// for searcicon and search div
let search = document.querySelector(".search button");
let searchDIV = document.querySelector(".search ");

// for container div
let text = document.querySelector(".text");
let otherweather = document.querySelector(".show-next-days");
let project = document.querySelector(".project");
let showError = document.querySelector(".show-error");
let showErrorP = document.querySelector(".show-error p");

// date and time
let hours = document.querySelector(".time-text");
let timing = document.querySelector(".timing");
let date = document.querySelector(".date");
// for try button
let tryBt = document.querySelector(" .show-error button");

let monthArray = [
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
let daysInWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// function to get sumrise and sunset together with timezone

let sunhour, sunminutes;
function suntimeSunset(sunti, timezonee) {
  let g = new Date(sunti * 1000);
  toUtc = g.getTime() + g.getTimezoneOffset() * 60000;
  const currentLocalTimee = toUtc + 1000 * timezonee;
  const selectedDatee = new Date(currentLocalTimee);

  sunhour =
    selectedDatee.getHours() >= 13
      ? selectedDatee.getHours() % 12
      : selectedDatee.getHours();

  sunminutes = selectedDatee.getMinutes();
}

// show all html
function show(data) {
  // // for city in result
  let city = data.timezone.toLowerCase();
  let cityName = city.split("/")[1];

  // for country in result
  // // for humidity and pressure and cluds and temp
  let hu = data.current.humidity;
  let pressure = data.current.pressure;
  let clouds = data.current.clouds;
  let temp = Math.round(data.current.temp);
  //  for wind speed
  let wind = data.current.wind_speed;

  // for sunrise
  let sunrise = data.current.sunrise;
  let sunset = data.current.sunset;
  console.log(window.moment(sunrise * 1000).format("HH:mm a"));
  //   for sunrise
  suntimeSunset(sunrise, data.timezone_offset);
  let rise =
    `${sunhour}`.padStart(2, "0") + ":" + `${sunminutes}`.padStart(2, "0");

  // for sunset
  suntimeSunset(sunset, data.timezone_offset);
  let set =
    `${sunhour}`.padStart(2, "0") + ":" + `${sunminutes}`.padStart(2, "0");

  // for discription
  let disc = data.current.weather[0].description;
  let imgIcon = data.current.weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + imgIcon + ".png";

  let html = `
 <div  class="icon-api">
 <img src=${iconurl} alt="">
 </div>  
 <div class="data-api">
 <div class="data special">
 <h2>${cityName} 
 </h2>
 
 <p>${disc}</p>
 </div>
 
 <div class="last-part">
 
 <div class=" show-data ">
 <p>Clouds</p>
 <p>${clouds} %</p>
 </div>
 
 <div class=" show-data ">
 <p> humidity</p>
 <p>${hu} % </p>
 </div>
 
 <div class=" show-data ">
 <p> Wind Speed</p>
 <p>${wind}</p>
 </div>
 
 
 <div class=" show-data special">
 <p> Sunrise</p>
 <p>${rise} <span style="color:brown">am</span> </p>
 </div>
 
 
 <div class=" show-data special">
 <p> Sunset</p>
 <p>${set} <span style="color:brown">pm</span> </p>
 </div>
 </div> `;
  document.querySelector(".text").insertAdjacentHTML("beforeend", html);
  let secondWeather = document.querySelector(".show-next-days");
  let days = data.daily;
  for (let i = 0; i < days.length - 2; i++) {
    // to get days in moment.js
    // console.log(window.moment(days[i].dt*1000).format('dddd') );

    // for date
    let x = days[i].dt;
    let oneday = new Date(x * 1000).getDay();

    // for icon
    let imgIcon2 = data.daily[i].weather[0].icon;
    var icon2 = "http://openweathermap.org/img/w/" + imgIcon2 + ".png";

    // for temp
    let max = data.daily[i].temp.max;
    let min = data.daily[i].temp.min;
    secondWeather.innerHTML += `
 
 
 <div class="now special">
 <div class="group">
   <div class="day">${daysInWeek[oneday]}</div>
 <div class="ima">
     <img src="${icon2}" alt="">
 </div>
 </div>
  <div class="min-max">
      <p class=" max">Min-Temp : <span>${Math.round(
        min
      )} <small class="col" >&#176;C</small></span> </p>
      <p class="min">Max-temp  : <span>${Math.round(
        max
      )} <small class="col" >&#176;C</small></span> </p>
      </div>
 </div>
 
 `;
  }
}

// hide the html  which related to weather
function hide() {
  text.innerHTML = "";
  otherweather.innerHTML = "";
}
// function error
function error(err) {
  showErrorP.innerHTML = `${err}`;
  showError.classList.remove("hidden");
  project.classList.add("hidden");
}

// show component of html
function showcontainer() {
  text.classList.remove("hidden");
  otherweather.classList.remove("hidden");
}

// for date try to convert it manually to lacle time it work but not updated

//   let hDate= function (tZone,dtGet){
//  setInterval(()=>{

//     const timezone = tZone
//     let dateTime =new Date(dtGet*1000)

// let  toUtc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
//  const currentLocalTime = toUtc + 1000 * timezone;

// let selectedDate = new Date(currentLocalTime);

// // let dDay= daysInWeek[selectedDate.getDay()]
// // let hou=selectedDate.getHours()
// // let min=selectedDate.getMinutes()
// // let dat=selectedDate.getDate()
// // let month=monthArray[selectedDate.getMonth()]
// // let year =selectedDate.getFullYear()

// const datee = selectedDate.toLocaleString("en-GB", {
//      day: "numeric",
//      weekday: "long",
//      month: "long",
// });
// const year = selectedDate.toLocaleString("en-GB", {
//      year: "numeric",
// });

// const hour = selectedDate.toLocaleString("en-GB", {
//      hour: "2-digit",
//      minute: "2-digit",
//      hour12: true,
// });

// //  date.innerHTML=` ${dDay} , ${dat} ${month} ${year}`
//  date.innerHTML=`${datee} ${year} `
//    hours.innerHTML = `${hour}`;
//    console.log(dateTime);

// },1000)

// }

let timer, timer2;

// function for your city acccording to geolocation

let get = function (latitude, longitude) {
  navigator.geolocation.getCurrentPosition(
    function (sucess) {
      let { latitude, longitude } = sucess.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutly&units=metric&appid=${apikey}`
      )
        .then((res) => {
          if (!res.ok)
            throw new Error("something wrong with geolocation , try again");
          return res.json();
        })
        .then((data) => {
          console.log(data);

          timer = setInterval(() => {
            var timezoneOffsett = data.timezone_offset;

            var localTimee = moment()
              .utcOffset(timezoneOffsett / 60)
              .format(" dddd MMMM Do YYYY, hh:mm:ss a");

            date.innerHTML = localTimee.split(",")[0];
            hours.innerHTML = localTimee.split(",")[1];
          }, 1000);

          showcontainer();
          show(data);
        })
        .catch((err) => {
          console.error(err);
          error(err);
          timer();
        });
    },
    function reject() {
      error(
        "You need to allow access to your location to get the weather in your area or Perhaps you prefer to search for the city whose weather you want to know"
      );
  
    }
  );
};
// function for you city

date.innerHTML = "";
hours.innerHTML = "";
function getcity(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=aba6ff9d6de967d5eac6fd79114693cc`
  )
    .then((res2) => {
      if (!res2.ok) throw new Error("sure the city is valid and try again");
      return res2.json();
    })
    .then((data2) => {
      console.log(data2);

      let { lat, lon } = data2.coord;
      latitude = lat;
      longitude = lon;

      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutly&units=metric&appid=${apikey}`
      );
    })
    .then((res3) => {
      if (!res3.ok) throw new Error("sure the city is valid and try again");

      return res3.json();
    })
    .then((data3) => {
      console.log(data3);

      clearInterval(timer);
      clearInterval(timer2);
      timer2 = setInterval(() => {
        let timezoneOffset = data3.timezone_offset;

        var localTimee = moment()
          .utcOffset(timezoneOffset / 60)
          .format(" dddd MMMM Do  YYYY, hh:mm:ss a");

        date.innerHTML = localTimee.split(",")[0];
        hours.innerHTML = localTimee.split(",")[1];
      }, 1000);

      clearInterval(timer);
hide()
      show(data3);
    })
    .catch((er) => {
      //  console.error(er);
      error(er);
      timer();
    });
}

// when Loading page

window.addEventListener("load", function(){
  get()
});

// when i click on trybtn
tryBt.addEventListener("click", function () {
  hide();
  searchDIV.classList.remove("hidden");
  showError.classList.add("hidden");
  text.classList.add("hidden");
  project.classList.remove("hidden");
});

// when i click on trybtn
function getData() {
  hide();
  getcity(input.value);
  text.classList.remove("hidden");
  otherweather.classList.remove("hidden");

  input.value = "";
}

function hideData() {
  text.classList.add("hidden");
  otherweather.classList.add("hidden");
  showError.classList.remove("hidden");
  showErrorP.innerHTML =
    "You Must write city,cant get wether without writing anything ";
  input.value = "";
}
// when search
search.addEventListener("click", function () {
  if (!input.value.length <= 0) {
    getData();
  } else {
    error(
      "Make sure to enter city name, otherwise you will not get the weather"
    );
    timer();
  }
});
// when enter
window.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (!input.value.length <= 0) {
      getData();
    } else {
      error(
        "Make sure to enter city name, otherwise you will not get the weather"
      );
      timer();
    }
  }
});

// when click on get geo

document.querySelector(".get-geo").addEventListener("click",function(){
  hide()
  get()
  
  clearInterval(timer)
  clearInterval(timer2)
  timer()
})
