const h2 = document.querySelector("h2");
const input = document.querySelector("input");
const button = document.querySelector("button");

const place = document.querySelector("#place");
const degrees = document.querySelector("#degrees");
const img = document.querySelector("img");
const wind = document.querySelector("#wind");
const content = document.querySelector(".content");


button.addEventListener("click", () => {
  if (!input.value) return;

  getDataApi();
});

async function getDataApi() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    input.value
  )}&units=metric&appid=53f68a787e6978b189f05f594760d55b`;

  try {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data?.cod && data.cod === "404") {
          return alert("Local não encontrado!");
        }

        loadData(data);
      });
  } catch (error) {
    alert(error);
  }
}


const relogio = setInterval(function (time) {
  const date = new Date();

  let hora = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  if (hora < 10) {
    hora = '0' + hora;
  };

  if (min < 10) {
    min = '0' + min;
  };

  if (sec < 10) {
    sec = '0' + sec;
  };

  var str_hora = hora + ':' + min + ':' + sec;

  console.log(str_hora);

  h2.innerHTML = `${str_hora}`;
})

function loadData(data) {
  place.innerHTML = `${data.name}, ${data.sys.country}`;
  degrees.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}° C`;
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  wind.innerHTML = `Vento: ${data.wind.speed} km/h`;
  content.style.display = "flex";
}