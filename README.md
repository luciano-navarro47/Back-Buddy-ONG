# **Back-Animals**
Este proyecto es una aplicación web que permite a los usuarios ver información 
sobre diferentes animales, incluyendo imágenes y descripciones detalladas. 

Herramientas principales del backend: 
- Typescript
- TypeORM
- Express
- NodeJS
- PostgreSQL

## **Crear y ejecutar migraciones de Typeorm (Opcional: generar)**
Crear migración vacía: ```npm run migration:create src/migrations/<migration-file-name>```

Ejecutar la última migración creada: ```npm run migration:run``` 

(Opcional) Generar: ```npm run migration:generate```

## **Generar datos ficticios en la DB**
Ejecutar el comando ```npm run seed``` para poblar la base de datos de PostgresSQL con registros ficticios para algunas tablas.
+ Se generarán: usuarios, productos, veterinarias y mascotas.

## Ejecutar las pruebas para: Products, RandomData, Seeding
Ejecutar el comando ```npm run test``` para ejecutar todos los tests mencionados.

## **Ejecutar Backend en modo desarrollo**
```npm run dev```

## **Ejecutar Backend en modo produccion**
```npm run start``` 


# 🚀 **Deploy automatizado con GitHub Actions (Cloud Run + Docker)**

Desde la versión v1.0.1, los despliegues del backend de Buddy ONG se realizan automáticamente mediante GitHub Actions, eliminando la necesidad de construir imágenes y desplegar manualmente desde Docker Hub o la consola de GCP.

## 🧩 **Flujo general**

Cada vez que se crea un tag de versión (por ejemplo, v1.0.1.3) sobre la rama production, se dispara un flujo automatizado que:

Construye la imagen Docker del backend usando el Dockerfile del repositorio.

Publica esa imagen en el Google Container Registry (GCR) asociado al proyecto de GCP.

Despliega automáticamente una nueva revisión del servicio back-buddy-ong00 en Cloud Run.

Actualiza el 100 % del tráfico al nuevo contenedor si el despliegue fue exitoso.

## 🧱 **Requisitos previos**

Antes de utilizar este flujo, asegurate de que:

- La rama production contiene la última versión estable del código.

- Las secrets necesarias están configuradas en GitHub (GCP_PROJECT_ID, GCP_SERVICE, GCP_REGION, GCP_SA_KEY, etc.).

- El archivo .github/workflows/release-deploy.yml está configurado correctamente (este archivo define el pipeline).

## 🧭 **Pasos para hacer un nuevo deploy**

1. **Actualizar el código en production**
```
git checkout production
git pull origin production
```


2. **Crear una rama de hotfix o feature (opcional)**
Si necesitás aplicar una corrección o mejora rápida:
```
git checkout -b hotfix/db-retries-v1.0.1
# realizar cambios...
git commit -m "hotfix: improve DB retry logic"
git push -u origin hotfix/db-retries-v1.0.1
```


Luego creá un Pull Request hacia production y mergealo una vez aprobado.

3. **Crear un nuevo tag de versión**
Una vez que production tiene los cambios listos:

```
git checkout production
git pull origin production
git tag -a v1.0.1.3 -m "release: improved DB retry + pool config"
git push origin v1.0.1.3
```


4. **Automáticamente se inicia el workflow**
GitHub Actions se encarga del resto:

- Compila la imagen Docker.
- La publica en GCR.
- Despliega en Cloud Run el servicio back-buddy-ong00.

5. **Verificar el despliegue**
Una vez finalizado el pipeline, podés revisar los logs:

- En GitHub → pestaña Actions → workflow de deploy correspondiente.
- En Google Cloud Console → Cloud Run → back-buddy-ong00 → Revisions
Allí vas a ver la nueva revisión con el tag que generaste (por ejemplo, v1.0.1.3).

## 🧰 **Variables de entorno configuradas en Cloud Run**

El servicio back-buddy-ong00 utiliza variables configuradas directamente desde la UI de Cloud Run (no se exponen en el repositorio).
Ejemplo:

### **Variable y Descripción**

1. NODE_ENV=production ==> Define entorno de ejecución.
2. DATABASE_URL ==> Conexión principal a Neon DB.
3. PORT=8080 ==> Puerto expuesto por el contenedor.
4. FRONTEND_BASE ==> URL base del cliente desplegado.
5. PG_MAX_CLIENTS=5 ==> Límite de conexiones simultáneas por instancia.
6. DB_CONNECT_TIMEOUT_MS=60000 ==> Timeout de conexión a DB.
7. PG_CONN_TIMEOUT_MS=20000 ==> Timeout interno del pool de conexiones.