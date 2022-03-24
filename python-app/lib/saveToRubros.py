from lib import pd
from lib import config
from lib import fixeDataRubros
from pathlib import Path


def get_Rubros(path, fixeData=3):
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
    df = pd.read_csv(path, index_col=0, usecols=lambda c: not c.startswith('Unnamed:'))
    
    NameRubros, Posicion = [], [] 
    data = {}
    try:
        for i in range(len(df)):
            # El siguiente 2 no tiene nada que ver con el fixeData
            # lo ocupamos para separar los rumbros de los servicios
            # ya que en la tabla los tenemos con 00 dos digitos
            try: 
                if len(df.index.str.split()[i][0]) == 2:
                    NameRubros.append(df.index[i])
                    Posicion.append(i + fixeData)
                    # print(NameRubros)
            except TypeError as r: 
                pass
        producto, valores = [], []
        for x in range(len(Posicion)):
            print('<<<<<<<<<<<<<<<<{0}>>>>>>>>>>>>'.format(NameRubros[x]))
            producto, valores = [], []
            for i in range(len(df) + fixeData):
                try:
                    if i > Posicion[x] and i < Posicion[x+1]:
                        producto.append(df.index[i-fixeData]) 
                        valores.append(df.iloc[i-(fixeData)].values)        
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
    except TypeError as error:
        print(error)


def saveRubros(NameRubros, data, _type_):
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

            rubros.to_csv(config.PATH_SAVE_RUBROS + _type_ + '/' + 'rubro' + str(int(i)+1) + '.csv')
        except TypeError as r: 
            print({'error': 'EN RUBROS AL GUARDAR DOCUMENTOS'})


def saveFixeData(_type_):
    # En esta definicion arreglamos los datos de fecha y mes con la ayuda
    # del modulo fixeDataRubros.py
    for path in Path(config.PATH_SAVE_RUBROS + _type_).rglob('*.csv'):
        openRubros = pd.read_csv(config.PATH_SAVE_RUBROS + _type_ + '/' + path.name, index_col = 0)
        dataFixed = fixeDataRubros.run(openRubros)
        dataFixed.to_csv(config.PATH_SAVE_RUBROS + _type_ + '/' + path.name)
    return {'res': 'Se arreglo la data de rubro[1-12].csv: {}'.format(_type_)}


def saveInpc(_path_, _type_):
    df = pd.read_csv(_path_, index_col=0, usecols=lambda c: not c.startswith('Unnamed:'))
    # toSave = df.loc[df.index[0]]
    toSave = df.loc[df.index == 'INPC']
    toSave.to_csv(config.PATH_SAVE_RUBROS + _type_ + '/' + 'INPC' + '.csv')
    print('Se salvo la data de INPC')
    return df 


def saveSubyacente(_path_, _type_):
    df = pd.read_csv(_path_, index_col=0, usecols=lambda c: not c.startswith('Unnamed:'))
    # toSave = df.loc[df.index[0]]
    toSave = df.loc[df.index == 'Subyacente ']
    toSave.to_csv(config.PATH_SAVE_RUBROS + _type_ + '/' + 'subyacente' + '.csv')
    print('Se salvo la data de subyacente')
    return df 


def run(path, _type_):
    '''
    [Args]
        [path : str] : [path de nuestro CSV Base_INPC_1969_2021]
        [_type_: str] : [seteamos si queremos hacer un update 
                        de los datos mensual y anual]
    '''
    try:
        x, y = get_Rubros(path)
        # ----------------------------------
        # ----------------------------------
        saveRubros(x, y, _type_)
        saveSubyacente(path, _type_)
        saveInpc(path, _type_)
        # ----------------------------------
        # ----------------------------------
        # ----------------------------------
        saveFixeData(_type_)
        # ----------------------------------
        return {'res': 'Todo bien al salvar y arreglar los documentos'}
    except TypeError as error:
        return {'res': error }
