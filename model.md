#heretogether

##Model Guide

*The following is a representation of the models included in the program*

##userSchema 0.1
* **username:**  type: String, required: true, unique: true
* **email:** type: String, required: true, unique: true
* **password:** type: String, required: true
* **findHash:** type: String, unique: true
* **date**

##picSchema 0.2
* **userID**
* **username**
* **imageURI**
* **objectKey**
* **date**

##hospitalSchema 0.1
* **name**
* **date**

##profileSchema 0.3
* **profileName**
* **userID**
* **picID** (populate) <optional>
* **bio**
* **hospitalID**
* **date**

##fileSchema 0.1
* **userID**
* **fileURI**
* **objectKey**
* **date**
* **type**

##statusSchema 0.2
* **userID**
* **hospitalID**
* **text** <optional>
* **fileIDs** (populate) <optional>
* **picIDs** (populate) <optional>
* **replyTo:** (statusID) <optional>
* **date**

## Route Guide

*The following is Nassir trying to work out how he's going to redo these routes without hospital*

##auth-router

/api/signup
/api/login
/api/auth/oauth_callback

*keep the same*

##file-router

/api/status/:statusID/file
/api/hospital/:hospitalID/statusfile
/api/status/:statusID/file/:fileID

*revise to:*

/api/profile/file/:fileID -> stick the files on the status and fetch them from there.

<!-- ##picRouter

/api/profile/:profileID/pic
/api/profile/:profileID/pic/:picID -->

##profileRouter

/api/hospital/:hospitalID/profile
/api/hospital/:hospitalID/profile/:profileID
/api/hospital/:hospitalID/all/profile
/api/hospital/:hospitalID/profile/
/api/hospital/:hospitalID/profile/:profileID
/api/hospital/:hospitalID/profile/:profileID

*revise to:*
/api/profile/:profileID
/api/profile/all

##statusRouter

/api/hospital/:hospitalID/status
/api/hospital/:hospitalID/status/:statusID
/api/hospital/:hospitalID/all/status/
/api/hospital/:hospitalID/all/status/:userID
/api/hospital/:hospitalID/status/:statusID
/api/hospital/:hospitalID/status/:statusID

*revise to:*

/api/status/:statusID
/api/status/all
