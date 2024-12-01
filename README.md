# Anyware-Software-Fullstack-Task

This Task implement Full stack app using Node.js With Express.js framework as a backeand service, and React.js.

- We Have implemented Web services (endpoints) that retrive data like announcement&dues in small school management sytem.

- We have Three Schemas
    - Auth => To store users like (student, instructor, admin)
    - Announcement => Retrieve Data that concerned for every instructor's created the announcement, and can control it but no one else can.
    - Due => Retrive Data for instructors only like assignments and quizes and most of logics same as Announcement.

Auth is the key part of the application that redirect us to our dashboard and can make out operations.

- We used Redux with react it is very powerful too for managing global state and avoid lift state up and props drilling.

# How to work with project in your localhost
    - Firt go to backend file and make your .env file and put these needed vars(PORT, URI, JWT\_SECRET\_KEY, JWT\_EXPIRATION\_TIME like that 1d one day by example it can be in m and h) run start commnads
    - Second Go to frontend file and write the install and run commands

### recommended at first make the request like postman in example

make post request to this url `http://localhost:4000/api/auth/signup` and add body request like this
{
    "name": "any wanted name",
    "username": "any wanted username",
    "password": "wanted password",
    "password\_confirmation": "same to password",
    "role": "admin"
}

this will create admin accout that let you add instrucotors when you go to the dashboard and instructor, admin can make announcements and dues.
