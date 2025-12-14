import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Отправляет заявку на печать по email.
    Принимает данные формы заказа и отправляет письмо на указанный email.
    """
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        name = body_data.get('name', '')
        email = body_data.get('email', '')
        phone = body_data.get('phone', '')
        product = body_data.get('product', '')
        format_size = body_data.get('format', '')
        message = body_data.get('message', '')
        
        if not all([name, email, phone, product, format_size]):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Заполните все обязательные поля'}),
                'isBase64Encoded': False
            }
        
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        recipient = os.environ.get('RECIPIENT_EMAIL')
        
        if not all([smtp_host, smtp_user, smtp_password, recipient]):
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Email настройки не настроены'}),
                'isBase64Encoded': False
            }
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новая заявка на {product}'
        msg['From'] = smtp_user
        msg['To'] = recipient
        
        html_content = f"""
        <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background: linear-gradient(135deg, #0EA5E9 0%, #33C3F0 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }}
                    .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                    .field {{ margin-bottom: 15px; }}
                    .label {{ font-weight: bold; color: #0EA5E9; }}
                    .value {{ color: #333; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2 style="margin: 0;">🎨 Новая заявка - ПРИНТАРТ</h2>
                    </div>
                    <div class="content">
                        <div class="field">
                            <span class="label">Имя клиента:</span>
                            <span class="value">{name}</span>
                        </div>
                        <div class="field">
                            <span class="label">Email:</span>
                            <span class="value">{email}</span>
                        </div>
                        <div class="field">
                            <span class="label">Телефон:</span>
                            <span class="value">{phone}</span>
                        </div>
                        <div class="field">
                            <span class="label">Продукт:</span>
                            <span class="value">{product}</span>
                        </div>
                        <div class="field">
                            <span class="label">Формат/Размер:</span>
                            <span class="value">{format_size}</span>
                        </div>
                        <div class="field">
                            <span class="label">Комментарий:</span>
                            <div class="value" style="background: white; padding: 15px; border-radius: 5px; margin-top: 5px;">
                                {message if message else '<em>Нет комментария</em>'}
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
        """
        
        html_part = MIMEText(html_content, 'html', 'utf-8')
        msg.attach(html_part)
        
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена!'
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Ошибка отправки',
                'details': str(e)
            }),
            'isBase64Encoded': False
        }
