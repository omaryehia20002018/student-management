# Student Management

### Introduction

Student management API, is an open source api, Helping the Administration registering student to database, And easy to manage.

## Getting started

#### to get the Node server running :

- Clone this **repo**

- `npm install` to install all required dependencies

- You can either work with the mongoDB Atlas database or use your locally installed MongoDB. Do configure to your choice in the `./app/config/db.js` file.

- Create an `.env` file in your project root `(Not inside "./app" folder) folder and add your variables.

> [!IMPORTANT]  
> If you use **nodemon** run `npm run dev`, if you done run `npm start`

### Project Support Features

- Public (non-authenticated) users can access all causes on the platform **(It can be changed in the future)**
- Users can access all the students data as well as create a new student, edit them and also delete them.
- **authentication** and **authorization** will be added in the next version

### Student Schema

```javascript
  {
   studentName: {
      type: String,
      required: true,
      unique: true,
      minlength: 3
    },

    birthDate: {
      type: Date,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    academicYear: {
      type: String,
      required: true,
      enum: [
          'first year secondary',
          'second year secondary',
          'third year secondary',
        ]

    },

    teachingRoomNumber: {
      type: String,
      required: true
    },

    modulePoints: {
      total: Number,
      modules: {
        Math: {type: Number, default: 0},
        physycs: {type: Number, default: 0},
        science: {type: Number, default: 0},
        historyAndGeography: {type: Number, default: 0},
        law: {type: Number, default: 0},
        arabic: {type: Number, default: 0},
        french: {type: Number, default: 0},
        english: {type: Number, default: 0},
        sport: {type: Number, default: 0},
      },
    },
  };
```

#### Output example :

```JSON
 "status": "Success",
    "results": 1,
    "data": [
        {
            "modulePoints": {
                "modules": {
                    "Math": 20,
                    "physycs": 19,
                    "science": 19.5,
                    "historyAndGeography": 15,
                    "law": 13.25,
                    "arabic": 10,
                    "french": 14.5,
                    "english": 12.25,
                    "sport": 14
                },
                "total": 13.45
            },
            "_id": "64d23cb8eebdecdeadc19c8f",
            "studentName": "nadia lama",
            "birthDate": "2001-03-21T00:00:00.000Z",
            "email": "nadia@gemail.com",
            "academicYear": "first year secondary",
            "teachingRoomNumber": "A02",
            "createdAt": "2023-08-08T13:01:44.094Z",
            "updatedAt": "2023-08-08T13:01:44.094Z",
            "__v": 0,
            "age": 22,
            "id": "64d23cb8eebdecdeadc19c8f"
        },
        ]
```

> [!IMPORTANT]  
> For **total propertie** You need to use a real `Calculation formula` , Go to `./app/model/studentModel.js` and edit the `Document middleware` for you owne formula .

### API Endpoints

| HTTP Request | Endpoints                       | Action                                   | Success Status Code | Error Status Code |
| ------------ | ------------------------------- | ---------------------------------------- | ------------------- | ----------------- |
| GET          | /api/v1/student                 | To retrieve all students on the platform | 200                 | 404               |
| GET          | /api/v1/student/:id             | To retrieve details of a single student  | 200                 | 400, 404          |
| GET          | /api/v1/student/birthYear/:year | To filter students by their birth year   | 200                 | 400               |
| POST         | /api/v1/student                 | To create a student on the platform      | 201                 | 400               |
| PATCH        | /api/v1/student/:id             | To edit the details of a single student  | 200                 | 400, 404          |
| DELETE       | /api/v1/student/:id             | To delete a single student               | 204                 | 400, 404          |

---

---

# Queryes

### Filtering :

- **Example** :
  > **/api/v1/student`?academicYear=third-year-secondary`**
  ***

### Sorting :

- **Example** :

  > **/api/v1/student`?sort=-birthDate`**

  > **/api/v1/student?academicYear=third-year-secondary&`sort=birthDate`**

  ***

### Limits :

- Limiting document fields.

- **Example** :

  > **/api/v1/student?`fields=studentName,email`**

  > **/api/v1/student?academicYear=third-year-secondary&sort=-birthDate&`fields=studentName,email`**

  ***

### Pagination :

- **Example** :

  > **/api/v1/student`?limit=3&page=2`**

- returnes **page** 2, with _three_ **documents**
- _Change the values for your needs_

### Note :

- **default** :

  - page = 1
  - limit = 20

  ***

> [!Note]  
> `age propertie` it's a **_virtual propertie_** can not be used in **queryes**

---

### Authors

**omar yehia**

### contact

- **email** : omaryehiaabdelfattah2000@gmail.com
