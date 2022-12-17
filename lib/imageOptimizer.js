const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const staticFolder = './static';
const optimizedFolder = 'optim';
const resolutions = [10, 25, 50, 100, 200, 320, 420, 520, 620, 720, 920, 1020, 1220, 1420, 1920];
const formats = ['webp', 'avif', 'jpg'];

function timeit(callback) {
  const start = performance.now();
  callback();
  const end = performance.now();
  console.log(`Time elapsed: ${end - start}ms`);
}

if (!fs.existsSync(staticFolder)) fs.mkdirSync(staticFolder);
if (!fs.existsSync(`${staticFolder}/${optimizedFolder}`)) fs.mkdirSync(`${staticFolder}/${optimizedFolder}`);

fs.readdir(staticFolder, async (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const images = files.filter(file => file.match(/\.(jpeg|jpg|png)$/));

  // Create an array of tasks to optimize the images
  const tasks = images.map(image => {
    const imagePath = `${staticFolder}/${image}`;
    const imageName = path.parse(image).name;

    return Promise.all(
      formats.map(format =>
        Promise.all(
          resolutions.map(resolution => {
            const currentFile = `${staticFolder}/${optimizedFolder}/${imageName}-${resolution}.${format}`;
            if (!fs.existsSync(currentFile)) {
              return sharp(imagePath)
                .resize({ width: resolution })
                .toFormat(format)
                .toFile(currentFile)
                .then(() => console.log(`Optimized ${currentFile}`))
                .catch(error => console.error(error));
            }
          })
        )
      )
    );
  });


  timeit(async () => {
    // Run all the tasks concurrently
    await Promise.all(tasks);
  })

});
