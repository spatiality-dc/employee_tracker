-- Database schema, drop if already created
DROP DATABASE IF EXISTS employee_DB;

-- Create database
CREATE DATABASE employee_DB;
USE employee_DB;

-- Create a new table called "department" with auto-increment primary key (ID) 
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- Create a new table called "role" with auto-increment primary key (ID)
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id)
);

-- Create a new table called "employee" with auto-increment primary key (ID)
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);