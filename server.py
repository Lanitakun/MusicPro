from flask import Flask, jsonify, request
from flask_cors import CORS
from random import randint
from transbank.webpay.webpay_plus.transaction import Transaction, WebpayOptions, IntegrationCommerceCodes, IntegrationApiKeys

app = Flask(__name__)
CORS(app)

@app.route('/transaccion', methods=['POST'])
def transaccion():
    datos = request.get_json()
    resultado = hacer_transaccion(datos)
    return jsonify(resultado)

def hacer_transaccion(datos):
    monto = datos['monto']
    buy_order = str(randint(100000, 999999999))
    session_id = str(randint(100000, 999999999))
    return_url = 'http://localhost:8100/resultado-pago'
    amount = int(monto)
    tx = Transaction(WebpayOptions(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY))
    resp = tx.create(buy_order, session_id, amount, return_url)

    if resp is not None and 'token' in resp and resp['token'] is not None:
        return {'token': resp['token'], 'url': resp['url']}
    else:
        return {'error': 'No se pudo crear la transacción'}
    
@app.route('/resultado', methods=['POST'])
def resultado():
    datos = request.get_json()
    resultado = confirmar_transaccion(datos)
    return jsonify(resultado)

def confirmar_transaccion(datos):
    token = datos['token']
    tx = Transaction(WebpayOptions(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY))
    resp = tx.commit(token)
    print(token)
    if resp is not None and 'vci' in resp and resp['vci'] is not None:
        return {'vci': resp['vci'], 
                'amount': resp['amount'], 
                'status': resp['status'], 
                'buy_order': resp['buy_order'], 
                'session_id': resp['session_id'], 
                'card_detail': resp['card_detail'],
                'accounting_date': resp['accounting_date'],
                }
    else:
        return {'error': 'No se pudo confirmar la transacción'}


if __name__ == '__main__':
    app.run()
