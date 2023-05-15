'''

filename: app.py

This module allows construction of Television class instance.
Saves all created objects in a Television class dictionary.
Objects are called on user demand.

'''

from Television import Television
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

televisions = {}

@app.route('/')
def hello():
    return "Hello, world!"