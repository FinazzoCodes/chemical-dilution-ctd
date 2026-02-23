document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("modeToggle");
  const appTitle = document.getElementById("appTitle");

  const containerRadios = document.querySelectorAll("input[name='container']");
  const chemicalRadios = document.querySelectorAll("input[name='chemical']");

  const steelTote = document.getElementById("steelTote");
  const plasticTote = document.getElementById("plasticTote");
  const carboy = document.getElementById("carboy");
  const foamer = document.getElementById("foamer");

  const chem3363 = document.getElementById("3363");
  const chem0300 = document.getElementById("0300");
  const chemCip100 = document.getElementById("cip100");

  const weightInput = document.getElementById("weightInput");

  const outEmpty = document.getElementById("outEmpty");
  const outCombined = document.getElementById("outCombined");
  const outWater = document.getElementById("outWater");
  const outGallons = document.getElementById("outGallons");
  const outChemical = document.getElementById("outChemical");
  const outAdditionLabel = document.getElementById("outAdditionLabel");
  const outAddition = document.getElementById("outAddition");

  const resetBtn = document.getElementById("resetBtn");
  const calcBtn = document.getElementById("calcBtn");

  const refToggle = document.getElementById("refToggle");
  const referenceSheet = document.getElementById("referenceSheet");
  const refLine = document.getElementById("refLine");

  let mode = "MT-17";

  const TARE = {
    steelTote: 445,
    plasticTote: 125,
    carboy: 3.84,
    foamer: 50
  };

  const CIP100_KG_PER_ML = 1.669 / 1300;

  const RULES = {
    "MT-17": {
      allowedContainers: ["steelTote", "plasticTote", "carboy"],
      allowedChemicals: ["0300", "cip100"],
      calc: {
        "0300": {
          chemPerGal: 0.67,
          chemUnit: " oz",
          mlPerUnit: 29.6,
          addLabel: "0300 Chemical Addition"
        },
        cip100: {
          chemPerGal: 0.0125,
          chemUnit: " gal",
          mlPerUnit: 3785,
          addLabel: "CIP-100 Chemical Addition"
        }
      },
      title: "Chemical Dilution CTD (MT-17)"
    },
    "MT-25/26": {
      allowedContainers: ["steelTote", "plasticTote", "carboy", "foamer"],
      allowedChemicals: ["3363", "0300"],
      calc: {
        3363: {
          chemPerGal: 0.016,
          chemUnit: " gal",
          mlPerUnit: 3785,
          addLabel: "3363 Chemical Addition"
        },
        "0300": {
          chemPerGal: 0.01067,
          chemUnit: " gal",
          mlPerUnit: 3785,
          addLabel: "0300 Chemical Addition"
        }
      },
      title: "Chemical Dilution CTD (Zorro)"
    }
  };

  const REFERENCES = [
    {
      line: "MT-17",
      container: "Steel Tote",
      chemical: "0300",
      combined: "2632 lbs",
      note: "1100 kg fill",
      addML: 5200.55
    },
    {
      line: "MT-17",
      container: "Plastic Tote",
      chemical: "0300",
      combined: "2304 lbs",
      note: "1000 L fill",
      addML: 5181.53
    },
    {
      line: "MT-17",
      container: "Steel Tote",
      chemical: "CIP-100",
      combined: "2632 lbs",
      note: "1100 kg fill",
      addML: 14222.11
    },
    {
      line: "MT-17",
      container: "Plastic Tote",
      chemical: "CIP-100",
      combined: "2304 lbs",
      note: "1000 L fill",
      addML: 12361.38
    },
    {
      line: "MT-17",
      container: "Carboy",
      chemical: "CIP-100",
      combined: "47.62 lbs",
      note: "20 L fill",
      addML: 248.36
    },
    {
      line: "MT-17",
      container: "Carboy",
      chemical: "0300",
      combined: "47.62 lbs",
      note: "20 L fill",
      addML: 104.11
    },

    {
      line: "MT-25/26",
      container: "Steel Tote",
      chemical: "3363",
      combined: "2632 lbs",
      note: "1100 kg fill",
      addML: 15880.66
    },
    {
      line: "MT-25/26",
      container: "Plastic Tote",
      chemical: "0300",
      combined: "2304 lbs",
      note: "1000 L fill",
      addML: 12140.0
    },
    {
      line: "MT-25/26",
      container: "Steel Tote",
      chemical: "0300",
      combined: "2632 lbs",
      note: "1100 kg fill",
      addML: 10590.42
    },
    {
      line: "MT-25/26",
      container: "Plastic Tote",
      chemical: "3363",
      combined: "2304 lbs",
      note: "1000 L fill",
      addML: 18204.31
    },
    {
      line: "MT-25/26",
      container: "Carboy",
      chemical: "3363",
      combined: "47.62 lbs",
      note: "20 L fill",
      addML: 317.9
    },
    {
      line: "MT-25/26",
      container: "Carboy",
      chemical: "0300",
      combined: "47.62 lbs",
      note: "20 L fill",
      addML: 212.0
    },
    {
      line: "MT-25/26",
      container: "Foamer Tall",
      chemical: "0300",
      combined: "203 lbs",
      note: "70 L fill",
      addML: 740.89
    },
    {
      line: "MT-25/26",
      container: "Foamer Tall",
      chemical: "3363",
      combined: "203 lbs",
      note: "70 L fill",
      addML: 1110.99
    },
    {
      line: "MT-25/26",
      container: "Foamer Short",
      chemical: "0300",
      combined: "225 lbs",
      note: "80 L fill",
      addML: 847.43
    },
    {
      line: "MT-25/26",
      container: "Foamer Short",
      chemical: "3363",
      combined: "225 lbs",
      note: "80 L fill",
      addML: 1270.74
    }
  ];

  const toLbsNumber = (s) => parseFloat(String(s).replace(/[^\d.]/g, "")) || 0;

  function getCheckedValue(name) {
    const el = document.querySelector(`input[name='${name}']:checked`);
    return el ? el.value : null;
  }

  function clearOutputs() {
    outEmpty.textContent = "";
    outCombined.textContent = "";
    outWater.textContent = "";
    outGallons.textContent = "";
    outChemical.textContent = "";
    outAddition.textContent = "";
    outAdditionLabel.textContent = "Addition";
  }

  function resetAll() {
    [...containerRadios, ...chemicalRadios].forEach((r) => (r.checked = false));
    weightInput.value = "";
    clearOutputs();
    referenceSheet.hidden = true;
  }

  function applyModeRestrictions() {
    const rules = RULES[mode];

    steelTote.disabled = !rules.allowedContainers.includes("steelTote");
    plasticTote.disabled = !rules.allowedContainers.includes("plasticTote");
    carboy.disabled = !rules.allowedContainers.includes("carboy");
    foamer.disabled = !rules.allowedContainers.includes("foamer");

    chem3363.disabled = !rules.allowedChemicals.includes("3363");
    chem0300.disabled = !rules.allowedChemicals.includes("0300");
    chemCip100.disabled = !rules.allowedChemicals.includes("cip100");
  }

  function renderReferenceSheet() {
    refLine.textContent = `Line: ${mode}`;

    const tbody = document.getElementById("referenceTbody");
    if (!tbody) return; // safety

    tbody.innerHTML = "";

    const rows = REFERENCES.filter((r) => r.line === mode).sort((a, b) => {
      const c = a.container.localeCompare(b.container);
      if (c !== 0) return c;

      const chem = a.chemical.localeCompare(b.chemical);
      if (chem !== 0) return chem;

      return toLbsNumber(a.combined) - toLbsNumber(b.combined);
    });

    for (const r of rows) {
      const tr = document.createElement("tr");

      const isCip = r.chemical === "CIP-100";
      const kg = isCip ? (r.addML * CIP100_KG_PER_ML).toFixed(2) : "";

      tr.innerHTML = `
        <td>${r.container}</td>
        <td>${r.chemical}</td>
        <td>${r.note}</td>
        <td class="num add-ml">
          ${r.addML.toFixed(2)} mL
          ${isCip ? `<span class="kg-pill">${kg} kg</span>` : ""}
        </td>
      `;

      tbody.appendChild(tr);
    }
  }

  function calculate() {
    clearOutputs();

    const container = getCheckedValue("container");
    const chemical = getCheckedValue("chemical");
    const combined = parseFloat(weightInput.value);

    if (!container || !chemical || Number.isNaN(combined)) {
      alert("Select container, chemical, and enter a valid weight.");
      return;
    }

    const rules = RULES[mode];

    if (!rules.allowedContainers.includes(container)) {
      alert("That container is not allowed for this line.");
      return;
    }
    if (!rules.allowedChemicals.includes(chemical)) {
      alert("That chemical is not allowed for this line.");
      return;
    }

    const empty = TARE[container];
    const waterWeight = combined - empty;

    if (waterWeight < 0) {
      alert("Combined weight is too low for the selected container.");
      return;
    }

    const gallons = waterWeight / 8.34;

    const rule = rules.calc[chemical];
    const chemicalAmtRaw = gallons * rule.chemPerGal;
    const chemicalAmt = Math.round(chemicalAmtRaw * 100) / 100;
    const additionML = chemicalAmt * rule.mlPerUnit;

    outEmpty.textContent = `${empty} lbs`;
    outCombined.textContent = `${combined.toFixed(2)} lbs`;
    outWater.textContent = `${waterWeight.toFixed(2)} lbs`;
    outGallons.textContent = `${gallons.toFixed(2)} gal`;
    outChemical.textContent = `${chemicalAmt.toFixed(2)}${rule.chemUnit}`;

    outAdditionLabel.textContent = rule.addLabel;

    if (chemical === "cip100") {
      const kg = additionML * CIP100_KG_PER_ML;
      outAddition.textContent = `${additionML.toFixed(2)} mL (≈ ${kg.toFixed(2)} kg)`;
    } else {
      outAddition.textContent = `${additionML.toFixed(2)} mL`;
    }
  }

  modeToggle.addEventListener("click", () => {
    mode = mode === "MT-17" ? "MT-25/26" : "MT-17";
    modeToggle.classList.toggle("active", mode === "MT-25/26");
    modeToggle.setAttribute("aria-checked", mode === "MT-25/26");
    appTitle.textContent = RULES[mode].title;

    resetAll();
    applyModeRestrictions();
  });

  document.getElementById("resetBtn").addEventListener("click", resetAll);
  document.getElementById("calcBtn").addEventListener("click", calculate);

  [...containerRadios, ...chemicalRadios].forEach((r) =>
    r.addEventListener("change", clearOutputs)
  );
  weightInput.addEventListener("input", clearOutputs);

  refToggle.addEventListener("click", () => {
    referenceSheet.hidden = !referenceSheet.hidden;
    if (!referenceSheet.hidden) renderReferenceSheet();
  });

  // Init
  appTitle.textContent = RULES[mode].title;
  applyModeRestrictions();
  resetAll();
});
