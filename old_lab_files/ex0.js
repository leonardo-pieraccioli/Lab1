'use strict'

const strings = ['string', 'architect', 'one', 'it', 'cat', 'a'];

function firstAndLastTwo(str) {
    if (str.length < 2) 
        return '';
    return str.slice(0, 2) + str.slice(str.length - 2, str.length);
}

console.log(strings);
console.log(strings.map( s => firstAndLastTwo(s)));

