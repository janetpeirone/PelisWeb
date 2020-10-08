function saludar(nombre, edad) {
    console.log(`Hola, soy ${nombre}, y tengo ${edad} años`)
}

const persona = require('./yooo.js')

saludar(persona.nombre, persona.edad)