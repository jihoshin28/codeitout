# Codeitout

Codeitout is a coding tool that allows programmers to write and test code in code editor windows, as well as add notes in text editor windows.

Users can open multiple windows to easily test multiple solutions on the same screen, and take notes on their work. 

The work that users do on the platform is saved on the local machine, so that users can continue their work, as well as export their work to other platforms. 

The project consists of three different packages which handle the ***client*** (frontend components), ***CLI***, and ***local API***.

# Getting Started

## NPM

You can also choose to access the files which are hosted on NPM. 

### NPX

The easiest way to run the platform is by running `npx codeitout serve` in your CLI. You'll want to create a new folder, 

This command will ask you permission to download necessary files from NPM, and then start your Express server right away. 

Navigate to the url on your console to see the platform. (By default this is `http://localhost:4005`)

### Install the files

You can install also the install all the packages directly onto your machine first. 

Run `npm install codeitout`.

This will give you folder with node_modules and package.json configurations. 

Navigate to `node_modules/codeitout/dist`. Once inside the directory run `node index.js serve`. Navigate to the console URL.

## Github

You can also run the server from the files available here on Github.

Clone the files into a new folder on your local machine. 

Then similiarly, go to to `nodemodules/codeitout/dist` and run `node index.js serve` and navigate to the console url. 

# Available Scripts

### `npm run start`

The project is running on Lerna which allows you to run multiple packages concurrently.

-**In the root directory**, run `npm run start` to run all of the packages in parallel. 

You can also run them individually.

-**In the CLI/local-api directories** you can run this command if you need to make any changes to the original typescript files. The start command in these packages check for any typescript file changes and automatically updates the output files.

-**In the client directory** this boots up your React application.

### `npm run build`

This command is available on the client package directory and lets you build your project manually. 

# How to use

When you first open the application, you'll need to hover to the top of the application to open your first window.










## Backend

### Models

The data tables included for this project are:

- admin: user model with information relevant for signing in.
- students: students who can join courses, 
  - student_groups: join table for students and groups.
  - student_courses: join table for students and courses. This model includes relevant information like score and completion percentage.
  - posts: students can create posts on forums
- teachers: teachers can teach many different courses
- courses: belongs to one teacher and can have many students.
- groups: a group for students.
- forums: a model that can be made for 
- courses: belongs to one teacher and has many students.

### CRUD

As the admin you have the capability to create or destroy groups, courses, forums, as well as any student relationships they have to courses or groups. You can update your username, email and password in settings, which include your login credentials.

## Authentication

The server handles authentication by checking for with the `/login` route which checks the form's login credentials, and returns a jwt token if the credentials are valid.

All data is verified by a middleware which uses the `jwt.verify` method to ensure that the header being received has a valid token, which decodes to match the user's username.

## Tests

The backend server has tests that run on jest that I've created to ensure all the routes are running well. You can run `npm test` in the backend component to ensure that all routes are running correctly.

Inside the test files I'm using `supertest` to make requests to the backend and checking for if the resonses have values that make sense for each route/controller operation.


## Frontend

### Admin Panel

The admin panel has __3 different panels__ for groups, forums, courses. You can change which one you want to view in the settings.

Each panel has graphs relevant for that data model, as well as sections to create new instances of your model, as well as new associations.

### Sidebar and toolbar

The toolbar has a sign out and settings button. The settings button is used to change which admin panel you want to view.

The sidebar has links to other pages to access and manipulate various models.

### Screens

Courses: List of courses with options to view student list, course information (graph data), and to remove course.
Groups: List of groups with options to view student list, and to remove group.
Forums: List of forums with options to view forum(all of its posts), and to remove forum.
Students: List of students with options to contact student and remove student.
Teachers: List of teachers with options to contact teacher and remove teacher.

### Lazy Loading

All screens use the Intersection Observer API to detect when a particular dataset is entering into the screen and uses css transitions to fade in the data.

### Graphs

I used a the Bar, Pie, and Scatter graphs from the `react-google-charts` library for a various data groupings (f.e. students in one course, all students in all courses, all groups, etc.). 

After making an API call I include helper functions in the React components to organize the data to make it useable for the React Google chart component.

## State

I'm taking care of state mainly with `redux` and `react-redux`. I make a backend call (with actions) to the API server and with the data I receive back, I run a dispatch function which waits for the asynchronous function completion, and updates the state which is centralized on the store.

Whenever I mount a component I am making an API call using actions needed for all relevant data at once.

There were various situations that I opted to use the state on the component itself like when filtering/sorting the data, as well as retaining form information. 

# Important libraries

## Backend

### Sequelize

I used the Sequelize, which is a promise based Node.js ORM for Postgres. 

This framework was the central component for handling all my backend work. It created migration tables, seeder files, controllers, and even created configurations for hooking up to my postgres database.

I actually switched over to using this ORM after realizing that object relationship is much easire on Sequelize as opposed to using SQL queries.

Before this I was using 

### Express

The Node.js web framework which handled running my server, handling routes, and middleware for verifying tokens.

It was my first time using the Express server, as I am more used to Rails, but I found it very easy to use as well as familiar since I am familiar with Javascript.

### pg-tools

Used this library to create a Node.js file which creates a Postgres database on intialization. 

# Frontend

### react-google-charts

A library with all sorts of React graph components available to display user data. 

### Redux

Centralizes state on a store, so that any state object can be passed to any component in the application.

Uses actions to create changes to the centralized state, which can include asynchronouse calls to the API server. (Needs Redux-thunk)

### Redux-thunk

Redux middleware which allows state change after completion of asynchronous API calls.

### Redux-Persist

Middleware for redux to persist data since it gets lost on refresh or other update events, otherwise.

### React-router-dom

React routing library used to handle creating routes, links, and triggering redirects, if the user doesn't have proper authentication.

### Axios

Promise based Javascript HTTP client, which I mainly used to make calls to the backend server.

# Reflections


## Possible Improvements


### Too basic

I feel like if I had more time I would have spent more time thinking, I would have added more data attributes, and possibly added more data models. 

Currently, my only real compelling data has to do with student performance in courses, but the courses have no actual content and I could have added more options for my groups and forums. 

### So many calls for data.

I also feel like I ended up using asynchronous calls to the API server, way too much. This happened both on the frontend and even the backend side (for example, like when I needed to see what courses were available to seed student_course associations). I think there could have a been a way (especially on the frontend) only how I was accessing and calling for the data. Perhaps I could have made a call for all data on the first page load, and then making minor changes to the state after. 

### CSS 

I would have liked to add more transitions and spice up the CSS side of things.


# Technical Questions 

### What libraries did you add to the frontend? What are they used for?

Please refer to the important frontend libraries.

### What's the command to start the application locally?

Please refer to the getting started and availalbe scripts sections.

### How long did you spend on the coding project? What would you add to your solution if you had more time? If you didn't spend much time on the coding project, then use this as an opportunity to explain what you would add.

I explained a lot of what I would like to improve on in my reflections. This was actually the first time I created a server with Express, Node.js, Seqeuelize, Postgres, and Jest(for testing) and so it took me a while to get familiar with these tools. Overall, I enjoyed learning the new framework, because I think it provides way more flexiblity that the backend framework I'm used to (Rails). I actually spending almost two days building out direct PostgreSQL queries(for migrations AND seeds), which I ended up scrapping for the more ORM friendly Sequelize.

However, from a project perspective, if I had a limited amount of time, I think I would try to pick the framework and libraries that I am already familiar with to save time on learning the tools, and taking more time to plan out what I want to build. Also, I will try to find an ORM framework, because they tend to provide a lot of time-saving tools (migration, seeding).

### What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

```javascript
const models = require('../models')

const createStudentCourses  = (courseIds, studentIds) => {
  const seedArray = []
  for(let i = 0; i < 100; i++){
    let body = {}
      body['student_id'] = studentIds[Math.floor(Math.random() * studentIds.length)];
      body['course_id'] = courseIds[Math.floor(Math.random() * courseIds.length)];
      body['completion'] = Math.floor(Math.random() * 100)
      body['score'] = Math.floor(Math.random() * 100)
      body['createdAt'] = new Date()
      body['updatedAt'] = new Date()
      seedArray.push(body)
  }
 console.log(seedArray)
 return seedArray
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.Student.findAll({})
    .then(async(res) => {
      let studentIds = res.map(data => data.id)
      await models.Course.findAll({})
      .then(res => {
        let courseIds = res.map(data => data.id)
        queryInterface.bulkInsert(
          'StudentCourses',
          createStudentCourses(courseIds, studentIds)
        )
      })
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('StudentCourses', null, {});
  }
};

```

This wasn't necessarily the most important part of my project, in the seeding, but I love the option that Sequelize gave you through accessing promises in order to query for live data. I used the promises here to create new Student to Course relationships, be first accessing which Students and Courses we currently had available.

### How would you track down a performance issue in production? Have you ever had to do this?

I have never had to do this, but I would use a performance tracking tool like [raygun](https://raygun.com/), in order to keep track of any crashes, slowness, or bugs.
