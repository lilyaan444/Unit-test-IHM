import {connexion, APIsql} from "../modele/connexion.js"

class UnConducteur {
  private _noPermis : string;
  private _datePermis : string;
  private _nom : string;
  private _prenom : string;
  constructor(no_permis = "", date_permis = "", nom = "", prenom = ""){
    this._noPermis = no_permis;
    this._datePermis = date_permis;
    this._nom = nom;
    this._prenom = prenom;
  }

  get noPermis():string { return this._noPermis;}
  set noPermis(no_permis:string) { this._noPermis = no_permis;}
  get datePermis():string { return this._datePermis;}
  set datePermis(date_permis:string) { this._datePermis = date_permis;}
  get nom():string { return this._nom;}
  set nom(nom:string) { this._nom = nom;}
  get prenom():string { return this._prenom;}
  set prenom(prenom:string) { this._prenom = prenom;}

  ToArray():APIsql.TtabAsso {
    let tableau : APIsql.TtabAsso = {'noPermis':this.noPermis, 'datePermis':this.datePermis, 'nom':this.nom, 'prenom':this.prenom};
    return tableau;
  }
}

type TConducteurs = {[key: string]: UnConducteur};

class LesConducteurs {
  constructor() {
    //rien
  }

  private load(result : APIsql.TdataSet) : TConducteurs {
    const conducteurs : TConducteurs = {};
    for (let i = 0; i < result.length; i++) {
      const item:APIsql.TtabAsso = result[i];
      let conducteur = new UnConducteur(item['no_permis'], item['date_permis'], item['nom'], item['prenom']);
      conducteurs[conducteur.noPermis] = conducteur;
    }
    return conducteurs;
  }

  private prepare(where : string) : string {
    let sql = "SELECT no_permis, date_permis, nom, prenom";
    sql += " FROM conducteur";
    if (where !== "")
    {
      sql += " WHERE " + where;
    }
    return sql;
  }

  all() : TConducteurs {
    return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""),[]));
  }


byNoPermis(no_permis : string) : UnConducteur {
  let conducteur = new UnConducteur
  const conducteurs : TConducteurs = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("no_permis = ?"),[no_permis]));
  const lesCles: string[] = Object.keys(conducteurs);
  if(lesCles.length >0){
    conducteur = conducteurs[lesCles[0]];
  }
  return conducteur
}

toArray(conducteurs : TConducteurs) : APIsql.TdataSet {
  let T:APIsql.TdataSet = []
  for (let id in conducteurs){
    T.push(conducteurs[id].ToArray());
  }
  return T;
}
}

export {connexion}
export {UnConducteur}
export {LesConducteurs}
export {TConducteurs}
