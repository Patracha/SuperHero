function encontrarID(id) {
  console.log("llega click");

  if (!id) {
    $("#errorConsola").html("No puede estar vacío");
    return;
  }

  if (isNaN(id) || id <= 0 || id >= 732) {
    $("#errorConsola").html("Ingrese un número válido");
    return;
  }

  $("#txtPersonaje").html('<div class="spinner-border" role="status"><span class="sr-only"></span></div>');
  $("#errorConsola").html('');

  $.ajax({
    type: "GET",
    url: `https://superheroapi.com/api.php/a04e67e18e8491b421bf6bcf65143a24/${id}`,
    dataType: "json",
    success: function(response) {
      console.log("llega ajax");

      let tarjeta = `
      <div class="card container text-center">
        <div id="particle-container"></div>
        <div class="card-body">
          <h5 class="card-title">${response.name}</h5>
          <p class="card-text">Nombre Real: ${response.biography["full-name"]}</p>
          <hr>
          <p class="card-text">Lugar de Nacimiento: ${response.biography["place-of-birth"]}</p>
          <hr>
          <p class="card-text">Publicado por: ${response.biography["publisher"]}</p>
          <p class="card-text">Primera Aparición: ${response.biography["first-appearance"]}</p>
          <hr>
          <p class="card-text">Ocupación: ${response.work.occupation}</p>
          <p class="card-text">Altura: ${response.appearance.height}</p>
          <p class="card-text">Peso: ${response.appearance.weight}</p>
          <button id="toggleChart" class="btn btn-primary">Mostrar Habilidades</button>
          <div id="chartContainer" style="display: none;"></div>
        </div>
        <div> 
        <img src="${response.image.url}" class="card-img-bottom" alt="${response.name}">
         </div>
      </div>`;

      $("#txtPersonaje").html(tarjeta);
      generateParticles();

      $("#toggleChart").on("click", function() {
        let chartContainer = $("#chartContainer");
        if (chartContainer.is(":visible")) {
          chartContainer.hide();
        } else {
          chartContainer.show();
          renderChart(response);
        }
      });
    },
    error: function(error) {
      console.error("Error en la solicitud:", error);
    }
  });
}

function renderChart(response) {
  var chart = new CanvasJS.Chart("chartContainer", {
    title: {
      text: "Habilidades"
    },
    legend: {
      maxWidth: 350,
      itemWidth: 120
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        legendText: "{indexLabel}",
        dataPoints: [
          { y: response.powerstats.intelligence, indexLabel: `Intelligence (${response.powerstats.intelligence})` },
          { y: response.powerstats.strength, indexLabel: `Strength (${response.powerstats.strength})` },
          { y: response.powerstats.speed, indexLabel: `Speed (${response.powerstats.speed})` },
          { y: response.powerstats.durability, indexLabel: `Durability (${response.powerstats.durability})` },
          { y: response.powerstats.power, indexLabel: `Power (${response.powerstats.power})` },
          { y: response.powerstats.combat, indexLabel: `Combat (${response.powerstats.combat})` }
        ]
      }
    ]
  });
  chart.render();
}

function generateParticles() {
  const particleContainer = document.getElementById('particle-container');
  particleContainer.innerHTML = '';  // Clear previous particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = `${Math.random() * 6}px`;
    particle.style.height = particle.style.width;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 2}s`;
    particleContainer.appendChild(particle);
  }
}

$("#btn").on("click", function() {
  let idCaja = $("#entrada").val();
  console.log("llega click");
  encontrarID(idCaja);
});

$("#btn2").on("click", function() {
  let randomId = Math.floor(Math.random() * 731) + 1;
  encontrarID(randomId);
});
$("#entrada").on("keydown", function(event) {
  if (event.key === "Enter") {
      event.preventDefault();  
      $("#btn").click(); 
  }
});