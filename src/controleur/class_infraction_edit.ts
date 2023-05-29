import { UneInfraction, LesInfractions } from "../modele/data_infraction";
import { LesConducteurs } from "../modele/data_conducteur";
import {  LesVehicules } from "../modele/data_vehicule";
import {LesTypeDelits, UnTypeDelitByInfraction, LesTypeDelitsByInfraction, TTypDelitsByInfraction, UnTypeDelit} from "../modele/data_delit";


type TStatusValeur = 'correct' | 'vide' | 'inconnu' | 'doublon';
type TErreur = {status:TStatusValeur, msg:{[key in TStatusValeur]:string}};
type TInfractionEditForm = {
    divDetail:HTMLElement, divTitre:HTMLElement,
    edtDate:HTMLInputElement, edtNoPermis:HTMLInputElement, edtNoImmat:HTMLInputElement, edtIdInf:HTMLInputElement,
    btnRetour:HTMLButtonElement, btnValider:HTMLButtonElement, btnAnnuler:HTMLButtonElement,
    lblDetailConducteur:HTMLElement, lblDetailVoiture:HTMLElement,
    lblNumErreur:HTMLElement, lblEtageErreur:HTMLElement, lblConducteurErreur:HTMLElement, lblDateErreur:HTMLElement, lblValeurErreur:HTMLElement,
    lblDelitErreur:HTMLElement, divInfDelit:HTMLElement, divInfDelitEdit:HTMLElement, btnAjouterDelit:HTMLButtonElement, btnValiderDelit:HTMLButtonElement, btnAnnulerDelit:HTMLButtonElement,
    lblTotal:HTMLElement, tableDelit:HTMLTableElement, listeDelit:HTMLSelectElement, edtTarif:HTMLInputElement,
    lblSelectDelitErreur:HTMLElement, lblQteErreur:HTMLElement , lblPermisErreur:HTMLElement
};

class VueInfractionEdit {
    private _form:TInfractionEditForm;
    private _params : string[];
    private _grille : TTypDelitsByInfraction;
    private _erreur : {
        [key:string] : TErreur
    }

    get form(): TInfractionEditForm {return this._form;}
    get params(): string[] {return this._params;}
    get grille(): TTypDelitsByInfraction {return this._grille;}
    get erreur(): {[key:string] : TErreur} {return this._erreur;}

    initMsgErreur() : void {
        this._erreur = {
            edtNumInf: {status:'vide', msg:{correct:"", vide:"Entrez un numéro d'infraction ", inconnu:"", doublon:""}},
            edtDate: {status:'vide', msg:{correct:"", vide:"Entrez une date", inconnu:"Date supérieur a la date actuelle", doublon:""}},
            edtNoImmat: {status:'vide', msg:{correct:"", vide:"Entrez un numéro d'immatriculation", inconnu:"Le numéro d'immatriculation est inconnu", doublon:""}},
            edtNoPermis: {status:'vide', msg:{correct:"", vide:"Entrez le numéro de permis du conducteur", inconnu:"Identité du conducteur inconnu", doublon:""}},
            edtTarif: {status:'vide', msg:{correct:"", vide:"Le tarif est vide", inconnu:"", doublon:""}},
            listeDelit: {status:'vide', msg:{correct:"", vide:"La liste des délit est vide", inconnu:"", doublon:""}},
        }
    }

    init(form:TInfractionEditForm): void {
        this._form = form;
        this._params = location.search.substring(1).split("&");
        this.form.divInfDelitEdit.hidden = true;
        this.initMsgErreur();

        let titre : string;
        switch (this.params[0]) {
            case 'suppr' : titre = "Supression d'une infraction"; break;
            case 'modif' : titre = "Modification d'une infraction"; break;
            case 'ajout' : titre = "Ajout d'une infraction"; break;
            default : titre = "Détail d'une infraction"; break;
        }
        this.form.divTitre.textContent = titre;
        const lesInfractions = new LesInfractions;
        const affi = this.params[0] === 'affi';
        if (this.params[0] !== 'ajout') {
            const infraction = lesInfractions.bynoImmat(this.params[1]);
            this.form.edtNoImmat.value = infraction.noImmat;
            this.form.edtDate.value = infraction.dateInf;
            this.form.edtNoPermis.value = infraction.noPermis;
            this.form.edtIdInf.value = infraction.idInf;
            this.form.edtIdInf.readOnly = true;
            this.form.edtNoImmat.readOnly = affi;
            this.form.edtNoPermis.readOnly = affi;
            this.form.edtDate.readOnly = affi;
            this.erreur.edtNumInf.status = 'correct';
            this.detailConducteur(infraction.noPermis);
            this.detailVehicle(infraction.noImmat);
        }
        this.affiDelit();
        if (this.params[0] === 'suppr') {
            setTimeout(() => {this.supprimer(this.params[1])}, 100);
        }

          
            if (this.params[0] === 'ajout') {
              const lesInfractions = new LesInfractions();
              const dernierNumInfraction = lesInfractions.getLastNumInfraction();
              const nouveauNumInfraction = dernierNumInfraction + 1;
              this.form.edtIdInf.value = nouveauNumInfraction.toString();
              this.form.edtIdInf.readOnly = true;
              this.erreur.edtNumInf.status = 'correct';
            }
        
          

        this.form.btnRetour.hidden = !affi;
        this.form.btnValider.hidden = affi;
        this.form.btnAnnuler.hidden = affi;
        this.form.btnAjouterDelit.hidden = affi;

        this.form.edtNoImmat.onchange = function():void {
            vueInfractionEdit.detailVehicle(vueInfractionEdit.form.edtNoImmat.value);
        }
        this.form.edtNoPermis.onchange = function():void {
            vueInfractionEdit.detailConducteur(vueInfractionEdit.form.edtNoPermis.value);
        }
        this.form.btnRetour.onclick = function():void { vueInfractionEdit.retourClick(); };
        this.form.btnAnnuler.onclick = function():void { vueInfractionEdit.retourClick(); };
        this.form.btnValider.onclick = function():void { vueInfractionEdit.validerClick(); };
        this.form.btnAjouterDelit.onclick = function():void { vueInfractionEdit.ajouterDelitClick(); };
        this.form.btnValiderDelit.onclick = function():void { vueInfractionEdit.validerClick(); };
        this.form.btnAnnulerDelit.onclick = function():void { vueInfractionEdit.retourClick(); };
        this.form.listeDelit.ondblclick = function():void { vueInfractionEdit.validerDelitClick(); };
    }   
      

    detailConducteur(valeur:string) : void {
        const err = this.erreur.edtNoPermis;
        const lesConducteurs = new LesConducteurs();
        const detail = this.form.lblDetailConducteur;
        detail.textContent = "";
        err.status = 'correct';
        const chaine : string = valeur.trim();
        if (chaine.length > 0) {
            const conducteur = lesConducteurs.byNoPermis(chaine);
            if (conducteur.noPermis !== "") {
                let dateObtention = conducteur.datePermis; // Supposons que conducteur.datePermis contient la date au format AAAA-MM-DD
            
                // Séparation de la date en années, mois et jours
                let annee = dateObtention.substr(0, 4);
                let mois = dateObtention.substr(5, 2);
                let jour = dateObtention.substr(8, 2);
            
                // Construction de la date au format DD/MM/AAAA
                let dateFormatee = jour + '/' + mois + '/' + annee;
            
                detail.innerHTML = conducteur.nom + " " + conducteur.prenom + '<br>' + 'Permis obtenu le : ' + dateFormatee;
            }
            
             else {
                err.status = 'inconnu';
                detail.textContent = err.msg.inconnu;
            }
        } else {
            err.status = 'vide';
        }
    }

    

    detailVehicle(valeur:string) : void {
        const err = this.erreur.edtNoImmat
        const lesVehicules = new LesVehicules();
        const lesConducteurs = new LesConducteurs();
        const detail = this.form.lblDetailVoiture;
        detail.textContent = "";
        err.status = 'correct';
        const chaine : string = valeur.trim();
        if (chaine.length > 0) {
            const vehicule = lesVehicules.byNumImmat(chaine);
            const conducteur = lesConducteurs.byNoPermis(vehicule.noPermis); 
            if (vehicule.noImmat !== "") {
                let dateObtention = conducteur.datePermis; // Supposons que conducteur.datePermis contient la date au format AAAA-MM-DD
            
                // Séparation de la date en années, mois et jours
                let annee = dateObtention.substr(0, 4);
                let mois = dateObtention.substr(5, 2);
                let jour = dateObtention.substr(8, 2);
            
                // Construction de la date au format DD/MM/AAAA
                let dateFormatee = jour + '/' + mois + '/' + annee;
                detail.innerHTML = vehicule.marque + " " + vehicule.modele + "                                                " + 'Propriétaire : ' + conducteur.nom + " " + conducteur.prenom + '<br>' + 'Immatriculé le : ' + vehicule.dateImmat+ "                " + 'Permis obtenu le : ' + dateFormatee;
            }
             else {
                err.status = 'inconnu';
                detail.textContent = err.msg.inconnu;
            }
        } else {
            err.status = 'vide';
        }
    }
    affiDelit() : void {
        const lesTypeDelitsByInfraction = new LesTypeDelitsByInfraction();
        this._grille = lesTypeDelitsByInfraction.byNumInfraction(this.params[1]);
        this.affiGrilleDelit();
    }

    affiGrilleDelit() : void {
        while (this.form.tableDelit.rows.length > 1) {
            this.form.tableDelit.rows[1].remove();
        }
        let total = 0;
        for (let id in this._grille) {
            const unTypeDelitByInfraction : UnTypeDelitByInfraction = this._grille[id];
            const tr = this.form.tableDelit.insertRow();
            tr.insertCell().textContent = unTypeDelitByInfraction.unTypDelit.nature;
            tr.insertCell().textContent = unTypeDelitByInfraction.tarif;

            const affi = this.params[0] === 'affi';
            if(!affi) {
                let balisea : HTMLAnchorElement;
                balisea = document.createElement("a");
                balisea.classList.add("img_corbeille");
                balisea.onclick = function():void {vueInfractionEdit.supprimerDelitClick(id)};
                tr.insertCell().appendChild(balisea);
            }
            total += Number(unTypeDelitByInfraction.tarif);
        }
        this.form.lblTotal.textContent = total.toString()+" €";
    }

    supprimer(numInfraction:string) : void {
        if (confirm("Confirmez-vous la suppression de l'infraction " + numInfraction + " ?")) {;
            
            const lesInfractions = new LesInfractions();
            lesInfractions.delete(numInfraction);
        }
        this.retourClick();
    }

    verifDate(valeur: string): void {
        const err = this.erreur.edtDate;
        err.status = 'correct';
        const chaine: string = valeur.trim();
        if (chaine.length === 0) {
            err.status = 'vide';
        } else {
            const dateInfraction = new Date(chaine);
            const dateActuelle = new Date();
            if (dateInfraction.getTime() > dateActuelle.getTime()) {
                err.status = 'inconnu';
            }
        }
    }

    traitementErreur(uneErreur:TErreur, zone : HTMLElement) : boolean {
        let correct = true;
        zone.textContent ="";
        if (uneErreur.status !== 'correct') {
            if (uneErreur.msg[uneErreur.status] !== "") {
            zone.textContent = uneErreur.msg[uneErreur.status];
            correct = false;
        }
        }
        return correct;
    }

    validerClick() : void {
        let correct = true;
        this.verifDate(this.form.edtDate.value);

        if (JSON.stringify(this.grille) === '{}') { this._erreur.listeDelit.status = 'vide'; }
        else { this._erreur.listeDelit.status = 'correct'; };

        correct = this.traitementErreur(this._erreur.edtDate, this.form.lblNumErreur) && correct;
        correct = this.traitementErreur(this._erreur.listeDelit, this.form.lblDelitErreur) && correct;
        correct = this.traitementErreur(this._erreur.edtNoImmat, this.form.lblPermisErreur) && correct;
        correct = this.traitementErreur(this._erreur.edtNoPermis, this.form.lblConducteurErreur) && correct;

        
        const lesInfractions = new LesInfractions();
        const infraction = new UneInfraction();

        if (correct) {

            infraction.idInf = this.form.edtIdInf.value;
            infraction.dateInf = this.form.edtDate.value;
            infraction.noImmat = this.form.edtNoImmat.value;
            infraction.noPermis = this.form.edtNoPermis.value;

            
            if (this.params[0] === 'ajout') {
                lesInfractions.insert(infraction);
            } else {
                lesInfractions.update(infraction);
            }

            
            const lesTypeDelitsByInfraction = new LesTypeDelitsByInfraction();
            lesTypeDelitsByInfraction.delete(infraction.idInf,  lesTypeDelitsByInfraction.byNumInfraction(this.params[1]).toString());
            lesTypeDelitsByInfraction.insert(infraction.idInf, lesTypeDelitsByInfraction.byNumInfraction(this.params[1]).toString());
            this.retourClick();
        }
    }

    retourClick() : void {
        location.href = "infraction_liste.html";
    };

    ajouterDelitClick() : void {
        this.afficherDelitEdit();

        this.form.listeDelit.length = 0;
        const lesTypDelits = new LesTypeDelits;
        const data = lesTypDelits.all();
        const idDelits = [];
        for (let i in this._grille){
            idDelits.push(this._grille[i].unTypDelit.idDelit);
        }
        for (let i in data) {
            const id = data[i].idDelit;
            if (idDelits.indexOf(id) === -1){
                this._form.listeDelit.options.add(new Option(data[i].nature, id));
            }
        }
    }

    supprimerDelitClick(id : string){

        if (confirm("Confirmez-vous le retrait du délit de la contravention ?")) {
            delete(this._grille[id]);
            this.affiGrilleDelit();
        }

    }

    afficherDelitEdit() : void {
        this.form.divInfDelitEdit.hidden = false;
        this.form.divDetail.style.pointerEvents = 'none';
        this.form.divInfDelitEdit.style.pointerEvents = 'auto';
        this.form.btnAjouterDelit.hidden = true;
        this.form.btnAnnuler.hidden = true;
        this.form.btnValider.hidden = true;
    }

    cacherDelitEdit() : void {
        this.form.divInfDelitEdit.hidden = true;
        this.form.divDetail.style.pointerEvents = 'auto';
        this.form.btnAjouterDelit.hidden = false;
        this.form.btnAnnuler.hidden = false;
        this.form.btnValider.hidden = false;
    }

    verifListeDelit(): void {
        const err = this._erreur.listeDelit;
        err.status = "correct";
        const cible = this._form.listeDelit
        if (cible.value === "") {
            err.status = "vide";
        }
    }

    validerDelitClick() : void {
        let correct = true;
        this.verifListeDelit();

        if (correct) {
            const lesTypDelits = new LesTypeDelits;
            const unTypDelit : UnTypeDelit = lesTypDelits.byIdDelit(this._form.listeDelit.value);
            const unTypDelitByInfraction : UnTypeDelitByInfraction = new UnTypeDelitByInfraction(unTypDelit, unTypDelit.tarif);
            this._grille[unTypDelit.nature] = unTypDelitByInfraction;
            this.affiGrilleDelit();
            this.annulerDelitClick();
        }
    }

    annulerDelitClick() : void {
        this.cacherDelitEdit();
    }
}

let vueInfractionEdit = new VueInfractionEdit();

export {vueInfractionEdit};