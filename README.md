# Whatsapp Twilio


Para lograr que los cupos_disponibles_pagos se reseteen a 0 y enviar un mensaje de WhatsApp al usuario en el último día del mes, puedes usar tareas programadas con el paquete Celery y Celery Beat. Además, para enviar mensajes de WhatsApp, necesitarás una API de WhatsApp como Twilio o una solución similar.

Primero, instala Celery y Celery Beat si aún no lo has hecho:

bash
```bash
pip install celery django-celery-beat
```
Luego, configura tu aplicación Django para utilizar Celery y Celery Beat en tu archivo settings.py:


```python
# settings.py

# ...

INSTALLED_APPS = [
    # ...
    'django_celery_beat',
    # ...
]

# Celery Configuration
CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'

# Celery Beat Configuration
CELERY_BEAT_SCHEDULE = {
    'reset_cupos_and_send_whatsapp': {
        'task': 'tu_app.tasks.reset_cupos_and_send_whatsapp',
        'schedule': crontab(day_of_month='last'),  # Ejecuta la tarea el último día del mes
    },
}

# ...
```
A continuación, crea un archivo tasks.py en tu aplicación para definir la tarea programada:



```python
# tu_app/tasks.py
from celery import shared_task
from datetime import datetime, timedelta
from twilio.rest import Client  # Importa la librería para enviar mensajes de WhatsApp
from .models import ComprasClase

@shared_task
def reset_cupos_and_send_whatsapp():
    # Obtén la fecha actual
    today = datetime.now()

    # Si es el último día del mes
    if today.day == (today + timedelta(days=1)).replace(day=1).day:
        # Resetea los cupos disponibles a 0 para todos los usuarios
        ComprasClase.objects.all().update(cupos_disponibles_pagos=0)

        # Envía mensajes de WhatsApp a los usuarios
        send_whatsapp_messages()

def send_whatsapp_messages():
    # Aquí debes implementar la lógica para enviar mensajes de WhatsApp
    # Puedes utilizar Twilio o cualquier otra API de WhatsApp

    # Ejemplo con Twilio
    account_sid = 'your_account_sid'
    auth_token = 'your_auth_token'
    client = Client(account_sid, auth_token)

    # Itera sobre los usuarios y envía mensajes
    for usuario in CustomUser.objects.all():
        message = client.messages.create(
            body="Tu plan ha finalizado. ¡Gracias por utilizar nuestro servicio!",
            from_='whatsapp:+14155238886',  # Tu número de WhatsApp de Twilio
            to=f'whatsapp:{usuario.telefono}'
        )
        print(f'Mensaje enviado a {usuario.username}: {message.sid}')
```

Asegúrate de configurar correctamente las credenciales de Twilio y ajustar el código según tus necesidades.

Finalmente, ejecuta Celery Beat junto con tu aplicación Django:

```bash

celery -A tu_proyecto beat -l info
```
Y en otra terminal ejecuta Celery:



```bash
celery -A tu_proyecto worker -l info
```
Esto programará la tarea para ejecutarse el último día de cada mes y enviará mensajes de WhatsApp a los usuarios. Asegúrate de configurar y manejar las credenciales de Twilio de manera segura y de acuerdo con las políticas de seguridad de tu aplicación.