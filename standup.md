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


**Standup @ 1:15 p.m.**
* Code is deployed to Heroku
* Travis is working
* Discussed with Duncan that all models are built out and relevant files added (see above)
* Duncan advised get full CRUD routes on profile route
* Group decided that we need to include hospital model

**Standup @ 2:15 p.m.**
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

## Day 2 10/11/16

**Completed:**

* built out user routes
* built out hospital routes
* built out profile routes
* tests for user routes
* tests for hospital routes
* tests for profile routes

**Added the following:**

* profile-router
* profile-router-test
* hospital-router
* hospital-router-test
* hospitalSchema
* profile-mock
* pic-mock
* pic-router

**ToDo:**
* write more profile-router tests
* create pic-mock
* write pic routes
* write pic-router tests
* aws mock

**Standup @ 11:30am**
* hospital routes/tests - DONE
* auth routes/tests - DONE
* profile-mock - DONE
* profile-routes - DONE
* profile-router-tests - DONE


**Standup Meeting at 3:20pm**

* Reviewed morning progress
* Discussed endpoints for files and pic models
  * Separate endpoints for pic and file models on profile and status routes
  * Uploads will need to be PUT and not POST actions
    * Discussed process of doing this
* Decided to split up to work on separate tasks
  * Judy continues on Pic routes
  * Kaylyn begins File route
  * Nassir finishes Profile routes and tests
* MVP for afternoon is get AWS-associated routes working.

## Day 3 10/12/16

**Standup Meeting @ 11:30 a.m.
*Duncan needed to debug us a lot. Resolved merge conflicts and we are back on track with all tests passing. Group to review all routes and discuss what more routes we need, if any.

**Did not have second standup

**ToDo:**
*Profile: GET all route
 *In Profile mock, we include mocking logic for pic and file router, and make a test that updates the pic and file IDs
*Status: modify status model to include an array of files ? Will discuss w/ Duncan
*Status: GET all route - DONE
*Pic: PUT route, plus update schema to take out extraneous fields - DONE
*File: GET all route
*Plus test these new routes accordingly
*Discuss w/ Duncan about file-router endpoints
