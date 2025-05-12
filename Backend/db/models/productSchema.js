const mongoose=require("mongoose");

let productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        enum:["Electronics","Mobile Phones","Clothes","Footwear","Accessories","Books","Beauty Products","Sports"],
        default:"Electronics",
        required:true
    },
    imgUrl:{
        type:String
    }
})

module.exports=mongoose.model("Product",productSchema);