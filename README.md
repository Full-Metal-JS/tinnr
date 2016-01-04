# tinnr
What's for dinner?
Tinnr, it's for dinner.

## Introduction

Tinnr is a project dedicated to offering users with many different recipe choices. Our goal is for people to explore new recipes that fit any occasion.

## Getting Started

We have used bower and npm to install our dependencies. We also used Mongod and nodemon to run a local database and server. The bower dependencies will be downloaded to a lib folder, which is pre-specified in the .bowerrc file. Before running locally, run the following code in the command line.
```
bower install
npm install
mongod
nodemon server/server.js
```

Note: To use mongod, you must set the database path. You can do so with the following command.
```
mongod --dbpath <path>
```

## Tests

Currently, we have a test for our server side inside our test foler.

## File Structure

We separated our files into 3 different folders: Client, Server, and Tests. Here is a diagram for our file structure.

## Choice of Technologies

For this project, we have used AngularJS, Twitter Bootstrap, Sass, Lo-dash for our front end and Node.js, Express, and MongoDB for our server and database. We also used Gulp for automation of our workflow.

We used MongoDB for the document storage of the Users and the Recipes. We used an ORM called mongoose, which is an npm
module, which gives us easier access to our database. Refer to this link to learn more about mongoose [Mongoose Docs](http://mongoosejs.com/). We used MongoLab as a heroku addon when deploying our app.

## Yummly API
We used Yummly's API for our recipes.
[Yummly API Documentation](https://developer.yummly.com/documentation)

## Features
- Users
- Recipes
- Each user can save recipes
- Clicking on the saved recipe will forward you to the recipe
- Can filter by Diet, Cuisine, and Course
- Preferences are saved to the User

## In progress
- Swiping for recipes
- Compile all saved recipe ingredients to make shopping list
- Show number of user favorites on saved recipes (We already iterate the numberOfSaves in the recipe Schema)
- Refactor to SQL database for larger production scale
- Filter ingredients

## Git Workflow

Please refer to the CONTRIBUTING.md file to see our git workflow.

MKS Greenfield Project
