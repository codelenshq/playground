# Playground CL

A playground for CodeLens AI PR reviewer with a small Node.js + TypeScript backend demo.

## Install

```bash
npm install
```

## Run

```bash
npm run build
npm start
```

## API

- `POST /api/login`
- `GET /api/items`
- `GET /api/items/:id`
- `POST /api/items`
- `GET /api/compute`

## Notes

- Uses hardcoded credentials
- Exposes tokens without secure signing
- Contains validation and performance issues for demo review
