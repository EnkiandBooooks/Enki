# Enki

Enki es una aplicación avanzada de gestión de lectura en grupo, desarrollada con Node.js, Angular 18, y MongoDB, diseñada para facilitar la colaboración y el seguimiento de progreso entre usuarios. La aplicación centraliza la experiencia en un sistema de Workspaces, cada uno de los cuales incluye una Timeline conjunta. Esta línea de tiempo permite a los usuarios registrar su avance, añadir comentarios específicos y visualizar el progreso compartido.

# Etapas  y Ramas disponibles 🚀

En este paso pondremos los commits para hacer una pequeña documentación guiada del proyecto, desde el montaje del servidor hasta el despliegue final
## Despliegue

### Comando 1: Clonar el repositorio en tu Maquina Local 

**Comando**: 
```bash
# git clone https://github.com/GerardAcosta/LDF_Nombre_Provisional.git
```

**Descripción**: Clonación del repositorio en tu maquina local


### Comando 2: Instalar node.js


#### Windows y MacOS:

- Ve a la página oficial de Node.js.
- Descarga el instalador correspondiente a tu sistema operativo (Windows y/o macOS).
- Ejecuta el instalador y sigue las instrucciones para completar la instalación.

**Descripción**: Instalación de node.js en windows y macOS

### Comando 3: Instalar Angular 18


#### Windows y MacOS:

**Comando**: 
```bash
# npm install -g @angular/cli@18
```

**Descripción**: Instalación de Angular 18 en Windows, macOS y LINUX

### Comando 4: Instalar MongooDB

#### 4.1 Instalación de MoongoDB Community Edition
- Ve a la página oficial de Mongoo DB Community Edition.
- Selecciona el sistema operativo y descarga el .msi
- Haz la instalación completa
  - Durante la instalación, asegúrate marcar la opcón Install MongoDB as a Service
  - Completa la instalación

#### 4.2 Instalación de MoongoDB tools
- Ve a la página oficial de Mongoo DB Database Tools.
- Selecciona el sistema operativo y descarga el archivo .zip
- Extrae el contenido del arvhivo en una carpeta. La recomendada es:
```bash
# C:\Program Files\MongoDB\Tools
```
 - Dentro de la subcarpeta 100( o numero de version correspondiente), encontraras bin, que contiene los ejecutables de las herramientas

#### 4.3 Implementación MoongoDB 

- Presionamos la tecla de Windows y seleccionamos 'Variables de entorno del sistema'
- Seleccionamos path
- Cambiamos la ruta por la siguiente:
```bash
# C:\Program Files\MongoDB\Tools\100\bin
```
- Finalmente, entramos al CMD y ejecutamos el siguiente comando:
```bash
#  moongorestore --db applibros \tu_ruta\Enki\BackupsMongo\applibrosBackUp 
```
**Descripción**: Instalación y implementación de MongooseDB

### Comando 5: Instalar Dependencias

- Entramos en Visual Studio Code
- Abrimos un terminal y entramos a la carpeta /Enki:
```bash
# cd tu_ruta/Enki
```
- Nos dirigimos al backend: 
```bash
# npm install
```
- Instalamos dependencias del backend: 
```bash
# npm install
```
- Nos redirigimos a la rama principal: 
```bash
# cd ../..
```
- Y nos movemos al frontend:
```bash
# npm install
```
- Instalamos dependencias:
```bash
# npm install
```

### Comando 6: Ejecutar servidor

**Path**: 'tu_ruta/Enki'

**Comando**: 
```bash
# ./ejecutar.ps1 -b/-f
```

**Descripción**: Este script te ejecuta automaticamente el backend, el frontend, y te abre en el navegador automaticamente la pagina. Dependiendo si quieres ejecutar el frontend(-f) o el backend(-b) en este terminal, seleccionaras una función o otra



## Ejecutando las Pruebas ⚙️

Instrucciones y ejemplos para ejecutar el conjunto de pruebas.

```bash
# proporciona un ejemplo
```

### Pruebas de Principio a Fin 🔩

Explica qué cubren estas pruebas, por qué son importantes y cómo interpretar sus resultados.

### Pruebas de Estilo de Código ⌨️

Descripción y ejemplos de las pruebas de estilo que estás utilizando.

```bash
# proporciona un ejemplo
```

El servidor frontend se abrira en el http://localhost:4200 y el servidor backend en el http://localhost:1234

## Construido Con 🛠️

Explica qué tecnologías usaste para construir este proyecto. Aquí algunos ejemplos:

- [JavaScript]() - El lenguaje de backend utilizado
- [NodeJs](https://nodejs.org/en) - El framework de backend utilizado
- [TypeScript]() - El lenguaje de frontend utilizado
- [Angular 18](https://angular.dev/) - El framework de frontend utilizado
- [Ruby gems](https://rubygems.org) - Gestión de dependencias
- [Postgresql](https://www.postgresql.org) - Sistema de base de datos
- [Bulma IO](https://bulma.io) - Framework de CSS

## Roadmap

Ideas, mejoras planificadas y actualizaciones futuras

para el proyecto actual.

## Autores ✒️

- **Gerard Acosta ** - _Trabajo inicial_ - [Gerard Acosta](https://github.com/GerardAcosta)
- **Cesar Robres ** - _Trabajo inicial_ - [Cesar Robres](https://github.com/CesarRobres)
- **Arnau Mendez  ** - _Trabajo inicial_ - [Arnau Mendez](https://github.com/ArnauMendez)
- **Pol Buqueras  ** - _Trabajo inicial_ - [Pol Buqueras](https://github.com/PolBuqueras)
- **Max Merino  ** - _Trabajo inicial_ - [Max Merino](https://github.com/MaxMerino05)
- **Pablo Carvalho ** - _Trabajo inicial_ - [Pablo Carvalho](https://github.com/Pablo-inetum)
- ** Antonio Cobo** - _Trabajo inicial_ - [Antonio Cobo](https://github.com/ToniInetum)




- Mantén cada sección lo más concisa posible. Evita la pelusa innecesaria, ya que puede ser abrumadora para el lector.
- Asegúrate de que tus instrucciones de instalación, pruebas y despliegue sean detalladas y precisas. Si hay pasos adicionales que el lector necesita tomar (como instalar dependencias extra), asegúrate de incluirlos.
- Los visuales (imágenes, GIFs) son muy útiles para transmitir rápidamente lo que hace tu proyecto y cómo usarlo. Si puedes, incluye capturas de pantalla de tu aplicación en acción o GIFs que demuestren su uso.
- El tono amigable y acogedor que usas en tu README es excelente. Ayuda a hacer tu proyecto más acogedor para los colaboradores.
