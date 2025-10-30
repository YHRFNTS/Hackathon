import * as freighter from '@stellar/freighter-api';

export async function ensureFreighter() {
    const ok = await freighter.isConnected();
    if (!ok) throw new Error('Freighter no está instalado o no responde');
}

export async function getFreighterPublicKey() {
    await ensureFreighter();
    return freighter.getUserPublicKey();
}

export async function signTxWithFreighter(tx) {
    const signedXDR = await freighter.signTransaction(tx.toXDR(), {
        networkPassphrase: tx.networkPassphrase(),
    });
    const { Transaction } = await import('@stellar/stellar-sdk');
    return Transaction.fromXDR(signedXDR, tx.networkPassphrase());
}

