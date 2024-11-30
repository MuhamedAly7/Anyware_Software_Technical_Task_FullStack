# API Documentation

## Base URL
`{{BASE_URL}}/api`

---

## Authentication Endpoints

### **1. User Login**

- **URL**: `/auth/login`  
- **Method**: `POST`  
- **Description**: Authenticates a user and returns a JWT token upon successful login.  

#### **Request**
- **Headers**:  
  - `Content-Type: application/json`  

- **Body**:  
  - `username`: Required, must not be empty, between 3 and 50 characters long.  
  - `password`: Required, must not be empty, between 6 and 100 characters long.  

#### **Response**
- **Status**: 200 OK  
  - Success response with token and expiration time.  
- **Status**: 400 Bad Request  
  - Validation error messages for invalid or missing fields.  

---

### **2. User Signup**

- **URL**: `/auth/signup`  
- **Method**: `POST`  
- **Description**: Registers a new user and returns user data and a JWT token upon success.  

#### **Request**
- **Headers**:  
  - `Content-Type: application/json`  

- **Body**:  
  - `name`: Required, must not be empty, between 3 and 100 characters long.  
  - `username`: Required, must not be empty, between 3 and 50 characters long.  
  - `password`: Required, must not be empty, between 6 and 100 characters long.  
  - `password_confirmation`: Required, must match `password`.  
  - `role`: Optional, defaults to `"student"`. Accepted values are `"student"`, `"instructor"`, or `"admin"`.  

#### **Response**
- **Status**: 201 Created  
  - Success response with user data and token.  
- **Status**: 400 Bad Request  
  - Validation error messages for invalid or missing fields.  

---

### **Notes**
- Use `Bearer <JWT_TOKEN>` in the `Authorization` header for authenticated requests after login or signup.


# API Documentation

## Base URL
`{{BASE_URL}}/api`

---

## Announcements Endpoints

### **1. Get All Announcements**

- **URL**: `/announcements`  
- **Method**: `GET`  
- **Description**: Retrieves a list of all announcements.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

#### **Response**
- **Status**: 200 OK  
  - Success response with a list of announcements.  

---

### **2. Get Single Announcement by ID**

- **URL**: `/announcements/{id}`  
- **Method**: `GET`  
- **Description**: Retrieves a single announcement by its ID. If the announcement does not exist, it returns a 404 error.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

#### **Response**
- **Status**: 200 OK  
  - Success response with the announcement details.  
- **Status**: 404 Not Found  
  - Error response if the announcement with the given ID does not exist.  

---

### **3. Create New Announcement**

- **URL**: `/announcements`  
- **Method**: `POST`  
- **Description**: Creates a new announcement. Requires a valid role (`instructor` or `admin`). `student` role is not allowed to create announcements.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

- **Body**:  
  - `topic`: Required, between 3 and 100 characters.  
  - `description`: Required, between 10 and 500 characters.  

#### **Response**
- **Status**: 201 Created  
  - Success response with the created announcement data.  
- **Status**: 400 Bad Request  
  - Validation error messages if any fields are missing or invalid.  
- **Status**: 403 Forbidden  
  - Error if the user role is not authorized to create an announcement.  
- **Status**: 401 Unauthorized  
  - Error if the token has expired.  

---

### **4. Update Announcement by ID**

- **URL**: `/announcements/{id}/update`  
- **Method**: `PUT`  
- **Description**: Updates a specific announcement by ID. Requires authorization and validation of input data.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

- **Body**:  
  - `topic`: Optional, between 3 and 100 characters.  
  - `description`: Optional, between 10 and 500 characters.  

#### **Response**
- **Status**: 200 OK  
  - Success response with the updated announcement data.  
- **Status**: 400 Bad Request  
  - Validation error messages if any fields are invalid.  
- **Status**: 404 Not Found  
  - Error if the announcement with the given ID does not exist.  
- **Status**: 403 Forbidden  
  - Error if the user role is not authorized to update an announcement.  

---

### **5. Soft Delete Announcement by ID**

- **URL**: `/announcements/{id}/soft_delete`  
- **Method**: `DELETE`  
- **Description**: Soft deletes an announcement by ID. If the announcement does not exist or has already been deleted, returns a failure response.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

#### **Response**
- **Status**: 200 OK  
  - Success response indicating that the announcement was soft deleted.  
- **Status**: 404 Not Found  
  - Error if the announcement with the given ID does not exist.  

---

### **6. Recover Soft Deleted Announcement by ID**

- **URL**: `/announcements/{id}/recover`  
- **Method**: `PUT`  
- **Description**: Recovers a soft deleted announcement by ID.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

#### **Response**
- **Status**: 200 OK  
  - Success response indicating that the announcement was recovered.  
- **Status**: 404 Not Found  
  - Error if the announcement with the given ID does not exist.  

---

### **7. Hard Delete Announcement by ID**

- **URL**: `/announcements/{id}/delete`  
- **Method**: `DELETE`  
- **Description**: Permanently deletes an announcement by ID. Only accessible by users with the `admin` role.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

#### **Response**
- **Status**: 200 OK  
  - Success response indicating that the announcement was permanently deleted.  
- **Status**: 403 Forbidden  
  - Error if the user role is not `admin`.  
- **Status**: 404 Not Found  
  - Error if the announcement with the given ID does not exist.  

---

### **8. Get Soft Deleted Announcements**

- **URL**: `/announcements/get/deleted`  
- **Method**: `GET`  
- **Description**: Retrieves a list of all soft deleted announcements.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

#### **Response**
- **Status**: 200 OK  
  - Success response with a list of soft deleted announcements.  

---

### **Notes**
- Use `Bearer <JWT_TOKEN>` in the `Authorization` header for all requests.
- Only `instructor` and `admin` roles are allowed to create and update announcements.
- `student` users are restricted from creating and updating announcements.
- Ensure that your JWT token is valid to avoid authentication errors.


# API Documentation

## Base URL
`{{BASE_URL}}/api`

---

## Dues Endpoints

### **1. Get All Dues**

- **URL**: `/dues`  
- **Method**: `GET`  
- **Description**: Retrieves a list of all dues, including quizzes and assignments.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

#### **Response**
- **Status**: 200 OK  
  - Success response with a list of dues.  

---

### **2. Get Single Due by ID**

- **URL**: `/dues/{id}`  
- **Method**: `GET`  
- **Description**: Retrieves a single due (quiz or assignment) by its ID. If the due does not exist, it returns a 404 error.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

#### **Response**
- **Status**: 200 OK  
  - Success response with the due details.  
- **Status**: 404 Not Found  
  - Error response if the due with the given ID does not exist.  

---

### **3. Create New Due**

- **URL**: `/dues`  
- **Method**: `POST`  
- **Description**: Creates a new due (quiz or assignment). Only accessible by instructors.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

- **Body**:  
  - `dueType`: Required, value must be either `"assignment"` or `"quiz"`.  
  - `dueTitle`: Required, between 3 and 100 characters.  
  - `dueCourse`: Required, between 3 and 100 characters.  
  - `dueTopic`: Required, between 3 and 100 characters.  
  - `dueDate`: Required, must follow the format `DD MMM YYYY-HH:MMPM`.  

#### **Response**
- **Status**: 201 Created  
  - Success response with the created due data.  
- **Status**: 400 Bad Request  
  - Validation error messages if any fields are missing or invalid.  
- **Status**: 403 Forbidden  
  - Error if the user role is not `instructor`.  
- **Status**: 401 Unauthorized  
  - Error if the token has expired.  

---

### **4. Update Due by ID**

- **URL**: `/dues/{id}/update`  
- **Method**: `PUT`  
- **Description**: Updates a specific due by ID. Only the instructor responsible for the due can update it.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

- **Body**:  
  - `dueType`: Optional, value must be `"assignment"` or `"quiz"`.  
  - `dueTitle`: Optional, between 3 and 100 characters.  
  - `dueCourse`: Optional, between 3 and 100 characters.  
  - `dueTopic`: Optional, between 3 and 100 characters.  
  - `dueDate`: Optional, must follow the format `DD MMM YYYY-HH:MMPM`.  

#### **Response**
- **Status**: 200 OK  
  - Success response with the updated due data.  
- **Status**: 400 Bad Request  
  - Validation error messages if any fields are invalid.  
- **Status**: 404 Not Found  
  - Error if the due with the given ID does not exist.  
- **Status**: 403 Forbidden  
  - Error if the user role is not `instructor` or not the owner of the due.  

---

### **5. Soft Delete Due by ID**

- **URL**: `/dues/{id}/soft_delete`  
- **Method**: `DELETE`  
- **Description**: Soft deletes a due by ID. If the due does not exist or has already been deleted, returns a failure response.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

#### **Response**
- **Status**: 200 OK  
  - Success response indicating that the due was soft deleted.  
- **Status**: 404 Not Found  
  - Error if the due with the given ID does not exist.  

---

### **6. Recover Soft Deleted Due by ID**

- **URL**: `/dues/{id}/recover`  
- **Method**: `PUT`  
- **Description**: Recovers a soft deleted due by ID.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

#### **Response**
- **Status**: 200 OK  
  - Success response indicating that the due was recovered.  
- **Status**: 404 Not Found  
  - Error if the due with the given ID does not exist.  

---

### **7. Hard Delete Due by ID**

- **URL**: `/dues/{id}/delete`  
- **Method**: `DELETE`  
- **Description**: Permanently deletes a due by ID. Only accessible by users with the `admin` role.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

#### **Response**
- **Status**: 200 OK  
  - Success response indicating that the due was permanently deleted.  
- **Status**: 403 Forbidden  
  - Error if the user role is not `admin`.  
- **Status**: 404 Not Found  
  - Error if the due with the given ID does not exist.  

---

### **8. Get Soft Deleted Dues**

- **URL**: `/dues/get/deleted`  
- **Method**: `GET`  
- **Description**: Retrieves a list of all soft deleted dues.  

#### **Request**
- **Headers**:  
  - `Authorization: Bearer <JWT_TOKEN>`  

#### **Response**
- **Status**: 200 OK  
  - Success response with a list of soft deleted dues.  

---

### **Notes**
- Use `Bearer <JWT_TOKEN>` in the `Authorization` header for all requests.
- Only `instructor` and `admin` roles are allowed to create and update dues.
- `student` users are restricted from creating and updating dues.
- Ensure that your JWT token is valid to avoid authentication errors.
- Only the instructor responsible for a due can update or delete it.

