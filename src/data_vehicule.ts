function isLetter(str : string) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

class UnVehicule { // définition de la classe gérant les données d’un véhicule
    private _noImmat: string;
    private _dateImmat: string;
    private _modele: string;
    private _marque: string;
    private _noPermis: string;
    constructor(no_immat = "", date_immat = "", modele = "", marque = "", no_permis = "") {
        this._noImmat = no_immat;
        this._dateImmat = date_immat;
        this._modele = modele;
        this._marque = marque;
        this._noPermis = no_permis;
    }

    // définition des « getters » et des « setters » pour la lecture/écriture des attributs privés de la classe
    get no_immat(): string { return this._noImmat; }
    set no_immat(no_immat: string) { if(no_immat.length === 7){
        if((isLetter(no_immat[0])) && (isLetter(no_immat[1])) && (!isNaN(Number(no_immat[2]))) && (!isNaN(Number(no_immat[3])))&& (!isNaN(Number(no_immat[4]))) && (isLetter(no_immat[5])) && (isLetter(no_immat[6]))){
            this._noImmat = no_immat;
        }
        else{
            throw new Error("Le numéro d'immatriculation doit etre composé de deux lettres, trois chiffres et deux lettres.")
        }
    }else{
        throw new Error("Le numéro d'immatriculation doit faire 7 caractères (composé de deux lettres, trois chiffres et deux lettres.)")
    } }
    get date_immat(): string { return this._dateImmat; }
    set date_immat(date_immat: string) {
        let now = new Date();
         if((date_immat.split("-").length === 3) && (Number(date_immat.split("-")[0]) > 0 && Number(date_immat.split("-")[0]) < Number(now.getFullYear())) && (Number(date_immat.split("-")[1]) > 0 && Number(date_immat.split("-")[1]) < 13) && (Number(date_immat.split("-")[2])) > 0 && Number(date_immat.split("-")[2]) < 32){ this._dateImmat = date_immat; } else {throw new Error("La date d'immatriculation est invalide")} }
    get modele(): string { return this._modele; }
    set modele(modele: string) { if(modele.length >= 1){
        this._modele = modele;
    }else{
        throw new Error("Le modele doit faire au moins un caractere.")
    } }
    get marque(): string { return this._marque; }
    set marque(marque: string) {
        if (marque.length < 3){ throw new Error("La marque doit faire 3 caracteres minimum.")}
        for (const element of marque){
            if (isNaN(Number(element)) === false){
                throw new Error("La marque ne doit contenir que des lettres et des espaces.");
            }
        }this._marque = marque; }
    get no_permis(): string { return this._noPermis; }
    set no_permis(no_permis: string) {if(no_permis.length === 4){
        if ((isLetter(no_permis[0])) && (isLetter(no_permis[1])) && (!isNaN(Number(no_permis[2]))) && (!isNaN(Number(no_permis[3])))){
            this._noPermis = no_permis;
        } else{
            throw new Error("Le numéro de permis doit etre composé de deux lettres suivies de deux chiffres.")
        }
    }else{
        throw new Error("Le numéro de permis doit faire 4 caractères.")
    } }
}

export { UnVehicule }