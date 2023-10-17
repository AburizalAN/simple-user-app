# Simple User App using React + Typescript

Ini adalah aplikasi React typescriopt sederhana yang dibuat menggunakan vite sebagai module bundler.
Aplikasi ini menampilkan list random user yang datanya didapat dari API https://randomuser.me/api.

## Teknologi yang dipakai

- node.js versi 18
- vite
- React.js
- typescript
- scss
- tailwindcss

## Cara menginstall

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
