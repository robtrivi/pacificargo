var coordenadas = {
    ciudad1: { nombre: "Nueva York", latitud: 40.7128, longitud: -74.0060 },
    ciudad2: { nombre: "Los Ángeles", latitud: 34.0522, longitud: -118.2437 },
    ciudad3: { nombre: "Quito", latitud: -0.1807, longitud: -78.4678 },
    ciudad4: { nombre: "Guayaquil", latitud: -2.1700, longitud: -79.9224 },
    ciudad5: { nombre: "Cuenca", latitud: -2.9006, longitud: -79.0045 },
    ciudad6: { nombre: "Chicago", latitud: 41.8781, longitud: -87.6298 }
};


var selectOrigen = document.getElementById('origin');
var selectDestino = document.getElementById('destination');


function llenarSelectores() {
    for (var ciudad in coordenadas) {
        var option = document.createElement('option');
        option.value = ciudad;
        option.textContent = coordenadas[ciudad].nombre; // Usar el nombre de la ciudad
        selectOrigen.appendChild(option);

        var optionDestino = document.createElement('option');
        optionDestino.value = ciudad;
        optionDestino.textContent = coordenadas[ciudad].nombre; // Usar el nombre de la ciudad
        selectDestino.appendChild(optionDestino);
    }

}

document.addEventListener('DOMContentLoaded', function () {
    llenarSelectores();

    let reviews = document.querySelectorAll('.review');

    // Calculamos la altura máxima de todas las opiniones
    let maxHeight = 0;
    reviews.forEach(review => {
        const reviewHeight = review.querySelector('.text-review').scrollHeight;
        if (reviewHeight > maxHeight) {
            maxHeight = reviewHeight;
        }
    });
    // Aplicamos la altura máxima a todos los contenedores de opinión
    reviews.forEach(review => {
        review.style.minHeight = `${maxHeight}px`;
        console.log(maxHeight,review.style.minHeight)
    });

});

document.getElementById('search-button').addEventListener('click', function () {
    var code = document.getElementById('code-tracking').value;
    // Simulación de datos de paquete encontrado
    if (code === '123456') {
        document.getElementById('sender').textContent = 'Pacific Cargo';
        document.getElementById('receiver').textContent = 'CMCEC';
        document.getElementById('delivery-date').textContent = '1 de agosto de 2024';
        // Mostrar la información del paquete
        document.getElementById('package-info').style.display = 'block';
    } else {
        // Manejo de caso cuando el código no coincide
        document.getElementById('package-info').style.display = 'none';
        alert('El código de paquete no fue encontrado.');
    }
});

function calcularEnvio() {
    document.getElementById('valor-final').style.display = 'none';
    // Obtener valores seleccionados y de peso
    var origen = selectOrigen.value;
    var destino = selectDestino.value;
    var peso = parseFloat(document.getElementById('aprox-weight').value);
    // Diccionario con coordenadas de ciudades simuladas (latitud, longitud)


    // Obtener coordenadas del origen y destino
    var coordOrigen = coordenadas[origen];
    var coordDestino = coordenadas[destino];

    if (coordOrigen && coordDestino && !isNaN(peso)) {
        // Calcular distancia euclidiana (simulada)
        var distancia = Math.sqrt(
            Math.pow(coordOrigen.latitud - coordDestino.latitud, 2) +
            Math.pow(coordOrigen.longitud - coordDestino.longitud, 2)
        );

        // Simulación de costo: distancia * peso
        var costoEnvio = distancia * peso;

        // Mostrar el resultado en el elemento de valor final
        document.getElementById('resultado').innerText = costoEnvio.toFixed(2); // Mostrar dos decimales
        document.getElementById('valor-final').style.display = 'inline-block';

    } else {
        // document.getElementById('valor-final').innerHTML = 'Por favor, seleccione las ciudades y el peso del paquete.';
        alert('Por favor, seleccione las ciudades y el peso del paquete.');
    }
}

document.getElementById("calculate").addEventListener("click", function () {
    calcularEnvio();
});

document.addEventListener("scroll", function () {
    const servicesSection = document.getElementById("services-list");
    const servicesSectionTop = servicesSection.offsetTop;
    const servicesSectionHeight = servicesSection.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    const servicesItems = servicesSection.querySelectorAll(".service");

    const activatePositionAereo = document.getElementById("img-aereo").offsetTop + document.getElementById("img-aereo").offsetHeight * 0.2;
    const activatePositionMaritimo = document.getElementById("img-maritimo").offsetTop + document.getElementById("img-maritimo").offsetHeight * 0.2;
    const activatePositionTerrestre = document.getElementById("img-terrestre").offsetTop + document.getElementById("img-terrestre").offsetHeight * 0.2;

    // Determina si el usuario ha pasado la posición de activación para cada imagen
    if (scrollPosition > activatePositionAereo) {
        document.getElementById("img-aereo").classList.add("move-left");
        document.getElementById("img-aereo").classList.add("scale");
    } else {
        document.getElementById("img-aereo").classList.remove("move-left");
        document.getElementById("img-aereo").classList.remove("scale");
    }

    if (scrollPosition > activatePositionMaritimo) {
        document.getElementById("img-maritimo").classList.add("move-right");
        document.getElementById("img-maritimo").classList.add("scale");
    } else {
        document.getElementById("img-maritimo").classList.remove("move-right");
        document.getElementById("img-maritimo").classList.remove("scale");
    }

    if (scrollPosition > activatePositionTerrestre) {
        document.getElementById("img-terrestre").classList.add("scale");
    } else {
        document.getElementById("img-terrestre").classList.remove("scale");
    }
});

let currentReview = 1;
    let reviews = document.querySelectorAll('.review')

    function showReview(index) {
        reviews.forEach((review) => review.classList.remove('active'));
        reviews[index].classList.add('active');
    }

    function changeReview(direction) {
        currentReview += direction;
        if (currentReview < 0) {
            currentReview = reviews.length - 1;
        } else if (currentReview >= reviews.length) {
            currentReview = 0;
        }
        showReview(currentReview);
    }

    // Mostrar la primera opinión al cargar la página
    showReview(currentReview);
