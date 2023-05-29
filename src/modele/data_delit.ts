import {connexion, APIsql} from "../modele/connexion.js"

class UnTypeDelit {
  //definition des classes
  private _idDelit : string;
  private _nature : string;
  private _tarif : string;
  private _idInf : string;
  constructor(id_delit = "", nature = "", tarif = "", id_inf = ""){
    this._idDelit = id_delit;
    this._nature = nature;
    this._tarif = tarif;
	this._idInf = id_inf;
  }

  get idDelit():string { return this._idDelit;}
  set idDelit(id_delit:string) { this._idDelit = id_delit;}
  get nature():string { return this._nature;}
  set nature(nature:string) { this._nature = nature;}
  get tarif():string { return this._tarif;}
  set tarif(tarif:string) { this._tarif = tarif;}
  get idInf():string { return this._idInf;}
  set idInf(id_inf:string) { this._idInf = id_inf;}

  ToArray():APIsql.TtabAsso {
    let tableau : APIsql.TtabAsso = {'idDelit':this.idDelit, 'nature':this.nature, 'tarif':this.tarif, 'idInf':this.idInf};
    return tableau;
  }
}



type TTypeDelits = {[key: string]: UnTypeDelit };

class LesTypeDelits {				 
	constructor () {
		// rien
	}

	private load(result : APIsql.TdataSet) : TTypeDelits
	{
		let typDelits : TTypeDelits = {};
		for (let i=0; i<result.length; i++) {
			const item:APIsql.TtabAsso = result[i];
			const typDelit = new UnTypeDelit(item['id_delit'], item['nature'], item['tarif']);
			typDelits[typDelit.idDelit] = typDelit;
		}
		return typDelits;
	}

	private prepare(where:string):string {
		let sql : string;
		sql	= "SELECT id_delit, nature, tarif";
		sql += " FROM delit, infraction";
		if (where.trim() !== "")
		{
			sql	+= " WHERE " +where;
		}
		sql	+= " ORDER BY nature ASC "; 
		return sql;
	}

	all() : TTypeDelits {
		return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""),[]));							
	}

	byIdDelit(id_delit:string) : UnTypeDelit {
		let typDelit = new UnTypeDelit;
		const typDelits : TTypeDelits = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_delit	= ?"),[id_delit]));
		const lesCles: string[] = Object.keys(typDelits);				
		if ( lesCles.length > 0) {
			typDelit = typDelits[lesCles[0]];
		}
		return typDelit;			 
	}

	toArray(typDelits : TTypeDelits) : APIsql.TdataSet {
		let T:APIsql.TdataSet = [];
		for (let id in typDelits) {
			T.push(typDelits[id].ToArray());
		}	 
		return T;			 
	}
}

// Classe représentant la relation « contient » 
// Le nom de la classe sera composée des noms des relations détail – maître,
// pour notre cas « TypDelitByInfraction ». 
// Cela indique que l’accès aux données de la relation détail « delit » 
// se fait par l’identifiant « num_infraction » de la relation maître « SALLE »

class UnTypeDelitByInfraction {
	private _tarif : string;
	private _unTypDelit : UnTypeDelit;

	constructor(unTypDelit : UnTypeDelit = null, tarif ="" ) 
	{	this._unTypDelit = unTypDelit;  
		this._tarif = tarif;
	}
	// définition des « getters » et des « setters » pour les attributs privés de la classe
	get tarif():string		{	return this._tarif;		}
	set tarif(tarif : string)	{	this._tarif = tarif;	}
	get unTypDelit():UnTypeDelit 				{	return this._unTypDelit;		}
	set unTypDelit(unTypDelit : UnTypeDelit)	{	this._unTypDelit = unTypDelit;	}

	toArray():APIsql.TtabAsso	{
	// renvoie l’objet sous la forme d’un tableau associatif 
	// pour un affichage dans une ligne d’un tableau HTML
		let tableau = this.unTypDelit.ToArray();	// appel de la méthode « toArray » de « UnTypeDelit »
		tableau['tarif'] = this.tarif;
		return tableau;
	}
}

type TTypDelitsByInfraction = {[key: string]: UnTypeDelitByInfraction };

class LesTypeDelitsByInfraction {	 
	constructor () {
		// rien
	}

	private load(result : APIsql.TdataSet) :	TTypDelitsByInfraction	{
	// à partir d’un TdataSet, conversion en tableau d’objets UnTypeDelitByInfraction
		const typDelitsByInfraction : TTypDelitsByInfraction = {};
		const lesTypDelits = new LesTypeDelits();
		for (let i=0; i<result.length; i++) {
			const item:APIsql.TtabAsso = result[i];
			const unTypDelit = lesTypDelits.byIdDelit(item['id_delit']);
			const typDelitByInfraction = new UnTypeDelitByInfraction(unTypDelit, item['tarif']);
			typDelitsByInfraction[typDelitByInfraction.unTypDelit.idDelit] = typDelitByInfraction;		
		}
		return typDelitsByInfraction;
	}

	private prepare(where:string):string {
		let sql : string;
		sql	= "SELECT c.id_delit, d.tarif";
		sql += " FROM comprend c";
		sql += " JOIN delit d ON c.id_delit = d.id_delit";
		if (where.trim() !== "")
		{
			sql	+= " WHERE c." +where;
		}
		return sql;
	}



	byNumInfraction(num_infraction : string) : TTypDelitsByInfraction { 
	// renvoie le tableau d’objets contenant tous les équipements de la infraction num infraction
		return this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_inf = ?"),[num_infraction]));
	}

	byNumInfractionIdDelit(num_infraction : string, id_delit : string ) : UnTypeDelitByInfraction {
	// renvoie l’objet de l’équipement id_delit contenu dans la infraction num_infraction
		let typDelitByInfraction = new UnTypeDelitByInfraction;
		const typDelitsByInfraction : TTypDelitsByInfraction = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_inf = ? and id_delit = ?"),[num_infraction, id_delit]));
		if ( !typDelitsByInfraction [0] === undefined) {
			typDelitByInfraction = typDelitsByInfraction[0];
		}
		return typDelitByInfraction;	
	}

	toArray(typDelits : TTypDelitsByInfraction) : APIsql.TdataSet {
		let T:APIsql.TdataSet = [];
		for (let id in typDelits) {
			T.push(typDelits[id].toArray());
			delete T[T.length -1].tarif;	// pas besoin du tarif pour l'affichage dans le tableau
		}
		return T; 
	}

	getTotalNbDelit(typDelits : TTypDelitsByInfraction) : string {	
	// renvoie la quantité totale de délit d’une infraction
		let total = 0;
		for (let id in typDelits) {
			total += Number(typDelits[id].tarif);
		} 
		return total.toString();			 
  }

	delete(id_inf : string, id_delit : string):boolean { // requête de suppression des équipements d’une infraction dans «contient»
		let sql : string;
		sql	= "DELETE FROM comprend ";
		sql += " WHERE id_inf=" + id_inf
		sql += " AND id_delit=" + id_delit;
		return APIsql.sqlWeb.SQLexec(sql,[id_inf ,id_delit]);		// requête de manipulation : utiliser SQLexec
	}
	insert(id_inf : string, id_delit : string):boolean { // requête d’insertion d’un équipement dans «contient»
		let sql : string;
		sql	= "INSERT INTO comprend (id_inf, id_delit) ";
		sql += " VALUES (" + id_inf + "," + id_delit + ")";
		return APIsql.sqlWeb.SQLexec(sql,[id_inf ,id_delit]);		// requête de manipulation : utiliser SQLexec
	}

}

export {connexion}
export {UnTypeDelit}
export {TTypeDelits}
export {LesTypeDelits}
export {UnTypeDelitByInfraction}
export {LesTypeDelitsByInfraction}
export {TTypDelitsByInfraction}

