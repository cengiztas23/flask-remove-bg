from flask import Flask, request, send_file
from flask_cors import CORS
from rembg import remove
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)

@app.route('/remove-bg', methods=['POST'])
def remove_bg():
    if 'image' not in request.files:
        return 'No image uploaded', 400

    image_file = request.files['image']
    input_image = Image.open(image_file).convert("RGBA")
    output_image = remove(input_image)

    img_io = io.BytesIO()
    output_image.save(img_io, 'PNG')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))  # Render portunu kullan
    app.run(host="0.0.0.0", port=port)         # Her yerden erişilebilir olsun
