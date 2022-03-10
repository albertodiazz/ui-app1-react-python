import pandas as pd
import re
from pathlib import Path

from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
import requests

from lib import config
from lib import saveToRubros
from lib import buscadorDeRangos
from lib import fixeDataRubros
from lib import getLastMonthYear
from lib import setJson 
