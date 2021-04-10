const array = [10, 20, 30]

//Map method creates a new array containing the result of calling the provided function on every element in the calling array.
const mappedArray = array.map(num => {
    const thisNum = num + 5;
    console.log("Mapped number: " + thisNum)
});

//Filter method creates a new array containing elements that pass the test implemented by the provided function.
const filteredArray = array.filter(num => num < 25)
console.log("Filtered array: " + filteredArray)

//Reduce method executes a provided reducer function on each element of the array and then returns a single output value.
//Syntax: array.reduce(callback( accumulator, currentValue)
const reducer = (acc, cur) => acc + cur;
console.log("Reduced value one: " + array.reduce(reducer, 40))
