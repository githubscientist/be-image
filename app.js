// create express app
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

// define a model
const Image = mongoose.model("Image", new mongoose.Schema({
    mimetype: String,
    data: Buffer
}));

// configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// route to upload an image
app.post("/api/upload", upload.single('image'), async (req, res) => { 
    try {
        const { buffer, mimetype } = req.file;
        const image = new Image({
            mimetype,
            data: buffer
        });

        await image.save();

        // return the image's id and mimetype
        res.send({ id: image._id, mimetype: image.mimetype });
    } catch (error) {
        console.log(error);
    }
});

// route to retrieve an image with a given id
app.get("/api/images/:id", async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);

        res.set("Content-Type", image.mimetype);
        res.send(image.data);
    } catch (error) {
        console.log(error);
    }
});
    


module.exports = app;