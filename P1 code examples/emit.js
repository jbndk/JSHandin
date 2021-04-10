const EventEmitter = require("events")

class MyEventEmitter extends EventEmitter {

    numbers = []

    simulateData = () => {
        const data = [1, 3, 5, 98, 102, 500];
        data.forEach((n, index) => {
            setTimeout(() => this.addNumber(n), 1000 * index + 1)
        })
    }

    addNumber = (number) => {
        this.numbers.push(number);

        if (number % 2 === 0) {
            this.emit("even", { tal: number })
        }
        else {
            this.emit("odd", { number })
        }
        if (number >= 100) {
            this.emit("high", { number })
        }
        else {
            this.emit("low", { number }, 0)
        }
    }
}