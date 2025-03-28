CREATE TABLE IF NOT EXISTS salary (
    salary_id SERIAL PRIMARY KEY,
    net_salary DECIMAL NOT NULL,
    gross_salary DECIMAL NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'Europe/Moscow')
);

CREATE TABLE IF NOT EXISTS people (
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    gender VARCHAR(10) NOT NULL,
    age INTEGER NOT NULL,
    salary_id INTEGER REFERENCES salary(salary_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'Europe/Moscow'),
    deleted_at TIMESTAMP WITH TIME ZONE
);