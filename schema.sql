DROP DATABASE IF EXISTS homeworkdb;

CREATE DATABASE homeworkdb;

USE homeworkdb;

CREATE TABLE department(
id int primary key AUTO_INCREMENT,
department VARCHAR(50) not null);

create table role(
id int primary key AUTO_INCREMENT,
title varchar(30) not null,
salary decimal(15,2),
department_id INT,
FOREIGN KEY (department_id) REFERENCES department(id)
);



create table employee(
id int primary key AUTO_INCREMENT,
first_name VARCHAR(50),
last_name VARCHAR(100),
role_id INT,
manager_id INT,
FOREIGN KEY (role_id) REFERENCES role(id));
-- FOREIGN KEY (manager_id) REFERENCES manager(id));
select * from employee;
UPDATE employee SET role_id = 3 WHERE id = 7;