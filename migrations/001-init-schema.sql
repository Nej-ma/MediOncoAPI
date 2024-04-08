-- migrations/001-init-schema.sql

-- Users Table
CREATE TABLE Users (
    ID SERIAL PRIMARY KEY,
    Username VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(50),
    deleted_at TIMESTAMP DEFAULT NULL,
    password_changed BOOLEAN DEFAULT FALSE 
);

-- Patients Table
CREATE TABLE Patients (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    FirstName VARCHAR(255),
    DateOfBirth DATE,
    Gender VARCHAR(50),
    Address TEXT,
    SocialSecurityNumber VARCHAR(255) UNIQUE,
    MedicalHistory TEXT,
    deleted_at TIMESTAMP DEFAULT NULL,
    DoctorID INT REFERENCES Doctors(ID)
);

-- Doctors Table
CREATE TABLE Doctors (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    FirstName VARCHAR(255),
    Specialty VARCHAR(255),
    Contact VARCHAR(255),
    deleted_at TIMESTAMP DEFAULT NULL,
    UserID INT REFERENCES Users(ID)
);

-- Medical Records Table
CREATE TABLE MedicalRecords (
    ID SERIAL PRIMARY KEY,
    PatientID INT REFERENCES Patients(ID),
    VisitHistory TEXT,
    MedicalNotes TEXT,
    Allergies TEXT,
    PreexistingConditions TEXT,
    deleted_at TIMESTAMP DEFAULT NULL
);

-- Treatments Table
CREATE TABLE Treatments (
    ID SERIAL PRIMARY KEY,
    RecordID INT REFERENCES MedicalRecords(ID),
    Description TEXT,
    StartDate DATE,
    EndDate DATE,
    Dosage TEXT,
    PatientID INT REFERENCES Patients(ID),
    deleted_at TIMESTAMP DEFAULT NULL
);

-- Prescriptions Table
CREATE TABLE Prescriptions (
    ID SERIAL PRIMARY KEY,
    TreatmentID INT REFERENCES Treatments(ID),
    Medication VARCHAR(255),
    Dosage VARCHAR(255),
    Frequency VARCHAR(255),
    deleted_at TIMESTAMP DEFAULT NULL
);

-- Medical Exams Table
CREATE TABLE MedicalExams (
    ID SERIAL PRIMARY KEY,
    Type VARCHAR(255),
    Date DATE,
    Results TEXT,
    DoctorNotes TEXT,
    DoctorID INT REFERENCES Doctors(ID),
    PatientID INT REFERENCES Patients(ID),
    deleted_at TIMESTAMP DEFAULT NULL
);

-- Appointments Table
CREATE TABLE Appointments (
    ID SERIAL PRIMARY KEY,
    PatientID INT REFERENCES Patients(ID),
    DoctorID INT REFERENCES Doctors(ID),
    Date DATE,
    Time TIME,
    Purpose TEXT,
    deleted_at TIMESTAMP DEFAULT NULL
);

-- Message Threads Table
CREATE TABLE MessageThreads (
    ID SERIAL PRIMARY KEY,
    Participant1 INT REFERENCES Users(ID),
    Participant2 INT REFERENCES Users(ID),
    deleted_at TIMESTAMP DEFAULT NULL
);

-- Messages Table
CREATE TABLE Messages (
    ID SERIAL PRIMARY KEY,
    ThreadID INT REFERENCES MessageThreads(ID),
    SenderID INT REFERENCES Users(ID),
    Content TEXT,
    SendDate TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

-- Documents Table
CREATE TABLE Documents (
    ID SERIAL PRIMARY KEY,
    PatientID INT REFERENCES Patients(ID),
    Type VARCHAR(255),
    Date DATE,
    Content TEXT,
    deleted_at TIMESTAMP DEFAULT NULL
);