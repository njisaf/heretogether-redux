## Readme Version 0.1

## Team

[Kaylyn Yuh](https://github.com/kaylynyuh)

[Judy Vue](https://github.com/JudyVue)

[Nassir Isaf](https://github.com/njisaf)

# \<heretogether\>

\<heretogether\> is a social media platform for patients staying in pediatric hospitals under long-term care. The purpose of the application is to easily connect these children to one another through a single platform that can act as an avenue through which they can reach out to others, share experiences, and ultimately, be accompanied through their journeys together.

# About the App

The program uses it's own Express API that authorizes new and returning users granting them access to CRUD operations that enable the user to follow other users, create profiles, post statuses, and upload photos. The app uses Express to respond to and route HTTP methods appropriately from client requests at a particular endpoint. The specified models are created via mongoose which map to a mongoDB collection and define the shape of the documents within that collection. A user will authenticate by passing in a valid name, email, and a password and will get back a token upon success. JSON web tokens is used to validate tokens which allows information to be passed back and fourth in JSON format if the token is good. The program is compatible with AWS and uses it to store uploaded images.

**This App uses coverall.io to monitor code coverage:**

[![Coverage Status](https://coveralls.io/repos/github/kaylynyuh/401-mid-quarter-project/badge.svg?branch=staging-branch)](https://coveralls.io/github/kaylynyuh/401-mid-quarter-project?branch=staging-branch)

*See the Routes for more on how to interact with the app*

# Dependencies:

* aws-sdk
* bcrypt
* bluebird
* body-parser
* debug
* del
* dotenv
* express
* http-errors
* jsonwebtoken
* lorem-ipsum
* mongoose
* morgan
* multer

*Save the following as devDependencies*

* aws-sdk-mock
* chai
* coveralls
* eslint
* istanbul
* mocha
* superagent


# Routes **routes/**

### Signup and Login

POST to create a new user account.
```
/api/signup
```

GET to login to a user account.
```
/api/login
```

### Hospitals

POST to create a new hospital.
```
/api/hospital
```

DELETE to delete a hospital.
```
/api/hospital/:hospitalID
```


### Profiles

POST to create a new profile.
```
/api/hospital/:hospitalID/profile
```

GET to fetch a list of all profiles associated with a hospital.
```
/api/hospital/:hospitalID/profile
```

GET, PUT, DELETE to fetch or modify an individual profile.
```
/api/hospital/:hospitalID/profile/:profileID
```

### Status

POST to create a new status post.
```
/api/hospital/:hospitalID/status
```

GET to fetch a feed of all status posts for an individual hospital.
```
/api/hospital/:hospitalID/status
```

GET, PUT, DELETE to fetch or modify an individual status post.
```
/api/hospital/:hospitalID/status/:statusID
```

# Middleware

**basic-auth-middleware**

**bearer-auth-middleware**

**error-middleware**


# Mocks **test/lib/*

*There is one mock per model. The following mocks are used for testing purposes*

**user-mock:** takes a username, password, & email attributes

**hospital-mock:** takes a name

**file-mock:** takes a fileURI, objectKey, & fileType

*The fileURI & objectKey mock the AWS URI and objectKey*

**pic-mock:** takes a username, imageURI, & objectKey

*The imageURI & objectKey mock the AWS URI and objectKey*

**status-mock:** takes text

**profile-mock:** takes a profileName & bio

**aws-mock:** takes an ETag, Location, Key, key, & bucket

# Helper Files **test/lib**

**clean-db:** removes each mock generated after each test

**server-ctrl:** controls the server handling logic that turns the server on and off

*Be sure to include the server handling and clean-db logic before each test*

```
before(done => serverCtrl.serverUp(server, done));
after(done => serverCtrl.serverDown(server, done));
afterEach(done => cleanDB(done));
```

**test-env** should include the following:

*This file should be required at the top of EVERY test file, before any other files/modules are required*

```
process.env.PORT=3000;
process.env.MONGODB_URI='mongodb://localhost/<name of app>';
process.env.APP_SECRET='<secret string>';
process.env.AWS_ACCESS_KEY_ID='<some string>';
process.env.AWS_SECRET_ACCESS_KEY='<some string>';
```

##Don't forget to include a server file that requires in and uses all the routes.
