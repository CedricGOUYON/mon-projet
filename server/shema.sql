CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO user (firstName, lastName, email, password)
VALUES ("Jean", "Dupont", "userTest1@gmail.com", "$argon2id$v=19$m=65536,t=3,p=4$...");

CREATE TABLE IF NOT EXISTS images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL
);
INSERT INTO images (name, url) VALUES
('Nature', 'https://example.com/nature.jpg'),
('Ville', 'https://example.com/ville.jpg'),
('Espace', 'https://example.com/espace.jpg');
