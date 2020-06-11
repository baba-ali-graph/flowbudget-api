const Datastore = require('nedb')

let carsDB = new Datastore()

async function insertCar(year, model) {
    return carsDB.insert({year, model}, (err, newCar) => {
        if(err) return false
        // console.log(newCar)
        return newCar
    })
}

async function addCar() {
    let newCar = await insertCar(2020, "Audi")
    return newCar
}

(async() => {
    let car = await addCar()
    console.log(car)
})()