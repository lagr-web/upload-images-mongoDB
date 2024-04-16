//models/Images.js

import mongoose from "mongoose";

 const imageSchema = new mongoose.Schema({
    
    image: {
        type: String,
        required: true,
      }
 })

 const Image = mongoose.model("images", imageSchema);

 export default Image;
