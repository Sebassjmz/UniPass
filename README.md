# UniPass

Sistema de acceso universitario con tokens temporales de 6 dígitos válidos por 5 minutos.

## Tecnologías

- Frontend: React + TypeScript + Tailwind
- Backend: Node.js + Express + MongoDB
- Autenticación: JWT + Bcrypt

## Instalación

```bash
git clone https://github.com/Sebassjmz/UniPass.git
cd UniPass

# Copiar variables de entorno
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Backend
cd backend
npm install
npm run dev

# Frontend (nueva terminal)
cd frontend
npm install
npm run dev
```

## URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Uso

### Alumno
1. Login con matrícula
2. Generar token de 6 dígitos
3. Mostrar código al guardia

### Guardia
1. Login con credenciales
2. Ingresar código del alumno
3. Verificar y registrar acceso

## Licencia

MIT****