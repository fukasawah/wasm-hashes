# WASM Hashes

RustのRustCrypt/hashesのハッシュアルゴリズム（MD5, SHA1, SHA256, SHA512）をWASM化しJavaScriptから利用できるようにしました。


## 使用方法

### SHA256の例

```javascript
import { Sha256 } from "@fukasawah/wasm-hashes/sha256";

function stringToBytes(){
  return new TextEncoder().encode(str);
}

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

const hasher = new Sha256();
await hasher.update(stringToBytes("hello "));
await hasher.update(stringToBytes("world"));
const hash = await hasher.finalize();
console.log(bufferToHex(hash));
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

### リリース

```bash
cd pkg
npm publish
```

### テスト

このプロジェクトはWASMターゲット専用に設定されているため、通常の`cargo test`は使用できません。
以下の方法でテストを実行してください：

#### Rustコードのテスト（x86_64ターゲット指定）

```bash
cargo test --target x86_64-unknown-linux-gnu
```

#### WASM動作テスト（Node.js経由）

```bash
./build.sh && node test-wasm.mjs
```

WASMテストでは以下を確認します：
- WASMモジュールが正常にロードできること
- 各ハッシュアルゴリズムが期待される結果を出力すること
- ストリーミング処理が正常に動作すること

## API

### 共通インターフェース

すべてのハッシュクラスは以下のメソッドを提供します：

- `constructor()`: 新しいハッシャーインスタンスを作成
- `update(Uint8Array): Promise<this>`: データを追加
- `finalize(): Promise<Uint8Array>`: 最終ハッシュ値を取得
