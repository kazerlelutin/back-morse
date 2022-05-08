function today(){
    const today = new Date();
    return `${today.getDate()}_${today.getMonth()}_${today.getFullYear()}`
}

module.exports = today