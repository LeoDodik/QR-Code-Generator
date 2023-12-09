import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

inquirer
  .prompt([
    {
      message: 'What is your URL?',
      name: 'URL'
    }
  ])
  .then((answers) => {
    const url = answers.URL;

    // Create QR code image
    const qrPng = qr.image(url, { type: 'png' });
    qrPng.pipe(fs.createWriteStream('qr_image.png'));

    // Prepare data for the text file
    const dataToWrite = `URL: ${url}\n`; // Formatting the data

    // Write data to a text file
    fs.writeFile('data.txt', dataToWrite, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Data has been written to data.txt');
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error('Prompt couldn\'t be rendered in the current environment');
    } else {
      console.error('Something else went wrong:', error);
    }
  });
