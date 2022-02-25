from lib import pd
from lib import config
from lib import filterToRubro
from lib import Flask, Api, CORS, Resource, reqparse


app = Flask(__name__, template_folder='template/')
api = Api(app)
CORS(app)
api_call = reqparse.RequestParser()


# curl -X POST localhost:5000/fechas -G 'Content-Type: application/json' -d "msg=value"

api_call.add_argument('mesA', type=str)
api_call.add_argument('anoA', type=str)
api_call.add_argument('mesB', type=str)
api_call.add_argument('anoB', type=str)


class rangosDeFechas(Resource):
    def post(self):
        args = api_call.parse_args()
        print(args['mesA'], args['mesB'])


api.add_resource(rangosDeFechas,'/fechas')


if __name__ == '__main__':
    print('Ejecutando app')
    # Esta funcion solo se debe ejecutar una vez
    # y el momento para eso es cuando cambien los csv
    # del genesis
    # -------------------------------- 
    # -------------------------------- 
    # filterToRubro.run(config.CSV_BASE_INPC)
    # -------------------------------- 
    # -------------------------------- 
    app.run(debug=True)
