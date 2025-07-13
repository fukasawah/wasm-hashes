#!/bin/bash

set -ue

rm -rf pkg/{src,dist}

mkdir pkg/src/

for algo in md5 sha1 sha256 sha512; do
  echo "Building $algo..."
  wasm-pack build  --scope fukasawah --out-name ${algo} --target web --out-dir "temp-pkg" -- --features $algo
done

mv temp-pkg/*.{js,d.ts,wasm} pkg/src/

ls -l pkg/src/*.wasm
rm -rf temp-pkg

#cd pkg && npm install && npm run build && cp src/*.wasm dist/