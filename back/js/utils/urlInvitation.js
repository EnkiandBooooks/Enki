import { getNumRandom } from "./random.js";
export class InvitationWorkspace {
    constructor(idWorkspace) {
        this.idWorkspace = idWorkspace;
        this.baseUrl = 'http://localhost:4200/invitation';
    }
    numRandom = getNumRandom();
    generateInvitationUrl() {
        return `${this.baseUrl}/${this.idWorkspace}${this.numRandom}`;
        
    }
}

// Ejecutar en otro archivo
// import { InvitationWorkspace } from './urlInvitation.js';

// Crear una instancia de la clase InvitationWorkspace

const idWorkspace = 123456;
const invitationWorkspace = new InvitationWorkspace(idWorkspace);

// Ejecutar el método de la instancia
const invitationUrl = invitationWorkspace.generateInvitationUrl();
console.log(invitationUrl);
