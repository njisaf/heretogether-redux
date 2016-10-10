#Standup Minutes

##Day 1 - 10/10/16

**Completed:**

built out all models:
* userSchema
* picSchema
* profileSchema
* fileSchema
* statusSchema

*setup Travis/deployed to Heroku*


**Added the following files:**
* .eslintrc
* .gitignore
* basic-auth-middleware
* bearer-auth-middleware
* error-middleware
* server
* clean-db
* user-mock
* auth-router-test

**ToDo:**
* create auth routes - DONE
* test auth routes - DONE
* get users
* create profile routes
  * POST /api/profile (create a profile)
  * GET, UPDATE, DELETE /api/profile/:profileid (show/update/delete a profile)
* Create new hospital model (Duncan advised use a 'name' field only) - DONE
* Create hospital routes
* Add hospitalID field to the following schemas - DONE
 * status - DONE
 * user - DONE
* Status schema also needs username field - DONE
* Hospital - DONE
 * POST /api/hospital - DONE
 * DEL /api/hospital/:hospitalID (stretch goal) - DONE


**Standup Meeting with Duncan at 1:15 p.m.**
* Code is deployed to Heroku
* Travis is working
* Discussed with Duncan that all models are built out and relevant files added (see above)
* Duncan advised get full CRUD routes on profile route
* Group decided that we need to include hospital model

**Standup Meeting with Duncan at 2:15 p.m.**
* Duncan advised we need hospital routes
 * POST /api/hospital
 * DEL /api/hospital/:hospitalID
* Duncan advised add username and hospital ID fields to status schema so that we can associate those with hospital model. Hospital ID field also needed on user schema.
* MVP for end of today is:
  * Auth:
    * POST /api/signup
    * GET /api/login (basic)
  * Hospital
   * POST /api/hospital
   * DEL /api/hospital/:hospitalID (stretch goal)
* We also learned the hard way to wait for Travis to pass before merging changes. Lesson learned.
