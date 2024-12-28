const mongoose = require("mongoose");
const PredictSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type:String,
        trim:true
    },
    precautions:{
        type:[String],
        default: []
    },
    Symptomes:{
        type:[String],
        default: []
    },
    Confidence:{
        type:Number,
        min: 0, 
        max: 100
    },
    Userid:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true
    }
})
const Predict = mongoose.model("Prediction",PredictSchema);
module.exports=Predict;
