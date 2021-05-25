import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const sharp = require("sharp");
const path = require('path')
const fs = require("fs");
// const got = require("got");

const pathPublic = "assets"
const pathImages = "images"
const resolutions = [10, 25, 50, 100, 200, 320, 420, 520, 620, 720, 920, 1020, 1220, 1420, 1920]
const extensions = ["jpg", "webp", "avif"]
const protocols = ["https", "http"]
const ExternalImage = url => protocols.some(el => url.includes(el))

function ConvertExternal(url) {
    const sharpStream = sharp({
        failOnError: false
    });
    const promises = [];
    const filename = url.split("/").reverse()[0].toUpperCase().replace(/#|_|JPG|.WEBP|PNG/g,'')

    !fs.existsSync(`${pathPublic}/${pathImages}/`) && fs.mkdirSync(`${pathPublic}/${pathImages}/`);
    !fs.existsSync(`${pathPublic}/${pathImages}/${filename}/`) && fs.mkdirSync(`${pathPublic}/${pathImages}/${filename}/`);

    let images = []
    resolutions.forEach(width => {
        extensions.forEach(extension => {
            if (!fs.existsSync(`${pathPublic}/images/${filename}/${filename}_${width}.${extension}`)) {
                promises.push(
                    sharpStream
                        .clone()
                        .resize(width)
                        .toFile(`${pathPublic}/images/${filename}/${filename}_${width}.${extension}`)
                );
                images.push(`${pathPublic}/images/${filename}/${filename}_${width}.${extension}`)
            }
        })
    })

// https://github.com/sindresorhus/got#gotstreamurl-options
    got.stream(url).pipe(sharpStream);

    Promise.all(promises)
        .then(res => {
            console.log(url+ " Done!", res);
        })
        .catch(err => {
            console.error("Error processing files, let's clean it up", err);
            try {
                console.log(images)
                images.forEach(image => fs.unlinkSync(image))
            } catch (e) {
            }
        });
}


function ConvertLocal(filename) {
    // add check afterwards for capitals
    const filenameNoExtension = filename.split("/").reverse()[0].toUpperCase().replace(/#|_|JPG|.WEBP|PNG/g,'')

    // Check if the directories are there, if not create so we wont get an error
    !fs.existsSync(`${pathPublic}/${pathImages}/`) && fs.mkdirSync(`${pathPublic}/${pathImages}/`);
    !fs.existsSync(`${pathPublic}/${pathImages}/${filenameNoExtension}/`) && fs.mkdirSync(`${pathPublic}/${pathImages}/${filenameNoExtension}/`);

    const source = sharp("assets/"+ filename)
    resolutions.forEach(width => {
        extensions.forEach(extension => {
            if (!fs.existsSync(`${pathPublic}/images/${filenameNoExtension}/${filenameNoExtension}_${width}.${extension}`)) {
                source.resize(width).toFile(`${pathPublic}/images/${filenameNoExtension}/${filenameNoExtension}_${width}.${extension}`)
            }
        })
    })
}


function OptimizeImage(url){
    // ExternalImage(url) ? ConvertExternal(url) : ConvertLocal(url)
    ConvertLocal(url)
}



function fromDir(startPath, filter) {
    if (!fs.existsSync(startPath)) {
        console.log("no dir", startPath);
        return;
    }
    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (filename.indexOf(filter) >= 0) {
            console.log(path.parse(filename).name + path.parse(filename).ext)
            OptimizeImage(path.parse(filename).name + path.parse(filename).ext)
        }
    }
}

// example
// const test_url = "https://g2.delphi.lv/images/pix/676x385/RJd-DxO9z1c/covid-19-koronaviruss-slimnica-uznemsana-53172275.jpg"
// const test_filename = "originalFile.jpg"
//
// OptimizeImage(test_url)
// OptimizeImage(test_filename)

module.exports.imageOptimizer = function imageOptimizer() {
    fromDir(`${pathPublic}`, '.jpg');
    fromDir(`${pathPublic}`, '.png');
    fromDir(`${pathPublic}`, '.webp');
    process.stdout.write("\rImage optimization done                                                   ");
}
