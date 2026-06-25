Create table users(
id Serial primary key,
email varchar(255) unique not null,
password_hash text not null,
first_name varchar(255),
last_name varchar(255),
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp
);

create table roles(
id serial primary key,
name varchar(250) unique not null,
description text,
created_at timestamp default current_timestamp
);

create table permissions(
id serial primary key,
name varchar(250) unique not null,
description text,
created_at timestamp default current_timestamp
);

create table user_roles(
user_id integer references users(id) on delete cascade,
role_id integer references roles(id) on delete cascade,

primary key (user_id, role_id)
);

create table role_permissions(
role_id integer references roles(id) on delete cascade,
permission_id integer references permissions(id) on delete cascade,

primary key (role_id, permission_id)
);