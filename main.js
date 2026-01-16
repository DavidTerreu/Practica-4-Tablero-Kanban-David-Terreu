const botonC = document.getElementById('botonC');
const botonN = document.getElementById('botonN');
const colum = document.getElementById('colum');
const nom = document.getElementById('nom');
const limpiar = document.getElementById('limpiar');
const label = document.getElementById('labelN');
const formu = document.getElementById('form');
let maxC = 0;
let contC = 1;

if (localStorage.getItem('numColum')) {
    contC = JSON.parse(localStorage.getItem('numColum'));
} else {
    localStorage.setItem('numColum', JSON.stringify(contC));
}

if (localStorage.getItem('Numero Columnas:')) {
    maxC = parseInt(JSON.parse(localStorage.getItem('Numero Columnas:')));
}

label.textContent = `Nombre columna ${contC}:`;

if (localStorage.getItem('temporalColumna')) {
    colum.value = localStorage.getItem('temporalColumna');
}

if (localStorage.getItem('temporalNombre')) {
    nom.value = localStorage.getItem('temporalNombre');
}

if (localStorage.getItem('inputOculto') === 'true') {
    colum.disabled = true;
    botonC.disabled = true;
    colum.value = '';
}

if (localStorage.getItem('columnaOculta') === 'true') {
    formu.style.display = 'none';
}

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

function añadirColumna(e) {
    e.preventDefault();
    alert(`Has añadido ${colum.value} columnas.`);
    localStorage.setItem(`Numero Columnas:`, JSON.stringify(colum.value));
    colum.value = '';
    maxC = parseInt(JSON.parse(localStorage.getItem('Numero Columnas:')));
    alert(`Contador después: ${maxC}`);

    colum.disabled = true;
    botonC.disabled = true;

    localStorage.setItem('inputOculto', 'true');

    /*colum.style.display = 'none';
    document.querySelector('label[for="columnas"]').style.display = 'none';
    botonC.style.display = 'none';*/
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

    alert(`Has añadido ${nom.value} como nombre de columna.`);
    localStorage.setItem(`Nombre Columna ${contC}:`, JSON.stringify(nom.value));
    contC++;
    alert(`Contador después: ${contC}`);
    nom.value = '';
    localStorage.removeItem('temporalNombre');

    localStorage.setItem('numColum', JSON.stringify(contC));

    label.textContent = `Nombre columna ${contC}:`;

    if (contC > maxC) {
        formu.style.display = 'none';
        /*nom.style.display = 'none';
        document.querySelector('label[for="nombre"]').style.display = 'none';
        botonN.style.display = 'none';*/
        localStorage.setItem('columnaOculta', 'true');
    }
}

botonN.addEventListener('click', añadirNombre);

function limpiarDatos() {
    localStorage.clear();
    alert("Se han eliminado todos los datos guardados.");
    contC = 1;

    formu.style.display = '';

    label.textContent = `Nombre columna ${contC}:`;

    localStorage.setItem('inputOculto', 'false');
    colum.disabled = false;
    botonC.disabled = false;
    localStorage.setItem('columnaOculta', 'false');
    colum.value = '';
    nom.value = '';
}

limpiar.addEventListener('click', limpiarDatos);