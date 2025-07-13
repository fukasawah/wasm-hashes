# WASM Hashes

RustのRustCrypt/hashesのハッシュアルゴリズム（MD5, SHA1, SHA256, SHA512）をWASM化しJavaScriptから利用できるようにしました。


## 使用方法

### SHA256の例

```javascript

import initSha256, { WasmSha256 } from "@fukasawah/wasm-hashes/sha256";

await initSha256(); // WASMのロード

function bytesToHex(bytes) {
    return Array.from(new Uint8Array(bytes)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const hasher = new WasmSha256();
const data = new TextEncoder().encode("hello world");
hasher.update(data);
const digest = bytesToHex(hasher.finalize());
console.log(digest);


```

### 対応アルゴリズム

- `@fukasawah/wasm-hashes/md5`
- `@fukasawah/wasm-hashes/sha1`
- `@fukasawah/wasm-hashes/sha256`
- `@fukasawah/wasm-hashes/sha512`

## 開発

### ビルド

```bash
./build.sh
```

## API

### 共通インターフェース

すべてのハッシュクラスは以下のメソッドを提供します：

- `constructor()`: 新しいハッシャーインスタンスを作成
- `update(Uint8Array): Promise<this>`: データを追加
- `finalize(): Promise<Uint8Array>`: 最終ハッシュ値を取得
