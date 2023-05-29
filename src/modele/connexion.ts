import * as APIsql from "../modele/sqlWeb.js"

APIsql.sqlWeb.init("https://devweb.iutmetz.univ-lorraine.fr/~muller968u/IHM/sae-ihm/vue/",
						"https://devweb.iutmetz.univ-lorraine.fr/~nitschke5/ihm/IHM_API/")
class Connexion {
	constructor() {
		this.init();
	}
	init():void {
		// à adapter avec votre nom de base et vos identifiants de connexion
		APIsql.sqlWeb.bdOpen('devbdd.iutmetz.univ-lorraine.fr','3306','muller968u_IHM', 'muller968u_appli','32203872', 'utf8')
	}
}
let connexion = new Connexion;

export {connexion, APIsql}

