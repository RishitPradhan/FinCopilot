/**
 * End-to-End Encryption Utilities using Web Crypto API
 */

// Generate RSA-OAEP Key Pair
export async function generateKeyPair() {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );

    const publicKey = await exportPublicKey(keyPair.publicKey);
    const privateKey = await exportPrivateKey(keyPair.privateKey);

    return { publicKey, privateKey };
}

// Export Public Key to PEM/Base64 string
async function exportPublicKey(key: CryptoKey) {
    const exported = await window.crypto.subtle.exportKey("spki", key);
    return btoa(String.fromCharCode(...Array.from(new Uint8Array(exported))));
}

// Export Private Key to PEM/Base64 string
async function exportPrivateKey(key: CryptoKey) {
    const exported = await window.crypto.subtle.exportKey("pkcs8", key);
    return btoa(String.fromCharCode(...Array.from(new Uint8Array(exported))));
}

// Import Public Key from string
async function importPublicKey(pem: string) {
    const binary = atob(pem);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    return await window.crypto.subtle.importKey(
        "spki",
        bytes.buffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["encrypt"]
    );
}

// Import Private Key from string
async function importPrivateKey(pem: string) {
    const binary = atob(pem);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    return await window.crypto.subtle.importKey(
        "pkcs8",
        bytes.buffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["decrypt"]
    );
}

// Encrypt message with recipient's public key
export async function encryptMessage(content: string, publicKeyStr: string) {
    try {
        const publicKey = await importPublicKey(publicKeyStr);
        const encoded = new TextEncoder().encode(content);
        const encrypted = await window.crypto.subtle.encrypt(
            { name: "RSA-OAEP" },
            publicKey,
            encoded
        );
        return btoa(String.fromCharCode(...Array.from(new Uint8Array(encrypted))));
    } catch (error) {
        console.error("Encryption failed:", error);
        return content; // Fallback to plain text if fails
    }
}

// Decrypt message with user's private key
export async function decryptMessage(encryptedStr: string, privateKeyStr: string) {
    try {
        const privateKey = await importPrivateKey(privateKeyStr);
        const binary = atob(encryptedStr);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

        const decrypted = await window.crypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            privateKey,
            bytes.buffer
        );
        return new TextDecoder().decode(decrypted);
    } catch (error) {
        console.error("Decryption failed:", error);
        return "[Encrypted Message]"; // Or return the encrypted string if it wasn't actually encrypted
    }
}
