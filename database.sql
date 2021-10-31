CREATE EXTENSION pgcrypto;

create table users
(
    id         serial                                                      not null
        constraint user_pkey
            primary key,
    email      varchar(255)                default NULL::character varying not null unique,
    password   text,
    created_at timestamp(0) with time zone default now()
);

create table todo_list
(
    id          serial       not null
        constraint todo_list_pkey
            primary key,
    name        varchar(255) not null,
    description varchar(255),
    done        bool                        default false,
    user_id     integer
        constraint todo_list_user_id_fk
            references users
            on update cascade on delete cascade,
    created_at  timestamp(0) with time zone default now()
);
