from lib import re


def correcion_meses(msg):
    '''
    Las personas del mide cambiaron nomenclatura en su excel por ejemplo 
    existen estos diferentes tipos de columnas | Jan-91 | Ene-91 | Jan 91 | Ene-2019
    
    [Return]
        [array]
    '''
    espanoToIngles = {
        'Ene': 'Jan',
        'Feb': 'Feb',
        'Mar': 'Mar',
        'Abr': 'Apr',
        'Jun': 'Jun',
        'Jul': 'Jul',
        'Ago': 'Aug',
        'Sep': 'Sep',
        'Oct': 'Oct',
        'Nov': 'Nov',
        'Dic': 'Dec'
    }
    inglesToEspanol = {
        'Jan': 'Ene',
        'Feb': 'Feb',
        'Mar': 'Mar',
        'Apr': 'Abr',
        'Jun': 'Jun',
        'Jul': 'Jul',
        'Aug': 'Ago',
        'Sep': 'Sep',
        'Oct': 'Oct',
        'Nov': 'Nov',
        'Dec': 'Dic'
    }
    
    correciones = inglesToEspanol 
    msg = re.split(r'-| ', msg)
    mes = msg[0]
    # jahr = '19'+msg[1]
    # jahr = re.sub('18|19|20|21|22|23|24|25','',msg[1])
    jahr = msg[1]

    def translate(match):
            word = match.group(0)
            if word in correciones:
                return correciones[word]
            return word
    date = [
        re.sub(r'\w+', translate, mes),
        jahr
    ]
    return "-".join(date)


def correcion_jahr(msg):
    # IMPORTANTE : [Hay que tomar en cuenta que este parametro lo unico que hace
    # es un loop en donde ajuste a ojo de buen cubero los parametros de 2001 para abajo
    # que no han sido correjidos en la sintaxis del jahr, de ahi lo vuelvo a ocupar para 
    # corregir los siguientes errores en 2000 para adelante]
    ajuste = 400
    mes, jahr= [], []
    fullName, date = [], []
    for i in range(len(msg)):
        mes.append(re.split(r'-| ', msg[i])[0])
        fixeJahr = re.split(r'-| ', msg[i])[1]
        if len(fixeJahr) < 4 and str(fixeJahr) != '00' and i < ajuste:
            jahr.append('19'+fixeJahr)
        elif str(fixeJahr) == '00':   
            jahr.append('20'+fixeJahr)
        elif len(fixeJahr) < 4 and i > ajuste:
            jahr.append('20'+fixeJahr)
        else:    
            jahr.append(fixeJahr)
        fullName = [mes[i], jahr[i]]     
        date.append("-".join(fullName))
    return date


def run(data):
    fixe = []
    for i in range(len(data.iloc[0].index)):
        fixe.append(correcion_meses(data.iloc[0].index[i]))
    fixeAllData = correcion_jahr(fixe)
    data.columns = fixeAllData
    return data
