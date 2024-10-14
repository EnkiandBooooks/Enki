import imgbbUploader from 'imgbb-uploader'

imgbbUploader("55556ac50c98af75eff2ba47819e6c80", "../img/img_libros/hola2.png")
  .then((response) => console.log(response))
  .catch((error) => console.error(error));