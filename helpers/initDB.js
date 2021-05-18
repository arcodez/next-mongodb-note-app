import mongoose from "mongoose"

function initDB(){
    if(mongoose.connections[0].readyState){
        console.log("Already Connected")
        return
    }
    mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true
    })
    mongoose.connection.on('connected', ()=> {
        console.log("Connected to Mongo")
    })
    mongoose.connection.on('error', (err)=> {
        console.log("Error Connecting", err)
    })
}

export default initDB;