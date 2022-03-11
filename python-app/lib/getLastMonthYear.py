from lib import config
from lib import pd


def run(_type_):
    '''En esta funcion siempre estamos tomando de referencia el ultimo mes y year de rubro1
        ya que en teoria en todos los rubros y csv los datos de actualizacion 
        son los mismos (al menos para rubros)
    [Args]
            [_type_ : str] [Espera un strong mensual, anual ya que ese es el nombre de nuestros folders]
    '''
    abreviacionesEspanol= {
        'ene': 'Enero',
        'feb': 'Febrero',
        'mar': 'Marzo',
        'abr': 'Abril',
        'jun': 'Junio',
        'jul': 'Julio',
        'ago': 'Agosto',
        'sep': 'Septiembre',
        'oct': 'Octubre',
        'nov': 'Noviembre',
        'dic': 'Diciembre'
    }
    folder = 'mensual' if _type_.lower() == 'mes' else 'anual'
 
    df = pd.read_csv(config.PATH_SAVE_RUBROS + '{}/'.format(folder) + 'rubro1' + '.csv', index_col=0)
    msg = df.columns[-1].split('-') # [mes, year]
    return {'lastMes': abreviacionesEspanol[msg[0]],
            'lastYear': msg[1],
            'Temporalidad': folder}
 
