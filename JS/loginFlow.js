import { getFreighterPublicKey, signTxWithFreighter } from './walletFreighter.js';
import { buildNoopTx } from './sorobanClient.js';

function saveSession({ publicKey }) {
    localStorage.setItem('session_publicKey', publicKey);
    localStorage.setItem('session_createdAt', String(Date.now()));
}

export function getSession() {
    const publicKey = localStorage.getItem('session_publicKey');
    return publicKey ? { publicKey } : null;
}

export function clearSession() {
    localStorage.removeItem('session_publicKey');
    localStorage.removeItem('session_createdAt');
}

export async function loginWithFreighter() {
    const publicKey = await getFreighterPublicKey();
    let tx = await buildNoopTx(publicKey);
    await signTxWithFreighter(tx);
    saveSession({ publicKey });
    return { publicKey };
}

