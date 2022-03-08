from lib import config
from lib import pd


def run():
    '''En esta funcion siempre estamos tomando de referencia el ultimo mes y year de rubro1
        ya que en teoria en todos los rubros y csv los datos de actualizacion 
        son los mismos (al menos para rubros)
    '''
    abreviacionesEspanol= {
        'Ene': 'Enero',
        'Feb': 'Febrero',
        'Mar': 'Marzo',
        'Abr': 'Abril',
        'Jun': 'Junio',
        'Jul': 'Julio',
        'Ago': 'Agosto',
        'Sep': 'Septiembre',
        'Oct': 'Octubre',
        'Nov': 'Noviembre',
        'Dic': 'Diciembre'
    }
 
    df = pd.read_csv(config.PATH_SAVE_RUBROS + 'rubro1' + '.csv', index_col=0)
    msg = df.columns[-1].split('-') # [mes, year]
    return {'lastMes': abreviacionesEspanol[msg[0]],
            'lastYear': msg[1]}
 
