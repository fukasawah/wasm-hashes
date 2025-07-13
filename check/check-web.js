import initMd5, { WasmMd5 } from "@fukasawah/wasm-hashes/md5";
import initSha1,  { WasmSha1 } from "@fukasawah/wasm-hashes/sha1";
import initSha256, { WasmSha256 } from "@fukasawah/wasm-hashes/sha256";
import initSha512, { WasmSha512 } from "@fukasawah/wasm-hashes/sha512";

await initMd5();
await initSha1();
await initSha256();
await initSha512();


function bytesToHex(bytes) {
    return Array.from(new Uint8Array(bytes)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function logHashResult(myHash, cryptoHash) {
    const hasher = new myHash();
    const data = new TextEncoder().encode("hello world");

    hasher.update(data);

    const digest = bytesToHex(hasher.finalize());
    const cryptoDigest = bytesToHex(await crypto.subtle.digest(cryptoHash, data));

    const name = hasher.constructor.name;
    const result = digest === cryptoDigest;
    console.log(`${name} Result: ${result ? 'PASS' : 'FAIL'}, Expected: ${cryptoDigest}, Got: ${digest}`);

    return result;
}

const allPassed = await logHashResult(WasmSha1, 'SHA-1') &&
    // await logHashResult(WasmMd5, 'md5') &&
    await logHashResult(WasmSha256, 'SHA-256') &&
    await logHashResult(WasmSha512, 'SHA-512');


alert(`Overall Result: ${allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);

