CREATE DATABASE IF NOT EXISTS clickfit;
USE clickfit;

CREATE TABLE IF NOT EXISTS users (
  userId INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'member',
  active TINYINT(1) NOT NULL DEFAULT 1
);

DELIMITER $$
CREATE PROCEDURE addUser(
  IN p_email VARCHAR(255),
  IN p_password VARCHAR(255),
  IN p_type VARCHAR(50),
  IN p_active TINYINT
)
BEGIN
  INSERT INTO users (email, password, type, active)
  VALUES (p_email, p_password, p_type, p_active);
END$$
DELIMITER ;

CALL addUser('demo@clickfit.com', 'hashed_password_here', 'admin', 1);
