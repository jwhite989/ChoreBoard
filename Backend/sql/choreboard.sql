-- Create the database
CREATE DATABASE IF NOT EXISTS choreboard;

USE choreboard;

-- Create the Users table
CREATE TABLE IF NOT EXISTS Users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'PARENT', 'CHILD') NOT NULL,
    email VARCHAR(100),
    points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Chores table
CREATE TABLE IF NOT EXISTS Chores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    points INT DEFAULT 0,
    assigned_to BIGINT,
    status VARCHAR(50) DEFAULT 'PENDING',
    due_date VARCHAR(255),
    completed_date DATE,
    FOREIGN KEY (assigned_to) REFERENCES Users(id)
);

-- Create the Rewards table
CREATE TABLE IF NOT EXISTS Rewards (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    points_required INT NOT NULL,
    points INT DEFAULT 0
);

-- Create the Redemptions table
CREATE TABLE IF NOT EXISTS Redemptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    reward_id BIGINT,
    redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (reward_id) REFERENCES Rewards(id)
);