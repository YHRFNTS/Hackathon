import { loginWithFreighter, getSession } from './loginFlow.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form.login-form');
    const submitBtn = form?.querySelector('.login-button');

    const session = getSession();
    if (session?.publicKey) {
        console.log('Sesión activa:', session.publicKey);
    }

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            if (submitBtn) submitBtn.disabled = true;
            const { publicKey } = await loginWithFreighter();
            alert('Inicio de sesión con: ' + publicKey);
            // Redirige si quieres: window.location.href = 'PanelProductor.html';
        } catch (err) {
            console.error(err);
            alert('Error al iniciar sesión: ' + err.message);
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
});

