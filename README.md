# WE Barbearia

Monorepo: `frontend/` (React) + `backend/` (API local) + `api/` (Vercel serverless).

## Desenvolvimento local

Sempre na **raiz** do projeto:

```bash
cd "/caminho/para/we-barbearia 2"
cp backend/.env.example backend/.env
npm install
npm run dev
```

- Site: http://localhost:5173  
- API local: http://127.0.0.1:8787  

## Deploy na Vercel (para vender / cliente)

```bash
npm install
npx vercel login
npx vercel          # preview
npx vercel --prod   # produção
```

Ou no dashboard: Importar o repositório Git → a `vercel.json` já está configurada.

### Domínio customizado

1. Vercel → Project → **Settings → Domains**
2. Adicione o domínio do cliente (ex: `webarbearia.com.br`)
3. Aponte o DNS:
   - **A** → `76.76.21.21` **ou**
   - **CNAME** `www` → `cname.vercel-dns.com`
4. Aguarde SSL (automático)

O site e `/api/booking` ficam no **mesmo domínio** (HTTPS).

## Produção self-hosted (opcional)

```bash
# backend/.env
NODE_ENV=production
HOST=0.0.0.0
SERVE_FRONTEND=true
CORS_ORIGINS=https://seudominio.com.br

npm run build
npm start
```
