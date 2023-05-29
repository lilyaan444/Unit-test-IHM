import { UneInfraction, LesInfractions } from "../modele/data_infraction";
import {  LesConducteurs } from "../modele/data_conducteur";
import {  LesTypeDelitsByInfraction, UnTypeDelitByInfraction } from "../modele/data_delit";

type TInfractionListeForm = {
    divTitre :HTMLElement, btnAjouter : HTMLInputElement, tableInfraction : HTMLTableElement
}

class VueInfractionListe {
    private _form : TInfractionListeForm;

    get form() : TInfractionListeForm { return this._form; }

    init(form : TInfractionListeForm) : void {
        this._form = form;
        
        const lesInfractions = new LesInfractions();
        const lesConducteurs = new LesConducteurs();
       
        const lesDelits = new LesTypeDelitsByInfraction();
       
        const data = lesInfractions.all()

        this.form.divTitre.textContent = "Liste des infractions";

        for (let num in data) {
            const uneInfraction : UneInfraction = data[num];
            const tr = this.form.tableInfraction.insertRow();

            let balisea : HTMLAnchorElement;
            balisea = document.createElement("a");
            balisea.classList.add("img_visu");
            balisea.onclick = function():void {vueInfractionListe.detailDelitClick(uneInfraction.idInf)};
            tr.insertCell().appendChild(balisea);

            tr.insertCell().textContent = uneInfraction.idInf;
            tr.insertCell().textContent = uneInfraction.dateInf
            tr.insertCell().textContent = uneInfraction.noImmat
            tr.insertCell().textContent = lesConducteurs.byNoPermis(uneInfraction.noPermis).noPermis+ ' '+ lesConducteurs.byNoPermis(uneInfraction.noPermis).prenom+ ' '+ lesConducteurs.byNoPermis(uneInfraction.noPermis).nom;
            // afficher le total du prix des délits
            let total = 0;
            for (let num in lesDelits.byNumInfraction(uneInfraction.idInf)) {
                const unDelit : UnTypeDelitByInfraction = lesDelits.byNumInfraction(uneInfraction.idInf)[num];
                total += Number(unDelit.tarif);
            }
            tr.insertCell().textContent = total.toString() + " €";

            balisea = document.createElement("a");
            balisea.classList.add("img_modification");
            balisea.onclick = function():void {vueInfractionListe.modifierDelitClick(uneInfraction.idInf)};
            tr.insertCell().appendChild(balisea);

            balisea = document.createElement("a");
            balisea.classList.add("img_corbeille");
            balisea.onclick = function():void {vueInfractionListe.supprimerDelitClick(uneInfraction.idInf)};
            tr.insertCell().appendChild(balisea);
        }

        this.form.btnAjouter.onclick = function():void {vueInfractionListe.ajouterDelitClick()};
    }

    detailDelitClick(num : string) : void {
        location.href = "infraction_edit.html?affi&" +encodeURIComponent(num);
    }
    modifierDelitClick(num : string) : void {
        location.href = "infraction_edit.html?modif&" +encodeURIComponent(num);
    }

    supprimerDelitClick(num : string) : void {
        location.href = "infraction_edit.html?suppr&" +encodeURIComponent(num);
    }

    ajouterDelitClick() : void {
        location.href = "infraction_edit.html?ajout";
    }
}

let vueInfractionListe = new VueInfractionListe();
export {vueInfractionListe};