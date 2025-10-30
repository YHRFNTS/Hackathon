import { xdr, Address } from '@stellar/stellar-sdk';

export async function sha256Hex(text) {
    const enc = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest('SHA-256', enc);
    return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export function scvBytesFromHex(hex) {
    const bytes = Uint8Array.from(hex.match(/.{1,2}/g).map(b => parseInt(b, 16)));
    return xdr.ScVal.scvBytes(bytes);
}

export function scvAddressFromPublicKey(pubKey) {
    const addr = Address.fromString(pubKey);
    return addr.toScVal();
}

