![cf](https://i.imgur.com/7v5ASc8.png) Javascript 401d10 -- Mid Quarter Project
=====

# \<heretogether\>

\<heretogether\> is a social media platform for young patients in hospitals.

## Readme Version 0.1

Updated Monday October 10th 2016

## Team

[Kaylyn Yuh](https://github.com/kaylynyuh) - Glorious Leader

[Judy Vue](https://github.com/JudyVue) - Excelsior Supreme

[Nassir Isaf](https://github.com/njisaf) - Grand Shadowmaster


# Routes

### Signup and Login

`/api/signup`

POST to create a new user account.

`/api/login`

GET to login to a user account.

### Hospitals

`/api/hospital`

POST to create a new hospital.

`/api/hospital/:hospitalID`

DELETE to delete a hospital.

### Profiles

`/api/hospital/:hospitalID/profile`

POST to create a new profile.

`/api/hospital/:hospitalID/profile`

GET to fetch a list of all profiles associated with a hospital.

`/api/hospital/:hospitalID/profile/:profileID`

GET, PUT, DELETE to fetch or modify an individual profile.

### Status

`/api/hospital/:hospitalID/status`

POST to create a new status post.

`/api/hospital/:hospitalID/status`

GET to fetch a feed of all status posts for an individual hospital.

`/api/hospital/:hospitalID/status/:statusID`

GET, PUT, DELETE to fetch or modify an individual status post.
