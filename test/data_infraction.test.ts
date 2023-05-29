import { UneInfraction } from "../src/data_infraction";

// id Infraction
test("Format idInf", () => {
  try {
    let x = new UneInfraction();
    x.id_inf = String(1.5);
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("L'id infraction doit être un entier.");
    }
  }
});

test("cas général idInf", () => {
  let x = new UneInfraction();
  x.id_inf = String(10);
  expect(x.id_inf).toBe("10");
});

// Date infraction

test("Format date infraction", () => {
  try {
    let x = new UneInfraction();
    x.date_inf = "2051-10-24";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("La date d'infraction est invalide.");
    }
  }
  try {
    let x = new UneInfraction();
    x.date_inf = "2012-13-24";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("La date d'infraction est invalide.");
    }
  }
  try {
    let x = new UneInfraction();
    x.date_inf = "2012-10-150";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("La date d'infraction est invalide.");
    }
  }
});

test("cas général date infraction", () => {
  let x = new UneInfraction();
  x.date_inf = "2021-02-02";
  expect(x.date_inf).toBe("2021-02-02");
});

// no Immat

test("Format no immat", () => {
  try {
    let x = new UneInfraction();
    x.no_immat = "1A523E1";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe(
        "Le numéro d'immatriculation doit être composé de deux lettres, trois chiffres et deux lettres."
      );
    }
  }
  try {
    let x = new UneInfraction();
    x.no_immat = "AE153E";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe(
        "Le numéro d'immatriculation doit faire 7 caractères (composé de deux lettres, trois chiffres et deux lettres)."
      );
    }
  }
});

test("Cas général no immat", () => {
  let x = new UneInfraction();
  x.no_immat = "AE150VD";
  expect(x.no_immat).toBe("AE150VD");
});

// no Permis

test("Format noPermis", () => {
  try {
    let x = new UneInfraction();
    x.no_permis = "";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("Le numéro de permis doit faire 4 caractères.");
    }
  }
  try {
    let x = new UneInfraction();
    x.no_permis = "A1E2";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe(
        "Le numéro de permis doit être composé de deux lettres suivies de deux chiffres."
      );
    }
  }
  try {
    let x = new UneInfraction();
    x.no_permis = "AE1E";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe(
        "Le numéro de permis doit être composé de deux lettres suivies de deux chiffres."
      );
    }
  }
});

test("cas général permis", () => {
  let x = new UneInfraction();
  x.no_permis = "AZ67";
  expect(x.no_permis).toBe("AZ67");
});
