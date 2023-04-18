from flask import Flask, request, jsonify
from flask import Flask
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


@app.route('/upload', methods=['POST'])
def upload():
    # check if the post request has the file part
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    # check if the file is a gif
    if file and file.filename.endswith('.gif'):
        # do something with the file, e.g. save it to disk
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        # print('File uploaded successfully')
        return jsonify({'message': 'File uploaded successfully'})

    else:
        return 'Invalid file format'


if __name__ == 'main':
    app.run(debug=True)
