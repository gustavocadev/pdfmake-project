# Ejecutar en dev

1. Clonar el repositorio
2. Instalar las dependencias `bun i`
3. Clonar `env.example` y renombrar a `.env` y completar las variables de entorno
4. Levantar la base de datos `docker-compose up -d`
5. Generar el prisma client `bun run prisma generate`
6. Ejecutar el proyecto `bun run start:dev`