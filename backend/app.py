'''

filename: app.py

This module allows construction of Television class instance.
Saves all created objects in a Television class dictionary.
Objects are called on user demand.

'''

from Television import Television
from flask import Flask, request, jsonify
from flask_cors import CORS
from uuid import uuid4

app = Flask(__name__)
CORS(app)

televisions = {}


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
            "id": value.id,
            "on": value.on
        }

        all_tv_info.append(tv_info)
    return jsonify(all_tv_info), 200

# Create new TV and return newly created instance
@app.route('/televisions/create')
def create_tv():
    global televisions

    tv = Television(1, 0, True, uuid4())
    televisions[tv.id] = tv

    tv_info = {
        "channel": tv.get_channel(),
        "volume_level": tv.get_volume_level(),
        "id": tv.id,
        "on": tv.on
    }

    return jsonify(tv_info), 200

@app.route('/televisions/channel/<id>/up')
def increase_tv_channel(id):
    try:
        print(id)
        tv: Television
        tv = televisions[id]
        tv.channel_up()

        return jsonify(tv.get_channel()), 200

    except IndexError:
        return jsonify(f"You can not go past over {tv.CHANNEL_MAX}!"), 405

@app.route('/televisions/channel/<id>/down')
def decrease_tv_channel(id):
    try:
        print(id)
        tv: Television
        tv = televisions[id]
        tv.channel_down()

        return jsonify(tv.get_channel()), 200

    except ValueError:
        return jsonify(f"You can not go past down {tv.CHANNEL_MIN}!"), 405

@app.route('/televisions/volume/<id>/up')
def increase_tv_volume(id):
    try:
        print(id)
        tv: Television
        tv = televisions[id]
        tv.volume_up()

        return jsonify(tv.get_volume_level()), 200

    except ValueError:
        return jsonify(f"You can not go past over {tv.VOLUME_MAX}!"), 405

@app.route('/televisions/volume/<id>/down')
def decrease_tv_volume(id):
    try:
        print(id)
        tv: Television
        tv = televisions[id]
        tv.volume_down()

        return jsonify(tv.get_volume_level()), 200

    except ValueError:
        return jsonify(f"You can not go under {tv.VOLUME_MIN}!"), 405

@app.route('/televisions/power/<id>')
def switch_on_off_tv(id):
    tv: Television
    tv = televisions[id]
    tv.switch()

    return jsonify(tv.on), 200

@app.route('/televisions/<id>/info')
def brief(id):
    tv: Television
    tv = televisions[id]
    # Gets the tv information
    info = tv.tv()

    return jsonify(info), 200

@app.route('/televisions/channel/<id>/set', methods=['POST'])
def set_tv_channel(id):
    try:
        req_body = request.json
        channel = req_body.get('channel')

        print(id)
        tv: Television
        tv = televisions[id]
        tv.set_channel(int(channel))

        return jsonify(tv.get_channel()), 200

    except IndexError:
        return jsonify(f"You can not go past over {tv.CHANNEL_MAX}!"), 405
    
    except ValueError:
        return jsonify(f"Channel value must be an integer!"), 405

@app.route('/televisions/volume/<id>/set', methods=['POST'])
def set_tv_volume(id):
    try:
        req_body = request.json
        volume = req_body.get('volume')

        print(id)
        tv: Television
        tv = televisions[id]
        tv.set_volume_level(int(volume))

        return jsonify(tv.get_volume_level()), 200

    except IndexError:
        return jsonify(f"You can not go past over {tv.VOLUME_MAX} or below {tv.VOLUME_MIN}!"), 405
    
    except ValueError:
        return jsonify(f"Volume value must be an integer that is a multiple of 10!"), 405