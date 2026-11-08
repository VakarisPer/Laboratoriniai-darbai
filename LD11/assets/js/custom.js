/*==============================================================
  custom.js – nuosavas CV svetainės JavaScript
  Autorius: Vakaris Perliba
==============================================================*/

/*--------------------------------------------------------------
# LD11 – Kontaktų forma
--------------------------------------------------------------*/
(function () {
  "use strict";

  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitBtn = document.getElementById("f-submit");
  const clearBtn = document.getElementById("f-clear");
  const resultBox = document.getElementById("form-result");
  const resultData = document.getElementById("form-result-data");
  const resultAverage = document.getElementById("form-result-average");

  // Formos laukai
  const fields = {
    vardas: document.getElementById("f-vardas"),
    pavarde: document.getElementById("f-pavarde"),
    email: document.getElementById("f-email"),
    telefonas: document.getElementById("f-telefonas"),
    adresas: document.getElementById("f-adresas"),
    q1: document.getElementById("f-q1"),
    q2: document.getElementById("f-q2"),
    q3: document.getElementById("f-q3"),
  };

  // Laukai, kuriuos vartotojas jau „palietė“ – klaidas rodome tik jiems
  const touched = new Set();

  // Reguliariosios išraiškos
  const LETTERS_ONLY = /^\p{L}+$/u; // tik raidės (įskaitant lietuviškas)
  const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_FORMAT = /^\+370 6\d{2} \d{5}$/; // +370 6xx xxxxx

  /* ---------- Validacijos taisyklės: grąžina klaidos tekstą arba "" ---------- */
  function validateName(value, label, labelAcc) {
    if (value === "") return label + " yra privalomas laukas.";
    if (!LETTERS_ONLY.test(value)) return labelAcc + " gali sudaryti tik raidės.";
    return "";
  }

  function validateRating(value) {
    if (value === "") return "Įveskite įvertinimą.";
    const n = Number(value);
    if (!Number.isInteger(n) || n < 1 || n > 10) return "Įvertinimas turi būti sveikas skaičius nuo 1 iki 10.";
    return "";
  }

  const validators = {
    vardas: (v) => validateName(v, "Vardas", "Vardą"),
    pavarde: (v) => validateName(v, "Pavardė", "Pavardę"),
    email: (v) => {
      if (v === "") return "El. paštas yra privalomas laukas.";
      if (!EMAIL_FORMAT.test(v)) return "Neteisingas el. pašto formatas (pvz., vardenis@pastas.lt).";
      return "";
    },
    telefonas: (v) => {
      if (v === "") return "Telefono numeris yra privalomas laukas.";
      if (!PHONE_FORMAT.test(v)) return "Numeris turi būti formatu +370 6xx xxxxx.";
      return "";
    },
    adresas: (v) => {
      if (v === "") return "Adresas yra privalomas laukas.";
      if (v.length < 5) return "Adresas per trumpas.";
      return "";
    },
    q1: validateRating,
    q2: validateRating,
    q3: validateRating,
  };

  /* ---------- Vieno lauko patikrinimas ir klaidos rodymas ---------- */
  function checkField(name, showError) {
    const input = fields[name];
    const error = validators[name](input.value.trim());
    const errorBox = document.getElementById(input.id + "-error");

    if (showError) {
      errorBox.textContent = error;
      input.classList.toggle("is-invalid", error !== "");
      input.classList.toggle("is-valid", error === "");
    }
    return error === "";
  }

  /* ---------- Ar visa forma teisinga? „Siųsti“ aktyvus tik tada ---------- */
  function updateSubmitState() {
    // map() patikrina VISUS laukus (every() sustotų ties pirmu klaidingu)
    const results = Object.keys(fields).map((name) => checkField(name, touched.has(name)));
    const allValid = results.every(Boolean);
    submitBtn.disabled = !allValid;
    return allValid;
  }

  /* ---------- Telefono numerio formatavimas realiu laiku ---------- */
  function formatPhone(raw) {
    let digits;
    if (raw.startsWith("+370")) {
      digits = raw.slice(4).replace(/\D/g, "");
    } else {
      digits = raw.replace(/\D/g, "");
      if (digits.startsWith("370")) digits = digits.slice(3);
      else if (digits.startsWith("8")) digits = digits.slice(1); // 86xxxxxxx -> 6xxxxxxx
    }
    digits = digits.slice(0, 8); // ilgis ribojamas: 8 skaitmenys po +370

    if (digits.length === 0) return "";
    let result = "+370 " + digits.slice(0, 3);
    if (digits.length > 3) result += " " + digits.slice(3);
    return result;
  }

  // Leidžiame įvesti tik skaitmenis
  fields.telefonas.addEventListener("beforeinput", (e) => {
    if (e.data && /\D/.test(e.data) && e.inputType !== "insertFromPaste") {
      e.preventDefault();
    }
  });

  fields.telefonas.addEventListener("input", () => {
    fields.telefonas.value = formatPhone(fields.telefonas.value);
  });

  /* ---------- Validacija realiu laiku ---------- */
  Object.entries(fields).forEach(([name, input]) => {
    input.addEventListener("input", () => {
      touched.add(name);
      updateSubmitState();
    });
    input.addEventListener("blur", () => {
      touched.add(name);
      updateSubmitState();
    });
  });

  /* ---------- Formos pateikimas ---------- */
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // puslapis neperkraunamas

    Object.keys(fields).forEach((name) => touched.add(name));
    if (!updateSubmitState()) return;

    // Visos reikšmės surenkamos į objektą
    const formData = {
      vardas: fields.vardas.value.trim(),
      pavarde: fields.pavarde.value.trim(),
      email: fields.email.value.trim(),
      telefonas: fields.telefonas.value.trim(),
      adresas: fields.adresas.value.trim(),
      vertinimas1: Number(fields.q1.value),
      vertinimas2: Number(fields.q2.value),
      vertinimas3: Number(fields.q3.value),
    };

    console.log("Kontaktų formos duomenys:", formData);

    showResult(formData);
  });

  /* ---------- Duomenų ir vidurkio atvaizdavimas po forma ---------- */
  function showResult(data) {
    const rows = [
      ["Vardas", data.vardas],
      ["Pavardė", data.pavarde],
      ["El. paštas", data.email],
      ["Tel. numeris", data.telefonas],
      ["Adresas", data.adresas],
      ["Svetainės dizainas", data.vertinimas1],
      ["Informacijos paieška", data.vertinimas2],
      ["Rekomendacija", data.vertinimas3],
    ];

    resultData.innerHTML = "";
    rows.forEach(([label, value]) => {
      const p = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = label + ": ";
      p.appendChild(strong);
      p.appendChild(document.createTextNode(String(value)));
      resultData.appendChild(p);
    });

    const average = (data.vertinimas1 + data.vertinimas2 + data.vertinimas3) / 3;
    resultAverage.textContent = data.vardas + " " + data.pavarde + ": " + average.toFixed(1);

    resultBox.hidden = false;
  }

  /* ---------- Mygtukas „Išvalyti“ ---------- */
  clearBtn.addEventListener("click", () => {
    form.reset();
    touched.clear();

    Object.values(fields).forEach((input) => {
      input.classList.remove("is-invalid", "is-valid");
      document.getElementById(input.id + "-error").textContent = "";
    });

    resultData.innerHTML = "";
    resultAverage.textContent = "";
    resultBox.hidden = true;
    submitBtn.disabled = true;
  });

  updateSubmitState();
})();
