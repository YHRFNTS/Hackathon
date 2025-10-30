import { CONTRACT_ID } from './sorobanConfig.js';
import { buildInvokeTx, sendAndWait } from './sorobanClient.js';
import { sha256Hex, scvBytesFromHex, scvAddressFromPublicKey } from './sorobanHelpers.js';
import { getFreighterPublicKey, signTxWithFreighter } from './walletFreighter.js';

export async function registerUserOnChain({ name, email }) {
    if (!CONTRACT_ID) {
        throw new Error('CONTRACT_ID no configurado. Despliega el contrato y coloca su ID en sorobanConfig.js');
    }

    const publicKey = await getFreighterPublicKey();
    const nameHash = await sha256Hex((name || '').trim().toLowerCase());
    const emailHash = await sha256Hex((email || '').trim().toLowerCase());

    const args = [
        scvAddressFromPublicKey(publicKey),
        scvBytesFromHex(nameHash),
        scvBytesFromHex(emailHash),
    ];

    let tx = await buildInvokeTx({
        publicKey,
        contractId: CONTRACT_ID,
        method: 'register_user',
        args,
    });

    const signedTx = await signTxWithFreighter(tx);
    const res = await sendAndWait(signedTx);
    return res;
}

