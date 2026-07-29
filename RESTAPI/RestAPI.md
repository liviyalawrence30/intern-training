# Task 1.1

## Answers
1. 200 OK.
2. Content-Type: application/json; charset=utf-8
3. 10 users are returned.
4. The URL structure is a collection because it returns all the users ,not a single user.

# Task 1.2

## Answers

1. 404 Not Found
2. {}
3. It returns a 404 Not Found status code and an empty JSON object.


## Task 1.3
## Answers
1. 10
2. '/posts' in the URL is the path.
'userId=1' is the query parameter.
3. yes, both return the same result because both the URL's tell to display the user with id = 1. 
They represent the same relationship.

/users/1/posts is preferred because it is easier to understand and the code is clean.


# Task 2.1
## Answers

1. The query returns the correct json body . When i add the -i , it returns the status code as 201.
2. Response body:
{
  "title": "REST is easy",
  "body": "Once you know the verbs",
  "userId": 1,
  "id": 101
}
id is assigned as '101'

3. No, the location-header didn't appear.

## comments
1. It returns the same response body.
2. A well designed API should return a 409 status code saying 'this is a duplicate resourse that conflicts with the existing resource'.


# Task 2.2
## Answers

1. Put response body fields:
Returns all the field with the replaced data.

patch response body fields:
It also returns all the fields but only the title is updated.

2. PATCH only requires the fields that need to be changed in the request body. Here, the specified field 'title' is updated.

3. In the Intern dashboard API, 'put' can be used when we need to replace an intern's data completely.
Patch can be used when we need to update only the specific fields like score , etc.

# Task 2.3
## Answers

1. 200 OK
2. {}
3. In real-world API , 204 is more preferred when there is nothing to send back.

# Task 3.1

1. 200 OK
2. 201 Created
3. 204 No Content 
4. 404 Not Found
5. 400 Bad Request
6. 401 Unauthorized
7. 403 Forbidden
8. 500 Internal Server Error


# Task 3.2

1. 404 Not Found
2. 201 Created
3. 204 No Content
4. 401 Unauthorized

## Comment 
Returning 200 OK with an error message confuses API consumers because they interpret the request as successful.
Proper status codes allows the frontend developers to handle the errors and successful requests correctly.


# Task 4.1

## Scenario A
GET https://jsonplaceholder.typicode.com/interns/2

## Scenario B
GET https://jsonplaceholder.typicode.com/interns?role=Frontend

## Scenario C
GET https://jsonplaceholder.typicode.com/interns?limit=5&sort=score&order=desc

## Scenario D
GET https://jsonplaceholder.typicode.com/interns/42/attendance

## Scenario E
GET https://jsonplaceholder.typicode.com/interns?name=Rahu

# Task 4.2
## Answers
1. No it did not cause 401. 
Because JSONPlaceholder did not authenticate or validate the Authorization header.
2. In a real API, the server would validate the header. If it is vaild, the process continues. Otherwise, it returns the 401 Unauthorized status code.
3. 401 - Unauthorized means the credentials may be missing,invalid so it will show 401.
403 - Forbidden means the user is authenticated but is not given the permission for specific functions.



# Task 4.3 

Action                            |Method|URL                                                      |Request body                              | 

List all interns                   GET    https://jsonplaceholder.typicode.com/interns               None
get an intern                      GET    https://jsonplaceholder.typicode.com/interns/7              None
create a new intern                POST   https://jsonplaceholder.typicode.com/interns               {"name","role","score",'"isPresent"}
Update intern #7's score only      PATCH  https://jsonplaceholder.typicode.com/interns/7             {"score":95}
Replace intern #7 entirely         PUT    https://jsonplaceholder.typicode.com/interns/7             {'name':,'role','score','isPresent'}
Delete intern #7                   DELETE https://jsonplaceholder.typicode.com/interns/7              None
List interns with role = Backend   GET    https://jsonplaceholder.typicode.com/interns?role=Backend   None
Get all attendance for intern #7   GET    https://jsonplaceholder.typicode.com/interns/7/attendance   None

Expected Status| 
200 OK
200 OK 
201 Created
200 OK
200 OK 
204 No Content
200 OK
200 OK

## comment
I prefer nesting because attendance belongs to a specific intern, making the relationship clear and intuitive. It is simpler. 
A seperate attendance resource would be more flexible when querying across all interns but nesting represents the relationship between an intern and their attendance records.


# Task 5.1
Host: jsonplaceholder.typicode.com 

# Task 5.2

## comment
In a real application, the service layer should make the POST request.
It acts as an intermediary between the UI and the data layer, handling business logic,API calls and error handling while keeping the UI clean and maintainable.

# Task 5.3

## Answers
1. The request still worked because JSONPlaceholder accepts the request even without the content-Type header.
In a production API,the server should require the correct content-Type(application/json) and reject invalid or missing content-types.

2. 404 Not Found

3. A production API should return a clear error response containing status code, an error message and additional information to fix the issue.


# Task 6.1

A. Error: Action(verb) is present in the URL. Rest uses noun for resources.
Fix: GET/interns

B. Error: Uses POST and includes DELETE in the url.
Fix: DELETE/interns/42

C. 
Error:GET is being used to create a resource . GET should only retrieve data.
Fix: POST/interns{
    "name": "Maria",
    "role": "Full Stack developer",
    "score": 90
}

D. Error:Uses an action in the URL. POST is used instead of PATCH for updating only one field.
Fix: PATCH/interns/42{
    "score":96
}

E. Error: Query parameter is used to identify a specific resource. Resource ID should be a path parameter.
Fix: DELETE/interns/42

# Task 6.2

Action                                        | Method  |  URL                                      |  Status Code

List all projects                              GET        /projects                                     200 OK
Get a specific project                         GET        /projects/{projectId}                         200 OK
Create a project                               POST       /projects                                     201 Created
List all projects an intern is assigned to     GET        /interns/{internId}/projects                  200 OK
Assign an intern to a project                  POST       /projects/{projectId}/interns/{internId}      201 Created
Remove an intern from a project                DELETE     /projects/{projectId}/interns/{internId}      204 No Content

## comment

If a project manages its assigned interns, POST /projects/{id}/interns/{internId} can be used.
If an intern manages their assigned projects , POST /interns/{id}/projects/{projectId} can be used.
The owner resource is determined by the application's business requirements and domain model.

