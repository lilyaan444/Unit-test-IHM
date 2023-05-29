function isLetter(str : string) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  
  class UnConducteur {
    private _no_permis: string;
    private _date_permis: string;
    private _nom: string;
    private _prenom: string;
  
    constructor(
      no_permis = "",
      date_permis = "",
      nom = "",
      prenom = ""
    ) {
      this._no_permis = no_permis;
      this._date_permis = date_permis;
      this._nom = nom;
      this._prenom = prenom;
    }
  
    get no_permis(): string {
      return this._no_permis;
    }
  
    set no_permis(no: string) {
      if (no.length === 4) {
        const firstLetter = isLetter(no[0]);
        const secondLetter = isLetter(no[1]);
        const thirdCharIsNumber = !isNaN(Number(no[2]));
        const fourthCharIsNumber = !isNaN(Number(no[3]));
  
        if (firstLetter && secondLetter && thirdCharIsNumber && fourthCharIsNumber) {
          this._no_permis = no;
        } else {
          throw new Error("Le numéro de permis doit être composé de deux lettres suivies de deux chiffres.");
        }
      } else {
        throw new Error("Le numéro de permis doit faire 4 caractères.");
      }
    }
  
    get date_permis(): string {
      return this._date_permis;
    }
  
    set date_permis(date: string) {
      const now = new Date();
      const dateParts = date.split("-");
      const year = Number(dateParts[0]);
      const month = Number(dateParts[1]);
      const day = Number(dateParts[2]);
  
      const isValidDate =
        dateParts.length === 3 &&
        year > 0 &&
        year < Number(now.getFullYear()) &&
        month > 0 &&
        month < 13 &&
        day > 0 &&
        day < 32;
  
      if (isValidDate) {
        this._date_permis = date;
      } else {
        throw new Error("La date d'obtention du permis est invalide.");
      }
    }
  
    get nom(): string {
      return this._nom;
    }
  
    set nom(no: string) {
      if (no.length < 2) {
        throw new Error("Le nom doit faire au moins 2 caractères");
      } else {
        for (const element of no) {
          if (element !== " " && element !== "-" && !isLetter(element)) {
            throw new Error("Le nom ne peut contenir que des lettres alphabétiques, des tirets et des espaces.");
          }
        }
        this._nom = no;
      }
    }
  
    get prenom(): string {
      return this._prenom;
    }
  
    set prenom(pre: string) {
      if (pre.length < 2) {
        throw new Error("Le prénom doit faire au moins 2 caractères.");
      } else {
        for (const element of pre) {
          if (element !== " " && element !== "-" && !isLetter(element)) {
            throw new Error("Le prénom ne peut contenir que des lettres alphabétiques, des tirets et des espaces.");
          }
        }
        this._prenom = pre;
      }
    }
  }
  
  export { UnConducteur };
  