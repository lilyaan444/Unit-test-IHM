import {connexion, APIsql} from "../modele/connexion.js"
class UnVehicule {
  private _noImmat : string;
  private _dateImmat : string;
  private _modele : string;
  private _marque : string;
  private _noPermis : string;
  constructor(no_immat = "", date_immat = "", modele = "", marque = "", no_permis = ""){
    this._noImmat = no_immat;
    this._dateImmat = date_immat;
    this._modele = modele;
    this._marque = marque;
    this._noPermis = no_permis;
  }

  get noImmat():string { return this._noImmat;}
  set noImmat(no_immat:string) { this._noImmat = no_immat;}
  get dateImmat():string { return this._dateImmat;}
  set dateImmat(date_immat:string) { this._dateImmat = date_immat;}
  get modele():string { return this._modele;}
  set modele(modele:string) { this._modele = modele;}
  get marque():string { return this._marque;}
  set marque(marque:string) { this._marque = marque;}
  get noPermis():string { return this._noPermis;}
  set noPermis(no_permis:string) { this._noPermis = no_permis;}

  ToArray():APIsql.TtabAsso {
    let tableau : APIsql.TtabAsso = {'noImmat':this.noImmat, 'dateImmat':this.dateImmat, 'model':this.modele, 'marque':this.marque, 'noPermis':this.noPermis};
    return tableau;
  }
}

type TVehicules = {[key: string]: UnVehicule};

class LesVehicules {
  //défintion de la classe
  constructor(){
    //rien
  }

  idExiste(no_immat : string) : boolean {
  //vérif que le véhicule existe
  //sert pour l'ajout 
  return (APIsql.sqlWeb.SQLloadData("SELECT no_immat FROM vehicule WHERE no_immat=?", [no_immat]).length > 0);
  }

  private load(result : APIsql.TdataSet) : TVehicules {
    let vehicules : TVehicules = {}
    for (let i=0; i<result.length; i++){
      const item:APIsql.TtabAsso = result[i];
      let vehicule = new UnVehicule(item['no_immat'], item['date_immat'], item['modele'], item['marque'], item['no_permis']);
      vehicules[vehicule.noImmat] = vehicule;
    }
    return vehicules;
    }

  private prepare(where : string) : string {
    let sql = "SELECT no_immat, date_immat, modele, marque, no_permis";
    sql += " FROM vehicule";
    if (where !== "")
    {
      sql += " WHERE " + where;
    }
    return sql;
  }

  all() : TVehicules {
    //retourne tous les véhicules
    return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""),[]));
  }

  byNumImmat(no_immat : string) : UnVehicule{
    //retourne le véhicule correspondant à l'id
    let vehicule = new UnVehicule;
    const vehicules : TVehicules = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("no_immat=?"),[no_immat]));
    const lesCles: string[] = Object.keys(vehicules);
    if (lesCles.length > 0) {
      vehicule = vehicules[lesCles[0]];
    }
    return vehicule;
  }

  toArrray(vehicules : TVehicules) : APIsql.TdataSet {
    let T:APIsql.TdataSet = [];
    for (let id in vehicules) {
      T.push(vehicules[id].ToArray());
    }
    return T;
  }

  delete(no_immat : string):boolean {
    //supprime le véhicule correspondant à l'id
    let sql : string;
    sql = "DELETE FROM vehicule WHERE no_immat=?";
    return APIsql.sqlWeb.SQLexec(sql,[no_immat]);
  }
  insert(vehicule : UnVehicule):boolean{
    //ajoute le véhicule
    let sql : string;
    sql = "INSERT INTO vehicule (no_immat, date_immat, modele, marque, no_permis) VALUES (?,?,?,?,?)";
    return APIsql.sqlWeb.SQLexec(sql,[vehicule.noImmat, vehicule.dateImmat, vehicule.modele, vehicule.marque, vehicule.noPermis]);
  }
  update(vehicule : UnVehicule):boolean {
    //met à jour le véhicule
    let sql : string;
    sql = "UPDATE vehicule SET date_immat=?, modele=?, marque=?, no_permis=?";
    sql += " WHERE no_immat=?";
    return APIsql.sqlWeb.SQLexec(sql,[vehicule.dateImmat, vehicule.modele, vehicule.marque, vehicule.noPermis, vehicule.noImmat]);
  }
}

export {connexion}
export {UnVehicule}
export{LesVehicules}
export {TVehicules}