$(document).ready(function() {
    var csrfToken = $('[name=csrfmiddlewaretoken]').val();
    var table = $('#alumnos-table').DataTable({
      stateSave: true,
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ alumnos',
        info: 'Mostrando _START_ a _END_ alumnos',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior'
        }
      },
      // Configuraciones adicionales, si es necesario
    });
  
    $('#alumnos-table').on('click', '.edit-button', function() {
      var alumno_id = $(this).data('alumno-id');
      $(`#formulario-edicion-${alumno_id}`).show();
    });
  
    $('#alumnos-table').on('click', '.save-button', function() {
      var alumno_id = $(this).data('alumno-id');
      var nombre = $(`#nombre-edicion-${alumno_id}`).val();
      var direccion = $(`#direccion-edicion-${alumno_id}`).val();
      var telefono = $(`#telefono-edicion-${alumno_id}`).val();
      var sexo = $(`#sexo-edicion-${alumno_id}`).val();
      var edad = $(`#edad-edicion-${alumno_id}`).val();
      var pago = $(`#pago-edicion-${alumno_id}`).val() === "true";
  
      // Realiza la lógica de guardado y actualización en el servidor
      $.ajax({
        url: `/alumnos/editar/${alumno_id}/`,
        method: 'POST',
        data: {
          csrfmiddlewaretoken: csrfToken,
          nombre: nombre,
          direccion: direccion,
          telefono: telefono,
          sexo: sexo,
          edad: edad,
          pago: pago
        },
        success: function(response) {
          location.reload();
        },
        error: function(error) {
          console.error('Error al guardar la edición:', error);
        }
      });
  
      $(`#formulario-edicion-${alumno_id}`).hide();
    });
  
    $('#alumnos-table').on('click', '.cancel-button', function() {
      var alumno_id = $(this).data('alumno-id');
      $(`#formulario-edicion-${alumno_id}`).hide();
    });
  });
  
  function eliminarAlumno(alumno_id) {
    if (confirm("¿Estás seguro que deseas eliminar este alumno?")) {
      $.ajax({
        url: `/alumnos/eliminar/${alumno_id}/`,
        method: 'POST',
        data: {
          csrfmiddlewaretoken: '{{ csrf_token }}'
        },
        success: function(response) {
          location.reload();
        },
        error: function(error) {
          console.error('Error al eliminar el alumno:', error);
        }
      });
    }
  }