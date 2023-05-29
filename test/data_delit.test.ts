import { UnTypDelit } from "../src/data_delit";




test("delit valeur", () => {
  try {
    let unTypDelit = new UnTypDelit();
    unTypDelit.id_delit = "2.3";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("L'id délit doit être un entier.");
    }
  }
});

test("Cas général delit", () => {
  let unTypDelit = new UnTypDelit();
  unTypDelit.id_delit = "4";
  expect(unTypDelit.id_delit).toBe("4");
});

// nature

test("Nature longueur", () => {
  try {
    let unTypDelit = new UnTypDelit();
    unTypDelit.nature = "mauvais";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("La nature doit être une chaîne d'au moins 9 caractères");
    }
  }
});

test("Cas général nature", () => {
  let unTypDelit = new UnTypDelit();
  unTypDelit.nature = "Ceci est correcte";
  expect(unTypDelit.nature).toBe("Ceci est correcte");
});

// tarif

test("Tarif lettre", () => {
  try {
    let unTypDelit = new UnTypDelit();
    unTypDelit.tarif = "trente";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("Le tarif doit être un nombre");
    }
  }

  try {
    let unTypDelit = new UnTypDelit();
    unTypDelit.tarif = "-50";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("Le tarif doit être un nombre positif");
    }
  }
});

test("Cas général tarif", () => {
  let unTypDelit = new UnTypDelit();
  unTypDelit.tarif = "9.99";
  expect(unTypDelit.tarif).toBe("9.99");
});
