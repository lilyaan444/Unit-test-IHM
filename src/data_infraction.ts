function isLetter(str : string) {
    return str.length === 1 && str.match(/[a-z]/i);
  }
  
  class UneInfraction {
    private _id_inf: string;
    private _date_inf: string;
    private _no_immat: string;
    private _no_permis: string;
  
    constructor(id_inf = "", date_inf = "", no_immat = "", no_permis = "") {
      this._id_inf = id_inf;
      this._date_inf = date_inf;
      this._no_immat = no_immat;
      this._no_permis = no_permis;
    }
  
    get id_inf(): string {
      return this._id_inf;
    }
  
    set id_inf(id: string) {
      if (Number.isInteger(Number(id))) {
        this._id_inf = id;
      } else {
        throw new Error("L'id infraction doit être un entier.");
      }
    }
  
    get date_inf(): string {
      return this._date_inf;
    }
  
    set date_inf(date: string) {
      let now = new Date();
      if (
        date.split("-").length === 3 &&
        Number(date.split("-")[0]) > 0 &&
        Number(date.split("-")[0]) < Number(now.getFullYear()) &&
        Number(date.split("-")[1]) > 0 &&
        Number(date.split("-")[1]) < 13 &&
        Number(date.split("-")[2]) > 0 &&
        Number(date.split("-")[2]) < 32
      ) {
        this._date_inf = date;
      } else {
        throw new Error("La date d'infraction est invalide.");
      }
    }
  
    get no_immat(): string {
      return this._no_immat;
    }
  
    set no_immat(immat: string) {
      if (immat.length === 7) {
        if (
          isLetter(immat[0]) &&
          isLetter(immat[1]) &&
          !isNaN(Number(immat[2])) &&
          !isNaN(Number(immat[3])) &&
          !isNaN(Number(immat[4])) &&
          isLetter(immat[5]) &&
          isLetter(immat[6])
        ) {
          this._no_immat = immat;
        } else {
          throw new Error(
            "Le numéro d'immatriculation doit être composé de deux lettres, trois chiffres et deux lettres."
          );
        }
      } else {
        throw new Error(
          "Le numéro d'immatriculation doit faire 7 caractères (composé de deux lettres, trois chiffres et deux lettres)."
        );
      }
    }
  
    get no_permis(): string {
      return this._no_permis;
    }
  
    set no_permis(no: string) {
      if (no.length === 4) {
        if (
          isLetter(no[0]) &&
          isLetter(no[1]) &&
          !isNaN(Number(no[2])) &&
          !isNaN(Number(no[3]))
        ) {
          this._no_permis = no;
        } else {
          throw new Error(
            "Le numéro de permis doit être composé de deux lettres suivies de deux chiffres."
          );
        }
      } else {
        throw new Error("Le numéro de permis doit faire 4 caractères.");
      }
    }
  }
  
  export { UneInfraction };
  