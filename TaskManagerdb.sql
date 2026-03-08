CREATE DATABASE taskmanager;
USE taskmanager;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);

CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200),
    usuario VARCHAR(100),
    estado VARCHAR(50)
);

select * from usuarios;
INSERT INTO usuarios (nombre,email,password)
VALUES ('Admin','admin@gmail.com','1234');

SELECT * FROM usuarios 
WHERE email = 'prueba@gmail.com' 
AND password = '1234';

ALTER TABLE usuarios
ADD COLUMN rol VARCHAR(20) DEFAULT 'usuario';

UPDATE usuarios
SET rol = 'admin'
WHERE email = 'admin@gmail.com';

select * from tareas;