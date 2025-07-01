-- Asegurar que el usuario root@localhost tenga la contraseña correcta
SET PASSWORD FOR 'root'@'localhost' = 'sebastian';

-- Crear el usuario root@% si no existe
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY 'sebastian';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

-- Aplicar cambios
FLUSH PRIVILEGES;