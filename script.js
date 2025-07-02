document.addEventListener("DOMContentLoaded", function () {
  // Wait for the document to be fully loaded
  const calculateButton = document.querySelector(".calc-btn");
  calculateButton.addEventListener("click", calculateResults);

  const resetButton = document.querySelector(".reset-btn");
  resetButton.addEventListener("click", resetAll);
});

const chemical3363 = document.getElementById("3363");
const chemical0300 = document.getElementById("0300");
let chemicalUnit = "";

chemical3363.addEventListener("change", () => {
  if (chemical3363.checked) {
    document.querySelector(".f-container h3").innerHTML =
      "3363 Chemical Addition:";
    chemicalUnit = " gal";
    resetOutput();
  }
});

chemical0300.addEventListener("change", () => {
  if (chemical0300.checked) {
    document.querySelector(".f-container h3").innerHTML =
      "0300 Chemical Addition:";
    chemicalUnit = " oz";
    resetOutput();
  }
});

function calculateResults() {
  // Get user input values
  const containerType = document.querySelector(
    "input[name='container_type']:checked"
  );
  const chemicalType = document.querySelector(
    "input[name='chemical_type']:checked"
  );
  const containerAndWaterWeight = parseFloat(
    document.getElementById("input").value
  );

  let containerEmptyWeight;
  let waterWeight;
  let numberOfGallons;
  let chemical;
  let chemicalAddition;

  // Validation check
  if (containerType && chemicalType && !isNaN(containerAndWaterWeight)) {
    // Perform Calculations
    containerEmptyWeight = containerType.value === "tote" ? 445 : 3;
    waterWeight = containerAndWaterWeight - containerEmptyWeight;

    if (waterWeight < 0) {
      alert("Container weight is too low for selected container type.");
      return;
    }

    numberOfGallons = (waterWeight / 8.34).toFixed(2);
    chemical = (
      numberOfGallons * (chemicalType.value === "0300" ? 0.67 : 0.1)
    ).toFixed(2);
    chemicalAddition = (
      chemical * (chemicalType.value === "0300" ? 29.6 : 3785)
    ).toFixed(2);

    // Display results
    document.querySelector(".a-container p").innerHTML =
      containerEmptyWeight + " lbs";
    document.querySelector(".b-container p").innerHTML =
      containerAndWaterWeight + " lbs";
    document.querySelector(".c-container p").innerHTML = waterWeight + " lbs";
    document.querySelector(".d-container p").innerHTML =
      numberOfGallons + " gal";
    document.querySelector(".e-container p").innerHTML =
      chemical + chemicalUnit;
    document.querySelector(".f-container p").innerHTML =
      chemicalAddition + " mL";
  } else {
    alert("Please provide valid input for all fields.");
  }
}

function resetAll() {
  // Reset radios
  const containerTypeRadios = document.querySelectorAll(
    "input[name='container_type']"
  );
  const chemicalTypeRadios = document.querySelectorAll(
    "input[name='chemical_type']"
  );

  containerTypeRadios.forEach((radio) => {
    radio.checked = false;
  });

  chemicalTypeRadios.forEach((radio) => {
    radio.checked = false;
  });

  // Reset number input
  document.getElementById("input").value = "";

  // Reset output
  document.querySelector(".a-container p").innerHTML = "";
  document.querySelector(".b-container p").innerHTML = "";
  document.querySelector(".c-container p").innerHTML = "";
  document.querySelector(".d-container p").innerHTML = "";
  document.querySelector(".e-container p").innerHTML = "";
  document.querySelector(".f-container p").innerHTML = "";
  document.querySelector(".f-container h3").innerHTML = "Chemical Addition:";
}

function resetOutput() {
  document.querySelector(".a-container p").innerHTML = "";
  document.querySelector(".b-container p").innerHTML = "";
  document.querySelector(".c-container p").innerHTML = "";
  document.querySelector(".d-container p").innerHTML = "";
  document.querySelector(".e-container p").innerHTML = "";
  document.querySelector(".f-container p").innerHTML = "";
}
