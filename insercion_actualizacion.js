const Sequelize = require('sequelize');

/*Pasamos por parametro el nombre de la base de datos, el usuario y la pass*/
const sequelize = new Sequelize('usuarios','root','1234',{
    host:'localhost', /*Ubicacion de la base de datos*/
    dialect :'mariadb' /*Tipo de base de datos*/
});


/*Realiza una autenticacion de conexion con la base de datos*/
sequelize.authenticate().then(() => {
    console.log('Conexion estableciada :)');
}).catch(err => {
    console.error('No se pudo conectar a la base de datos:',err);
});

/*Creamos la clase hija heredada de la Clase Padre, con su constructor*/
class Usuarios extends Sequelize.Model {}
Usuarios.init({
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    age: Sequelize.STRING,
    dni: Sequelize.STRING
},{ sequelize, modelName :'Users' });


/* Crea un usuario y lo inserta en la tabla 'Users' como registro.*/
sequelize.sync()
  .then(() => Usuarios.create({
    firstName: 'Jose',
    lastName: 'Ivorra',
    age: '26',
    dni: '12817672'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });

//actualiza registro
Usuarios.update({ lastName: "Arrovi" }, {
    where: {
      lastName: 'Ivorra'
    }
  }).then(() => {
    console.log("Done");
  });
