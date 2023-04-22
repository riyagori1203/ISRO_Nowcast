from PIL import Image
from flask import Flask, request, jsonify
from flask import Flask
import glob
import os
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
    return frames


if __name__ == 'main':
    app.run(debug=True)
