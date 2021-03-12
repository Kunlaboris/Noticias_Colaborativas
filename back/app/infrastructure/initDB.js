require('dotenv').config();

const getPool = require('./database');

async function main() {
  let connection;

  try {
    connection = await getPool();

    // Detenemos la asignación de claves foráneas.
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');

    // Eliminamos las tablas si existen.
    await connection.query(`DROP TABLE IF EXISTS categorias;`);
    await connection.query(`DROP TABLE IF EXISTS noticias;`);
    await connection.query(`DROP TABLE IF EXISTS usuarios;`);
    await connection.query(`DROP TABLE IF EXISTS valoraciones;`);
    await connection.query(`DROP TABLE IF EXISTS comentarios;`);
    await connection.query(`DROP TABLE IF EXISTS usuario_activacion;`);

    console.log('Tablas eliminadas.');

    // Creamos la tabla categorias.
    await connection.query(`
      CREATE TABLE categorias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nombre varchar(100) NOT NULL
      );
    `);

    // Creamos la tabla de usuarios.
    await connection.query(`
      CREATE TABLE usuarios (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(40) NOT NULL,
        apellido_1 varchar(60) NOT NULL,
        apellido_2 varchar(60) DEFAULT NULL,
        fecha_nacimiento date NOT NULL,
        foto varchar(150) DEFAULT NULL,
        biografia varchar(255)DEFAULT NULL,
        email varchar(60) NOT NULL,
        nickname varchar(30) NOT NULL,
        contrasena varchar(100) NOT NULL,
        rol varchar(20) NOT NULL DEFAULT "reader",
        fecha_creacion timestamp NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Creamos la tabla noticias.

    await connection.query(`
      CREATE TABLE noticias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        titulo VARCHAR(200) NOT NULL,
        foto VARCHAR(255) DEFAULT NULL,
        miniatura VARCHAR(255) DEFAULT NULL,
        entradilla VARCHAR(255) NOT NULL,
        texto VARCHAR(1000) NOT NULL,
        fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        id_usuario INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON DELETE CASCADE,
        id_categoria INT NOT NULL,
        FOREIGN KEY (id_categoria) REFERENCES categorias (id) ON DELETE CASCADE
      );
    `);

    // Creamos la tabla usuario_noticia.
    await connection.query(`
      CREATE TABLE valoraciones (
        id INT PRIMARY KEY AUTO_INCREMENT,
        valoraciones_positivas tinyint DEFAULT NULL,
        valoraciones_negativas tinyint DEFAULT NULL,
        fecha_valoracion timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        id_noticia int NOT NULL,
        FOREIGN KEY (id_noticia) REFERENCES noticias (id) ON DELETE CASCADE,
        id_usuario int NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON DELETE CASCADE
      );
    `);

    await connection.query(`
        CREATE TABLE comentarios (
          id INT PRIMARY KEY AUTO_INCREMENT,
          comentario varchar(250) DEFAULT NULL,
          fecha_comentario timestamp NULL DEFAULT CURRENT_TIMESTAMP,
          id_noticia int NOT NULL,
          FOREIGN KEY (id_noticia) REFERENCES noticias (id) ON DELETE CASCADE,
          id_usuario int NOT NULL,
          FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON DELETE CASCADE
        )
    `);

    await connection.query(`
    create table usuario_activacion (
      id int unsigned auto_increment not null primary key,
      user_id int not null, 
      verification_code char(64) not null, 
      created_at datetime not null,
      verified_at datetime default null
    );
    `);

    // Activamos la asignación de claves foráneas.
    await connection.query('SET FOREIGN_KEY_CHECKS = 1;');

    console.log('Tablas creadas.');

    // Insertamos usuarios de prueba.
    await connection.query(`
      INSERT INTO usuarios (nombre, apellido_1, apellido_2, fecha_nacimiento, email, nickname, contrasena, rol)
      VALUES("noticias", "colaborativas", "", current_timestamp(), "kunlaboris@gmail.com", "kunlaboris", "$2a$12$pn8i2VYlhmeWsco91rfwL.MckeUtc1Qrqzv5nDnloEagpv6k/61iG", "admin");`);

    await connection.query(`
      INSERT INTO usuarios (nombre, apellido_1, apellido_2, fecha_nacimiento, email, nickname, contrasena)
      VALUES("monica", "papp", "paz", current_timestamp(), "monik@yoomail.com", "monik", "$2a$12$pn8i2VYlhmeWsco91rfwL.MckeUtc1Qrqzv5nDnloEagpv6k/61iG");`);

    await connection.query(`
      INSERT INTO usuarios (nombre, apellido_1, apellido_2, fecha_nacimiento, email, nickname, contrasena)
      VALUES("marte", "perez", "gomez", current_timestamp(), "marta@yoomail.com", "marta", "$2a$12$pn8i2VYlhmeWsco91rfwL.MckeUtc1Qrqzv5nDnloEagpv6k/61iG");`);

    await connection.query(`
      INSERT INTO usuarios (nombre, apellido_1, fecha_nacimiento, email, nickname, contrasena)
      VALUES("anna", "vaduva", current_timestamp(), "vaduva@yoomail.com", "vaduva", "$2a$12$pn8i2VYlhmeWsco91rfwL.MckeUtc1Qrqzv5nDnloEagpv6k/61iG");`);

    await connection.query(`
      INSERT INTO usuarios (nombre, apellido_1, apellido_2, fecha_nacimiento, email, nickname, contrasena)
      VALUES("armando", "numa", "medina", current_timestamp(), "numa@yoomail.com", "numa", "$2a$12$pn8i2VYlhmeWsco91rfwL.MckeUtc1Qrqzv5nDnloEagpv6k/61iG");`);

    await connection.query(`
      INSERT INTO usuarios (nombre, apellido_1, apellido_2, fecha_nacimiento, email, nickname, contrasena)
      VALUES("david", "silva", "torres", current_timestamp(), "davidte@yoomail.com", "davidte", "$2a$12$pn8i2VYlhmeWsco91rfwL.MckeUtc1Qrqzv5nDnloEagpv6k/61iG");`);

    await connection.query(`
      INSERT INTO usuarios (nombre, apellido_1, apellido_2, fecha_nacimiento, email, nickname, contrasena)
      VALUES("marco", "perez", "gonzalez", current_timestamp(), "mppg@yoomail.com", "mppg", "$2a$12$pn8i2VYlhmeWsco91rfwL.MckeUtc1Qrqzv5nDnloEagpv6k/61iG");`);

    await connection.query(`
      INSERT INTO usuarios (nombre, apellido_1, apellido_2, fecha_nacimiento, email, nickname, contrasena)
      VALUES("sandra", "velasquez", "izaguirre", current_timestamp(), "sandrita@yoomail.com", "sandrita", "$2a$12$pn8i2VYlhmeWsco91rfwL.MckeUtc1Qrqzv5nDnloEagpv6k/61iG");`);

    // Insertamos categorías de prueba.
    await connection.query(`INSERT INTO categorias (nombre) VALUES("economía");`);
    await connection.query(`INSERT INTO categorias (nombre) VALUES("educación");`);
    await connection.query(`INSERT INTO categorias (nombre) VALUES("ciencia");`);
    await connection.query(`INSERT INTO categorias (nombre) VALUES("tecnología");`);
    await connection.query(`INSERT INTO categorias (nombre) VALUES("cultura");`);
    await connection.query(`INSERT INTO categorias (nombre) VALUES("deportes");`);

    // Insertamos noticias de prueba.
    await connection.query(`INSERT INTO noticias (titulo, id_categoria, entradilla, texto, id_usuario)
      VALUES ("Descubre los mejores remedios caseros para el dolor de muelas", 5, "Un dolor intenso, de difícil control, palpitante… ¿Te suena? Sí, es el conocido comúnmente como dolor de muelas. Esa molestia que muchas veces aparece de manera incipiente sin preaviso y que no sabemos ni cómo gestionar ni cómo hacer desaparecer.", "Un dolor de muelas puede resultar muy intenso, deberse a múltiples causas que no son fáciles de diagnosticar e incluso en algunos casos desembocar en un cuadro grave, por lo que requiere una visita inaplazable al dentista. Cuando surge de pronto, y no es posible acudir enseguida al odontólogo, es aconsejable conocer unas medidas básicas sobre lo que conviene pero también lo que no conviene hacer en estos casos.", 3);`);

    await connection.query(`INSERT INTO noticias (titulo, id_categoria, entradilla, texto, id_usuario)
      VALUES ("Mi educación", 2, "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet es veridictum", 5);`);

    await connection.query(`INSERT INTO noticias (titulo, id_categoria, entradilla, texto, id_usuario)
      VALUES ("Las 10 series de Netflix con mejores críticas según la web IMDB", 4, "Hay que olvidar a aquellas series que han convertido a Netflix en lo que es ahora. Con la cantidad de series que estrena cada semana, es muy difícil de estar al día con su catálogo.", "2020 ha sido un año muy complicado por la pandemia del coronavirus. Aunque muchísimas empresas de todo el mundo se han visto obligadas a cerrar sus puertas, otras como Netflix se han visto beneficiadas por el confinamiento. Las horas en casa durante dos meses hicieron que la plataforma sumara miles de nuevos usuarios, y los datos de audiencia de las series más vistas de Netflix en 2020 son espectaculares.", 1);`);

    await connection.query(`INSERT INTO noticias (titulo, id_categoria, entradilla, texto, id_usuario)
      VALUES ("Ocho apps de realidad aumentada para poder jugar con nuestro móvil o tablet", 4, "A la hora de mantener a los niños entretenidos, y puede que nos hayamos podido quedar sin ideas en algún momento tras agotar juegos,libros y otros recursos anteriores. Pero quizás no hayamos sacado partido a las apps.", "La Realidad Aumentada es algo que lleva existiendo muchos años, pero ha sido con la llegada de ARCore cuando realmente los dispositivos Android han empezado a sacarle tanto partido como los usuarios de iOS con el ARKit de Apple. En este sentido, juegos como Pokémon GO o Angry Birds AR: Isle of Pigs han contribuido a despertar un gran interés por ella hasta tal punto que en Google Play podemos encontrar actualmente cientos de aplicaciones que aprovechan sus posibilidades.", 6);`);

    await connection.query(`INSERT INTO noticias (titulo, id_categoria, entradilla, texto, id_usuario)
      VALUES ("Inteligencia artificial y neurociencia, las nuevas fronteras del cerebro", 3, "Cada vez más a escenarios propios de los grandes clásicos de la ciencia ficción. ¿Estamos preparados para un mundo en el que la ciencia y la tecnología pueda modificar la voluntad humana?", "Los avances en inteligencia  artificial, robótica y neurociencia nos acercan cada vez más a escenarios propios de los grandes clásicos de la ciencia ficción. Para entender mejor dónde están los límites actualmente hablamos con el neurobiólogo Rafael Yuste, responsable del proyecto BRAIN, sobre lo que sabemos de nuestro cerebro a día de hoy. ¿Estamos preparados para un mundo en el que la ciencia y la tecnología pueda modificar la voluntad humana?.", 2);`);

    await connection.query(`INSERT INTO noticias (titulo, id_categoria, entradilla, texto, id_usuario)
      VALUES ("Leyendas del deporte", 6, "Dedicado su vida a desafiar a la naturaleza y llevar hasta el límite sus habilidades físicas, y muchos de ellos han marcado hitos históricos que nos dejan han dejado completamente impresionados con su talento.", "Tony Hawk is without a doubt one of the greatest skateboarding legends. He has been the only skateboarder in history to get sponsors at the young age of 12, become a professional at 14 and become thebest skateboarder in the world at 16. Originally from San Diego, California, Hawk led a career of more than 17 years, in which he won more than 70 skateboarding competitions, and obtained a gold medal at the X Games in 1995 and 1997. In addition, he was crowned world champion of skateboardingin modality vertical by 12 consecutive years.", 5);`);

    await connection.query(`INSERT INTO noticias (titulo, id_categoria, entradilla, texto, id_usuario)
      VALUES ("Más allá del Universo", 2, "Para salir de este sueño febril que es la vida en la Tierra. Pero, ¿qué nos esperaría ahí arriba, en la Cosmológica?¿Es acaso una frontera, o un tipo de techo?", "No hay ningún borde en el universo, por lo que sabemos. Hay un borde en el universo observable: solo podemos ver hasta cierto punto. Esto se debe a que la luz viaja a una velocidad finita (un año luz por año), por lo que al mirar cosas distantes también estamos mirando hacia atrás en el tiempo. Con el tiempo vemos lo estaba sucediendo hace casi14000 millones de años, la radiación remanente del Big Bang. Ese es el fondo de microondas cósmico, que nos rodea por todos lados. Pero en realidad no es un “borde” físico en ningún sentido.", 4);`);

    await connection.query(`INSERT INTO noticias (titulo, id_categoria, entradilla, texto, id_usuario)
      VALUES ("La educación política en la antigüedad clásica griega", 1, "Ser hombre era ser ciudadano. Esto implicaba a su vez la necesidad e importancia determinante de una formación orientada en dos dimensiones: participación ciudadana.","Los principales filósofos políticos de entonces han tratado profunda y muy acertadamente este asunto; tanto es así, que muchos especialistas contemporáneos afirman con pesimismo: «hoy día la única novedad son los clásicos», también porque abordaron temas de gran actualidad para hoy avant la lettre. Incluso un apretado resumen, como se ofrece en este artículo, acerca del modo que abordaron esta educación política los principales autores griegos de ese período, puede ayudar a exhumar interesantes ideas que son como un rico filón de inspiración para programas hodiernos de formación política inspirados en los clásicos.", 3);`);

    //Insertamos comentarios de prueba.
    await connection.query(`INSERT INTO comentarios (comentario, fecha_comentario, id_noticia, id_usuario)
      VALUES ("Texto comentario noticia 1 y usuario 1", current_timestamp(), 1, 1);`);
    await connection.query(`INSERT INTO comentarios (comentario, fecha_comentario, id_noticia, id_usuario)
      VALUES ("Texto comentario noticia 2 y usuario 1", current_timestamp(), 2, 1);`);
    await connection.query(`INSERT INTO comentarios (comentario, fecha_comentario, id_noticia, id_usuario)
      VALUES ("Texto comentario noticia 3 y usuario 1", current_timestamp(), 3, 1);`);
    await connection.query(`INSERT INTO comentarios (comentario, fecha_comentario, id_noticia, id_usuario)
      VALUES ("Texto comentario noticia 1 y usuario 2", current_timestamp(), 1, 2);`);
    await connection.query(`INSERT INTO comentarios (comentario, fecha_comentario, id_noticia, id_usuario)
      VALUES ("Texto comentario noticia 2 y usuario 2", current_timestamp(), 2, 2);`);
    await connection.query(`INSERT INTO comentarios (comentario, fecha_comentario, id_noticia, id_usuario)
      VALUES ("Texto comentario noticia 3 y usuario 2", current_timestamp(), 3, 2);`);

    //Insertamos valoraciones de prueba

    await connection.query(`
      INSERT INTO valoraciones (valoraciones_positivas, valoraciones_negativas, fecha_valoracion, id_usuario, id_noticia)
      VALUES(1,0,current_timestamp(), 1, 1)
    `);
    await connection.query(`
      INSERT INTO valoraciones (valoraciones_positivas, valoraciones_negativas, fecha_valoracion, id_usuario, id_noticia)
      VALUES(1,0,current_timestamp(), 2, 1)
    `);
    await connection.query(`
      INSERT INTO valoraciones (valoraciones_positivas, valoraciones_negativas, fecha_valoracion, id_usuario, id_noticia)
      VALUES(0,1,current_timestamp(), 2, 3)
    `);

    console.log('Datos de prueba insertados correctamente. ¡Fin del programa!');
    process.exit();
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) connection.release();
  }
}

main();
