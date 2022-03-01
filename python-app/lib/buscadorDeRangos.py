from lib import config
from lib import pd
import re


def search(nameRubro, jahr, mes=None):
    '''
    Funcion en donde devolvemos los rangos de fechas

    [Args]
        [jahr : int] = [dont colocamos el ano]
        [mes : str] = [Es opcional ya que no siempre elejimos el mes
                        sin embargo el jahr siempre lo elejimos]
    [Return]  
        [result : DataFrame] : [nos regresa la columna que andamos buscando]
    '''
    try: 
        df = pd.read_csv(config.PATH_SAVE_RUBROS + nameRubro + '.csv', index_col=0)
        # re.split(r',| ', nameString)

        if mes == None: 
            try:
                # Aqui significa que el usuario eligio la opcion de jahr
                date_inicio = str(df.iloc[:, 1].name).split('-') 
                date_final = str(df.iloc[:, -1].name).split('-')
                result = None
                if jahr == int(date_final[1]):
                    result = df.loc[:, ["-".join(date_final)]]
                    print("-".join(date_final))
                    return result
                elif jahr == int(date_inicio[1]):
                    result = df.loc[:, ["-".join(date_inicio)]]
                    print("-".join(date_final))
                    return result
                else:
                    print(str(jahr))
                    srch = [date_inicio[0], str(jahr)]
                    result = df.loc[:, ["-".join(srch)]]
                    print('Date Inicio: {0}'.format(srch))
                    return result

                return {'res': 'No existe el ano que tratas de selccionar'}
            except KeyError:
                return {'res': 'El ano o el mes estan mal'}
        else:
           try: 
               # Significa que esta en el modo de eleccion mes + jahr             
               search_date = [mes, str(int(jahr))]
               mesSearch = "-".join(search_date)
               result = df.loc[:, [mesSearch]] 
               return result
           except KeyError:
                return {'res': 'El ano o el mes estan mal'}

    except FileNotFoundError:
        print({'res': 'No existe el rubro que buscas'})
        pass
