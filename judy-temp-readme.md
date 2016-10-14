File routes (POST/DELETE)

POST request
/api/status/:statusID/file
This file route give a user the option to attach a file of any type to their status.

Expected Header (for all routes)
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'

Expected Req.body (for both POST and DELETE routes)
fileURI: <string>
objectKey: <string>
fileType: <string>

DELETE request
/api/status/:statusID/file/:fileID
The user has an option to delete the associated file.

=========================

Pic routes (POST/DELETE)

POST request
/api/profile/:profileID/pic
The user uploads a picture of themselves to their profile. The picture is uploaded to Amazon Web Services and its metadata is stored in the Mongo database.


Expected Header (for all routes)
Content-Type: 'application/json; charset=utf=8'
Authorization: 'Bearer <token>'

Expected req.body (for both POST and DELETE route)
imageURI: <string>
objectKey: <string>
