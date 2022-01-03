import { Etape } from "./etape";

export interface Formulaire{
    idFormulaire: number,
    prenom: string,
    nom: string,
    email: string,
    cin: number,
    dateCreation:Date,
    dateModification: Date,
    creerPar: string,
    modifierPar: string,
    etape : Etape 


}
