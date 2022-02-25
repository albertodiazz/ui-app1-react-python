from lib import pd
from lib import config
from lib import filterToRubro


if __name__ == '__main__':
    print('Ejecutando app')
    # Esta funcion solo se debe ejecutar una vez
    # y el momento para eso es cuando cambien los csv
    # del genesis
    filterToRubro.run(config.CSV_BASE_INPC)
