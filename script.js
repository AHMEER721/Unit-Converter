const typeSelect = document.getElementById('type');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const input = document.getElementById('input');
const output = document.getElementById('output');

const units = {
  length: ["Meter", "Kilometer", "Mile", "Yard", "Foot"],
  weight: ["Gram", "Kilogram", "Pound", "Ounce"],
  temperature: ["Celsius", "Fahrenheit", "Kelvin"]
};

const conversions = {
  length: {
    Meter: 1,
    Kilometer: 0.001,
    Mile: 0.000621371,
    Yard: 1.09361,
    Foot: 3.28084
  },
  weight: {
    Gram: 1,
    Kilogram: 0.001,
    Pound: 0.00220462,
    Ounce: 0.035274
  }
};

function populateUnits(type) {
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";
  units[type].forEach(unit => {
    const option1 = new Option(unit, unit);
    const option2 = new Option(unit, unit);
    fromUnit.appendChild(option1);
    toUnit.appendChild(option2);
  });
}

function convert() {
  const val = parseFloat(input.value);
  const from = fromUnit.value;
  const to = toUnit.value;
  const type = typeSelect.value;

  if (isNaN(val)) {
    output.value = "";
    return;
  }

  let result;

  if (type === "temperature") {
    result = convertTemp(val, from, to);
  } else {
    result = val / conversions[type][from] * conversions[type][to];
  }

  output.value = result.toFixed(4);
}

function convertTemp(value, from, to) {
  if (from === to) return value;

  if (from === "Celsius") {
    if (to === "Fahrenheit") return (value * 9/5) + 32;
    if (to === "Kelvin") return value + 273.15;
  }
  if (from === "Fahrenheit") {
    if (to === "Celsius") return (value - 32) * 5/9;
    if (to === "Kelvin") return ((value - 32) * 5/9) + 273.15;
  }
  if (from === "Kelvin") {
    if (to === "Celsius") return value - 273.15;
    if (to === "Fahrenheit") return (value - 273.15) * 9/5 + 32;
  }
}

typeSelect.addEventListener('change', () => {
  populateUnits(typeSelect.value);
  convert();
});

[input, fromUnit, toUnit].forEach(el => el.addEventListener('input', convert));

// Initialize on load
populateUnits(typeSelect.value);
