const botonC = document.getElementById('botonC');
const botonN = document.getElementById('botonN');
const colum = document.getElementById('colum');
const nom = document.getElementById('nom');
const limpiar = document.getElementById('limpiar');
const label = document.getElementById('labelN');
const labelLimite = document.getElementById('labelL');
const formu = document.getElementById('form');
const limite = document.getElementById('limite');
const botonL = document.getElementById('botonL');
const tabla = document.getElementById('tabla');
const nuevaTarea = document.getElementById('nuevaTarea');
let maxC = 0;
let contC = 1;

// Ocultar sección de nueva tarea al inicio
nuevaTarea.style.display = 'none';

// Cargar contador de columnas desde localStorage si existe
if (localStorage.getItem('numColum')) {
    contC = JSON.parse(localStorage.getItem('numColum'));
} else {
    localStorage.setItem('numColum', JSON.stringify(contC));
}

// Cargar número máximo de columnas desde localStorage si existe
if (localStorage.getItem('Numero Columnas:')) {
    maxC = parseInt(JSON.parse(localStorage.getItem('Numero Columnas:')));
}

// Actualizar labels con el contador actual
label.textContent = `Nombre columna ${contC}:`;
labelLimite.textContent = `Límite columna ${contC}:`;

// Deshabilitar input límite al principio para que la primera siempre sea sin limite
if (contC <2){
    limite.disabled = true;
    botonL.disabled = true;
}

// Cargar valores temporales desde localStorage si existen
if (localStorage.getItem('temporalColumna')) {
    colum.value = localStorage.getItem('temporalColumna');
}

if (localStorage.getItem('temporalNombre')) {
    nom.value = localStorage.getItem('temporalNombre');
}

// Verificar si el input columna debe esta ocultos o deshabilitados
if (localStorage.getItem('inputOculto') === 'true') {
    colum.disabled = true;
    botonC.disabled = true;
    colum.value = '';
}

// Verificar si el formulario debe estar oculto
if (localStorage.getItem('columnaOculta') === 'true') {
    formu.style.display = 'none';
}

//Funciones INPUTS
function numCol(e) {
    if (colum.value.trim() !== '') {
        localStorage.setItem('temporalColumna', colum.value);
    } else {
        localStorage.removeItem('temporalColumna');
    }
}

colum.addEventListener('input', numCol);

function nomCol(e) {
    if (nom.value.trim() !== '') {
        localStorage.setItem('temporalNombre', nom.value);
    } else {
        localStorage.removeItem('temporalNombre');
    }
}

nom.addEventListener('input', nomCol);

function limCol(e) {
    if (limite.value.trim() !== '') {
        localStorage.setItem('temporalLimite', limite.value);
    } else {
        localStorage.removeItem('temporalLimite');
    }
}

limite.addEventListener('input', limCol);

//Funciones BOTONES
function añadirColumna(e) {
    e.preventDefault();

    if (colum.value === "") {
        alert("Por favor, introduce un número de columnas.");
        return;
    }

    alert(`Has añadido ${colum.value} columnas.`);
    localStorage.setItem(`Numero Columnas:`, JSON.stringify(colum.value));
    colum.value = '';
    maxC = parseInt(JSON.parse(localStorage.getItem('Numero Columnas:')));
    alert(`Contador después: ${maxC}`);

    // Crear divs según el número de columnas elegido
    tabla.innerHTML = '';
    for (let i = 1; i <= maxC; i++) {
        const divColumna = document.createElement('div');
        divColumna.id = `columna-${i}`;
        tabla.appendChild(divColumna);
    }

    colum.disabled = true;
    botonC.disabled = true;

    localStorage.setItem('inputOculto', 'true');
}

botonC.addEventListener('click', añadirColumna);

function añadirNombre(e) {
    e.preventDefault();

    if (maxC === 0) {
        alert("Primero debes indicar el número de columnas");
        nom.value = '';
        localStorage.removeItem('temporalNombre');
        return;
    }

    if (nom.value === "") {
        alert("Por favor, introduce un nombre a la columna.");
        return;
    }

    alert(`Has añadido ${nom.value} como nombre de columna.`);
    localStorage.setItem(`Nombre Columna ${contC}:`, JSON.stringify(nom.value));

    //Añadir el nombre de la columna al div correspondiente
    const H3Columna = document.createElement('h3');
    H3Columna.textContent = nom.value;
    const columnaActual = document.getElementById(`columna-${contC}`);
    if (columnaActual) {
        columnaActual.appendChild(H3Columna);
    }

    contC++;
    alert(`Contador después: ${contC}`);
    nom.value = '';
    localStorage.removeItem('temporalNombre');

    localStorage.setItem('numColum', JSON.stringify(contC));

    label.textContent = `Nombre columna ${contC}:`;
    labelLimite.textContent = `Límite columna ${contC}:`;

    limite.disabled = false;
    botonL.disabled = false;

    if (contC > maxC) {
        formu.style.display = 'none';
        localStorage.setItem('columnaOculta', 'true');
        nuevaTarea.style.display = '';
    }
}

botonN.addEventListener('click', añadirNombre);

function limpiarDatos() {
    localStorage.clear();
    alert("Se han eliminado todos los datos guardados.");
    contC = 1;
    maxC = 0;

    formu.style.display = '';
    tabla.innerHTML = '';
    nuevaTarea.style.display = 'none';

    label.textContent = `Nombre columna ${contC}:`;
    labelLimite.textContent = `Límite columna ${contC}:`;

    localStorage.setItem('inputOculto', 'false');
    colum.disabled = false;
    botonC.disabled = false;
    localStorage.setItem('columnaOculta', 'false');
    colum.value = '';
    nom.value = '';
    limite.value = '';

    limite.disabled = true;
    botonL.disabled = true;
}

limpiar.addEventListener('click', limpiarDatos);