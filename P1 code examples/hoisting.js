//Hoisting fungerer fordi alle variabler og funktioner bliver allokeret i memory i "compile" fasen inden et program kører. 
//Derfor vil man have adgang til alle variabler og funktioner når programmet kører i "execution" fasen.

//Hoisting fungerer ikke med "let" og "const", da de er kommet til efter "var" og derfor har man valgt at løse "problemet" med hoisting.
//Hoisting fungerer kun med funktioner hvis man ikke assigner dem til en variabel, som vist i eksemplet nederst.

//Working:
func1()

function func1() {
    var1 = "I'm var 1"
    var var1;
    console.log(var1)
}

//Not working:
/*
func2()

function func2() {
    var2 = "I'm var 2"
    let var2;
    console.log(var2)
}
*/

//Not working:
func3()

var func3 = function () {
    var var3 = "I'm var 3"
    console.log(var3)
}