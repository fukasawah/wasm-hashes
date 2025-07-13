import { wasm } from '@rollup/plugin-wasm';

const createConfig = (filename) => ({
    input: `src/${filename}.js`,
    output: [
        {
            file: `./dist/${filename}.js`,
            format: 'umd',
            name: "globalThis",
        },
        {
            file: `./dist/${filename}.cjs`,
            format: 'cjs',
        },
        {
            file: `./dist/${filename}.mjs`,
            format: 'es',
        },
    ],
    plugins: [
        wasm()
    ]
});

const configs = [
    'md5',
    'sha1',
    'sha256',
    'sha512',
].map((filename) => createConfig(filename));

export default configs;