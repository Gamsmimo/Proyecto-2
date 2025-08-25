document.addEventListener('DOMContentLoaded', function () {
    const boton = document.getElementById('referenciasBtn');
    const listaContenedor = document.getElementById('referenciasLista');
    const listaReferencias = document.getElementById('listaReferencias');
    const closeBtn = document.querySelector('.close-btn');

    // Obtener referencias del localStorage o cargar las predeterminadas
    let referencias = JSON.parse(localStorage.getItem('referencias')) || [
        "Microsoft. (2001). Xbox: The Official Guide to Microsoft’s Gaming Console. Microsoft Press.",
        "D’Anastasio, C. (2020). Xbox Series X: The Full Story on Microsoft’s Next-Gen Console. Wired.",
        "Grubb, J. (2023). Microsoft completes $68.7 billion acquisition of Activision Blizzard. VentureBeat.",
        "Sony Interactive Entertainment. (2023). PlayStation 5 sales reach 50 million units worldwide",
        "Statista. (2023). Lifetime unit sales of PlayStation consoles worldwide as of March 2023.",
        "IGN. (2013). The Last of Us sells over 1.3 million units in first week.",
        "Nintendo Co., Ltd. (s. f.). Company History. Nintendo.",
        "Ryan, J. (2019). Super Mario: How Nintendo Conquered America. Penguin Books.",
        "Nintendo Co., Ltd. (2023). Financial Results Explanatory Material.",
    ];

    // Función para guardar referencias en localStorage
    function guardarReferencias() {
        localStorage.setItem('referencias', JSON.stringify(referencias));
    }

    // Función para cargar las referencias en la lista
    function cargarReferencias() {
        listaReferencias.innerHTML = '';

        referencias.forEach((ref, index) => {
            const li = document.createElement('li');
            li.textContent = ref;

            // Botón para eliminar referencia
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
            deleteBtn.className = 'delete-ref';
            deleteBtn.onclick = () => eliminarReferencia(index);

            li.appendChild(deleteBtn);
            listaReferencias.appendChild(li);
        });
    }

    // Función para eliminar una referencia
    function eliminarReferencia(index) {
        referencias.splice(index, 1);
        guardarReferencias();
        cargarReferencias();
    }

    // Función para mostrar/ocultar el panel de referencias
    function toggleReferencias() {
        listaContenedor.classList.toggle('visible');

        const icon = boton.querySelector('i');
        icon.style.transform = listaContenedor.classList.contains('visible') ? 'rotate(15deg)' : 'rotate(0)';
    }

    // Event listeners
    boton.addEventListener('click', toggleReferencias);
    closeBtn.addEventListener('click', toggleReferencias);

    // Cerrar el panel al hacer clic fuera de él
    document.addEventListener('click', function (e) {
        if (!listaContenedor.contains(e.target) && e.target !== boton && !e.target.closest('.delete-ref')) {
            listaContenedor.classList.remove('visible');
            boton.querySelector('i').style.transform = 'rotate(0)';
        }
    });

    // Cargar las referencias al iniciar
    cargarReferencias();

    // Función global para agregar referencias
    window.agregarReferencia = function (nuevaReferencia) {
        if (nuevaReferencia && nuevaReferencia.trim() !== '') {
            referencias.push(nuevaReferencia);
            guardarReferencias();
            cargarReferencias();

            if (!listaContenedor.classList.contains('visible')) {
                toggleReferencias();
            }

            return true;
        }
        return false;
    };
});