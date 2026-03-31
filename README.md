# tarot-chat

Monorepo: `packages/server` (Express API) ve `packages/client` (Vite + React).

## Kurulum

Repoyun kökünde:

```bash
npm install
```

## Geliştirme

Sunucu ve istemciyi birlikte çalıştırmak için:

```bash
npm run dev
```

Ayrı ayrı:

```bash
npm run dev -w server
npm run dev -w client
```

## Üretim derlemesi

```bash
npm run build -w server
npm run build -w client
```
