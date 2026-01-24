//Variables
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
const tarea = document.getElementById('tarea');
const botonTarea = document.getElementById('botonTarea');
const nuevaTarea = document.getElementById('nuevaTarea');
const columnaDROP = document.getElementsByClassName('columnaDROP');
let maxC = 0;
let contC = 1;
let contT = 1;

// Ocultar sección de nueva tarea al inicio
if (formu.style.display !== 'none'){
    nuevaTarea.style.display = 'none';
}

// Cargar contadores de columnas, máximo de columnas y tareas desde localStorage si existen
if (localStorage.getItem('numColum')) {
    contC = JSON.parse(localStorage.getItem('numColum'));
} else {
    localStorage.setItem('numColum', JSON.stringify(contC));
}

if (localStorage.getItem('Numero Columnas:')) {
    maxC = parseInt(JSON.parse(localStorage.getItem('Numero Columnas:')));
}

if (localStorage.getItem('numTareas')) {
    contT = JSON.parse(localStorage.getItem('numTareas'));
} else {
    localStorage.setItem('numTareas', JSON.stringify(contT));
}

// Actualizar labels de nombre y límite con el contador actual
label.textContent = `Nombre columna ${contC}:`;
labelLimite.textContent = `Límite columna ${contC}:`;

// Deshabilitar input límite al principio para que la primera columna siempre sea sin limite y si se recarga mientras pones nombres
if (contC < 2 || contC === maxC || !localStorage.getItem('limiteHabilitado')){
    limite.disabled = true;
    botonL.disabled = true;
}

// Cargar valores temporales de los inputs desde localStorage si existen
if (localStorage.getItem('temporalColumna')) {
    colum.value = localStorage.getItem('temporalColumna');
}

if (localStorage.getItem('temporalNombre')) {
    nom.value = localStorage.getItem('temporalNombre');
}

if (localStorage.getItem('temporalLimite')) {
    limite.value = localStorage.getItem('temporalLimite');
}

if (localStorage.getItem('temporalTarea')) {
    tarea.value = localStorage.getItem('temporalTarea');
}

// Verificar si el input columna, el formulario y el limite deben estar ocultos o deshabilitados
if (localStorage.getItem('inputOculto') === 'true') {
    colum.disabled = true;
    botonC.disabled = true;
    colum.value = '';
}

if (localStorage.getItem('columnaOculta') === 'true') {
    formu.style.display = 'none';
}

if (localStorage.getItem('limiteHabilitado') === 'true') {
    limite.disabled = false;
    botonL.disabled = false;
    nom.disabled = true;
    botonN.disabled = true;
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

function nomTarea(e) {
    if (tarea.value.trim() !== '') {
        localStorage.setItem('temporalTarea', tarea.value);
    } else {
        localStorage.removeItem('temporalTarea');
    }
}

tarea.addEventListener('input', nomTarea);

// Función para cargar las columnas y tareas guardadas
function cargarColumnasGuardadas() {
    if (maxC > 0) {
        tabla.innerHTML = '';
        for (let i = 1; i <= maxC; i++) {
            const divColumna = document.createElement('div');
            divColumna.id = `columna-${i}`;
            divColumna.className = 'columnaDROP';
            divColumna.addEventListener('dragover', permitirDrop);
            divColumna.addEventListener('drop', drop);
            tabla.appendChild(divColumna);
            
            // Cargar el nombre de las columnas si existen
            const nombreGuardado = localStorage.getItem(`Nombre Columna ${i}:`);
            if (nombreGuardado) {
                const H3Columna = document.createElement('h3');
                H3Columna.textContent = JSON.parse(nombreGuardado);

                const limiteGuardado = localStorage.getItem(`Limite Columna ${i}:`);
                if (limiteGuardado && i !== 1 && i !== maxC) {
                    const spanLimite = document.createElement('span');
                    spanLimite.textContent = ` (Límite: ${JSON.parse(limiteGuardado)})`;
                    H3Columna.appendChild(spanLimite);
                }
                
                divColumna.appendChild(H3Columna);
            }
        }

        // Cargar las tareas guardadas si existen
        for (let i = 1; i < contT; i++) {
            const tareaGuardada = localStorage.getItem(`Tarea ${i}:`);
            if (tareaGuardada) {
                const tareaP = document.createElement('p');
                tareaP.textContent = JSON.parse(tareaGuardada);
                tareaP.draggable = true;
                tareaP.id = `tarea-${i}`;
                tareaP.addEventListener('dragstart', inicioDrag);
                tareaP.addEventListener('dblclick', borrarTarea);

                const columnaID = localStorage.getItem(`tarea-${i}`) || 'columna-1';

                const columnaTarea = document.getElementById(columnaID);
                if (columnaTarea) {
                    columnaTarea.appendChild(tareaP);
                }
            }
        }
        
        // Si ya se completaron todas las columnas, ocultar formulario
        if (contC > maxC) {
            formu.style.display = 'none';
            nuevaTarea.style.display = '';
        }
    }
}

// Usar la función después de cargar maxC
if (localStorage.getItem('Numero Columnas:')) {
    maxC = parseInt(JSON.parse(localStorage.getItem('Numero Columnas:')));
    cargarColumnasGuardadas();
}

//Funciones BOTONES añadir columna, nombre, límite, tarea y limpiar datos

//Añadir columna
function aniadirColumna(e) {
    e.preventDefault();

    //Validar que se ha introducido algún dato
    if (colum.value === "") {
        alert("Por favor, introduce un número de columnas.");
        return;
    }

    alert(`Has añadido ${colum.value} columnas.`);
    localStorage.setItem(`Numero Columnas:`, JSON.stringify(colum.value));
    colum.value = '';
    maxC = parseInt(JSON.parse(localStorage.getItem('Numero Columnas:')));

    // Crear divs según el número de columnas elegido
    tabla.innerHTML = '';
    for (let i = 1; i <= maxC; i++) {
        const divColumna = document.createElement('div');
        divColumna.id = `columna-${i}`;
        divColumna.className = 'columnaDROP';
        divColumna.addEventListener('dragover', permitirDrop);
        divColumna.addEventListener('drop', drop);
        tabla.appendChild(divColumna);
    }

    colum.disabled = true;
    botonC.disabled = true;

    localStorage.setItem('inputOculto', 'true');
}

botonC.addEventListener('click', aniadirColumna);

//Añadir nombre a columna
function aniadirNombre(e) {
    e.preventDefault();

    //Validar que se introduzca el número de columnas antes de añadir nombres
    if (maxC === 0) {
        alert("Primero debes indicar el número de columnas");
        nom.value = '';
        localStorage.removeItem('temporalNombre');
        return;
    }

    //Validar que se ha introducido algún dato
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

    nom.value = '';
    localStorage.removeItem('temporalNombre');

    // Si la columna actual necesita límite (no es la primera ni la última)
    if (contC > 1 && contC < maxC) {
        nom.disabled = true;
        botonN.disabled = true;
        limite.disabled = false;
        botonL.disabled = false;
        localStorage.setItem('limiteHabilitado', 'true');
        
        label.textContent = `Nombre columna ${contC}:`;
        labelLimite.textContent = `Límite columna ${contC}:`;
        
        alert("Debes introducir el límite de esta columna antes de continuar.");
    } else {
        // Si no necesita límite, pasar directamente a la siguiente columna
        localStorage.removeItem('limiteHabilitado');
        contC++;
        localStorage.setItem('numColum', JSON.stringify(contC));
        
        label.textContent = `Nombre columna ${contC}:`;
        labelLimite.textContent = `Límite columna ${contC}:`;
        
        if (contC > maxC) {
            formu.style.display = 'none';
            localStorage.setItem('columnaOculta', 'true');
            nuevaTarea.style.display = '';
        }
    }
}

botonN.addEventListener('click', aniadirNombre);

//Añadir límite a columna
function aniadirLimite(e) {
    e.preventDefault();

    //Validar que se ha introducido algún dato
    if (limite.value === "") {
        alert("Por favor, introduce un límite para la columna.");
        return;
    }

    //Validar que introduce número positivo
    const limiteNum = parseInt(limite.value);
    if (isNaN(limiteNum) || limiteNum <= 0) {
        alert("El límite debe ser un número positivo.");
        return;
    }

    alert(`Has añadido ${limite.value} como límite de la columna.`);

    localStorage.setItem(`Limite Columna ${contC}:`, JSON.stringify(limite.value));

    //Añadir span con el límite al lado del nombre de la columna
    const columnaActual = document.getElementById(`columna-${contC}`);
    const h3Existente = columnaActual.querySelector('h3');
    if (h3Existente) {
        const spanLimite = document.createElement('span');
        spanLimite.textContent = ` (Límite: ${limite.value})`;
        h3Existente.appendChild(spanLimite);
    }

    limite.value = '';
    localStorage.removeItem('temporalLimite');
    limite.disabled = true;
    botonL.disabled = true;
    nom.disabled = false;
    botonN.disabled = false;
    localStorage.removeItem('limiteHabilitado');
    
    contC++;
    localStorage.setItem('numColum', JSON.stringify(contC));
    
    label.textContent = `Nombre columna ${contC}:`;
    labelLimite.textContent = `Límite columna ${contC}:`;
    
    if (contC > maxC) {
        formu.style.display = 'none';
        localStorage.setItem('columnaOculta', 'true');
        nuevaTarea.style.display = '';
    }
}

botonL.addEventListener('click', aniadirLimite);

//Añadir limpiar datos
function limpiarDatos() {
    localStorage.clear();
    alert("Se han eliminado todos los datos guardados.");
    contC = 1;
    contT = 1;
    maxC = 0;

    //Mostrar formulario y ocultar nueva tarea
    formu.style.display = '';
    tabla.innerHTML = '';
    nuevaTarea.style.display = 'none';

    //Reiniciar labels
    label.textContent = `Nombre columna ${contC}:`;
    labelLimite.textContent = `Límite columna ${contC}:`;

    localStorage.setItem('inputOculto', 'false');
    colum.disabled = false;
    botonC.disabled = false;
    localStorage.setItem('columnaOculta', 'false');
    colum.value = '';
    nom.value = '';
    limite.value = '';
    tarea.value = '';
    limite.disabled = true;
    botonL.disabled = true;
    localStorage.removeItem('limiteHabilitado');

    localStorage.setItem('numColum', JSON.stringify(1));
}

limpiar.addEventListener('click', limpiarDatos);

//Añadir tareas
function aniadirTarea(e) {
    e.preventDefault();

    //Validar que se ha introducido algún dato
    if (tarea.value === "") {
        alert("Por favor, introduce una tarea.");
        return;
    }

    alert(`Has añadido la tarea ${tarea.value}`);
    localStorage.setItem(`Tarea ${contT}:`, JSON.stringify(tarea.value));

    //Añadir el nombre de la tarea siempre al primer div
    const tareaP = document.createElement('p');
    tareaP.textContent = tarea.value;
    tareaP.draggable = true;
    tareaP.id = `tarea-${contT}`;
    tareaP.addEventListener('dragstart', inicioDrag);
    tareaP.addEventListener('dblclick', borrarTarea);
    const columnaTarea = document.getElementById(`columna-1`);
    if (columnaTarea) {
        columnaTarea.appendChild(tareaP);
        localStorage.setItem(`tarea-${contT}`, 'columna-1');
    }

    contT++;
    tarea.value = '';
    localStorage.removeItem('temporalTarea');

    localStorage.setItem('numTareas', JSON.stringify(contT));

    if (contC > maxC) {
        formu.style.display = 'none';
        localStorage.setItem('columnaOculta', 'true');
        nuevaTarea.style.display = '';
    }
}

botonTarea.addEventListener('click', aniadirTarea);

//Funciones drag & drop
function inicioDrag(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function permitirDrop(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const idTarea = e.dataTransfer.getData('text/plain');
    const tareaArrastrada = document.getElementById(idTarea);
    const columnaDestino = e.currentTarget;
    const numeroColumna = columnaDestino.id.split('-')[1];
    const limiteGuardado = localStorage.getItem(`Limite Columna ${numeroColumna}:`);

    //Comprobar límite de la columna destino si existe
    if (limiteGuardado && parseInt(numeroColumna) !== 1 && parseInt(numeroColumna) !== maxC) {
        const limite = JSON.parse(limiteGuardado);
        const tareasActuales = columnaDestino.querySelectorAll('p').length;
        
        const columnaOrigen = tareaArrastrada.parentElement === columnaDestino;
        
        if (!columnaOrigen && tareasActuales >= limite) {
            alert(`No puedes añadir más tareas. Esta columna tiene un límite de ${limite} tareas.`);
            return;
        }
    }

    columnaDestino.appendChild(tareaArrastrada);
    localStorage.setItem(idTarea, columnaDestino.id);
}

//Función para borrar tareas con doble click (usada al crear tarea y cargar datos)
function borrarTarea(e) {
    const tareaABorrar = e.target;
    const idTarea = tareaABorrar.id;
    const numeroTarea = idTarea.split('-')[1];

    tareaABorrar.remove();
    localStorage.removeItem(idTarea);
    localStorage.removeItem(`Tarea ${numeroTarea}:`);
}