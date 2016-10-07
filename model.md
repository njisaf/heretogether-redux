#heretogether

##Model Guide

*The following is a representation of the models included in the program*

##userSchema 0.1
* **username:**  type: String, required: true, unique: true
* **email:** type: String, required: true, unique: true
* **password:** type: String, required: true
* **findHash:** type: String, unique: true
* **date**

##picSchema 0.1
* **userID**
* **imageURI**
* **objectKey**
* **date**
* **alt**
* **date**

##profileSchema 0.1
* **profileName**
* **userID**
* **picID** (populate) <optional>
* **bio**
* **date**

##fileSchema 0.1
* **userID**
* **fileURI**
* **objectKey**
* **date**
* **type**

##statusSchema 0.1
* **userID**
* **text** <optional>
* **fileIDs** (populate) <optional>
* **picIDs** (populate) <optional>
* **replyTo:** (statusID) <optional>
* **date**
