
var express = require('express');
const port = 3000;
app = express(),
fs = require('fs'),
im = require('imagemagick'),
srcImage = "source_images/butterfly.jpg",
desPath = "destination_images/";
//installed ImageMagick path is C:/Program Files/ImageMagick-7.0.8-Q16
im.identify.path = 'C:/Program Files/ImageMagick-7.0.8-Q16/identify';
im.convert.path = 'C:/Program Files/ImageMagick-7.0.8-Q16/convert';
app.get('/getimage/information', function(req, res) {
    im.identify(srcImage, function(err, features){
        if (err) throw err;
        res.json({"images_data": features});
    });
});

app.get('/getimage/readmetadata', function(req, res) {
    im.readMetadata(srcImage, function(err, metadata){
        if (err) throw err;
        res.json({"metadata": metadata});
    });
});

app.get('/image/resize', function(req, res) {
    var optionsObj = {
        srcPath: srcImage,
        dstPath: desPath+"butterfly_lowquality.jpg",
        quality: 0.6,
        width: ""
    };
    im.resize(optionsObj, function(err, stdout){
        if (err) throw err;
        res.json({
            "message": "Resized Image successfully"
        });
    });
});

app.get('/image/convert', function(req, res) {
    var optionsObj = [srcImage, '-resize', '250x250', desPath+'butterfly_small.png'];
    im.convert(optionsObj, function(err, stdout){
        if (err) throw err;
        res.json({
            "message": "Converted Image successfully"
        });
    });
});


app.get('/image/crop', function(req, res) {
    var optionsObj = {
        srcPath: srcImage,
        dstPath: desPath+'butterfly_cropped.jpg',
        width: 800,
        height: 600,
        quality: 1,
        gravity: "North"
    };
    im.crop(optionsObj, function(err, stdout){
        if (err) throw err;
        res.json({
            "message": "cropped Image successfully"
        });
    });
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//Ref url https://ciphertrick.com/image-manipulation-using-nodejs-imagemagick/ - refer this url to get all end points and their options