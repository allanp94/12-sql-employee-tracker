INSERT INTO department ( name)
VALUES 
('Fabrication'),
('Production'),
('Sales'), 
('Engineering'),
('Marketing'), 
('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
('Assembly', 40.300, 2),
('Enginner', 80.640, 4), 
('Test Enginer', 75.000, 1), 
('Sales Lead', 100.300, 3),
('Manager', 65.900, 2),
('Fabricator', 45.500, 1); 


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Allan', 'Pirillis', 1, 4),
('Tony', 'Gomez', 1, 4),
('Sam', 'Mathews', 2, null),
('Shane', 'Bock', 5, 5),
('Kent', 'Rearer', 5, null),
('Sonny', 'Greatr', 1, 4);
