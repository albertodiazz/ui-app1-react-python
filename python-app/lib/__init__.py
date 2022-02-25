import pandas as pd

from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
import requests

from lib import config
from lib import filterToRubro
