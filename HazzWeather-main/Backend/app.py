import cv2 as cv
import aspose.words as aw
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
from flask import Flask, request, jsonify
from flask import Flask
import glob
import time
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
app.config['UPLOAD_FOLDER'] = '../src/assets/uploads'

# upload files from the user


@app.route('/upload', methods=['POST'])
def upload():
    # empty the folder
    # files = glob.glob('../src/assets/uploads/*')
    # for f in files:
    #     os.remove(f)
    gif_files = glob.glob('../src/assets/gif_frames/*')
    for gf in gif_files:
        os.remove(gf)
    preprocessed_files = glob.glob(
        './pysteps/radar/mch/20160711/*')
    for pf in preprocessed_files:
        os.remove(pf)
    preprocessed_assets = glob.glob('../src/assets/preprocessing/*')
    for p_f in preprocessed_assets:
        os.remove(p_f)
    precip_files = glob.glob('../src/assets/precip/*')
    for prf in precip_files:
        os.remove(prf)
    nowcast_files = glob.glob('../src/assets/nowcasts/*')
    for nf in nowcast_files:
        os.remove(nf)

    # check if the post request has the file part
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    # check if the file is a gif
    if file and file.filename.endswith('.gif'):
        # os.mkdir('./uploads/gif_frames')
        # do something with the file, e.g. save it to disk
        # os.rename(file.filename, 'upload.gif')
        # file.filename = 'upload.gif'
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], f"upload.gif")
        file.save(file_path)
        # print('File uploaded successfully')
        gif_folder = '../src/assets/gif_frames'
        extract_gif_frames(file_path, gif_folder)
        pysteps_precip()
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
    org_img = [cv.imread(file)
               for file in glob.glob("../src/assets/gif_frames/*.jpg")]
    config_file_path = pysteps.datasets.create_default_pystepsrc(
        './pysteps', config_dir=None, file_name='pystepsrc', dryrun=False)
    _ = pysteps.load_config_file(config_file_path, verbose=True)
    folder_path = "./pysteps/radar/mch/20160711"
    folder_path1 = "../src/assets/preprocessing"
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

        # BLUE
        # low_blue = np.array([94, 80, 2])
        # high_blue = np.array([126, 255, 255])
        low_blue = np.array([94, 120, 120])
        high_blue = np.array([131, 255, 255])
        mask_blue = cv.inRange(hsv, low_blue, high_blue)
        blue = cv.bitwise_and(img, img, mask=mask_blue)
        # cv.imshow('blue', blue)

        # RED
        low_red = np.array([0, 255, 200])
        high_red = np.array([14, 255, 255])
        mask_red = cv.inRange(hsv, low_red, high_red)
        red = cv.bitwise_and(img, img, mask=mask_red)
        # cv.imshow('red', red)

        # YELLOW
        low_yellow = np.array([22, 132, 252])
        high_yellow = np.array([32, 255, 255])
        mask_yellow = cv.inRange(hsv, low_yellow, high_yellow)
        yellow = cv.bitwise_and(img, img, mask=mask_yellow)
        # cv.imshow('yellow', yellow)

        # WHITE
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
        cv.imwrite(os.path.join(folder_path1, filename), gray)
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
    print("all converted")
    # time.sleep(5)
    # pysteps_precip()


def pysteps_precip():
    # Set nowcast parameters
    n_ens_members = 20
    n_leadtimes = 6
    seed = 24
    timestep = 5

    # count = 0
    # num1 = 201607112100
    # num2 = 201607112200

    # for filename in os.listdir('./pysteps/radar/mch/20160711'):
    #     print(filename)
    #     count = count+1
    # print(count)
    # date = datetime.strptime("201701311205", "%Y%m%d%H%M")
    # date = datetime.strptime("201701311210", "%Y%m%d%H%M")

    # for i in range(count):
    #     if num1 < 201607112160:
    #         fname = num1
    #     else:
    #         fname = num2

    # dname = str(fname)
    # print(dname)

    #    if num1 < 201607112160:
    #         num1 = +5
    #     else:
    #         num2 = +5

    date0 = datetime.strptime("201607112100", "%Y%m%d%H%M")
    date1 = datetime.strptime("201607112105", "%Y%m%d%H%M")
    date2 = datetime.strptime("201607112110", "%Y%m%d%H%M")
    date3 = datetime.strptime("201607112115", "%Y%m%d%H%M")
    date4 = datetime.strptime("201607112120", "%Y%m%d%H%M")
    date5 = datetime.strptime("201607112125", "%Y%m%d%H%M")
    date6 = datetime.strptime("201607112130", "%Y%m%d%H%M")
    date7 = datetime.strptime("201607112135", "%Y%m%d%H%M")
    date8 = datetime.strptime("201607112140", "%Y%m%d%H%M")
    date9 = datetime.strptime("201607112145", "%Y%m%d%H%M")
    date10 = datetime.strptime("201607112150", "%Y%m%d%H%M")
    date11 = datetime.strptime("201607112155", "%Y%m%d%H%M")
    date12 = datetime.strptime("201607112200", "%Y%m%d%H%M")
    date13 = datetime.strptime("201607112205", "%Y%m%d%H%M")
    date14 = datetime.strptime("201607112210", "%Y%m%d%H%M")
    date15 = datetime.strptime("201607112215", "%Y%m%d%H%M")
    date16 = datetime.strptime("201607112220", "%Y%m%d%H%M")
    date17 = datetime.strptime("201607112225", "%Y%m%d%H%M")
    date18 = datetime.strptime("201607112230", "%Y%m%d%H%M")

    data_source = "mch"
    arr_ts = [date0, date1, date2, date3, date4, date5, date6, date7, date8, date9,
              date10, date11, date12, date13, date14, date15, date16, date17, date18]
    # Load data source config
    root_path = pysteps.rcparams.data_sources[data_source]["root_path"]
    path_fmt = pysteps.rcparams.data_sources[data_source]["path_fmt"]
    fn_pattern = pysteps.rcparams.data_sources[data_source]["fn_pattern"]
    fn_ext = pysteps.rcparams.data_sources[data_source]["fn_ext"]
    importer_name = pysteps.rcparams.data_sources[data_source]["importer"]
    importer_kwargs = pysteps.rcparams.data_sources[data_source]["importer_kwargs"]
    timestep = pysteps.rcparams.data_sources[data_source]["timestep"]

    print(root_path)
    arr_sample = []

    # Find the radar files in the archive

    for i in range(len(arr_ts)):
        fns = io.archive.find_by_date(
            arr_ts[i], root_path, path_fmt, fn_pattern, fn_ext, 8, 0, 0)
        print(fns)
        # Read the data from the archive
        importer = io.get_method(importer_name, "importer")
        R, _, metadata = io.read_timeseries(fns, importer, **importer_kwargs)
        # print(R)
        print(R.shape)
        ar = np.array(R)
        # R = R.reshape(1,1500,520)
        print(R.shape)
        R = R[-1, :, :]

        arr_sample.append(R)
        R[~np.isfinite(R)] = -15.0
        fig,ax=plt.subplots()
        plot_precip_field(arr_sample[i], geodata=metadata,
                          colorscale="pysteps", colorbar=True)
        print(arr_sample[i].shape)
        
        tosave = "../src/assets/precip/plot{}.png".format(i)
        fig.savefig(tosave)
        plt.close()
        plt.figure().clear()
    nowcast(arr_sample)
    # time.sleep(60)


def nowcast(arr_sample):
    arr_sample = np.array(arr_sample)
    arr_nowcast = []
    print(arr_sample)
    for i in range(len(arr_sample)-13):
        # precipitation[0:5] -> Used to find motion (past data). Let's call it training precip.
        train_precip = arr_sample[i:i+7]
        observed_precip = arr_sample[i+7: i+19]
        # print(train_precip.shape[0])
        #print(i+11)
        # precipitation[5:] -> Used to evaluate forecasts (future data, not available in "real" forecast situation)
        # Let's call it observed precipitation because we will use it to compare our forecast with the actual observations.
        # Estimate the motion field with Lucas-Kanade

        # Import the Lucas-Kanade optical flow algorithm
        oflow_method = motion.get_method("LK")

        # Estimate the motion field from the training data (in dBR)
        #motion_field = oflow_method(train_precip_dbr)
        motion_field = oflow_method(train_precip)
        n_leadtimes = 6
        fig,ax=plt.subplots()
        # Extrapolate the last radar observation
        #extrapolate = nowcasts.get_method("extrapolation")
        nowcast_method = nowcasts.get_method("steps")
        # Estimate the motion field
        V = dense_lucaskanade(train_precip)
        R_f = nowcast_method(
            train_precip[-3:, :, :],
            V,
            n_leadtimes,
            n_ens_members=5,
            n_cascade_levels=9,
            R_thr=8.0,
            kmperpixel=2.0,
            timestep=10,
            noise_method="nonparametric",
            vel_pert_method="bps",
            mask_method="obs",
            probmatching_method="cdf",
            seed=1,
        )
        precip_forecast = np.mean(R_f[:, :, :], axis=0)
        arr_nowcast.append(precip_forecast[5])
        # plt.figure(figsize=(9, 5), dpi=100)
        plot_precip_field(arr_nowcast[i],  axis="off",colorbar=True)
        # Plot the motion field vectors
        # quiver(motion_field,  step=40)
        # print("before pltshow")
        
        save = "../src/assets/nowcasts/now{}.png".format(i)
        fig.savefig(save)
        # fulln = mylist_file[i+12]
        # fn=fulln[3:19]
        # f1 = h5py.File(f"/content/drive/MyDrive/RadarData/data/20180814/Now_{fn}_180.hdf5", "w")
        # for k in range(precip_forecast.shape[0]):
        #    f1.create_dataset(f"{fn} - {(k+1)*15}", data=precip_forecast[k])
        # f1.close()
    print(len(arr_nowcast))
    nowcast_to_gif()


def nowcast_to_gif():
    # Create the frames
    frames = []
    imgs = glob.glob('../src/assets/nowcasts/*')
    for i in imgs:
        new_frame = Image.open(i)
        frames.append(new_frame)

    # Save into a GIF file that loops forever
    frames[0].save('../src/nowcast.gif', format='GIF',
                   append_images=frames[1:],
                   save_all=True,
                   duration=700, loop=0)

if __name__ == 'main':
    app.run(debug=True)
