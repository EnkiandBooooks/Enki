/**
 * Genera un número aleatorio entero entre un rango mínimo y máximo.
 * @returns {number} - Un número aleatorio entre el valor mínimo y máximo.
 */
export function getNumRandom(min = 100000, max = 999999) {  //esta funcion es para crear el random
    return Math.trunc(Math.random() * (max - min) + min);
};