import { v2 as cloudinary } from "cloudinary"
import { config } from "dotenv"

config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY1_ + process.env.CLOUD1_ + process.env.NAME1_,
    api_key: process.env.CLOUDINARY2_ + process.env.API2_ + process.env.KEY2_,
    api_secret: process.env.CLOUDINARY3_ + process.env.API3_ + process.env.SECRET3_,
    secure: true
})

export default cloudinary