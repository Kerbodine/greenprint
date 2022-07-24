const submitForm = async (req, res) => {
  const { body } = req;

  let data = {
    name: "test",
  };

  const fuel = body.answers[4];
  const carSize = body.answers[5];
  const distance = body.answers[6];

  let carReq;
  let passengers;

  if (carSize === "Small") {
    passengers = 3;
  } else if (carSize === "Medium") {
    passengers = 5;
  } else if (carSize === "Large") {
    passengers = 7;
  } else {
    passengers = 0;
  }

  if (fuel === "Electricity") {
    // carReq = "fuel_type_electricity-fuel_use_electric_vehicle";
    carReq =
      "passenger_vehicle-vehicle_type_black_cab-fuel_source_na-distance_na-engine_size_na";
    passengers = 0;
  } else {
    carReq =
      "passenger_vehicle-vehicle_type_black_cab-fuel_source_na-distance_na-engine_size_na";
  }

  try {
    const result = await fetch("https://beta3.api.climatiq.io/batch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLIMATIQ_API_KEY}`,
      },
      //
      body: JSON.stringify([
        // question 1 - renewable
        {
          emission_factor: {
            activity_id: "electricity-energy_source_hydro_power_plant_10_mw",
          },
          parameters: {
            energy: (body.answers[0] / 100) * body.answers[1],
            energy_unit: "kWh",
          },
        },
        // question 2 - energy use house
        {
          emission_factor: {
            activity_id: "electricity-energy_source_biogas_corn_chp",
          },
          parameters: {
            energy: (1 - body.answers[0] / 100) * body.answers[1],
            energy_unit: "kWh",
          },
        },
        // question 3 - waste
        {
          emission_factor: {
            activity_id: "waste_type_books-disposal_method_closed_loop",
          },
          parameters: {
            weight: body.answers[2],
            weight_unit: "t",
          },
        },
        // flight
        {
          emission_factor: {
            activity_id:
              "passenger_flight-route_type_domestic-aircraft_type_jet-distance_na-class_na-rf_included",
          },
          parameters: {
            passengers: 1,
            distance: 520 * body.answers[3],
            distance_unit: "km",
          },
        },
        // car
        {
          emission_factor: {
            activity_id: carReq,
          },
          parameters: {
            passengers: passengers,
            distance: distance,
            distance_unit: "km",
          },
        },
      ]),
    });
    data = await result.json();
    console.log(data.results[4].valid_units);
  } catch (error) {
    console.log(error);
  }

  // sum co2e from data.results
  let co2 = 0;
  let co2Array = [];
  data.results.forEach((result) => {
    co2 += result.co2e;
    co2Array.push(result.co2e);
  });

  // let ch4 = 0;
  // data.results.forEach((result) => {
  //   ch4 += result.constituent_gases.ch4;
  // });

  // let n2o = 0;
  // data.results.forEach((result) => {
  //   n2o += result.constituent_gases.n2o;
  // });

  res.status(200).send(
    JSON.stringify({
      co2,
      co2Array,
      // ch4,
      // n2o,
    })
  );
};

export default submitForm;
