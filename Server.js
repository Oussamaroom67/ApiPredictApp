const mongoose = require("mongoose");
const express = require("express");
const predictrouter = require('./Routes/predictRoute');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json())
mongoose.connect("mongodb+srv://siafomaima5:yz41njOlsSkSasxH@prediction.hynfw.mongodb.net/?retryWrites=true&w=majority&appName=Prediction", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        console.log("connect to Database");
        app.use("/api/predict",predictrouter);
        app.use("/api/history",predictrouter);
        
    })
    .catch((err) => {
        console.log(err);
});
process.on('uncaughtException', () => {
    console.error('Uncaught error, shutting down gracefully');
    process.exit(1);  // Exit with an error code
});
const port = process.env.port||8080;
app.listen(port,()=>{
    console.log(`Listening in port ${port}`);
})