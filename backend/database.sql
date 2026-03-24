CREATE DATABASE weather_app;

USE weather_app;

CREATE TABLE weather_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(255),
    temperature FLOAT,
    humidity INT,
    pressure INT,
    wind_speed FLOAT,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);