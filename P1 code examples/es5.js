//let is used to declare variables that may be changed (otherwise const should be used).
//let is prefered over var in some situations, as var is scoped broader than let
//var = function scoped
//let & const = block scoped


//Arrow functions:
//'functions' keyword is not needed, but you need to create a varible for the function is you want reuse it.
//You can also make the arrow functions more compact, as a return statement is not needed

//Regular:
function func1(a, b) {
    return a + b;
}

//Arrow:
let func2 = (a, b) => a + b

console.log(func1(1, 2))
console.log(func2(1, 2))


//This: Please see this.js in the same folder as this file.


//Rest parameters:
function add(...numbers) {
    let result = 0;
    for (n of numbers) {
        result += n;
    }
    return result
}

console.log("Rest parameters result: " + add(10, 60, 30))


//Destructuring objects:
let a, b, c;
[a, b, ...c] = [10, 20, 30, 40, 50];

console.log("Destructered array: " + c);