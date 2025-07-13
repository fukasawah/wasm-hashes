import　{ WasmMd5 } from "@fukasawah/wasm-hashes/md5-node";
import { WasmSha1 } from "@fukasawah/wasm-hashes/sha1-node";
import { WasmSha256 } from "@fukasawah/wasm-hashes/sha256-node";
import { WasmSha512 } from "@fukasawah/wasm-hashes/sha512-node";


import { createHash } from "crypto"; // Ensure this import is correct for your environment


function bytesToHex(bytes) {
    return Array.from(new Uint8Array(bytes)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function logHashResult(myHash, cryptoHash) {
    const hasher = new myHash();
    const cryptoHasher = createHash(cryptoHash);
    const data = new TextEncoder().encode("hello world");

    hasher.update(data);
    cryptoHasher.update(data);

    const digest = bytesToHex(hasher.finalize());
    const cryptoDigest = bytesToHex(cryptoHasher.digest());

    const name = hasher.constructor.name;
    const result = digest === cryptoDigest;;
    console.log(`${name} Result: ${result ? 'PASS' : 'FAIL'}, Expected: ${cryptoDigest}, Got: ${digest}`);

    return result;
}

const allPassed = logHashResult(WasmSha1, 'sha1') &&
    logHashResult(WasmMd5, 'md5') &&
    logHashResult(WasmSha256, 'sha256') &&
    logHashResult(WasmSha512, 'sha512');


console.log(`Overall Result: ${allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);

if (!allPassed && process) {
    process.exit(1);
}