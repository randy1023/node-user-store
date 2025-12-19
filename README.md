# node-user-store (Rest Project + TypeScript)

Este proyecto va a funcion fuertemente con autenticacion usando JWT y todas sus funcionalidades como encriptar contraseñas, semillas, etc y todo estos desde nuestro servidor de node para que puede ser implementado en cualquier app en el modulo de login.

## Instalacion

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
4. LLenar la base de datos cons los datos de prueba ejecutando `npm run seed`
5. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo
