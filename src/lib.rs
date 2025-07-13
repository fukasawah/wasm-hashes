use wasm_bindgen::prelude::*;

#[cfg(feature = "md5")]
use md5::{Digest, Md5};

#[cfg(feature = "sha1")]
use sha1::{Digest as Sha1Digest, Sha1};

#[cfg(feature = "sha256")]
use sha2::Digest as Sha2Digest;

#[cfg(feature = "sha512")]
use sha2::Digest as Sha2Digest;

// MD5 implementation
#[cfg(feature = "md5")]
#[wasm_bindgen]
pub struct WasmMd5 {
    hasher: Md5,
}

#[cfg(feature = "md5")]
#[wasm_bindgen]
impl WasmMd5 {
    #[wasm_bindgen(constructor)]
    pub fn new() -> WasmMd5 {
        WasmMd5 { hasher: Md5::new() }
    }

    #[wasm_bindgen]
    pub fn update(&mut self, data: &[u8]) {
        Digest::update(&mut self.hasher, data);
    }

    #[wasm_bindgen]
    pub fn finalize(self) -> Vec<u8> {
        Digest::finalize(self.hasher).to_vec()
    }
}

// SHA1 implementation
#[cfg(feature = "sha1")]
#[wasm_bindgen]
pub struct WasmSha1 {
    hasher: Sha1,
}

#[cfg(feature = "sha1")]
#[wasm_bindgen]
impl WasmSha1 {
    #[wasm_bindgen(constructor)]
    pub fn new() -> WasmSha1 {
        WasmSha1 {
            hasher: Sha1::new(),
        }
    }

    #[wasm_bindgen]
    pub fn update(&mut self, data: &[u8]) {
        Sha1Digest::update(&mut self.hasher, data);
    }

    #[wasm_bindgen]
    pub fn finalize(self) -> Vec<u8> {
        Sha1Digest::finalize(self.hasher).to_vec()
    }
}

// SHA256 implementation
#[cfg(feature = "sha256")]
#[wasm_bindgen]
pub struct WasmSha256 {
    hasher: sha2::Sha256,
}

#[cfg(feature = "sha256")]
#[wasm_bindgen]
impl WasmSha256 {
    #[wasm_bindgen(constructor)]
    pub fn new() -> WasmSha256 {
        WasmSha256 {
            hasher: sha2::Sha256::new(),
        }
    }

    #[wasm_bindgen]
    pub fn update(&mut self, data: &[u8]) {
        Sha2Digest::update(&mut self.hasher, data);
    }

    #[wasm_bindgen]
    pub fn finalize(self) -> Vec<u8> {
        Sha2Digest::finalize(self.hasher).to_vec()
    }
}

// SHA512 implementation
#[cfg(feature = "sha512")]
#[wasm_bindgen]
pub struct WasmSha512 {
    hasher: sha2::Sha512,
}

#[cfg(feature = "sha512")]
#[wasm_bindgen]
impl WasmSha512 {
    #[wasm_bindgen(constructor)]
    pub fn new() -> WasmSha512 {
        WasmSha512 {
            hasher: sha2::Sha512::new(),
        }
    }

    #[wasm_bindgen]
    pub fn update(&mut self, data: &[u8]) {
        Sha2Digest::update(&mut self.hasher, data);
    }

    #[wasm_bindgen]
    pub fn finalize(self) -> Vec<u8> {
        Sha2Digest::finalize(self.hasher).to_vec()
    }
}
