-- migrations/001-init-schema.sql
CREATE TABLE Users (
    ID SERIAL PRIMARY KEY,
    Username VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(50),
    deleted_at TIMESTAMP DEFAULT NULL,
    password_changed BOOLEAN DEFAULT FALSE 
);

CREATE TABLE Doctors (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    FirstName VARCHAR(255),
    Specialty VARCHAR(255),
    Contact VARCHAR(255),
    deleted_at TIMESTAMP DEFAULT NULL,
    UserID INT REFERENCES Users(ID)
);

-- Add other table creation statements here
