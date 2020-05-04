# Employee Tracker

This project was created by spatiality-dc.
<br>
![Profile Picture](https://avatars0.githubusercontent.com/u/59462019?v=4&s=100)

## Description

This is a command line application that can be used to manipulate a database of employees, housed in MySQL.

- [Installation](##Installation)
- [User-Story](##User-Story)
- [Challenge](##Challenge)
- [Results](##Results)
- [Lessons-Learned](##Lessons-Learned)

## Installation

1. Open and run the seeds.sql and scheme.sql files in MySQL.

2. Update the password to your MySQL root folder in the server.js file on line 14.

```
// Your password
  password: "",
  database: "employee_DB",
```

3. Install the npm dependencies and then run npm start

```
npm i
npm start
```

## User Story

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## Challenges

- I had a lot of trouble getting MySQL to run on my machine. In the end I downloaded an older version and set up an "Admin" user on my root folder. This seemed to help, but I still ran into a lot of troubles.

## Results

- Github Repo - https://github.com/spatiality-dc/employee_tracker

- There is no GIF for this CLI because it doesn't actually run.

## Lessons Learned

- I didn't leave myself enough time to trouble shoot this project. That's a big lesson. This doesn't actually run and I ran out of time to figure out why.

- I feel like I'm getting better at Javascript, but there are still some patterns of thinking (in terms of how to write good code) that still cause me to slip up.
