class UnTypDelit {
    private _idDelit: string;
    private _nature: string;
    private _tarif: string;
  
    constructor(id_delit = "", nature = "", tarif = "") {
      this._idDelit = id_delit;
      this._nature = nature;
      this._tarif = tarif;
    }
  
    get id_delit(): string {
      return this._idDelit;
    }
  
    set id_delit(id: string) {
      if (Number.isInteger(Number(id))) {
        this._idDelit = id;
      } else {
        throw new Error("L'id délit doit être un entier.");
      }
    }
  
    get nature(): string {
      return this._nature;
    }
  
    set nature(nature: string) {
      if (nature.length >= 9) {
        this._nature = nature;
      } else {
        throw new Error("La nature doit être une chaîne d'au moins 9 caractères");
      }
    }
  
    get tarif(): string {
      return this._tarif;
    }
  
    set tarif(tarif: string) {
      if (!isNaN(Number(tarif))) {
        if (Number(tarif) >= 0) {
          this._tarif = tarif;
        } else {
          throw new Error("Le tarif doit être un nombre positif");
        }
      } else {
        throw new Error("Le tarif doit être un nombre");
      }
    }
  }
  
  export { UnTypDelit };
  