$("#btn").on("click", function() {
  let idCaja = $("#entrada").val();
  console.log("llega click")


  
  if (!idCaja) {
    $("#errorConsola").html("No puede estar vacio");
    return;
  }

  
  if (isNaN(idCaja) || idCaja <= 0 || idCaja >= 732) {
    $("#errorConsola").html("Ingrese un numero Válido");
    return;
  }
  $("#txtPersonaje").html('<div class="spinner-border" role="status"><span class="sr-only"></span></div>');
  $("#personajeCanvas").html('');
  $("#errorConsola").html('');
  $.ajax({
    type: "GET",
    url: `https://superheroapi.com/api.php/a04e67e18e8491b421bf6bcf65143a24/${idCaja}`,
    dataType: "json",
    success: function (response) {
      console.log("llega ajax")

      

      let tarjeta = `
      <div class="card container">
        <div class="card-body">
          <h5 class="card-title">${response.name}</h5>
          <p class="card-text">Nombre Real: ${response.biography["full-name"]}</p>
          <hr>
          <p class="card-text">Lugar de Nacimiento: ${response.biography["place-of-birth"]}</p>
          <hr>
          <p class="card-text">Publicado por: ${response.biography["publisher"]}</p>
          <p class="card-text">Primera Aparición: ${response.biography["first-appearance"]}</p>
          <hr>
          <p class="card-text">Ocupacion: ${response.work.occupation}</p>
          <p class="card-text">Altura: ${response.appearance.height}</p>
           <p class="card-text">Peso: ${response.appearance.weight}</p>
          <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
        <img src="${response.image.url}" class="card-img-bottom" alt="${response.name}">
      </div>`;

      $("#txtPersonaje").html(tarjeta);

      console.log(response.powerstats.intelligence);
        var chart = new CanvasJS.Chart("personajeCanvas",
        {
          title:{
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
              { y: response.powerstats.strength, indexLabel: `Strength (${response.powerstats.strength}) ` },
              { y: response.powerstats.speed, indexLabel: `Speed (${response.powerstats.speed})` },
              { y: response.powerstats.durability, indexLabel: `Durability (${response.powerstats.durability})`},
              { y: response.powerstats.power, indexLabel: `Power (${response.powerstats.power})` },
              { y: response.powerstats.combat, indexLabel: `Combat (${response.powerstats.combat})`},
              
            ]
          }
          ]
        });
        chart.render();
      
      
    },
    error: function (error) {
      console.error("Error en la solicitud:", error);
    }
  });
});
