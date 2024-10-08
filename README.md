# Enki

Enki es una aplicación avanzada de gestión de lectura en grupo, desarrollada con Node.js, Angular 18, y MongoDB, diseñada para facilitar la colaboración y el seguimiento de progreso entre usuarios. La aplicación centraliza la experiencia en un sistema de Workspaces, cada uno de los cuales incluye una Timeline conjunta. Esta línea de tiempo permite a los usuarios registrar su avance, añadir comentarios específicos y visualizar el progreso compartido.

# Etapas  y Ramas disponibles 🚀

En este paso pondremos los commits para hacer una pequeña documentación guiada del proyecto, desde el montaje del servidor hasta el despliegue final
## Despliegue

### Comando 1: Clonar el repositorio en tu Maquina Local 


Comando: git clone https://github.com/GerardAcosta/LDF_Nombre_Provisional.git

Descripción: Clonación del repositorio en tu maquina local


### Comando 2: Instalar node.js


#### Windows y MacOS:

- Ve a la página oficial de Node.js.
- Descarga el instalador correspondiente a tu sistema operativo (Windows y/o macOS).
- Ejecuta el instalador y sigue las instrucciones para completar la instalación.

Descripción: Instalación de node.js en windows y macOS

### Comando 3: Instalar Angular 18


#### Windows y MacOS:

Comando: npm install -g @angular/cli@18

Descripción: Instalación de Angular 18 en Windows, macOS y LINUX

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
- Extrae el contenido del arvhivo en una carpeta. La recomendada es 'C:\Program Files\MongoDB\Tools'
- Dentro de la subcarpeta 100( o numero de version correspondiente), encontraras bin, que contiene los ejecutables de las herramientas

#### 4.3 Implementación MoongoDB 

- Presionamos la tecla de Windows y seleccionamos 'Variables de entorno del sistema'
- Seleccionamos path
- Cambiamos la ruta por la siguiente: ' C:\Program Files\MongoDB\Tools\100\bin '
- Finalmente, entramos al CMD y ejecutamos el siguiente comando:
  - ' moongorestore --db applibros \tu_ruta\Enki\BackupsMongo\applibrosBackUp '

Descripción: Instalación y implementación de MongooseDB


### Prerrequisitos 📋

Lista de software y herramientas, incluyendo versiones, que necesitas para instalar y ejecutar este proyecto:

- Sistema Operativo (por ejemplo, Ubuntu 20.04, Windows 10)
- Lenguaje de programación (por ejemplo, Python 3.8)
- Framework (por ejemplo, Django 3.1)
- Base de datos (por ejemplo, PostgreSQL 12)
- Otros...

### Instalación 🔧

Una guía paso a paso sobre cómo configurar el entorno de desarrollo e instalar todas las dependencias.

```bash
# paso 1
```

Y así sucesivamente...

```bash
# paso 2
```

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

## Despliegue 📦

Instrucciones sobre cómo desplegar esto en un sistema en vivo o ambiente de producción.

## Construido Con 🛠️

Explica qué tecnologías usaste para construir este proyecto. Aquí algunos ejemplos:

- [Ruby](https://www.ruby-lang.org/es/) - El lenguaje utilizado
- [Ruby on Rails](https://rubyonrails.org) - El framework web utilizado
- [Ruby gems](https://rubygems.org) - Gestión de dependencias
- [Postgresql](https://www.postgresql.org) - Sistema de base de datos
- [Bulma IO](https://bulma.io) - Framework de CSS

## Contribuyendo 🖇️

Las contribuciones son lo que hacen a la comunidad de código abierto un lugar increíble para aprender, inspirar y crear. Cualquier contribución que hagas es muy apreciada. Por favor, lee el [CONTRIBUTING.md](https://gist.github.com/brayandiazc/xxxxxx) para detalles sobre nuestro código de conducta, y el proceso para enviarnos pull requests.

## Wiki 📖

Puedes encontrar mucho más sobre cómo usar este proyecto en nuestra [Wiki](https://github.com/your/project/wiki)

## Soporte

Si tienes algún problema o sugerencia, por favor abre un problema [aquí](https://github.com/your/project/issues).

## Roadmap

Ideas, mejoras planificadas y actualizaciones futuras

para el proyecto actual.

## Versionado 📌

Usamos [Git](https://git-scm.com) para el versionado. Para las versiones disponibles, ve las [etiquetas en este repositorio](https://github.com/your/project/tags).

## Autores ✒️

- **Brayan Diaz C** - _Trabajo inicial_ - [Brayan Diaz C](https://github.com/brayandiazc)

Mira también la lista de [contribuidores](https://github.com/your/project/contributors) que han participado en este proyecto.

## Licencia 📄

Este proyecto está bajo la Licencia XYZ - ve el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

Estamos agradecidos por las contribuciones de la comunidad a este proyecto. Si encontraste cualquier valor en este proyecto o quieres contribuir, aquí está lo que puedes hacer:

- Comparte este proyecto con otros
- Invítanos un café ☕
- Inicia un nuevo problema o contribuye con un PR
- Muestra tu agradecimiento diciendo gracias en un nuevo problema.

---

## Consejos Adicionales 📝

Aquí hay algunos consejos extra para aprovechar al máximo tu README:

- Mantén cada sección lo más concisa posible. Evita la pelusa innecesaria, ya que puede ser abrumadora para el lector.
- Asegúrate de que tus instrucciones de instalación, pruebas y despliegue sean detalladas y precisas. Si hay pasos adicionales que el lector necesita tomar (como instalar dependencias extra), asegúrate de incluirlos.
- Los visuales (imágenes, GIFs) son muy útiles para transmitir rápidamente lo que hace tu proyecto y cómo usarlo. Si puedes, incluye capturas de pantalla de tu aplicación en acción o GIFs que demuestren su uso.
- El tono amigable y acogedor que usas en tu README es excelente. Ayuda a hacer tu proyecto más acogedor para los colaboradores.
