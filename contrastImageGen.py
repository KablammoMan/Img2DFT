# Test Image Path: /home/KablammoMan/Pictures/discordStupid.png

import cv2
import tqdm
import numpy as np

# Contrast Sensitivity Control (default=1)
CONT_SENS = 1

# Get data about a VALID image path
while True:
    try:
        path = input("Path to image: ")
        image = cv2.imread(path)
        shape = image.shape
    except AttributeError:
        print("\n")
        print("Please enter a valid image file path")
    else:
        print("\n")
        break

# Create new empty (all 0) image array
print("Generating Empty Images...")
new_data = []
for rows in tqdm.trange(shape[0]):
    row = []
    for clms in range(shape[1]):
        clm = []
        for cols in range(shape[2]):
            clm.append(0)
        row.append(clm)
    new_data.append(row)

vrt_data = np.array(new_data, np.uint16) # uint16 is used here so that the values of the two arrays can be added without getting an overflow error
hrz_data = np.array(new_data, np.uint16) # uint16 is used here so that the values of the two arrays can be added without getting an overflow error
print("Empty Images Successfully Generated")
print("\n")

# Vertical Contrast (Top->Down)
print("Generating Vertical Contrast Image")
for rowi in tqdm.trange(1, shape[0]):
    for clmi in range(shape[1]):
        prev_avg = 0
        this_avg = 0
        for coli in range(shape[2]):
            prev_avg += image[rowi-1][clmi][coli]
            this_avg += image[rowi][clmi][coli]
        prev_avg /= shape[2]
        this_avg /= shape[2]
        cont_dif = min(255, CONT_SENS * abs(prev_avg-this_avg))
        for coli in range(shape[2]):
            vrt_data[rowi][clmi] = cont_dif
print("Vertical Contrast Image Successfully Generated")
print("\n")

# Horizontal Contrast (Left->Right)
print("Generating Horizontal Contrast Image")
for clmi in tqdm.trange(1, shape[1]):
    for rowi in range(shape[0]):
        prev_avg = 0
        this_avg = 0
        for coli in range(shape[2]):
            prev_avg += image[rowi][clmi-1][coli]
            this_avg += image[rowi][clmi][coli]
        prev_avg /= shape[2]
        this_avg /= shape[2]
        cont_dif = int(min(255, CONT_SENS * abs(prev_avg-this_avg)))
        for coli in range(shape[2]):
            hrz_data[rowi][clmi] = cont_dif
print("Successfully Generated Horizontal Contrast Image")
print("\n")

# Average Two Contrast Images Together
print("Averaging Contrast Images into One")
for rowi in tqdm.trange(shape[0]):
    for clmi in range(shape[1]):
        for coli in range(shape[2]):
            new_data[rowi][clmi][coli] = int((hrz_data[rowi][clmi][coli] + vrt_data[rowi][clmi][coli])/2)
print("Successfully Created Final Contrast Image")

new_data = np.array(new_data, np.uint8)

# Show final result (contrast image map)
while True:
    cv2.imshow("Test", new_data)
    if cv2.waitKey(1) == ord("q"):
        break

# TODO: Generate Path (Maybe with AI because I have no idea how to do this part)
