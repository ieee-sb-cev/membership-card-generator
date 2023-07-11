const sharp = require("sharp");

async function addTextOnImage() {
  try {
    const width = 5600; // width of template file
    const height = 5600; // height of template file

    const text1 = "Hafis CP"; // Full Name
    const text2 = "96472297"; // IEEE Number
    let template = `${text1}`; // For Renaming Generated File

    const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
      .title {fill:#fff; font-size: 300px; font-weight: bold; font-family:"monospace";}
      </style>
      <text x="50%" y="11%" text-anchor="middle" class="title">${text1}</text>
      <text x="50%" y="22.75%" text-anchor="middle" class="title">${text2}</text>
    </svg>
    `;

    const svgBuffer = Buffer.from(svgImage);
    const image = await sharp("./template/template.png")
      .composite([
        {
          input: svgBuffer,
          top: 2000,
          left: 0,
        },
      ])
      .toFile(`./final-outs/${template}.png`);
  } catch (error) {
    console.log(error);
  }
}

addTextOnImage();
