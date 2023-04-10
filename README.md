# Locar

<p align="center">

![NodeJs](https://img.shields.io/badge/Node.js-16.18.0-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![ExpressJs](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![AmazonEC2](https://img.shields.io/badge/Amazon_EC2-232F3E?style=for-the-badge&logo=amazon-ec2&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=jest&logoColor=white)
![Eslint](https://img.shields.io/badge/eslint-4b32c3?style=for-the-badge&logo=eslint&logoColor=white)
![Postman](https://img.shields.io/badge/postman-ff6c37?style=for-the-badge&logo=postman&logoColor=white)

</p>

## Content

<!--ts-->

- [Project Description](#project-description)
- [Prerequisite](#Prerequisite)
- [How to run the application](#How-to-run-the-application)
  - [Cloning the repository](#cloning-the-repository)
  - [Install dependencies](#install-dependencies)
  - [Build project](#build-project)
  - [Start the application](#start-the-application)
  - [Start on dev mode](#start-on-dev-mode)
- [API Documentation](#api-documentation)
  - [Full route](#full-route)
  - [User](#user)
    - [Create User](#create-user)
    - [Get User By Id](#get-user-by-id)
    - [List all users](#list-all-users)
    - [Update user](#update-user)
    - [Delete user](#delete-user)
  - [Authenticate](#authenticate)
  - [Car](#car)
    - [Create Car](#create-car)
    - [Get Car By Id](#get-car-by-id)
    - [List all cars](#list-all-cars)
    - [Update car](#update-car)
    - [Delete Car](#delete-car)
    - [Upsert and delete Accessory](#upsert-and-delete-acessorry)
  - [Reserve](#reserve)
    - [Create Reserve](#create-reserve)
    - [Get Reserve By Id](#get-reserve-by-id)
    - [List all reserves](#list-all-reserves)
    - [Update reserve](#update-reserve)
    - [Delete reserve](#delete-reserve)
  - [Testing with Jest](#testing-with-jest)
  - [Run Tests](#run-tests)
  - [Test Coverage](#test-coverage)
- [License](#License)

# Project Description

<p align="justify">
Locar is an application for a dealership that specializes in leasing vehicles. Our backend is responsible for registering cars, users, making reservations and providing authentication for the system.</p>

# Prerequisite

To be able to use and run this application you will need to install Node, recommend using version 16.18.0 (is the one I used), an IDE to run your code (I used VS Code), a platform to make your requests (I used Postman) and GIT (I use version 2.38.1).
My NPM is version 8.19.2 (NPM might already be installed with Node).

Node: https://nodejs.org/en/download/

VS Code: https://code.visualstudio.com/download

Postman: https://www.postman.com/downloads/

NPM: https://www.npmjs.com/package/download

GIT: https://git-scm.com/downloads

Make sure NPM and NodeJS are installed, run:

```bash
npm -v
```

and

```bash
node -v
```

And last, you need to create a database using MongoDB, after you followed the installation process put the database url in the .env file, just like the .env.example shows. You can use the standard HSA 256 encryption for the signature (JWT_SECRET), the secret should at least be 32 characters long, but the longer the better and for the JWT_EXPIRES_IN you need to say for how long the token will last.

MongoDB: https://www.mongodb.com/cloud/atlas/register

# How to run the application

## Cloning the repository

On your terminal, CMD or Powershell, clone the project:

```
git clone https://github.com/GabrielaMed/finalChallenge.git
```

## Install dependencies

After the project is cloned, still on the terminal, get inside the project folder and run:

```
npm i
```

## Build project

Now You can open the project using VS Code, if you press CTRL + " it will open an integrated terminal. In there you can type:

```
npm run build
```

## Start the application

After that, to start the application you can run:

```
npm start
```

## Start on dev mode

```
npm run dev
```

# API Documentation

## Full route

```http
   http://localhost:3000/api/v1
```

## User

### Create User

```http
POST /user
```

Example request body:

```json
{
  "name": "Teste",
  "cpf": "123.456.789-01",
  "birth": "2000-09-09",
  "email": "teste@gmail.com",
  "password": "123456",
  "cep": "89208-260",
  "qualified": "yes"
}
```

| Parameter   | Type     | Description                  |
| :---------- | :------- | :--------------------------- |
| `name`      | `string` | **Required**.                |
| `cpf`       | `string` | **Required**.                |
| `birth`     | `date`   | **Required**.                |
| `email`     | `string` | **Required**.                |
| `cep`       | `string` | **Required**.                |
| `qualified` | `string` | 'yes' or 'no'. **Required**. |

### Get User By Id

Authentication is required.

```http
GET /user/:id
```

| Parameter | Type       | Description   |
| :-------- | :--------- | :------------ |
| `id`      | `ObjectId` | **Required**. |

### List all users

Authentication is required.

```http
GET /user
```

| Parameter   | Type     | Description   |
| :---------- | :------- | :------------ |
| `name`      | `string` | **Optional**. |
| `cpf`       | `string` | **Optional**. |
| `birth`     | `date`   | **Optional**. |
| `email`     | `string` | **Optional**. |
| `cep`       | `string` | **Optional**. |
| `qualified` | `string` | **Optional**. |
| `page`      | `number` | **Optional**. |
| `limit`     | `number` | **Optional**. |

### Update user

Authentication is required.

```http
PATCH /user/:id
```

Example request body:

```json
{
  "email": "teste@teste.com"
}
```

| Parameter   | Type       | Description   |
| :---------- | :--------- | :------------ |
| `id`        | `ObjectId` | **Required**. |
| `name`      | `string`   | **Optional**. |
| `cpf`       | `string`   | **Optional**. |
| `birth`     | `date`     | **Optional**. |
| `email`     | `string`   | **Optional**. |
| `cep`       | `string`   | **Optional**. |
| `qualified` | `string`   | **Optional**. |

### Delete user

Authentication is required.

```http
DELETE /user/:id
```

## Authenticate

```http
POST /authenticate
```

Example request body:

```json
{
  "email": "teste@teste.com",
  "password": "123456"
}
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

## Car

### Create Car

Authentication is required.

```http
POST /car
```

Example request body:

```json
{
  "model": "car model",
  "color": "blue",
  "year": "2000",
  "value_per_day": 30,
  "accessories": [
    {
      "description": "something "
    },
    {
      "description": "something else"
    }
  ],
  "number_of_passengers": 7
}
```

| Parameter              | Type     | Description   |
| :--------------------- | :------- | :------------ |
| `model`                | `string` | **Required**. |
| `color`                | `string` | **Required**. |
| `year`                 | `string` | **Required**. |
| `value_per_day`        | `number` | **Required**. |
| `accessories`          | `array`  | **Required**. |
| `number_of_passengers` | `number` | **Required**. |

### Get Car By Id

Authentication is required.

```http
GET /car/:id
```

| Parameter | Type       | Description   |
| :-------- | :--------- | :------------ |
| `id`      | `ObjectId` | **Required**. |

### List all cars

```http
GET /car
```

| Parameter              | Type     | Description   |
| :--------------------- | :------- | :------------ |
| `model`                | `string` | **Optional**. |
| `color`                | `string` | **Optional**. |
| `year`                 | `string` | **Optional**. |
| `value_per_day`        | `number` | **Optional**. |
| `accessories`          | `array`  | **Optional**. |
| `number_of_passengers` | `number` | **Optional**. |
| `page`                 | `number` | **Optional**. |
| `limit`                | `number` | **Optional**. |

### Update car

Authentication is required.

```http
PATCH /car/:id
```

Example request body:

```json
{
  "name": "Teste modelo"
}
```

| Parameter              | Type       | Description   |
| :--------------------- | :--------- | :------------ |
| `id`                   | `ObjectId` | **Required**. |
| `model`                | `string`   | **Optional**. |
| `color`                | `string`   | **Optional**. |
| `year`                 | `string`   | **Optional**. |
| `value_per_day`        | `number`   | **Optional**. |
| `accessories`          | `array`    | **Optional**. |
| `number_of_passengers` | `number`   | **Optional**. |

### Delete car

Authentication is required.

```http
DELETE /car/:id
```

### Upsert and delete Accessory

Authentication is required.

```http
PATCH /car/:carId/accessories/:accessoryId
```

if you want to update the accessory:
Example request body:

```json
{
  "description": "something different"
}
```

if the description is the same, it will delete it, example request body:

```json
{
  "description": "something else"
}
```

if you want to add a new accessory, generate an objectId in some site on google and add it to the url on the place of the :accessoryId, example:

```http
PATCH /car/:carId/accessories/643356635ca0fd57fdaa7ee7
```

```json
{
  "description": "something new"
}
```

## Reserve

### Create Reserve

Authentication is required

```http
POST /reserve
```

Example request body:

```json
{
  "car_id": "643098f5508b8bfaa2e81e89",
  "user_id": "642ed5b0c2901062b201d5f0",
  "start_date": "2023-01-01",
  "end_date": "2023-01-30"
}
```

| Parameter    | Type       | Description   |
| :----------- | :--------- | :------------ |
| `car_id`     | `objectId` | **Required**. |
| `user_id`    | `objectId` | **Required**. |
| `start_date` | `date`     | **Required**. |
| `end_date`   | `date`     | **Required**. |

### Get Reserve By Id

Authentication is required.

```http
GET /reserve/:id
```

| Parameter | Type       | Description   |
| :-------- | :--------- | :------------ |
| `id`      | `ObjectId` | **Required**. |

### List all reserves

```http
GET /reserve
```

| Parameter    | Type       | Description   |
| :----------- | :--------- | :------------ |
| `car_id`     | `objectId` | **Optional**. |
| `user_id`    | `objectId` | **Optional**. |
| `start_date` | `date`     | **Optional**. |
| `end_date`   | `date`     | **Optional**. |
| `page`       | `number`   | **Optional**. |
| `limit`      | `number`   | **Optional**. |

### Update reserve

Authentication is required.

```http
PATCH /reserve/:id
```

Example request body:

```json
{
  "car_id": "64309d645bc1ddac16fb37b9",
  "start_date": "2023-01-01",
  "end_date": "2023-02-10"
}
```

| Parameter    | Type       | Description   |
| :----------- | :--------- | :------------ |
| `car_id`     | `objectId` | **Optional**. |
| `user_id`    | `objectId` | **Optional**. |
| `start_date` | `date`     | **Optional**. |
| `end_date`   | `date`     | **Optional**. |

### Delete car

Authentication is required.

```http
DELETE /reserve/:id
```

# Testing with Jest

## Run Tests

```
npm run test
```

## Test Coverage

We use Jest's built-in coverage reporting to ensure we have sufficient test coverage.
After running the test it will generate a coverage report in the coverage directory. Currently, our test coverage is at 98.56%.

# License

[MIT](https://choosealicense.com/licenses/mit/)
