import asyncio
import concurrent
import websockets
from websockets import serve
import threading
from lib import pd
from lib import webSocketMessage 
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
CLIENTS = set()

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
                if len(args['mes']) > 2: 
                    fixe = [args['mes'], args['year']]
                    print(fixe)
                    # setJson.run(config.PATH_JSON, Fecha= '-'.join(fixe))
                    config.DATA_TO_FRONT['fechas'] ='-'.join(fixe) 
                    asyncio.run(webSocketMessage.sendMessage(msg='.'))
                    with open(config.PATH_JSONS + 'Fecha.json', 'w') as f:
                        json.dump({'Fecha': '-'.join(fixe)}, f)
                # Este buscador de rangos no lo voy a ocupar ya que la data sera leida desde Touch
                # data = buscadorDeRangos.search(args['nameRubro'], jahr=int(args['year']), mes=args['mes']) 
                return {'statusCode': '200',
                        'body': json.dumps('El msg rangosDeFechas se salvo de forma correcta'),
                        'data': json.dumps(fixe)} 
        except TypeError as error:
            return {'statusCode': '400',
                    'body': json.dumps(error)}
        # ------------------------------------------------------


class setMensualAnual(Resource):
    def post(self):
        args = api_call.parse_args()
        try:
            if args['temporalidad'] is not None:
                if len(args['temporalidad']) > 2: 
                    # setJson.run(config.PATH_JSON, Temporalidad=args['temporalidad'])
                    config.DATA_TO_FRONT['mensualAnual'] = args['temporalidad']
                    asyncio.run(webSocketMessage.sendMessage(msg='.'))
                    with open(config.PATH_JSONS + 'Temporalidad.json', 'w') as f:
                        json.dump({'Temporalidad': args['temporalidad']}, f)
                return {'statusCode' : '200',
                        'body': json.dumps('El msg setMensualAnual se salvo de forma correcta'),
                        'data': json.dumps(args['temporalidad'])} 
        except TypeError as error:
            return {'statusCode': '400',
                    'body': json.dumps(error)}


class setBusqueda(Resource):
    def post(self):
        args = api_call.parse_args()
        try:
            if args['nameRubros'] is not None:
                if len(args['nameRubros']) > 2: 
                    # setJson.run(config.PATH_JSON, Buscador=args['nameRubros'])
                    config.DATA_TO_FRONT['busqueda'] = args['nameRubros']
                    asyncio.run(webSocketMessage.sendMessage(msg='.'))
                    with open(config.PATH_JSONS + 'Buscador.json', 'w') as f:
                        json.dump({'Buscador': args['nameRubros']}, f)
                return {'statusCode' : '200',
                        'body': json.dumps('El msg setBusqueda se salvo de forma correcta'),
                        'data': json.dumps(args['nameRubros'])} 
        except TypeError as error:
            return {'statusCode': '400',
                    'body': json.dumps(error)}


class setMomentos(Resource):
    def post(self):
        args = api_call.parse_args()
        try:
            if args['momentosEspeciales'] is not None:
                if len(args['momentosEspeciales']) > 2: 
                    # setJson.run(config.PATH_JSON, Especial=args['momentosEspeciales'])
                    config.DATA_TO_FRONT['momentos'] = args['momentosEspeciales']
                    asyncio.run(webSocketMessage.sendMessage(msg='.'))
                    with open(config.PATH_JSONS + 'Especial.json', 'w') as f:
                        json.dump({'Especial': args['momentosEspeciales']}, f)
                return {'statusCode' : '200',
                        'body': json.dumps('El msg setMomentos se salvo de forma correcta'),
                        'data': json.dumps(args['momentosEspeciales'])} 
        except TypeError as error:
            return {'statusCode': '400',
                    'body': json.dumps(error)}


class setNiveles(Resource):
    def post(self):
        args = api_call.parse_args()
        try:
            if args['nivel'] is not None:
                if len(args['nivel']) > 2: 
                    # setJson.run(config.PATH_JSONS, Nivel=args['nivel'])
                    config.DATA_TO_FRONT['niveles'] = args['nivel']
                    asyncio.run(webSocketMessage.sendMessage(msg='.'))
                    with open(config.PATH_JSONS + 'Nivel.json', 'w') as f:
                        json.dump({'Nivel': args['nivel']}, f)
                return {'statusCode' : '200',
                        'body': json.dumps('El msg setNiveles se salvo de forma correcta'),
                        'data': json.dumps(args['nivel'])} 
        except TypeError as error:
            return {'statusCode': '400',
                    'body': json.dumps(error)}


class setSubyacentes(Resource):
    def post(self):
        args = api_call.parse_args()
        try:
            if args['subyacente'] is not None:
                if len(args['subyacente']) > 2: 
                    # setJson.run(config.PATH_JSON, Subyacentes=args['subyacente'])
                    config.DATA_TO_FRONT['subyacentes'] = args['subyacente']
                    asyncio.run(webSocketMessage.sendMessage(msg='.'))
                    with open(config.PATH_JSONS + 'Subyacentes.json', 'w') as f:
                        json.dump({'Subyacentes': args['subyacente']}, f)
                return {'statusCode' : '200',
                        'body': json.dumps('El msg setSubyacentes se salvo de forma correcta'),
                        'data': json.dumps(args['subyacente'])} 
        except TypeError as error:
            return {'statusCode': '400',
                    'body': json.dumps(error)}


class getData(Resource):
    def post(self):
        args = api_call.parse_args()
        print('getData: {}'.format(args['getLastDates']))
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
# ------------------------------------------------------------------------- 
# [MutiThreating Execution]
# ------------------------------------------------------------------------- 
async def handler(websocket):
    CLIENTS.add(websocket)
    print('\n Alguien se conecto \n')
    # config.DATA_TO_FRONT['update'] += 1 
    await websocket.send(json.dumps({'starusCode': 200,
                                     'body': json.dumps(config.DATA_TO_FRONT)}))
    async for message in websocket:
        try:
            # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            # Solo en este momento compartimos cronometro con Touch
            await broadcast(json.dumps({'starusCode': 200,
                                        'body': json.dumps(config.DATA_TO_FRONT)}))
            # print(config.DATA_TO_FRONT)
        except TypeError as error:
            await websocket.send(json.dumps({'statusCode': 400}))
            print(error)
            pass


async def broadcast(message):
    # En esta funcion obtenemos la cantidad de clientes conectados y es donde
    # les enviamos el mensaje a todos los cliente 
    # Hay una mejor manera de hacer esto en la documentacion The concurrent way
    # https://websockets.readthedocs.io/en/stable/topics/broadcast.html
    for websocket in CLIENTS.copy():
        try:
            await websocket.send(message)
        except websockets.ConnectionClosed:
            pass


async def execute_WebSocket():
    print('Inciando WebSocket')
    async with serve(handler, "localhost", 8765):
        await asyncio.Future()  # run forever


async def main(task=3):
    # async with serve(handler, "localhost", 8765):
    #     await asyncio.Future()  # run forever
    # TODO
    # [] Hay que revizar que el resetSesion en este punto no me cause problemas
    global _shutdown
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        loop = asyncio.get_running_loop()
        futures = [
            await loop.run_in_executor(pool, execute_WebSocket),
            loop.run_in_executor(pool, app.run)
            # loop.run_in_executor(pool, reset.resetSesion)
        ]
        try:
            results = await asyncio.gather(*futures, return_exceptions=False)
        except Exception as ex:
            print("Caught error executing task", ex)
            _shutdown = True
            raise
        print(f"Fnished processing, got results: {results}")
# ------------------------------------------------------------------------- 
# ------------------------------------------------------------------------- 

if __name__ == '__main__':
    try:
        print('Ejecutando app')
        # Esta funcion solo se debe ejecutar una vez
        # y el momento para eso es cuando cambien los csv
        # del genesis
        # -------------------------------- 
        # -------------------------------- 
        # saveToRubros.run(config.CSV_BASE_INPC)
        saveToRubros.run(config.INPC_MENSUAL, 'mensual')
        saveToRubros.run(config.INPC_ANUAL, 'anual')
        # -------------------------------- 
        # -------------------------------- 
        # app.run(debug=True)
        asyncio.run(main())
    except TypeError as error:
        print('ocurrion un error en app.py : {}'.format(error))
