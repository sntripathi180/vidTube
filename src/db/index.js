import { DB_NAME } from "../constants.js"
import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
    const connectionInsatance=   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

    console.log(`/n MongoDB connected ! DB host : ${connectionInsatance.connection.host}`)
    } catch (error) {
        console.error("MongoDB connerction error",error)
        process.exit(1)
    }
}

export default connectDB