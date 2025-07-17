/**
 * Waits for the entire DOM to load before attaching event listeners.
 * Ensures that all elements are accessible when scripts run.
 */
document.addEventListener("DOMContentLoaded", function () {
  // Setup event listeners for Calculate and Reset buttons
  const calculateButton = document.querySelector(".calc-btn");
  calculateButton.addEventListener("click", calculateResults);

  const resetButton = document.querySelector(".reset-btn");
  resetButton.addEventListener("click", resetAll);
});

// Global references and default states
const modeToggle = document.getElementById("modeToggle");
const chemical3363 = document.getElementById("3363");
const chemical0300 = document.getElementById("0300");
const chemicalCip100 = document.getElementById("cip100");
let calculationMode = "default"; // Holds the current mode (default or zorro)
let chemicalUnit = ""; // Will dynamically set to 'gal' or 'lbs'

// Toggle switch for calculation mode (Default <-> Zorro)
modeToggle.addEventListener("click", () => {
  // Toggle between modes
  calculationMode = calculationMode === "default" ? "zorro" : "default";

  // Update UI to reflect active toggle state and mode styling
  modeToggle.classList.toggle("active");
  document.body.classList.toggle("zorro-mode", calculationMode === "zorro");

  // Reset outputs and update heading based on selected mode
  resetOutput();
  updateModeLabels();
});

// Updates the main heading label based on the selected calculation mode.
function updateModeLabels() {
  if (calculationMode === "zorro") {
    document.querySelector("header h1").innerHTML =
      "Chemical Blending CTD Zorro";
  } else {
    document.querySelector("header h1").innerHTML = "Chemical Dilution CTD";
  }
}

/**
 * Event listeners to update chemical addition label and unit
 * whenever the user selects a different chemical type.
 */
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

chemicalCip100.addEventListener("change", () => {
  if (chemicalCip100.checked) {
    document.querySelector(".f-container h3").innerHTML =
      "CIP-100 Chemical Addition: ";
    chemicalUnit = " gal";
    resetOutput();
  }
});

/**
 * Main function that performs the calculations and updates the UI
 * based on user inputs and the selected mode (default or zorro).
 */
function calculateResults() {
  // Get selected container and chemical types from user
  const containerType = document.querySelector(
    "input[name='container_type']:checked"
  );
  const chemicalType = document.querySelector(
    "input[name='chemical_type']:checked"
  );
  const containerAndWaterWeight = parseFloat(
    document.getElementById("input").value
  );

  // Declare local variables for calculation
  let containerEmptyWeight;
  let waterWeight;
  let numberOfGallons;
  let chemical;
  let chemicalAddition;

  // Validate input: ensure user selected options and entered a valid weight
  if (containerType && chemicalType && !isNaN(containerAndWaterWeight)) {
    // Assign empty container weight based on selected type
    containerEmptyWeight = containerType.value === "tote" ? 455 : 3;
    // Calculate water weight by subtracting container weight
    waterWeight = containerAndWaterWeight - containerEmptyWeight;

    // Safety check: ensure water weight is not negative
    if (waterWeight < 0) {
      alert("Container weight is too low for selected container type.");
      return;
    }

    // Convert water weight (lbs) to gallons (8.34 lbs per gallon)
    numberOfGallons = (waterWeight / 8.34).toFixed(2);

    // Calculate chemical quantity based on selected mode and chemical type
    if (calculationMode === "default") {
      let chemicalMultiplier;
      let additionMultiplier;

      if (chemicalType.value === "3363") {
        chemicalMultiplier = 0.1;
        additionMultiplier = 3785;
      } else if (chemicalType.value === "0300") {
        chemicalMultiplier = 0.67;
        additionMultiplier = 29.6;
      } else if (chemicalType.value === "cip100") {
        chemicalMultiplier = 0.0125;
        additionMultiplier = 3785;
      }

      chemical = (numberOfGallons * chemicalMultiplier).toFixed(2);
      chemicalAddition = (chemical * additionMultiplier).toFixed(2);
    }

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

/**
 * Resets all form inputs and clears output containers to start fresh.
 */
function resetAll() {
  // Uncheck all container type radio buttons
  const containerTypeRadios = document.querySelectorAll(
    "input[name='container_type']"
  );
  containerTypeRadios.forEach((radio) => {
    radio.checked = false;
  });

  // Uncheck all chemical type radio buttons
  const chemicalTypeRadios = document.querySelectorAll(
    "input[name='chemical_type']"
  );
  chemicalTypeRadios.forEach((radio) => {
    radio.checked = false;
  });

  // Clear number input field
  document.getElementById("input").value = "";

  // Reset all outputs and restore default chemical label
  document.querySelector(".a-container p").innerHTML = "";
  document.querySelector(".b-container p").innerHTML = "";
  document.querySelector(".c-container p").innerHTML = "";
  document.querySelector(".d-container p").innerHTML = "";
  document.querySelector(".e-container p").innerHTML = "";
  document.querySelector(".f-container p").innerHTML = "";
  document.querySelector(".f-container h3").innerHTML = "Chemical Addition:";
}

/**
 * Clears only the output containers. Used when switching modes or chemicals
 * to ensure no misleading data remains visible.
 */
function resetOutput() {
  document.querySelector(".a-container p").innerHTML = "";
  document.querySelector(".b-container p").innerHTML = "";
  document.querySelector(".c-container p").innerHTML = "";
  document.querySelector(".d-container p").innerHTML = "";
  document.querySelector(".e-container p").innerHTML = "";
  document.querySelector(".f-container p").innerHTML = "";
}
