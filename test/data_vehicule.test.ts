import { UnVehicule } from "../src/data_vehicule"


test("Format no immat", () => {
  try {
    let unVehicule = new UnVehicule();
    unVehicule.no_immat = "1A523E1";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("Le numéro d'immatriculation doit etre composé de deux lettres, trois chiffres et deux lettres.");
    }
  }
  try {
    let unVehicule = new UnVehicule();
    unVehicule.no_immat = "AE153E"
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("Le numéro d'immatriculation doit faire 7 caractères (composé de deux lettres, trois chiffres et deux lettres.)");
    }
  }
});

test("Cas général no immat", () => {
  let unVehicule = new UnVehicule();
  unVehicule.no_immat = "AE150VD";
  expect(unVehicule.no_immat).toBe("AE150VD");
});

//Date Immat

test("Format date immat", () => {
  try {
    let unVehicule = new UnVehicule();
    unVehicule.date_immat = "2051-10-24";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("La date d'immatriculation est invalide");
    }
  }
  try {
    let unVehicule = new UnVehicule();
    unVehicule.date_immat = "2012-13-24";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("La date d'immatriculation est invalide");
    }
  }
  try {
    let unVehicule = new UnVehicule();
    unVehicule.date_immat = "2012-10-150";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("La date d'immatriculation est invalide");
    }
  }
});

test("cas général date immat", () => {
  let unVehicule = new UnVehicule();
  unVehicule.date_immat = "2021-02-02";
  expect(unVehicule.date_immat).toBe("2021-02-02");
});

//Marque

test("Format marque", () => {
  try {
    let unVehicule = new UnVehicule();
    unVehicule.marque = "re";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("La marque doit faire 3 caracteres minimum.");
    }
  }
  try {
    let unVehicule = new UnVehicule();
    unVehicule.marque = "renault145";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("La marque ne doit contenir que des lettres et des espaces.");
    }
  }
  try {
    let unVehicule = new UnVehicule();
    unVehicule.marque = "rel res 2";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("La marque ne doit contenir que des lettres et des espaces.");
    }
  }
});

test("cas général marque", () => {
  let unVehicule = new UnVehicule();
  unVehicule.marque = "citroen";
  expect(unVehicule.marque).toBe("citroen");
})

//Modele

test("Format modele", () => {
  try {
    let unVehicule = new UnVehicule();
    unVehicule.modele = "";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("Le modele doit faire au moins un caractere.");
    }
  }
});

test("cas général modele", () => {
  let unVehicule = new UnVehicule();
  unVehicule.modele = "C3";
  expect(unVehicule.modele).toBe("C3");
});

//no Permis

test("Format noPermis", () => {
  try {
    let unVehicule = new UnVehicule();
    unVehicule.no_permis = "";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("Le numéro de permis doit faire 4 caractères.");
    }
  }
  try {
    let unVehicule = new UnVehicule();
    unVehicule.no_permis = "A1E2";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("Le numéro de permis doit etre composé de deux lettres suivies de deux chiffres.");
    }
  }
  try {
    let unVehicule = new UnVehicule();
    unVehicule.no_permis = "AE1E";
  } catch (e) {
    if (e instanceof Error) {
      expect(e.message).toBe("Le numéro de permis doit etre composé de deux lettres suivies de deux chiffres.");
    }
  }
});

test("cas général permis", () => {
  let unVehicule = new UnVehicule();
  unVehicule.no_permis = "AZ67";
  expect(unVehicule.no_permis).toBe("AZ67");
});
