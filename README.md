![cf](https://i.imgur.com/7v5ASc8.png) Javascript 401d10 -- Mid Quarter Project
=====

# \<heretogether\>

\<heretogether\> is a social media platform for patients staying in pediatric hospitals under long-term care. The purpose of the application is to easily connect these children to one another through a single platform that can act as an avenue through which they can reach out to others, share experiences, and ultimately, be accompanied through their journeys together.

# About the App

The program uses it's own Express API that authorizes new and returning users granting them access to CRUD operations that enable the user to follow other users, create profiles, post statuses, and upload photos. The app uses Express to respond to and route HTTP methods appropriately from client requests at a particular endpoint. The specified models are created via mongoose which map to a mongoDB collection and define the shape of the documents within that collection. A user will authenticate by passing in a valid name, email, and a password and will get back a token upon success. JSON web tokens is used to validate tokens which allows information to be passed back and fourth in JSON format if the token is good. The program is compatible with AWS and uses it to store uploaded images.

*See the Routes for more on how to interact with the app*

## Readme Version 0.1

Updated Monday October 10th 2016

## Team

[Kaylyn Yuh](https://github.com/kaylynyuh) - Glorious Leader

[Judy Vue](https://github.com/JudyVue) - Excelsior Supreme

[Nassir Isaf](https://github.com/njisaf) - Grand Shadowmaster


# Routes

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
