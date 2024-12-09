import { getNumRandom } from "./random.js";

/**
 * Genera una URL de invitación para un workspace.
 * @param {number|string} idWorkspace - El ID del workspace.
 * @returns {string} - La URL de invitación generada.
 */
export function generateInvitationUrl(idWorkspace) {
    console.log(idWorkspace)
    const baseUrl = 'http://localhost:4200/invitation';
    const numRandom = getNumRandom();
    return `${baseUrl}/${idWorkspace}${numRandom}`;
    }


// Ejemplo de uso
// const idWorkspace = 123456;
// const invitationUrl = generateInvitationUrl(idWorkspace);
// console.log(invitationUrl);

