import {vueInfractionListe} from "../controleur/class_infraction_liste.js"

vueInfractionListe.init( { divTitre        :document.querySelector('[id=div_inf_liste_titre]')
                        ,btnAjouter     :document.querySelector('[id=btn_inf_ajouter]')
                        ,tableInfraction     :document.querySelector('[id=table_infraction]')
                    } 
                    );

