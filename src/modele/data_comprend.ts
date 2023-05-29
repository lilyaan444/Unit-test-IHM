import { APIsql} from "../modele/connexion.js"

class LesComprend {
    private _idInf : string;
    private _idDelit : string;

    constructor(id_inf = "", id_delit = ""){
        this._idInf = id_inf;
        this._idDelit = id_delit;
    }
    get idInf():string { return this._idInf;}
    set idInf(id_inf:string) { this._idInf = id_inf;}
    get idDelit():string { return this._idDelit;}
    set idDelit(id_delit:string) { this._idDelit = id_delit;}

    ToArray():APIsql.TtabAsso {
        let tableau : APIsql.TtabAsso = {'idDelit':this.idDelit, 'idInf':this.idInf};
        return tableau;
    }
}

type TComprend = {[key: string]: LesComprend};

class LesComprendDelits {
  constructor() {
    //rien
  }

  private load(result : APIsql.TdataSet) : TComprend {
    const comprend : TComprend = {};
    for (let i = 0; i < result.length; i++) {
        const item:APIsql.TtabAsso = result[i];
        let comprendDelit = new LesComprend(item['id_inf'], item['id_delit']);
        comprend[comprendDelit.idInf] = comprendDelit;
    }
    return comprend;
    }

    private prepare(where : string) : string {
        let sql = "SELECT id_inf, id_delit";
        sql += " FROM comprend";
        if (where !== "")
        {
            sql += " WHERE " + where;
        }
        return sql;
    }


byNumInfractionIdDelit(num_infraction : string) : LesComprend {
	// renvoie l’objet de l’équipement id_delit contenu dans la infraction num_infraction
		let typDelitByInfraction = new LesComprend;
		const typDelitsByInfraction : TComprend = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_inf = ?"),[num_infraction]));
		if ( !typDelitsByInfraction [0] === undefined) {
			typDelitByInfraction = typDelitsByInfraction[0];
		}
		return typDelitByInfraction;	
	}

    getDelitsByInfraction(idInfraction: string): LesComprend[] {
        const comprendDelits: LesComprend[] = [];
        const comprend: TComprend = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_inf = ?"), [idInfraction]));
    
        for (const key in comprend) {
          if (comprend.hasOwnProperty(key)) {
            comprendDelits.push(comprend[key]);
          }
        }
    
        return comprendDelits;
      }
}

export {LesComprend}
export {LesComprendDelits}
export {TComprend}
