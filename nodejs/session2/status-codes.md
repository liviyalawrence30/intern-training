# HTTP status codes

## 200 ok
It means the request was successful.
eg:
A client sends 'GET/users' request and the server returns the list of users successfully.

## 201 created
It means a new resource was created successfully.
eg:
A client sends 'POST/users' request to create a new user and the server creates it successfully.

## 400 Bad request
It means the request is invalid.
eg:
A client sends a request with missing fields.

## 401 Unauthorized
It means the provided credentials are invalid or authentication is required.
eg:
A user tries to access their account without logging.

## 403 Forbidden
It means the user is authenticated but does not have permission to access the resource.
eg:
A user tries to access admin-only page.

## 404 Not Found
It means the requested route or resource does not exist.
eg:
A client tries to get the 100th user data when only 50 users are present.

## 500 Internal Server Error
It means an unexpected error happened while the request has been processed.
eg:
The server crashes due to a coding error.

