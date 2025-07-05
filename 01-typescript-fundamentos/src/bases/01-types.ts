export let name = 'Abner';
export const age: number = 31;
export const isValid: boolean = true;

name = 'Melisa';

export const templateString = `Esto es un string
multilinea
que puede tener
" docles
' simple
inyectar valores ${name}
expresiones: ${1 + 1}
enteros: ${age}
booleanos: ${isValid}`;

console.log(templateString);
