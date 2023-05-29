import { UnConducteur } from "../src/data_conducteur";

// Date permis

test("Format date permis", () => {
  try {
    let conducteur = new UnConducteur();
    conducteur.date_permis = "2051-10-24";
  } catch (error) {
    if (error instanceof Error) {
      expect(error.message).toBe("La date d'obtention du permis est invalide.");
    }
  }
  try {
    let conducteur = new UnConducteur();
    conducteur.date_permis = "2012-13-24";
  } catch (error) {
    if (error instanceof Error) {
      expect(error.message).toBe("La date d'obtention du permis est invalide.");
    }
  }
  try {
    let conducteur = new UnConducteur();
    conducteur.date_permis = "2012-10-150";
  } catch (error) {
    if (error instanceof Error) {
      expect(error.message).toBe("La date d'obtention du permis est invalide.");
    }
  }
});

test("Cas général date permis", () => {
  let conducteur = new UnConducteur();
  conducteur.date_permis = "2021-02-02";
  expect(conducteur.date_permis).toBe("2021-02-02");
});

// No Permis

test("Format noPermis", () => {
  try {
    let conducteur = new UnConducteur();
    conducteur.no_permis = "";
  } catch (error) {
    if (error instanceof Error) {
      expect(error.message).toBe("Le numéro de permis doit faire 4 caractères.");
    }
  }
  try {
    let conducteur = new UnConducteur();
    conducteur.no_permis = "A1E2";
  } catch (error) {
    if (error instanceof Error) {
      expect(error.message).toBe("Le numéro de permis doit être composé de deux lettres suivies de deux chiffres.");
    }
  }
  try {
    let conducteur = new UnConducteur();
    conducteur.no_permis = "AE1E";
  } catch (error) {
    if (error instanceof Error) {
      expect(error.message).toBe("Le numéro de permis doit être composé de deux lettres suivies de deux chiffres.");
    }
  }
});

test("Cas général permis", () => {
  let conducteur = new UnConducteur();
  conducteur.no_permis = "AZ67";
  expect(conducteur.no_permis).toBe("AZ67");
});

// Nom

test("Format nom", () => {
  try {
    let conducteur = new UnConducteur();
    conducteur.nom = "c";
  } catch (error) {
    if (error instanceof Error) {
      expect(error.message).toBe("Le nom doit faire au moins 2 caractères");
    }
  }
  try {
    let conducteur = new UnConducteur();
    conducteur.nom = "c-e1";
  } catch (error) {
    if (error instanceof Error) {
      expect(error.message).toBe("Le nom ne peut contenir que des lettres alphabétiques, des tirets et des espaces.");
    }
  }
  try {
    let conducteur = new UnConducteur();
    conducteur.nom = "alexandre;";
  } catch (error) {
    if (error instanceof Error) {
      expect(error.message).toBe("Le nom ne peut contenir que des lettres alphabétiques, des tirets et des espaces.");
    }
  }
  try {
    let conducteur = new UnConducteur();
    conducteur.nom = "romain_";
  } catch (error) {
    if (error instanceof Error) {
      expect(error.message).toBe("Le nom ne peut contenir que des lettres alphabétiques, des tirets et des espaces.");
    }
  }
});

test("Cas général nom", () => {
  let conducteur = new UnConducteur();
  conducteur.nom = "Bidule";
  expect(conducteur.nom).toBe("Bidule");
  conducteur.nom = "De Olivera";
  expect(conducteur.nom).toBe("De Olivera");
  conducteur.nom = "Test-Nom";
  expect(conducteur.nom).toBe("Test-Nom");
});

// Prénom

test("Format prénom", () => {
  try {
    let conducteur = new UnConducteur();
    conducteur.prenom = "c";
  } catch (error) {
    if (error instanceof Error) {
      expect(error.message).toBe("Le prénom doit faire au moins 2 caractères.");
    }
  }
  try {
    let conducteur = new UnConducteur();
    conducteur.prenom = "c-e1";
  } catch (error) {
    if (error instanceof Error) {
      expect(error.message).toBe("Le prénom ne peut contenir que des lettres alphabétiques, des tirets et des espaces.");
    }
  }
  try {
    let conducteur = new UnConducteur();
    conducteur.prenom = "alexandre;";
  } catch (error) {
    if (error instanceof Error) {
      expect(error.message).toBe("Le prénom ne peut contenir que des lettres alphabétiques, des tirets et des espaces.");
    }
  }
  try {
    let conducteur = new UnConducteur();
    conducteur.prenom = "romain_";
  } catch (error) {
    if (error instanceof Error) {
      expect(error.message).toBe("Le prénom ne peut contenir que des lettres alphabétiques, des tirets et des espaces.");
    }
  }
});

test("Cas général prénom", () => {
  let conducteur = new UnConducteur();
  conducteur.prenom = "Bidule";
  expect(conducteur.prenom).toBe("Bidule");
  conducteur.prenom = "De Olivera";
  expect(conducteur.prenom).toBe("De Olivera");
  conducteur.prenom = "Test-Nom";
  expect(conducteur.prenom).toBe("Test-Nom");
});
