from lib import pd
from lib import config
from lib import saveToRubros 
from lib import Flask, Api, CORS, Resource, reqparse, jsonify
import json
from lib import buscadorDeRangos
from lib import getLastMonthYear
from lib import setJson
import json


app = Flask(__name__, template_folder='template/')
api = Api(app)
CORS(app)
api_call = reqparse.RequestParser()
path = '/mnt/d/trabajo/cocay/ramodelacion_Mide/2_4_mide_inflacion/python-app/data/request.json'

# curl -X POST localhost:5000/fechas -G 'Content-Type: application/json' -d "msg=value"

api_call.add_argument('mes', type=str)
api_call.add_argument('year', type=str)
api_call.add_argument('nameRubros', type=str)
api_call.add_argument('getLastDates', type=str)
api_call.add_argument('temporalidad', type=str)
api_call.add_argument('momentosEspeciales', type=str)
api_call.add_argument('nivel', type=str)
api_call.add_argument('subyacente', type=str)


class rangosDeFechas(Resource):
    def post(self):
        args = api_call.parse_args()
        # ------------------------------------------------------
        try:
            if args['mes'] is not None and args['year'] is not None:
                # El mensaje trae los dos atributos por lo tanto estamos en modo mensual
                fixe = [args['mes'], args['year']]
                setJson.run(config.PATH_JSON, Fecha= '-'.join(fixe))
                # Este buscador de rangos no lo voy a ocupar ya que la data sera leida desde Touch
                # data = buscadorDeRangos.search(args['nameRubro'], jahr=int(args['year']), mes=args['mes']) 
                return {'statusCode': '200',
                        'body': json.dumps('El msg se salvo de forma correcta')} 
        except TypeError as error:
            return {'statusCode': '400',
                    'body': json.dumps(error)}
        # ------------------------------------------------------


class setMensualAnual(Resource):
    def post(self):
        args = api_call.parse_args()
        try:
            if args['temporalidad'] is not None:
                setJson.run(config.PATH_JSON, Temporalidad=args['temporalidad'])
                return {'statusCode' : '200',
                        'body': json.dumps('Mensaje temporalidad salvado')}
        except TypeError as error:
            return {'statusCode': '400',
                    'body': json.dumps(error)}


class setBusqueda(Resource):
    def post(self):
        args = api_call.parse_args()
        try:
            if args['nameRubros'] is not None:
                setJson.run(config.PATH_JSON, Buscador=args['nameRubros'])
                return {'statusCode' : '200',
                        'body': json.dumps('Mensaje busqueda salvado')}
        except TypeError as error:
            return {'statusCode': '400',
                    'body': json.dumps(error)}


class setMomentos(Resource):
    def post(self):
        args = api_call.parse_args()
        try:
            if args['momentosEspeciales'] is not None:
                setJson.run(config.PATH_JSON, Especial=args['momentosEspeciales'])
                return {'statusCode' : '200',
                        'body': json.dumps('Mensaje momentos salvado')}
        except TypeError as error:
            return {'statusCode': '400',
                    'body': json.dumps(error)}


class setNiveles(Resource):
    def post(self):
        args = api_call.parse_args()
        try:
            if args['nivel'] is not None:
                setJson.run(config.PATH_JSON, Nivel=args['nivel'])
                return {'statusCode' : '200',
                        'body': json.dumps('Mensaje momentos salvado')}
        except TypeError as error:
            return {'statusCode': '400',
                    'body': json.dumps(error)}


class setSubyacentes(Resource):
    def post(self):
        args = api_call.parse_args()
        try:
            if args['subyacente'] is not None:
                setJson.run(config.PATH_JSON, Subyacentes=args['subyacente'])
                return {'statusCode' : '200',
                        'body': json.dumps('Mensaje momentos salvado')}
        except TypeError as error:
            return {'statusCode': '400',
                    'body': json.dumps(error)}


class getData(Resource):
    def post(self):
        args = api_call.parse_args()
        print('getData: {}'.format(args['getLastDates']))
        # TODO : [Hay que hacerlo cuando nos llegue la base de datos actualizada o 
        #         estemos en esa parte] 
        # [x] Consumir el INPC
        # [x] Consumir los datos subyacentes
        # [x] Consumir los totales de subyacente y no subyacente en linea 316
        # [] Consumir los datos de los rubros ya que tambien tienen no solo hay que consumir
        #    el de los productos
        # [x] Pensar en que me van agreagar una columna mas entre 1 3
        # ------------------------------------------------------
        data = getLastMonthYear.run(args['getLastDates']) if args['getLastDates'] is not None else '400' 
        # ------------------------------------------------------
        print(data)
        return jsonify(data) 


# ---------------------------------------------
api.add_resource(rangosDeFechas, '/fechas')
api.add_resource(getData, '/get_last')
api.add_resource(setMensualAnual, '/mensualAnual')
api.add_resource(setBusqueda, '/busqueda')
api.add_resource(setMomentos, '/momentos')
api.add_resource(setNiveles, '/niveles')
api.add_resource(setSubyacentes, '/subyacentes')
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
