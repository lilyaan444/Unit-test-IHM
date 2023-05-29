import {connexion, APIsql} from "../modele/connexion.js"

class UneInfraction {
  //défintion de la classe
  private _idInf : string;
  private _dateInf : string;
  private _noImmat : string;
  private _noPermis : string;
  constructor(id_inf = "", date_inf = "", no_immat = "", no_permis = ""){
    this._idInf = id_inf;
    this._dateInf = date_inf;
    this._noImmat = no_immat;
    this._noPermis = no_permis;
  }

  get idInf():string { return this._idInf;}
  set idInf(id_inf:string) { this._idInf = id_inf;}
  get dateInf():string { return this._dateInf;}
  set dateInf(date_inf:string) { this._dateInf = date_inf;}
  get noImmat():string { return this._noImmat;}
  set noImmat(no_immat:string) { this._noImmat = no_immat;}
  get noPermis():string { return this._noPermis;}
  set noPermis(no_permis:string) { this._noPermis = no_permis;}

  ToArray():APIsql.TtabAsso {
    let tableau : APIsql.TtabAsso = {'idInf':this.idInf, 'dateInf':this.dateInf, 'noImmat':this.noImmat, 'noPermis':this.noPermis};
    return tableau;
  }
}

type TInfractions = {[key: string]: UneInfraction};

class LesInfractions {
  //défintion de la classe
  constructor(){
    //rien
  }

   getLastNumInfraction(): string {
    const lesInfractions = new LesInfractions();
    const infractions = lesInfractions.all();
    let lastNumInfraction = "";
  
    for (let id in infractions) {
      const infraction = infractions[id];
      const idInfraction = infraction.idInf;
      if (idInfraction > lastNumInfraction) {
        lastNumInfraction = idInfraction;
      }
    }
  
    return lastNumInfraction;
  }

  idExiste(id_inf : string) : boolean {
  //vérif que le véhicule existe
  //sert pour l'ajout 
  return (APIsql.sqlWeb.SQLloadData("SELECT id_inf FROM infraction WHERE id_inf=?", [id_inf]).length > 0);
  }

  private load(result : APIsql.TdataSet) : TInfractions {
    let infractions : TInfractions = {}
    for (let i=0; i<result.length; i++){
      const item:APIsql.TtabAsso = result[i];
      let infraction = new UneInfraction(item['id_inf'], item['date_inf'], item['no_immat'], item['no_permis']);
      infractions[infraction.idInf] = infraction;
    }
    return infractions;
    }

  private prepare(where : string) : string {
    let sql = "SELECT id_inf, date_inf, no_immat, no_permis";
    sql += " FROM infraction";
    if (where !== "")
    {
      sql += " WHERE " + where;
    }
    return sql;
  }

  all() : TInfractions {
    //retourne tous les véhicules
    return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""),[]));
  }

  bynoImmat(id_inf : string) : UneInfraction{
    //retourne le véhicule correspondant à l'id
    let infraction = new UneInfraction;
    const infractions : TInfractions = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_inf=?"),[id_inf]));
    const lesCles: string[] = Object.keys(infractions);
    if (lesCles.length > 0) {
      infraction = infractions[lesCles[0]];
    }
    return infraction;
  }

  toArrray(infractions : TInfractions) : APIsql.TdataSet {
    let T:APIsql.TdataSet = [];
    for (let id in infractions) {
      T.push(infractions[id].ToArray());
    }
    return T;
  }

  delete(id_inf : string):boolean {
    //supprime le véhicule correspondant à l'id
    let sql : string;
    sql = "DELETE FROM infraction WHERE id_inf=?";
    return APIsql.sqlWeb.SQLexec(sql,[id_inf]);
  }
  insert(infraction : UneInfraction):boolean{
    //ajoute le véhicule
    let sql : string;
    sql = "INSERT INTO infraction(id_inf, date_inf, no_immat, no_permis) VALUES (?,?,?,?)";
    return APIsql.sqlWeb.SQLexec(sql,[infraction.idInf, infraction.dateInf, infraction.noImmat, infraction.noPermis]);
  }
  update(infraction : UneInfraction):boolean {
    //met à jour le véhicule
    let sql : string;
    sql = "UPDATE infraction SET date_inf=?, no_immat=?, no_permis=? WHERE id_inf=?";
    return APIsql.sqlWeb.SQLexec(sql,[infraction.dateInf, infraction.noImmat, infraction.noPermis, infraction.idInf]);
  }
}

export {connexion}
export {UneInfraction}
export{LesInfractions}
export {TInfractions}