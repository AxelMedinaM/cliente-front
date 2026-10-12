document.addEventListener('DOMContentLoaded', () => {
    // Iniciar la carga de datos al abrir la página
    obtenerDatos();
});

async function obtenerDatos() {
    try {
        // 1. Petición GET a tu API local
        const respuesta = await fetch('http://localhost:3000/api/productos');
        const datos = await respuesta.json();

        // 2. Ejecutar las funciones de renderizado
        renderizarTabla(datos);
        renderizarGrafica(datos);
    } catch (error) {
        console.error('Error al obtener los datos desde la API:', error);
    }
}

function renderizarTabla(datos) {
    const tbody = document.getElementById('cuerpo-tabla');
    tbody.innerHTML = ''; // Limpiar contenido previo

    datos.forEach(item => {
        const fila = document.createElement('tr');
        // Ajusta 'id', 'nombre' y 'precio' según tu base de datos
        fila.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td>${item.precio}</td> 
        `;
        tbody.appendChild(fila);
    });
}

function renderizarGrafica(datos) {
    // 1. Extraer la información en arreglos separados
    const nombres = datos.map(item => item.nombre);
    const valores = datos.map(item => item.precio); // o item.cantidad

    // 2. Instanciar el gráfico con Chart.js
    const ctx = document.getElementById('miGrafica').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar', // Puedes cambiar 'bar' por 'pie' para un gráfico circular
        data: {
            labels: nombres, // Etiquetas del eje X
            datasets: [{
                label: 'Valores por Producto',
                data: valores, // Datos del eje Y
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}