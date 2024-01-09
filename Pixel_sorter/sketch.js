let img;
let video;

function setup() {
  createCanvas(500, 500);
  
  video = createCapture(VIDEO);
  video.size(100, 100);
  video.hide(); 

  // Create an empty image to manipulate.
  img = createImage(100, 100);

  noSmooth();
}

function draw() {
  // Capture the current frame from the webcam.
  img.copy(video, 0, 0, video.width, video.height, 0, 0, img.width, img.height);

  img.loadPixels();

  // Loop times to speed up the animation.
  for (let i = 0; i < 70000; i++) {
    sortPixels();
  }

  img.updatePixels();

  image(img, 0, 0, width, height);
}

function sortPixels() {
  // Get a random pixel
  const x = floor(random(img.width));
  const y = floor(random(img.height - 1));

  // Get the color of the pixel
  const colorOne = img.get(x, y);

  // Get the color of the pixel below the first one
  const colorTwo = img.get(x, y + 1);

  // Get the total R+G+B of both colors
  const totalOne = red(colorOne) + green(colorOne) + blue(colorTwo);
  const totalTwo = red(colorTwo) + green(colorTwo) + blue(colorTwo);

  // If the first total is less than the second total, swap the pixels
  // darker colors to fall to the bottom
  // and light pixels to rise to the top
  if (totalOne < totalTwo) {
    img.set(x, y, colorTwo);
    img.set(x, y + 1, colorOne);
  }
}
