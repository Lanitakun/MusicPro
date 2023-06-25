from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from random import randint
from transbank.webpay.webpay_plus.transaction import Transaction, WebpayOptions, IntegrationCommerceCodes, IntegrationApiKeys
from flask_flatpages import FlatPages

app = Flask(__name__)
flatpages = FlatPages(app)
app.config['FLATPAGES_EXTENSION'] = '.html'
CORS(app)

@app.route('/transaccion', methods=['POST'])
def transaccion():
    # Obtener los datos JSON de la solicitud
    datos = request.get_json()
    # Llamar a la función hacer_transaccion con los datos recibidos
    resultado = hacer_transaccion(datos)
    # Devolver los resultados de la transacción en formato JSON
    return jsonify(resultado)

def hacer_transaccion(datos):
    # Obtener el monto de la transacción de los datos recibidos
    monto = datos['monto']
    # Generar un número de orden de compra y un ID de sesión aleatorios
    buy_order = str(randint(100000, 999999999))
    session_id = str(randint(100000, 999999999))
    # Definir la URL de retorno
    return_url = 'http://localhost:8100/resultado-pago'
    # Convertir el monto a entero
    amount = int(monto)
    # Crear una instancia de Transaction con las opciones de Webpay Plus
    tx = Transaction(WebpayOptions(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY))
    # Crear la transacción en Webpay Plus
    resp = tx.create(buy_order, session_id, amount, return_url)

    # Verificar si se recibió una respuesta válida y contiene un token
    if resp is not None and 'token' in resp and resp['token'] is not None:
        # Devolver el token y la URL de redirección en formato JSON
        return {'token': resp['token'], 'url': resp['url']}
    else:
        # Devolver un mensaje de error en formato JSON
        return {'error': 'No se pudo crear la transacción'}

@app.route('/resultado', methods=['POST'])
def resultado():
    # Obtener los datos JSON de la solicitud
    datos = request.get_json()
    # Llamar a la función confirmar_transaccion con los datos recibidos
    resultado = confirmar_transaccion(datos)
    # Devolver los resultados de la confirmación de la transacción en formato JSON
    return jsonify(resultado)

def confirmar_transaccion(datos):
    # Obtener el token de la transacción de los datos recibidos
    token = datos['token']
    # Crear una instancia de Transaction con las opciones de Webpay Plus
    tx = Transaction(WebpayOptions(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY))
    # Confirmar la transacción en Webpay Plus
    resp = tx.commit(token)
    print(token)
    # Verificar si se recibió una respuesta válida y contiene los datos de la transacción
    if resp is not None and 'vci' in resp and resp['vci'] is not None:
        # Devolver los datos de la transacción en formato JSON
        return {'vci': resp['vci'],
                'amount': resp['amount'],
                'status': resp['status'],
                'buy_order': resp['buy_order'],
                'session_id': resp['session_id'],
                'card_detail': resp['card_detail'],
                'accounting_date': resp['accounting_date'],
        }
    else:
        # Devolver un mensaje de error en formato JSON
        return {'error': 'No se pudo confirmar la transacción'}

@app.route('/<path:path>/')
def page(path):
    # Obtener la página plana correspondiente al path
    page = flatpages.get_or_404(path)
    # Renderizar la plantilla page.html con la página plana
    return render_template('page.html', page=page)

if __name__ == '__main__':
    # Ejecutar la aplicación Flask
    app.run()
