'''

filename: app.py

This module allows construction of Television class instance.
Saves all created objects in a Television class dictionary.
Objects are called on user demand.

'''

from Television import Television
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

televisions = {}

# Mock television instance creation for now
tv_one = Television(5, 10, True, 'one')
print(tv_one)
televisions[tv_one.id] = tv_one

@app.route('/')
def hello():
    return "Hello, world!"

@app.route('/televisions')
def get_all_tv():
    all_tv_info = []

    value:Television
    for value in televisions.values():
        tv_info = {
            "channel": value.get_channel(),
            "volume_level": value.get_volume_level(),
            "id": value.id
        }

        all_tv_info.append(tv_info)
    return jsonify(all_tv_info), 200