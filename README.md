# Img2DFT

An attempt to make something where users can upload an image and then that image is drawn using a bunch of circles by utilising the Discrete Fourier Transform (DFT) Formula.

![Discrete Fourier Transformation Formula](dft_formula.png)

It is drawn using Processing's `p5.js`

## How to Use
Download source and open `index.html` in a browser of your choice. From there you can learn about what DFT is and use the project. If you don't have any images, you can use `trebleclef.png`.

### What is `contrastImageGen.py`?
At first I wanted to make a python script that when you gave it an image, it would determine contrast and output a grayscale image where black means no contrast and white means lots of contrast. I was then going to make an algorithm to generate a path over it for the circles to trace, however, I soon realised that this would be an exceptionally tedious task that may not even produce what the user desires. The coordinates of said path were then going to be outputted into a list that you could paste into `sketch.js` as the value for `test`.

After realising how hard the task would be, I ditched that idea and decided to let the user draw their own path. I have kept the existing contrast image generating code in case anybody else has a use for it or wants to try to make an algorithm to generate a path from it.
