class Iss{
    constructor() {
        this.apis = {
            position: "http://api.open-notify.org/iss-now.json",
            predictions: "https://li3zqoavy3.execute-api.eu-west-3.amazonaws.com/iss-pass.json"
        }
        this.position = [];
        this.predictionList = [];
    }

    //Get the iss position via api
    async getIssPosition(){
        return await fetch(this.apis.position).then((response) => {
            return response.json();
        }).then((json) => {
            return json.iss_position;
        }).catch( err => {
            return null;
        });
    }

    //Set pos
    setPosition(lat, long){
        this.position = [lat, long];
    }

    //Get pos
    async getPosition(){
        const lat_long = await this.getIssPosition();
        if(lat_long){
            this.setPosition(lat_long.latitude, lat_long.longitude);
            return this.position;
        }  else
            throw new Error("Wrong api call");
    }

    //Get predictions from api
    async getIssPrediction(lat, lon){
        return await fetch(this.apis.predictions+`?lat=${lat}&lon=${lon}`).then((response) => {
            if(response.status === 500 || response.status === 400)
                return {response:[]};

            return response.json();
        }).then((json) => {
            return json.response;
        }).catch( err => {
            return null;
        });
    }

    //Set pos
    setPreditcionList(list){
        this.preditcionList = list;
    }

    //Get pos
    async getPreditcionList(lat, lon){
        const list = await this.getIssPrediction(lat, lon);
        if(list){
            this.setPreditcionList(list);
            return list;
        } else
            throw new Error("Wrong api call");
    }
}

export default new Iss();