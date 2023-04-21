import cv2 as cv
import aspose.words as aw
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
from flask import Flask, request, jsonify
from flask import Flask
import glob
import os
import sys
import matplotlib.pyplot as plt
import numpy as np
from datetime import datetime
import pysteps
from pprint import pprint
from pysteps import io, nowcasts, rcparams, motion
from pysteps.motion.lucaskanade import dense_lucaskanade
from pysteps.postprocessing.ensemblestats import excprob
from pysteps.utils import conversion, dimension, transformation
from pysteps.visualization import plot_precip_field, quiver
api = Flask(__name__)


# @api.route('/profile')
# def my_profile():
#     response_body = {
#         "name": "Riya and Priyanka",
#         "about": "Developing a project for ISRO"
#     }

#     return response_body
# from flask import Flask, request
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

# upload files from the user
@app.route('/upload', methods=['POST'])
def upload():
    # empty the folder
    files = glob.glob('./uploads/*')
    for f in files:
        os.remove(f)
    gif_files = glob.glob('./gif_frames/*')
    for gf in gif_files:
        os.remove(gf)
    preprocessed_files = glob.glob('./pysteps/radar/mch/20160711/*')
    for pf in preprocessed_files:
        os.remove(pf)

    # check if the post request has the file part
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    # check if the file is a gif
    if file and file.filename.endswith('.gif'):
        # os.mkdir('./uploads/gif_frames')
        # do something with the file, e.g. save it to disk
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        # print('File uploaded successfully')
        gif_folder = './gif_frames'
        extract_gif_frames(file_path, gif_folder)
        return jsonify({'message': 'File uploaded successfully'})
    else:
        return 'Invalid file format'


# process gif into different frames
def extract_gif_frames(gif_path, save_folder):
    """
    Extracts each frame from a GIF image and saves it as a separate image in the specified folder.
    """
    frames = []
    with Image.open(gif_path) as im:
        # Iterate over each frame in the GIF image
        for i in range(im.n_frames):
            # Set the current frame
            im.seek(i)
            # Convert the image to RGB mode
            frame = im.convert('RGB')
            # Save the frame as a separate image in the specified folder
            filename = os.path.join(save_folder, f"frame_{i}.jpg")
            frame.save(filename, format='JPEG')
            # Append the frame to the list of frames
            frames.append(frame)
    preprocess_frames()
    return frames

# preprocessing of gif frames


def preprocess_frames():
    org_img = [cv.imread(file) for file in glob.glob("./gif_frames/*.jpg")]
    config_file_path = pysteps.datasets.create_default_pystepsrc(
        './pysteps', config_dir=None, file_name='pystepsrc', dryrun=False)
    _ = pysteps.load_config_file(config_file_path, verbose=True)
    folder_path = "./pysteps/radar/mch/20160711"
    k1 = 100
    k2 = 200
    for i in range(len(org_img)):
        print(org_img[i].shape)

        # Bhuj
        # img = org_img[i][177:700, 0:525]

        # Chennai
        # img = org_img[i][210:710, 5:500]
        # img = cv.resize(org_img[i], (500,500))

        # Paradip
        img = org_img[i][200:700, :520]

        # blur = cv.blur(img, (3, 3))
        # cv.imshow('blur',blur)
        # blur0 = cv.medianBlur(img, 3)
        # # cv.imshow('med_blur',blur0)
        # blur1 = cv.GaussianBlur(img, (3, 3), 0)
        # # cv.imshow('gauss_blur',blur1)
        # blur1 = cv.bilateralFilter(blur0, 9, 75, 75)
        # # cv.imshow('bilateral',blur2)

        hsv = cv.cvtColor(img, cv.COLOR_BGR2HSV)
        # cv.imshow('hsv', hsv)

        ## BLUE
        # low_blue = np.array([94, 80, 2])
        # high_blue = np.array([126, 255, 255])
        low_blue = np.array([94, 120, 120])
        high_blue = np.array([131, 255, 255])
        mask_blue = cv.inRange(hsv, low_blue, high_blue)
        blue = cv.bitwise_and(img, img, mask=mask_blue)
        # cv.imshow('blue', blue)

        ## RED
        low_red = np.array([0, 255, 200])
        high_red = np.array([14, 255, 255])
        mask_red = cv.inRange(hsv, low_red, high_red)
        red = cv.bitwise_and(img, img, mask=mask_red)
        # cv.imshow('red', red)

        ## YELLOW
        low_yellow = np.array([22, 132, 252])
        high_yellow = np.array([32, 255, 255])
        mask_yellow = cv.inRange(hsv, low_yellow, high_yellow)
        yellow = cv.bitwise_and(img, img, mask=mask_yellow)
        # cv.imshow('yellow', yellow)

        ## WHITE
        sensitivity = 15
        low_white = np.array([0, 0, 255])
        high_white = np.array([30, 120, 255])
        mask_white = cv.inRange(hsv, low_white, high_white)
        white = cv.bitwise_and(img, img, mask=mask_yellow)
        # cv.imshow('yellow', yellow)

        mask = mask_blue + mask_yellow + mask_white + mask_red
        res = cv.bitwise_and(img, img, mask=mask)
        blur0 = cv.medianBlur(res, 3)
        # blur1 = cv.bilateralFilter(res, 9, 75, 75)
        gray = cv.cvtColor(blur0, cv.COLOR_BGR2GRAY)

        if (k1 < 160):
            filename = "AQC161932{}V_00005.801.jpg".format(k1)
            k1 += 5
        else:
            filename = "AQC161932{}V_00005.801.jpg".format(k2)
            k2 += 5
        cv.imwrite(os.path.join(folder_path, filename), gray)
        jpg_to_gif()


def jpg_to_gif():
    # replace with your directory path
    directory = './pysteps/radar/mch/20160711'
    # loop over all files in the directory
    for filename in os.listdir(directory):
        if filename.endswith('.jpg'):  # check if the file has a .jpg extension
            # create the new filename by replacing the .jpg extension with .gif
            new_filename = os.path.splitext(filename)[0] + '.gif'
            # rename the file
            os.rename(os.path.join(directory, filename),
                      os.path.join(directory, new_filename))
    pysteps_precip()


def pysteps_precip():
    # Set nowcast parameters
    n_ens_members = 20
    n_leadtimes = 6
    seed = 24
    timestep = 5
    ###############################################################################
    # Read precipitation field
    # ------------------------
    #
    # First thing, the sequence of Swiss radar composites is imported, converted and
    # transformed into units of dBR.

    # Load data source config
    # date = datetime.strptime("201701311205", "%Y%m%d%H%M")
    data_source = "mch"
    # date = datetime.strptime("201701311210", "%Y%m%d%H%M")
    date0 = datetime.strptime("201607112230", "%Y%m%d%H%M")
    print("After date0")
    # Load data source config
    root_path = pysteps.rcparams.data_sources[data_source]["root_path"]
    path_fmt = pysteps.rcparams.data_sources[data_source]["path_fmt"]
    fn_pattern = pysteps.rcparams.data_sources[data_source]["fn_pattern"]
    fn_ext = pysteps.rcparams.data_sources[data_source]["fn_ext"]
    importer_name = pysteps.rcparams.data_sources[data_source]["importer"]
    importer_kwargs = pysteps.rcparams.data_sources[data_source]["importer_kwargs"]
    timestep = pysteps.rcparams.data_sources[data_source]["timestep"]

    print(root_path)
    # Find the radar files in the archive
    # fns = io.importers.import_mch_gif('/content/drive/MyDrive/RadarData/data/pysteps/radar/mch/AQC170311000F_00005.801-1.gif', product='AQC', unit='mm/h', accutime=5.0)
    # print(io.archive.find_by_date(date, root_path, path_fmt, fn_pattern, fn_ext, timestep, 0, 0))
    fns = io.archive.find_by_date(
        date0, root_path, path_fmt, fn_pattern, fn_ext, timestep, 0, 0)

    print(fns)
    # Read the data from the archive
    importer = io.get_method(importer_name, "importer")
    R, _, metadata = io.read_timeseries(fns, importer, **importer_kwargs)

    # Convert to rain rate
    R, metadata = conversion.to_rainrate(R, metadata)

    # Upscale data to 2 km to limit memory usage
    R, metadata = dimension.aggregate_fields_space(
        R, metadata, space_window=None)

    # R = R.reshape(1,1300,200)

    # Plot the rainfall field
    plot_precip_field(R[-1, :, :], geodata=metadata,
                      colorscale="pysteps", colorbar=True)
    plt.show()
    print(R.shape)
    # Log-transform the data to unit of dBR, set the threshold to 0.1 mm/h,
    # set the fill value to -15 dBR
    R, metadata = transformation.dB_transform(
        R, metadata, threshold=0.1, zerovalue=-15.0)

    # Set missing values with the fill value
    R[~np.isfinite(R)] = -15.0

    # Nicely print the metadata
    pprint(metadata)


if __name__ == 'main':
    app.run(debug=True)

