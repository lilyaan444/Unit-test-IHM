import { vueInfractionEdit } from "../controleur/class_infraction_edit.js";

vueInfractionEdit.init( 
    {
                     divDetail      :document.querySelector('[id=div_inf_detail]')
                    ,divTitre		:document.querySelector('[id=div_inf_titre]')
                    ,edtDate		:document.querySelector('[id=edt_inf_date]')
                    ,edtNoImmat 	:document.querySelector('[id=edt_inf_immat]')
                    ,edtNoPermis	:document.querySelector('[id=edt_inf_permis]')
                    ,btnRetour		:document.querySelector('[id=btn_inf_retour]')
                    ,btnValider		:document.querySelector('[id=btn_inf_valider]')
                    ,btnAnnuler		:document.querySelector('[id=btn_inf_annuler]')	
                    ,lblDetailConducteur	:document.querySelector('[id=lbl_conducteur_detail]')
                    ,lblDetailVoiture	:document.querySelector('[id=lbl_voiture_detail]')
                    ,lblNumErreur	:document.querySelector('[id=lbl_erreur_num]')
                    ,lblDateErreur	:document.querySelector('[id=lbl_erreur_etage]')
                    ,lblConducteurErreur	:document.querySelector('[id=lbl_erreur_immat]')
                    ,edtIdInf      :document.querySelector('[id=edt_inf_num]')
                    ,lblDelitErreur :document.querySelector('[id=lbl_erreur_delit]') 
                    ,divInfDelit     :document.querySelector('[id=div_inf_delit]') 
                    ,divInfDelitEdit :document.querySelector('[id=div_inf_delit_edit]')  
                    ,btnAjouterDelit :document.querySelector('[id=btn_delit_ajouter]')
                    ,lblTotal       :document.querySelector('[id=lbl_delit_total]')
                    ,tableDelit     :document.querySelector('[id=table_delit]')
                    ,listeDelit    :document.querySelector('[id=select_delit]')
                    ,edtTarif         :document.querySelector('[id=edt_delit_tarif]')
                    ,lblSelectDelitErreur:document.querySelector('[id=lbl_erreur_select_delit]')
                    ,lblValeurErreur   :document.querySelector('[id=lbl_erreur_qte]')
                    ,btnValiderDelit :document.querySelector('[id=btn_inf_valider]')
                    ,btnAnnulerDelit :document.querySelector('[id=btn_inf_annuler]')
                    ,lblPermisErreur :document.querySelector('[id=lbl_erreur_permis]')
                    } 
                    );


