import { Etape } from "./etape";
import { Role } from "./role";

export class Transition{
    idTransition 
    etapeActuelle : Etape
    etapeSuivante : Etape
    rolePK : Role
}