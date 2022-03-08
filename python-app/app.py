from lib import pd
from lib import config
from lib import saveToRubros 
from lib import Flask, Api, CORS, Resource, reqparse, jsonify
import json
from lib import getLastMonthYear


app = Flask(__name__, template_folder='template/')
api = Api(app)
CORS(app)
api_call = reqparse.RequestParser()
path = '/mnt/d/trabajo/cocay/ramodelacion_Mide/2_4_mide_inflacion/python-app/data/request.json'

# curl -X POST localhost:5000/fechas -G 'Content-Type: application/json' -d "msg=value"

api_call.add_argument('mesA', type=str)
api_call.add_argument('yearA', type=str)
api_call.add_argument('mesB', type=str)
api_call.add_argument('yearB', type=str)
api_call.add_argument('getLastDates', type=str)


def saveJson(datosIn):
    '''
    [Args]:
        [datosIn : dict]
    '''
    with open(path, 'w') as f:
        json.dump(datosIn, f)
    return


class rangosDeFechas(Resource):
    def post(self):
        file = open(path)
        data = json.load(file)
        args = api_call.parse_args()
        # TODO
        # [] regresar las fechas en jsonify
        # ------------------------------------------------------
        data['Temporalidad']['mesA'] = args['mesA'] if args['mesA'] is not None else data['Temporalidad']['mesA'] 
        data['Temporalidad']['mesB'] = args['mesB'] if args['mesB'] is not None else data['Temporalidad']['mesB'] 
        data['Temporalidad']['yearA'] = args['yearA'] if args['yearA'] is not None else data['Temporalidad']['yearA'] 
        data['Temporalidad']['yearB'] = args['yearB'] if args['yearB'] is not None else data['Temporalidad']['yearB'] 
        # ------------------------------------------------------
        saveJson(data)
        file.close()
        print(args['mesA'], args['mesB'])


class getData(Resource):
    def post(self):
        args = api_call.parse_args()
        # ------------------------------------------------------
        # getLastDates=run
        data = getLastMonthYear.run() if args['getLastDates'] is not None else '400' 
        # ------------------------------------------------------
        print(data)
        return jsonify(data) 


# ---------------------------------------------
api.add_resource(rangosDeFechas,'/fechas')
api.add_resource(getData,'/get_last')
# --------------------------------------------


if __name__ == '__main__':
    print('Ejecutando app')
    # Esta funcion solo se debe ejecutar una vez
    # y el momento para eso es cuando cambien los csv
    # del genesis
    # -------------------------------- 
    # -------------------------------- 
    # saveToRubros.run(config.CSV_BASE_INPC)
    # -------------------------------- 
    # -------------------------------- 
    app.run(debug=True)
