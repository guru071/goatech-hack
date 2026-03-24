
CREATE TABLE IF NOT EXISTS student (
    enroll INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    student_gender VARCHAR(255) NOT NULL CHECK (student_gender IN ('male', 'female', 'other')),
    student_contact INTEGER NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    student_address VARCHAR(255) NOT NULL,
    student_department VARCHAR(255) NOT NULL CHECK (
        student_department IN (
            'computer science',
            'electronics',
            'mechanical',
            'civil',
            'electrical'
        )
    ),
    student_semester VARCHAR(255) NOT NULL,
    student_section VARCHAR(255) NOT NULL,
    student_dob DATE NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    parent_contact INTEGER NOT NULL,
    parent_email VARCHAR(255) NOT NULL,
    is_gover_manage VARCHAR(255) NOT NULL CHECK (is_gover_manage IN ('govenment', 'management'))
);
INSERT INTO student (name, age, student_gender, student_contact, student_email, student_address, student_department, student_semester, student_section, student_dob, parent_name, parent_contact, parent_email, is_gover_manage) VALUES
('John Doe', 20, 'male', 1234567890, 'john.doe@example.com', '123 Main St', 'computer science', 'spring', 'A', '2003-05-15', 'Jane Doe', 0987654321, 'jane.doe@example.com', 'govenment');  