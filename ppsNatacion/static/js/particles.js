// Llamada a la función particlesJS con el ID del contenedor y la configuración
particlesJS("particles-js", {
    // Configuración de las partículas
    "particles": {
        // Configuración del número y densidad de partículas
        "number": {
            "value": 5, // Número total de partículas
            "density": {
                "enable": true, // Habilitar densidad
                "value_area": 800 // Área en la que se distribuirán las partículas
            }
        },
        // Configuración del color de las partículas
        "color": {
            "value": "#82C7F5" // Color de las partículas en formato hexadecimal
        },
        // Configuración de la forma de las partículas
        "shape": {
            "type": "circle", // Tipo de forma (círculo en este caso)
            "stroke": {
                "width": 0, // Ancho del borde de la forma
                "color": "#000000" // Color del borde de la forma
            },
            "polygon": {
                "nb_sides": 5 // Número de lados para polígonos
            }
        },
        // Configuración de la opacidad de las partículas
        "opacity": {
            "value": 0.3, // Valor de opacidad
            "random": false, // Opacidad aleatoria
            "anim": {
                "enable": false, // Animación de opacidad habilitada
                "speed": 1, // Velocidad de la animación
                "opacity_min": 0.1, // Valor mínimo de opacidad durante la animación
                "sync": false // Sincronización de la animación
            }
        },
    },
    // Configuración de la interactividad de las partículas
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true, // Habilitar evento al pasar el ratón por encima
                "mode": "repulse" // Modo del evento (repulsión en este caso)
            }
        }
    }
});