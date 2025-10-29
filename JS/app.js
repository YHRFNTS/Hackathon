        
const wrapperPersona = document.querySelector('.contenidoPrincipal');
const wrapperEmpresa = document.getElementById('formularioEmpresa');

const botonesTogglePersona = document.querySelectorAll('.togglePersona');
const botonesToggleEmpresa = document.querySelectorAll('.toggleEmpresa');
        
function mostrarFormularioPersona() {
    wrapperEmpresa.style.display = 'none';
    wrapperPersona.style.display = 'flex';

    botonesTogglePersona.forEach(btn => btn.classList.add('active'));
    botonesToggleEmpresa.forEach(btn => btn.classList.remove('active'));
}

function mostrarFormularioEmpresa() {
    wrapperPersona.style.display = 'none';
    wrapperEmpresa.style.display = 'flex'; // Usamos 'flex' para centrar la tarjeta

    botonesTogglePersona.forEach(btn => btn.classList.remove('active'));
    botonesToggleEmpresa.forEach(btn => btn.classList.add('active'));
}

botonesTogglePersona.forEach(btn => btn.addEventListener('click', mostrarFormularioPersona));
        
botonesToggleEmpresa.forEach(btn => btn.addEventListener('click', mostrarFormularioEmpresa));