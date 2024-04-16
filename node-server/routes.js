//routes.js

import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Data from "./models/Data.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";
//import upload from "./upload.js";
//import fileUpload from "express-fileupload";
import http from "node:http";
import formidable from "formidable";
import Image from "./models/Images.js";


dotenv.config();

const router = express.Router();

router.use(express.json());

/* router.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 },
    // Specify the upload directory directly
    uploadDir: "./images", // Assuming 'images' is a directory in the same directory as your script
  })
); */

/* router.post("/single", upload.single("image"), (req, res) => {

  if (req.file) {
    res.send("Single file uploaded successfully");
  } else {
    res.status(400).send("Please upload a valid image");
  }
  
}); */

// Now you can handle file uploads in your routes

/* router.post("/upload", (req, res) => {
  console.log(req.files.image); // the uploaded file object

  if (!req.files || !req.files.image) {
    return res.status(400).send("No file uploaded.");
  }

  const imageFile = req.files.image;

  // Generate a unique filename
  const fileName = `${Date.now()}_${imageFile.name}`;

  console.log(fileName);

  imageFile.mv(`./images/${fileName}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send("File uploaded!");

  });

});
 */

router.post("/upload", (req, res, next) => {

  const form = formidable({
    uploadDir: "./images", // Adjust the path as needed
    // Keep file extensions (e.g., .png, .jpg)
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    //console.log(fields);
    console.log(files.image[0].newFilename);

    try {

      if (err) {
        next(err);
        return;
        
      }

      const uploadedFile = files.image[0];
      const imageName = uploadedFile.newFilename;

      const data = new Image({
        image: imageName,
      });

      const savedImage = await data.save();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    //res.json({ fields, files });
  });

});

export default router;
