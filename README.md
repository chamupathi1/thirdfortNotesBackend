# Thirdfort Notes backend

## Dependencies
* node
* npm
* mongodb


## How to run

* make sure that mongo db is running
* change db host and post if mongo db's host and port are deferent in config.js


* install npm packages

```node
npm install
```

* run back end

```node
node server.js
```
* api will be served ad

```node
localhost:[port]/api/v1/
```

# Assumptions
* user who wants to update an archived note, wants to update the archived note as well
* user who wants to delete an archived note, wants to delete the archived note as well


# APIS

## add a note
```node
localhost:4000/api/v1/notes/add
```

```node
{
	"userId":"chamupathi",
	"content":"first content"
}
```

## update a note

### if archived, update archived note too

## get all notes of a user

## get a specific note with userId and noteId

## get all archived notes of a user

## get all un-archived notes of a user

## delete a note

### if archived, delete archived note too

## archive a note

## un-archive a note

```node
npm build-prod
```


##Angular Routing Access Control

* Add "AuthGuard" to canActivate property of each protected routes

* Add the correct role mapping to auth.guard.ts file

## Imported modules

### Email realted
#### IMAP
https://github.com/mscdex/node-imap


#### Notifications

https://github.com/flauc/angular2-notifications

## MySQL Connection Handling

* configure the mysql connection pool as required (mysqlConnectionPool.js)

* use the connection as below
 ``` node
 var mysqlConnectionPool = require('./mysqlConnectionPool.js');
```
``` node
 mysqlConnectionPool.getConnection(function(err, connection) {
       // Use the connection
       connection.query( 'SELECT something FROM sometable', function(err, rows) {
             // And done with the connection.
             connection.release();
        
             // Don't use the connection here, it has been returned to the pool.
       });
 });
 ```
 
 
## Create a Super Admin Role
 
 * Send a get request to localhost:8080/api/superadmin/add-super-admin
