//Clousures betyder at vi i JS som udgangspunkt i en funktion kan tilgå variabler defineret udenfor funktionen:
var a = "hello"
function func() {
    console.log(a)
}

func()


//Eksempel med funktioner:
function outfunc(outvar) {
    return function infunc(invar) {
        console.log("outvar: " + outvar)
        console.log("invar: " + invar)
    }
}

const newfunc = outfunc("I'm outvar!")
newfunc("I'm invar!")


//Det kan give problemer. I dette eksempel kan 'num' ændres uden at bruge add() funktionen:
let num = 1;

function add() {
    num += 1;
}

add();
num += 1;
console.log(num)


//Hvis man vil forsøge at beskyttte variablen, risikerer man at funktionen ikke virker som tilsigtet:
function add2() {
    var num2 = 1;
    num2 += 1
    console.log("num2: " + num2)
}

add2();
add2();

//Hvis man vil beskytte sin variabel og samtidig få det til at fungere, så kan man bruge 'nested' funktioner:
function add3() {
    var num3 = 1;
    function add4() {
        num3 += 1;
    }
    add4()
    add4()
    console.log("num3: " + num3)
}

add3();