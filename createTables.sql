create table users
(
    id      int primary key auto_increment not null,
    name varchar(200),
    address varchar(200),
    email   varchar(200),
    number  varchar(200)
);

create table activities
(
    id       int primary key auto_increment not null,
    user   int                            not null,
    FOREIGN KEY (user) REFERENCES users (id),
    activity varchar(200)
);

