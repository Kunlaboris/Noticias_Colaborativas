Todas las contraseñas son iguales que la del admin

## Aplicación

- **GET** - [/news] - Obtener el listado de las noticias. ✅
- **GET** - [/comments] - Obtener el listado de los comentarios.✅
- **GET** - [/news/:idNew] - Obtener la información de una noticia en concreto. ✅
- **GET** - [/news/:idNew/comments] - Obtener los comentarios de una noticia especifica.✅
- **GET** - [/news/category/:idUser] - Obtener la lista de las categorias. ✅ **CON TOKEN**

- **POST** - [/news] - Insertar una nueva noticia.✅
- **POST** - [/news/:idNew/comment] - Comentar una noticia.✅
- **POST** - [/news/:idNew/votes] - Valorar una noticia.✅ **CON TOKEN**

- **PUT/PATCH** - [/news/:idNew] - Editar una noticia.✅ **CON TOKEN**
- **PUT/PATCH** - [/news/:idNew/comments/:idComment] - Editar un comentario. ✅ **CON TOKEN**

- **PUT/PATCH** - [/news/:idNew/votes/:idRating] - Editar una valoración.✅ **CON TOKEN**

- **DELETE** - [/news/:idNew] - Eliminar una noticia. ✅ **CON TOKEN**
- **DELETE** - [/news/:idNew/photos/:idPhoto] - Eliminar una foto asignada a una noticia. ✅ **CON TOKEN**
- **DELETE** - [/news/:idNew/comments/:idComment] - Eliminar un comentario. ✅ **CON TOKEN**

## Users

- **GET** - [/users/validate/:regCode] - Valida un usuario. ✅
- **GET** - [/users/:idUser] - Obtener info de usuario. ✅ **CON TOKEN**

- **POST** - [/users] - Crea un usuario pendiente de activar. ✅
- **POST** - [/users/:idNew] - Login de usuario. ✅
- **POST** - [/users/recovery] - Recuperar contraseña de usuario. ✅
- **POST** - [/users/reset] - Insertar nueva contraseña de usuario tras recuperación. ✅

- **PUT** - [/users/:idUser] - Editar datos de usuario. ✅ **CON TOKEN**
- **PUT** - [/users/:idUser/password] - Editar contraseña. ✅ **CON TOKEN**

- **DELETE** - [/users/:idUser] - Desactivar usuario. ✅ **CON TOKEN**
