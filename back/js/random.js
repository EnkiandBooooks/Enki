export function getNumRandom(min = 100000, max = 999999) { //esta funcion es para crear el random
    return Math.trunc(Math.random() * (max - min) + min);
}