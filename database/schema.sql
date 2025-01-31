drop table if exists tasks;
drop table if exists users;

create table users (
    user_id uuid default uuid_generate_v4() primary key,
    username varchar(255) not null,
    password varchar(255) not null
);

create table tasks (
    task_id uuid default uuid_generate_v4() primary key,
    user_id uuid not null references users(user_id),
    title varchar(255) not null,
    description text not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    due_at timestamp not null,
    status varchar(10) not null default 'pending' check (status in ('pending', 'completed'))
);

create index task_user_id on tasks(user_id);
