import { SorobanRpc, Contract, TransactionBuilder } from '@stellar/stellar-sdk';
import { RPC_URL, NETWORK_PASSPHRASE } from './sorobanConfig.js';

export const server = new SorobanRpc.Server(RPC_URL, { allowHttp: true });

export function getContract(contractId) {
    return new Contract(contractId);
}

export async function buildInvokeTx({ publicKey, contractId, method, args = [] }) {
    const account = await server.getAccount(publicKey);
    const contract = getContract(contractId);

    let tx = new TransactionBuilder(account, {
        fee: '300000',
        networkPassphrase: NETWORK_PASSPHRASE,
    })
        .addOperation(contract.call(method, ...args))
        .setTimeout(180)
        .build();

    tx = await server.prepareTransaction(tx);
    return tx;
}

export async function sendAndWait(tx) {
    const sendResp = await server.sendTransaction(tx);
    if (sendResp.errorResultXdr) throw new Error('Transacción rechazada');
    let res = await server.getTransaction(sendResp.hash);
    while (res.status === 'PENDING') {
        await new Promise(r => setTimeout(r, 1200));
        res = await server.getTransaction(sendResp.hash);
    }
    if (res.status !== 'SUCCESS') throw new Error('No se confirmó la transacción');
    return res;
}

export async function buildNoopTx(publicKey) {
    const account = await server.getAccount(publicKey);
    return new TransactionBuilder(account, {
        fee: '200000',
        networkPassphrase: NETWORK_PASSPHRASE,
    })
        .setTimeout(180)
        .build();
}

