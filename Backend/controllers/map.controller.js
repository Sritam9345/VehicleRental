const mapService = require('../service/map.service');
const {validationResult} = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const error = validationResult(req);
    
       if(error.errors.length != 0){
           console.log(error);
          return res.status(400).json({error: error.array()})
       }
    
    
    
    const { address } = req.query;
    
    try {
        const response = await mapService.locateUser(address);

        if (response.error) {
            return res.status(400).json({ error: response.error });
        } else {
            return res.status(200).json({ response });
        }
    } catch (error) {
        return res.status(500).json({ error:error.message });
    }
    
}

module.exports.getDistance = async (req, res, next) => {
    const error = validationResult(req);
    
       if(error.errors.length != 0){
           console.log(error);
          return res.status(400).json({error: error.array()})
        }
    
    
    
    const { origin, destination } = req.query;
   
    try {
        const response = await mapService.getDistance(origin, destination);
    
        if (response.error) {
            return res.status(400).json({ error: response.error });
        } else {
            return res.status(200).json({ response });
        }
    } catch (error) {
        return res.status(500).json({ error:error.message });
    }
    
}   
    
module.exports.getAutoCompleteSuggestion = async (req, res, next) => {
    const error = validationResult(req);
   
    if(error.errors.length != 0){
        console.log(error);
       return res.status(400).json({error: error.array()})
    }

    const { input } = req.query;

    try{
    const response = await mapService.getAutoCompleteSuggestion(input);
    return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({ error:error.message });
    }

}

