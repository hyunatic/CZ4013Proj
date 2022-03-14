class Marshalling{
    constructor(){}

    Marshall(jsonData){
        return JSON.stringify(jsonData)
    }
    Unmarshall(marshallData){
        return JSON.parse(marshallData)
    }
}

module.exports = Marshalling