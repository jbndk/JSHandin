//A callback is a function passed as an argument to another function.
//Calbacks kan sikre at kode vil blive afviklet i den rækkefølge vi vil have.


function func1(callback) {
    console.log("I am func1!");
    callback();
}

function func2() {
    console.log('I am func2!');
}

func1(func2);