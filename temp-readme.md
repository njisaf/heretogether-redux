# Routes


### Signup and Login

**POST** to create a new user account.

**/api/signup**

* **description:** a new user is authenticated by signing up with a valid username, password, and email. The password is hashed and then stored in the database so that no password is saved as plain text. Upon success, they are returned a token in JSON that grants the user authorization to use the program.

* **expected header:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```

* **expected body:**
```
{
username: <string>,
password: <string>,
email: <string>,
}
```

* **response:**

  * 200 upon successful signup
  * 400 BadRequestError if no username provided
  * 400 BadRequestError if no password provided
  * 400 BadRequestError if no email provided
  * 400 BadRequestError if invalid password length *password must be at least 10 characters*
  * 400 BadRequestError if no username provided
  * 409 ConflictError for duplicate username

**GET** to login to a user account.

**/api/login**


* **description:** when a returning user logs in their username is sent through basic auth which gets the username off of the request header and checks to see if that username matches the username that the user signed up with. A returning user password is hashed and then compared to the hashed value of the password they used upon signup that is stored in the database, and if it matches, they are sent back a token that authorizes them to use the program.

* **expected header:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```

* **expected body:**
```
{
  username: <string>,
  password: <string>,
  email: <string>,
}
```

* **responses:** *responses for login will be the same as already specified upon signup*



### Hospitals

**POST** to create a new hospital.

**/api/hospital**

* **description:** this feature associates users to hospitals so they can connect to patients staying in the same hospital or reach out to other patients staying at different hospitals that also have the app. Only a valid user is can add a new hospital. This authentication is taken care of through the bearer-auth-middleware.

* **expected header:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```

* **expected body:**
```
name: <string>
```

* **responses:**

  * 200 for valid request
  * 400 BadRequestError for request with invalid body
  * 400 BadRequestError for request with no body
  * 401 UnauthorizedError for request with invalid token


**DELETE** to delete a hospital.

**/api/hospital/:hospitalID**


* **description:** allows authorized users to delete a hospital

* **expected headers:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```

* **expected body:**
```
name: <string>
```

* **responses:**

  * 204 for valid DELETE request
  * 404 NotFoundError for invalid ID
  * 404 NotFoundError for no ID provided
  * 400 BadRequestError for no auth
  * 400 BadRequestError for invalid auth



### Profiles

**POST** to create a new profile.

**/api/hospital/:hospitalID/profile**

* **description:** an authorized user can create a profile. This profile is associated with a specific hospital through a hospitalID. Once a user has been passed through bearer-auth, their request is parsed by JSON and the hospitalID in that request is checked against the hospitalID that's stored in the database.

* **expected headers:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```

* **expected body:**
```
{
  profileName: <string>,
  bio: <string>,
}
```

* **responses:**

  * 200 for valid profile request
  * 400 BadRequestError for valid hospitalID, & body, but *no* auth
  * 400 BadRequestError for valid hospitalID, & auth, but *invalid* body
  * 404 NotFoundError for invalid hospitalID with valid body
  * 404 NotFoundError for missing hospitalID with valid body



**GET** to fetch a list of *all* profiles associated with a hospital.

**/api/hospital/:hospitalID/profile**

**description:** allows an authorized user to get all profiles.

* **expected headers:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
  ```

* **expected body:**
```
{
  profileName: <string>,
  bio: <string>,
}
```

* **responses:**

  * 200 for valid GET request



**GET** to fetch an individual profile.

**/api/hospital/:hospitalID/profile/:profileID**

* **expected headers:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
  ```

* **expected body:**
```
{
  profileName: <string>,
  bio: <string>,
}
```

* **responses:**

  * 200 for valid GET request



**DELETE** to delete an individual profile

* **expected headers:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```

* **expected body:** (for DELETE)
```
{} <null object>
```

* **responses:**

  * 204 for successful DELETE request
  * 404 NotFoundError for invalid profileID
  * 404 NotFoundError for invalid hospitalID



**PUT** to update an individual profile
**/api/hospital/:hospitalID/profile/:profileID**

* **expected headers:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
  ```

* **expected body:**
```
{
  profileName: <string>,
  bio: <string>,
}
```

* **responses:**

  * 200 for successful PUT request
  * 404 NotFoundError for invalid profileID
  * 404 NotFoundError for invalid hospitalID
  * 400 BadRequestError for invalid body




### Status

**POST** to create a new status post.

**/api/hospital/:hospitalID/status**

* **description:** after a user has been sent through bearer auth and has created a profile, they can post statuses, react to other users' statuses, and update or delete statuses.

* **expected headers:**

```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```
* **expected body:**

```
{
  text: string
}

```

* **responses:**

  * 200 for successful POST request
  * 200 for successful POST request and replyTO
  * 404 NotFoundError for invalid hospitalID
  * 401 UnauthorizedError for invalid token
  * 400 BadRequestError for no token
  * 404 NotFoundError for invalid hospitalID



**GET** to fetch a feed of *all* status posts for an individual hospital.

**/api/hospital/:hospitalID/status**

* **expected headers:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```

* **expected body (returns an array):**

```
[{
  text: <string>
  }]
```

* **responses:**

  * 200 for successful GET *all* request
  * 401 UnauthorizedError non-matching userID
  * 400 BadRequestError for invalid statusID
  * 401 UnauthorizedError for invalid token
  * 400 BadRequestError for no token



**GET** for an individual status

**/api/hospital/:hospitalID/status/:statusID**

* **expected headers:** for GET/PUT/DELETE:
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```

* **expected body:**

```
{
  text: string
}

```

* **responses:**

  * 200 for successful GET request
  * 401 UnauthorizedError non-matching userID
  * 400 BadRequestError for invalid statusID
  * 401 UnauthorizedError for invalid token
  * 400 BadRequestError for no token


**PUT** to update an individual status

**/api/hospital/:hospitalID/status/:statusID**

* **expected headers:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```

* **expected body:** for PUT
```
{
  text: string
}

```

* **responses:**

  * 200 for valid PUT request
  * 404 NotFoundError for invalid hospitalID
  * 404 NotFoundError for invalid statusID
  * 401 UnauthorizedError for invalid token
  * 400 BadRequestError for no token
  * 401 UnauthorizedError for non-matching userID


**DELETE** to delete an individual status

* **expected headers:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```

* **expected body**
```
{ } <null object>
```

* **responses:**

  * 204 for successful DELETE request
  * 204 for valid ID and fileID
  * 404 NotFoundError for non-matching hospitalID
  * 401 UnauthorizedError for non-matching userID
  * 400 BadRequestError for no token
  * 401 UnauthorizedError for invalid tokens



# File

**POST** request

**/api/status/:statusID/file**


* **description:** a file is associated with a status and allows authorized users to upload any file-type to a status

* **expected header:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```

* **expected body:**
```
fileURI: <string>
objectKey: <string>
fileType: <string>
```

* **responses:**

  * 200 for valid POST request
  * 400 BadRequestError for no file provided
  * 401 UnauthorizedError for invalid token
  * 400 BadRequestError for no token provided
  * 401 UnauthorizedError for no statusID provided


**DELETE** request

**/api/status/:statusID/file/:fileID**

* **description:** The user has an option to delete the associated file.

* **expected header:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```

* **responses:**

  * 204 for successful DELETE request
  * 401 UnauthorizedError for invalid token
  * 400 BadRequestError for no token provided
  * 400 BadRequestError for no bearer-auth
  * 400 BadRequestError for invalid statusID



# Pic

**POST** request

**/api/status/:statusID/pic**


* **description:** a pic is associated with a profile, authorized users can upload, change, or delete their profile picture.

* **expected header:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```

* **expected body:**
```
username: <string>
imageURI: <string>
objectKey: <string>
```

* **responses:**

  * 200 for valid POST request
  * 400 BadRequestError for no image attached
  * 401 UnauthorizedError for invalid token
  * 400 BadRequestError for no image attached
  * 404 NotFoundError for invalid profileID
  * 401 UnauthorizedError for invalid userID
  * 400 BadRequestError for no token


**DELETE**

**/api/status/:statusID/pic/:picID**

* **description:** a user has an option to delete the associated pic.

* **expected header:**
```
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'
```

* **responses:**

* 204 for successful DELETE request
* 204 for valid ID and fileID
* 404 NotFoundError for non-matching hospitalID
* 401 UnauthorizedError for non-matching userID
* 400 BadRequestError for no token
* 401 UnauthorizedError for invalid tokens



# Middleware

**basic-auth-middleware**

**bearer-auth-middleware**

**error-middleware**



# Mocks **test/lib/*

*There is one mock per model. The following mocks are used for testing purposes**

**user-mock:** takes a username, password, & email attributes

**hospital-mock:** takes a name

**file-mock:** takes a fileURI, objectKey, & fileType

  * *The fileURI & objectKey mock the AWS URI and objectKey*

**pic-mock:** takes a username, imageURI, & objectKey

  * *The imageURI & objectKey mock the AWS URI and objectKey*

**status-mock:** takes text

**profile-mock:** takes a profileName & bio

**aws-mock:** takes an ETag, Location, Key, key, & bucket



# Helper Files **test/lib*

**clean-db:** removes each mock generated after each test

**server-ctrl:** controls the server handling logic that turns the server on and off

  * *Be sure to include the server handling and clean-db logic before each test*

```
before(done => serverCtrl.serverUp(server, done));
after(done => serverCtrl.serverDown(server, done));
afterEach(done => cleanDB(done));
```

**test-env** should include the following:

  * *This file should be required at the top of EVERY test file, before any other files/modules are required*

```
process.env.PORT=3000;
process.env.MONGODB_URI='mongodb://localhost/<name of app>';
process.env.APP_SECRET='<secret string>';
process.env.AWS_ACCESS_KEY_ID='<some string>';
process.env.AWS_SECRET_ACCESS_KEY='<some string>';
```

##Don't forget to include a server file that requires in and uses all the routes.
