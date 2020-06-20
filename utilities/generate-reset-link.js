module.exports = async (db, {_id, email}) => {
    let resetLink = generateLink(_id, email)
    resetLink = await db.updateUser(_id,{reset_link: resetLink})
    return resetLink
}


function generateLink(...args) {
    // @params arg : the list of arguments to use in generating the link
    // NB: This is actually a dummy function
    let resetLink = ""
    args.forEach(arg => {
        resetLink += arg
    })
    return resetLink
}

