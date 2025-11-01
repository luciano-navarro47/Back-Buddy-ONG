# Back-Animals
Este proyecto es una aplicación web que permite a los usuarios ver información 
sobre diferentes animales, incluyendo imágenes y descripciones detalladas. 

Herramientas principales del backend: 
- Typescript
- TypeORM
- Express
- NodeJS
- PostgreSQL

## Crear y ejecutar migraciones de Typeorm (Opcional: generar)
Crear migración vacía: ```npm run migration:create src/migrations/<migration-file-name>```

Ejecutar la última migración creada: ```npm run migration:run``` 

(Opcional) Generar: ```npm run migration:generate```

## Generar datos ficticios en la DB
Ejecutar el comando ```npm run seed``` para poblar la base de datos de PostgresSQL con registros ficticios para algunas tablas.
+ Se generarán: usuarios, productos, veterinarias y mascotas.

## Ejecutar las pruebas para: Products, RandomData, Seeding
Ejecutar el comando ```npm run test``` para ejecutar todos los tests mencionados.

## Ejecutar Backend en modo desarrollo
```npm run dev```

## Ejecutar Backend en modo produccion
```npm run start``` 


# DOCKER BUILD + CLOUD RUN (GCP)
## 1. Desde la carpeta del repo (donde está el Dockerfile)
```docker build -t miusuario/back-buddy-ong00:{newTag,. e.g.: 1.0.0} .``` 

### - (opcional) asegurate que la imagen tenga el prefijo docker.io — no siempre es necesario, pero lo hace explícito:
```docker tag miusuario/back-buddy-ong00:{newTag,. e.g.: 1.0.0} docker.io/miusuario/back-buddy-ong00:{newTag,. e.g.: 1.0.0}``` 

### - Login a Docker Hub (te pedirá password)
```docker login``` 

### - Push al repo de Docker Hub
```docker push docker.io/miusuario/back-buddy-ong00:{newTag,. e.g.: 1.0.0}``` 

## 2. Hacer deploy en Cloud Run usando la UI
Abrí Google Cloud Console → Cloud Run → seleccioná tu servicio back-buddy-ong00.

Click en EDIT & DEPLOY NEW REVISION (o botón similar: Deploy new revision / Deploy).

En Container image URL pegá la URL completa de Docker Hub:

Sería algo como: [ docker.io/miusuario/back-buddy-ong00:{newTag,. e.g.: 1.0.0} ]
