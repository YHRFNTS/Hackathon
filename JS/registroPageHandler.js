import { registerUserOnChain } from './registerUser.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form.formularioRegistro');
    const submitBtn = form?.querySelector('.crearCuenta');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('nombre')?.value || '';
        const email = document.getElementById('email')?.value || '';
        try {
            if (submitBtn) submitBtn.disabled = true;
            const res = await registerUserOnChain({ name, email });
            alert('Registro exitoso en blockchain');
            console.log(res);
        } catch (err) {
            console.error(err);
            alert('Error en registro: ' + err.message);
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
});

