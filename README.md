![cf](https://i.imgur.com/7v5ASc8.png) Javascript 401d10 -- Mid Quarter Project
=====

# \<heretogether\>

\<heretogether\> is a social media platform for pediatric patients in hospitals. 

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
