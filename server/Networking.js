class Networking{

    ModeSelector(request, history){
        if(request.Mode == 0){
            //No ACK
            request['Execute'] = true
            request['Transmit'] = false
        }
        else if (request.Mode == 1){
            //At least once
            request['Execute'] = true
            request['Transmit'] = true
        } 
        else if(request.Mode == 2){
            //At most once
            request['Execute'] = (!history) ? true : false
            request['Transmit'] = true
        }
        return request
    }
    TransmitingProbability(){
        let random = Math.random();
        return (random < 0.5) ? true : false
    }

}

module.exports = Networking