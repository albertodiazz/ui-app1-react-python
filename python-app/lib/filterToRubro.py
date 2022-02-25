from lib import pd
from lib import config


def get_Rubros(path, fixeData=2):
    '''
    Funcion en donde depuramos los datos del documento base

    Args:
        [path : str] : [path de nuestro CSV Base_INPC_1969_2021]
        [fixeData : int] : [En la tabla que nos pasaron el 24.02.22 existen
                            dos datos que nos nos funcionan para separar
                            los Rubros y son Titulo e INPC por eso agrego el 2]
                            [.Default] : [2]
    Return:
        [NameRubros : array] : [tiene los nombres de los rubros]
        [data : dic] : [contiene los atributos siguientes: 
                        columnas(son los meses), producto(nombre), valores]

    '''
    df = pd.read_csv(path, index_col=0)
    
    NameRubros, Posicion = [], [] 
    data = {}

    for i in range(len(df)):
        # El siguiente 2 no tiene nada que ver con el fixeData
        # lo ocupamos para separar los rumbros de los servicios
        # ya que en la tabla los tenemos con 00 dos digitos
        if len(df.index.str.split()[i][0]) == 2:
            NameRubros.append(df.index[i])
            Posicion.append(i + fixeData)

    producto, valores = [], []
    for x in range(len(Posicion)):
        print('<<<<<<<<<<<<<<<<{0}>>>>>>>>>>>>'.format(NameRubros[x]))
        producto, valores = [], []
        for i in range(len(df) + fixeData):
            try:
                if i > Posicion[x] and i < Posicion[x+1]:
                    producto.append(df.index[i-fixeData]) 
                    valores.append(df.iloc[i-fixeData].values)        
                    data.update({
                        NameRubros[x]: {
                            'columnas': df.columns,  
                            'producto': producto,
                            'valores': valores
                        }
                    })
            except IndexError:
                # Aqui obtengo los ultimos valores
                producto.append(df.index[i-fixeData]) 
                valores.append(df.iloc[i-fixeData].values) 
                data.update({
                    NameRubros[x]: {
                        'columnas': df.columns,
                        'producto': producto,
                        'valores': valores
                    }
                })
                pass
    
    return NameRubros, data 


def saveRubros(NameRubros, data):
    ''' 
    Aqui almacenamos la data en csv

    Args:
       [NameRubros : array] : [Necesitamos el nombre de los rubros]
       [data : dict] : [toda la data para crear nuestras dataFrames]

    '''
    for i in range(len(NameRubros)):
        try:
            print('SAVE {0} AS CSV'.format(NameRubros[i])) 
            rubros = pd.DataFrame(data[NameRubros[i]]['valores'], 
                                  columns=data[NameRubros[i]]['columnas'], 
                                  index=data[NameRubros[i]]['producto'])
            
            rubros.to_csv(config.PATH_SAVE_RUBROS + 'rubro' + str(int(i)+1) + '.csv')
        except TypeError as r: 
            print({'error': 'EN RUBROS AL GUARDAR DOCUMENTOS'})


def run(path):
    x, y = get_Rubros(path)
    saveRubros(x,y)
    return 
