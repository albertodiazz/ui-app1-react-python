'''[Por el momentos no estoy utilizando esta programacion ya que me causaba un bug
al guardar varios json de forma simultanea mejor opte por salvar un archivo json por 
mensaje]'''

import json
import ast
from lib import config
import queue

config.safeJson = 0

def run(_pathJson_, **kwargs):
    try:
        f = open(_pathJson_)
        data = json.load(f)
        fixe = open(config.PATH_TXT, 'w')
        for key, value in kwargs.items():
                    print("The value of {} is {}".format(key, value))
                    data[key] = value 
                    fixe.write(json.dumps(data))
                    fixe.close()
                    config.safeJson += 1
                    print('{} >>>>>>>>>>>>>>>>> {}'.format(config.safeJson, data))
        with open(_pathJson_, 'w') as f:
            json.dump(data, f)
        f.close()
        # Forzamos el error para que levante la excepcion y lo haga en automatico
        # force = open(_pathJson_)
        # dataForce = json.load(force)
        # force.close()
    except json.JSONDecodeError:
        try:
            f.close()
            print('Problemas con el JSON en setJson.py')
            fixe = open(config.PATH_TXT, 'r')
            # print('Estas son las variables globales en config : {}'.format(fixe.read()))
            data = fixe.read()
            data = '"' + data + '"'
            sub_str = "}"
            r = data[:data.index(sub_str) + len(sub_str)]
            dataFix = r[1:]
            print(json.loads(dataFix))
            toJson = json.loads(dataFix)
            with open(config.PATH_JSON, 'w') as f:
                json.dump(toJson, f)
            fixe.close()
        except TypeError as error:
            print('Excepcion en setJson :'.format(error))
    return 
