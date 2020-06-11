const Datastore = require('nedb')

let carsDB = new Datastore()

function insertCar(year, model) {
    return new Promise((resolve, reject) => {
        return carsDB.insert({year, model, so}, (err, newCar) => {
            return resolve(err ? false : newCar)
        })
    })
}

async function addCar() {
    
        let newCar = await insertCar(2020, "Audi")
        console.log(newCar)
}

addCar()
