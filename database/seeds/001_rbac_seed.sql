INSERT INTO roles(name, description)
VALUES
('OWNER', 'Owns the tenant'),
('ADMIN', 'Administrator'),
('MANAGER', 'Business manager'),
('USER', 'Regular user')

INSERT INTO permissions (name, description)
VALUES 
('USERS_CREATE', 'Create users')
('USERS_UPDATE', 'Update users')
('USERS_DELETE', 'Delete  users')

('ROLES_ASSIGN', 'Assign roles')

('BILLING_VIEW', 'View billing')
('BILLING_UPDATE', 'Update billing')

('REPORTS_VIEW', 'View reports')

('TENANT_UPDATE', 'Update tenant')

INSERT INTO role_permissions (role_id, permission_id)
SELECT
(
    SELECT id
    FROM roles
    WHERE name = 'OWNER'
),
id
FROM permissions