from lib import pd
from lib import config
from lib import saveToRubros 
from lib import Flask, Api, CORS, Resource, reqparse, jsonify
import json
from lib import buscadorDeRangos
from lib import getLastMonthYear


app = Flask(__name__, template_folder='template/')
api = Api(app)
CORS(app)
api_call = reqparse.RequestParser()
path = '/mnt/d/trabajo/cocay/ramodelacion_Mide/2_4_mide_inflacion/python-app/data/request.json'

# curl -X POST localhost:5000/fechas -G 'Content-Type: application/json' -d "msg=value"

api_call.add_argument('mes', type=str)
api_call.add_argument('year', type=str)
api_call.add_argument('nameRubro', type=str)
api_call.add_argument('getLastDates', type=str)


class rangosDeFechas(Resource):
    def post(self):
        args = api_call.parse_args()
        # TODO
        # [x] regresar las fechas en json
        # [x] hay que cambiar +3 to +6 ya que todo eso esta mal, el json ya no
        #    lo vamos a ocupar y mandaremos la data en cuanto el cliente la solicite
        # FIRE
        # [] Hay que probar diferentes meses ya que parece que solo funciona con Feb
        # buscadorDeRangos.search().to_json()
        # ------------------------------------------------------
        # data['Temporalidad']['mesA'] = args['mesA'] if args['mesA'] is not None else data['Temporalidad']['mesA'] 
        print(args['mes'], args['year'], args['nameRubro'])
        if args['nameRubro'] is not None:
            if args['mes'] is not None and args['year'] is not None:
                # El mensaje trae los dos atributos por lo tanto estamos en modo mensual
                data = buscadorDeRangos.search(args['nameRubro'], jahr=int(args['year']), mes=args['mes']) 
                print(data)
                return data.to_json()
            else:
                # Quiere decir que solo nos mando el year y estamos en modo anual
                data = buscadorDeRangos.search(args['nameRubro'], jahr=int(args['year']))
                return data
        # ------------------------------------------------------


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
