//Hvis 'this' bruges i en metode i et objekt, så referer det til objektet:

const dog = {
    sound: 'vuff',
    bark() {
        console.log(this)
    }
}

//Eftersom at bark() et en metode inde i objektet 'dog', referer 'this' til objektet 'dog'
dog.bark()


//Hvis 'this' bruges i en funktion, så referer det til 'window' i en browser og 'global' i Node.
//Her er et eksempel som viser, at selv om vi har en callback funktion, som ligger i en metode, som ligger i et objekt,
//så tilhører callback funktionen 'global' scope her i node, og derfor er this.number = undefined.
const global = {
    number: 1,
    letters: ['a', 'b', 'c'],
    showLetters () {
        this.letters.forEach(function(letter) {
            console.log(this.number, letter);
        })
    }
}

global.showLetters()


//Det kan dog løses ved at tilføje 'this' som et argument til showLetters() funktionen
const global2 = {
    number: 1,
    letters: ['a', 'b', 'c'],
    showLetters () {
        this.letters.forEach(function(letter) {
            console.log(this.number, letter);
        }, this);
    }
}

global2.showLetters()


//Hvis 'this' bruges i en constructor, vil det referere til et ny objekt:
function Cat(sound) {
    this.sound = sound
    console.log(this)
}

const cat1 = new Cat('Miaaaw')