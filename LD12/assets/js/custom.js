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

/*--------------------------------------------------------------
# LD12 – Kompetencijų pažangos modulis (Skill Kanban)
--------------------------------------------------------------*/
(function () {
  "use strict";

  const board = document.querySelector(".kp-board");
  if (!board) return;

  const STORAGE_KEY = "cvSkillBoard";

  // Būsenos ir jų pavadinimai
  const STATUSES = {
    planuojama: "Planuojama",
    mokomasi: "Mokomasi",
    atlikta: "Atlikta",
  };

  // Pradinė įgūdžių būsena (8 įgūdžiai, 20–80 XP, iš viso 380 XP)
  const DEFAULT_SKILLS = [
    { id: 1, name: "HTML ir CSS", status: "atlikta", xp: 30 },
    { id: 2, name: "Git ir GitHub", status: "atlikta", xp: 20 },
    { id: 3, name: "Python", status: "atlikta", xp: 40 },
    { id: 4, name: "JavaScript", status: "mokomasi", xp: 50 },
    { id: 5, name: "C# ir .NET", status: "mokomasi", xp: 60 },
    { id: 6, name: "SQL duomenų bazės", status: "planuojama", xp: 45 },
    { id: 7, name: "Docker", status: "planuojama", xp: 55 },
    { id: 8, name: "Mašininis mokymasis", status: "planuojama", xp: 80 },
  ];

  // Lygių ir rangų lentelė
  const LEVELS = [
    { level: 1, min: 0, rank: "Pradedantysis" },
    { level: 2, min: 50, rank: "Praktikantas" },
    { level: 3, min: 150, rank: "Specialistas" },
    { level: 4, min: 300, rank: "Profesionalas" },
  ];

  // Pasiekimai: sąlyga tikrinama kiekvieną kartą perskaičiuojant progresą
  const ACHIEVEMENTS = [
    {
      id: "atradejas",
      title: "Įgūdžių atradėjas",
      description: "Atlikite bent 1 įgūdį",
      icon: "bi-compass",
      isUnlocked: (progress) => progress.doneCount >= 1,
    },
    {
      id: "meistras",
      title: "Įgūdžių meistras",
      description: "Atlikite bent 4 įgūdžius",
      icon: "bi-tools",
      isUnlocked: (progress) => progress.doneCount >= 4,
    },
    {
      id: "ekspertas",
      title: "Įgūdžių ekspertas",
      description: "Pasiekite 4 lygį",
      icon: "bi-trophy",
      isUnlocked: (progress) => progress.level >= 4,
    },
  ];

  let skills = loadSkills();

  /* ---------- 1. Duomenų įkėlimas iš Local Storage ---------- */
  function loadSkills() {
    const fresh = DEFAULT_SKILLS.map((skill) => ({ ...skill }));
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!Array.isArray(saved)) return fresh;
      // Atkuriamos tik būsenos; pavadinimai ir XP imami iš pradinio masyvo
      fresh.forEach((skill) => {
        const match = saved.find((s) => s.id === skill.id);
        if (match && STATUSES[match.status]) skill.status = match.status;
      });
    } catch (e) {
      // Local Storage nepasiekiama arba duomenys sugadinti – naudojama pradinė būsena
    }
    return fresh;
  }

  /* ---------- 2. Duomenų išsaugojimas į Local Storage ---------- */
  function saveSkills() {
    try {
      const state = skills.map((skill) => ({ id: skill.id, status: skill.status }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Jei saugykla nepasiekiama, modulis vis tiek veikia
    }
  }

  /* ---------- 3. Įgūdžių kortelių generavimas ---------- */
  function createSkillCard(skill) {
    const card = document.createElement("div");
    card.className = "kp-card kp-card-" + skill.status;

    const title = document.createElement("h5");
    title.className = "kp-card-title";
    title.textContent = skill.name;

    const xp = document.createElement("span");
    xp.className = "kp-card-xp";
    xp.textContent = skill.xp + " XP";

    const actions = document.createElement("div");
    actions.className = "kp-card-actions";

    Object.entries(STATUSES).forEach(([status, label]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = label;
      btn.className = "kp-status-btn";
      const isCurrent = skill.status === status;
      btn.classList.toggle("is-current", isCurrent);
      btn.setAttribute("aria-pressed", String(isCurrent));
      btn.addEventListener("click", () => changeStatus(skill.id, status));
      actions.appendChild(btn);
    });

    const header = document.createElement("div");
    header.className = "kp-card-header";
    header.append(title, xp);

    card.append(header, actions);
    return card;
  }

  function renderBoard() {
    Object.keys(STATUSES).forEach((status) => {
      const list = board.querySelector('[data-list="' + status + '"]');
      const inColumn = skills.filter((skill) => skill.status === status);

      list.innerHTML = "";
      inColumn.forEach((skill) => list.appendChild(createSkillCard(skill)));

      if (inColumn.length === 0) {
        const empty = document.createElement("p");
        empty.className = "kp-empty";
        empty.textContent = "Įgūdžių nėra";
        list.appendChild(empty);
      }

      board.querySelector('[data-count="' + status + '"]').textContent = inColumn.length;
    });
  }

  /* ---------- 4. Būsenos keitimas ---------- */
  function changeStatus(id, newStatus) {
    const skill = skills.find((s) => s.id === id);
    if (!skill || skill.status === newStatus) return;
    skill.status = newStatus;
    saveSkills();
    updateModule();
  }

  /* ---------- 5. XP, lygio ir rango skaičiavimas ---------- */
  function calculateProgress() {
    const doneSkills = skills.filter((skill) => skill.status === "atlikta");
    const xp = doneSkills.reduce((sum, skill) => sum + skill.xp, 0);

    // Randamas aukščiausias lygis, kurio riba jau pasiekta
    let current = LEVELS[0];
    LEVELS.forEach((lvl) => {
      if (xp >= lvl.min) current = lvl;
    });
    const next = LEVELS.find((lvl) => lvl.level === current.level + 1);

    // Progresas nuo einamojo lygio pradžios iki kito lygio ribos
    let percent;
    if (next) {
      percent = ((xp - current.min) / (next.min - current.min)) * 100;
    } else {
      percent = 100; // 4 lygis – maksimalus progresas
    }

    return {
      xp,
      level: current.level,
      rank: current.rank,
      next,
      percent: Math.round(percent),
      doneCount: doneSkills.length,
      total: skills.length,
    };
  }

  /* ---------- 6. Progreso ir statistikos atvaizdavimas ---------- */
  function renderProgress(progress) {
    document.getElementById("kp-xp").textContent = progress.xp;
    document.getElementById("kp-level").textContent = progress.level;
    document.getElementById("kp-rank").textContent = progress.rank;

    const bar = document.getElementById("kp-progress-bar");
    bar.style.width = progress.percent + "%";
    bar.parentElement.setAttribute("aria-valuenow", String(progress.percent));

    const text = document.getElementById("kp-progress-text");
    if (progress.next) {
      text.textContent =
        progress.percent + "% iki " + progress.next.level + " lygio (" +
        progress.xp + " / " + progress.next.min + " XP)";
    } else {
      text.textContent = "100% – pasiektas maksimalus lygis!";
    }

    const percentDone = progress.total ? Math.round((progress.doneCount / progress.total) * 100) : 0;
    document.getElementById("kp-total").textContent = progress.total;
    document.getElementById("kp-done").textContent = progress.doneCount;
    document.getElementById("kp-percent").textContent = percentDone + "%";
  }

  /* ---------- 7. Vartotojo ikonėlė pagal lygį (if / else) ---------- */
  function updateAvatar(level) {
    const avatar = document.getElementById("kp-avatar");
    let src;

    if (level === 1) {
      src = "assets/img/avatar-lvl1.svg";
    } else if (level === 2) {
      src = "assets/img/avatar-lvl2.svg";
    } else if (level === 3) {
      src = "assets/img/avatar-lvl3.svg";
    } else {
      src = "assets/img/avatar-lvl4.svg";
    }

    if (avatar.getAttribute("src") !== src) {
      avatar.setAttribute("src", src);
      avatar.classList.remove("kp-avatar-pop");
      void avatar.offsetWidth; // iš naujo paleidžiama animacija
      avatar.classList.add("kp-avatar-pop");
    }
    avatar.alt = "Vartotojo ikonėlė – " + level + " lygis";
  }

  /* ---------- 8. Pasiekimų atvaizdavimas ---------- */
  function renderAchievements(progress) {
    const container = document.getElementById("kp-achievements");
    container.innerHTML = "";

    ACHIEVEMENTS.forEach((achievement) => {
      const unlocked = achievement.isUnlocked(progress);

      const card = document.createElement("div");
      card.className = "kp-achievement " + (unlocked ? "is-unlocked" : "is-locked");

      const icon = document.createElement("i");
      icon.className = "bi " + (unlocked ? achievement.icon : "bi-lock-fill");

      const body = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = achievement.title;
      const desc = document.createElement("small");
      desc.textContent = achievement.description;
      const state = document.createElement("span");
      state.className = "kp-achievement-state";
      state.textContent = unlocked ? "Atrakinta" : "Neatrakinta";
      body.append(title, desc, state);

      card.append(icon, body);
      container.appendChild(card);
    });
  }

  /* ---------- Viso modulio atnaujinimas ---------- */
  function updateModule() {
    const progress = calculateProgress();
    renderBoard();
    renderProgress(progress);
    updateAvatar(progress.level);
    renderAchievements(progress);
  }

  // Pradinės būsenos atkūrimas (išvaloma Local Storage)
  document.getElementById("kp-reset").addEventListener("click", () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    skills = DEFAULT_SKILLS.map((skill) => ({ ...skill }));
    updateModule();
  });

  updateModule();
})();
