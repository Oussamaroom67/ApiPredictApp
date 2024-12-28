const predict = require("../Models/PredictModeldb");
let getSymptomes = async(req,res)=>{
    try{
        let Symptomes = req.body.symptomes; 
        let userId = req.body.userId;
        res.send(`${Symptomes} ${userId}`)
    }catch(err){
        for (let e in err.errors){
            console.log(err.errors[e].message);
            res.status(400).send("Bad Request")
        }
    }
}           
module.exports={getSymptomes};