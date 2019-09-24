//jshint esversion: 6
window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/'; //proxy link to acess api from any location and authentication
      const api = `${proxy}https://api.darksky.net/forecast/4430ed6bd6040902532c3c9339bda8a8/${lat},${long}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {
            temperature,
            summary,
            icon
          } = data.currently;
          //I can pullout all the information from api
          //Set Dom elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //formula for celsius
          let celsius = (temperature - 32) * (5 / 9);
            //setIcons
            setIcons(icon, document.querySelector('.icon'));

            //set F to C degree
            temperatureSection.addEventListener('click', () => {
              if(temperatureSpan.textContent === "F"){
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(celsius);
              }else {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = temperature;
              }
            });

        });
    });

  }
  // else{
  //   h1.textcontent = "Hey this is not working";
  // }

  function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase(); //look for every line with icons svg
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
