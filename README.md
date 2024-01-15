# Img2DFT

An attempt to make something where users can upload an image and then that image is drawn using a bunch of circles by utilising the Discrete Fourier Transform (DFT) Formula.

![Discrete Fourier Transformation Formula](https://github.com/KablammoMan/Img2DFT/assets/83634185/152ffcbc-ab02-4909-b843-5598d2f147a2)

It is draw using Processing's `p5.js`

## How to Use
Download source and open `index.html` in a browser of your choice. Click on the "Browse" button and choose any image on your machine. Once the image is loaded, click anywhere and begin drawing an outline of what you want (note that where you end will connect back to the start). Once you have finished the outline, click the "Submit" button that appeared to begin processing the image. DFT will be applied, the image will disappear and circles will recreate the image.

### What is `contrastImageGen.py`?
At first I wanted to make a python script that when you gave it an image, it would determine contrast and output a grayscale image where black means no contrast and white means lots of contrast. I was then going to make an algorithm to generate a path over it for the circles to trace, however, I soon realised that this would be an exceptionally tedious task that may not even produce what the user desires. The coordinates of said path were then going to be outputted into a list that you could paste into `sketch.js` as the value for `test`.

After realising how hard the task would be, I ditched that idea and decided to let the user draw their own path. I have kept the existing contrast image generating code in case anybody else has a use for it or wants to try to make an algorithm to generate a path from it.
