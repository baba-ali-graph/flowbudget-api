module.exports = (obj) => {
    for(let key in obj) {
        obj[key] = sanitizer(obj[key])
    }
    return obj
}

function sanitizer(arg) {
    //WARN: no stripping spaces
    arg = arg.toLowerCase()
    return arg
}