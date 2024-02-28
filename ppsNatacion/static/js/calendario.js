
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendario');
    var horariosSeleccionados = new Set();
    
    var calendar = new FullCalendar.Calendar(calendarEl, {
        
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'today'
        },
        locale: 'es', // Configuración para el idioma español
        
        selectable: false,
        events: {
            url: getHorariosClaseURL, // Variable definida en la plantilla Django
            method: 'GET'
        },
        eventClick: function(info) {
            var selectedEvent = info.event;
            var eventId = selectedEvent.id;

            if (horariosSeleccionados.has(eventId)) {
                horariosSeleccionados.delete(eventId);
                selectedEvent.setProp('backgroundColor', ''); // Remove color when deselected
            } else {
                horariosSeleccionados.add(eventId);
                selectedEvent.setProp('backgroundColor', 'red'); // Set color when selected
            }

            // Show details of all selected events
            var infoDiv = document.getElementById('informacionEvento');
            infoDiv.innerHTML = '<h3>Detalles de Eventos Seleccionados:</h3>';
            horariosSeleccionados.forEach(function(eventId) {
                var event = calendar.getEventById(eventId);
                var selectedDate = event.start;
                var className = event.title;

                var formattedDate = selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                var formattedTime = selectedDate.toLocaleTimeString('es-ES', { hour: 'numeric', minute: 'numeric', hour12: true });

                infoDiv.innerHTML += '<p>Clase: ' + className + '</p>' +
                                     '<p>Día: ' + formattedDate + '</p>' +
                                     '<p>Hora: ' + formattedTime + '</p>' +
                                     '<hr>';
            });
        }
    });
    
    calendar.render();

    function enviarHorariosSeleccionados() {
        var horarios = Array.from(horariosSeleccionados);
        
        var csrftoken = getCookie('csrftoken'); // Función para obtener el valor de la cookie del token CSRF
        // Verificar si horarios es None o vacío
        if (!horarios || horarios.length === 0) {
            console.error('No hay datos para enviar');
            return;
        }
        // Obtener la URL a la que se enviará la solicitud POST
        
        fetch('/capturar_id/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({
                horariosSeleccionados: Array.from(horariosSeleccionados)
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Si todos los turnos se agendaron correctamente
                data.messages.forEach(message => {
                    // Mostrar mensaje de éxito con estilo de Bootstrap
                    document.getElementById('informacionEvento').innerHTML += `
                        <div class="alert alert-success" role="alert">
                            ${message}
                        </div>
                    `;
                });
            } else {
                // Si hubo problemas al agendar los turnos
                data.messages.forEach(message => {
                    // Mostrar mensaje de error con estilo de Bootstrap
                    document.getElementById('informacionEvento').innerHTML += `
                        <div class="alert alert-danger" role="alert">
                            ${message}
                        </div>
                    `;
                });
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
        
        


        console.log('IDs de los eventos seleccionados:', horariosSeleccionados);
        horariosSeleccionados.clear();
    }
    
    document.getElementById('enviarHorariosBtn').addEventListener('click', enviarHorariosSeleccionados);
});


