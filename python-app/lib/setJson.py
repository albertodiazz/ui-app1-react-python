# En este documento seteamos el json que leera TouchDesigner
import json


def run(_pathJson_, **kwargs):
    f = open(_pathJson_)
    data = json.load(f)
    for key, value in kwargs.items():
                print("The value of {} is {}".format(key, value))
                data[key] = value 
                with open(_pathJson_, 'w') as f:
                    json.dump(data, f)
    f.close()
    return
