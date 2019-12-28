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
## notes contains only basic strings
## user who wants to update an archived note, wants to update the archived note as well
## user who wants to delete an archived note, wants to delete the archived note as well


# APIS

## API postman samples

https://www.getpostman.com/collections/a4bab7641ab17859fb0e

## add a note

* api

```node
localhost:4000/api/v1/notes/add
```

* sample body

```node
{
	"userId":"chamupathi",
	"content":"first content"
}
```

* sample response body

```node
{
	
    "note": "note added successfully",
    "id": "5e073b6d7ac788699360ba57"

}
```

## update a note

### if archived, update archived note too

* api

```node
localhost:4000/api/v1/notes/update/
```

* sample body

```node
{
	"userId":"chamupathi",
	"content":"this is my  note baby archived",
	"id":"5e07375e14bf4d65365435a7"
}
```

* sample success response body

```node
{
    "note": "Note updated!",
    "id": "5e07375e14bf4d65365435a7"
}
```


## get all notes of a user

* api

```node
localhost:4000/api/v1/notes/[userId]
```


* sample success response body

```node
[
    {
        "_id": "5e070ef4620e6d2bb221ca69",
        "content": "5e071892f3296439563a7c74 updated",
        "userId": "chamupathi",
        "archived": true,
        "__v": 0
    },
    {
        "_id": "5e071023aef9392d27b6ded6",
        "content": "first content",
        "userId": "chamupathi",
        "archived": false,
        "__v": 0
    },
]
```

## get a specific note with userId and noteId

* api

```node
localhost:4000/api/v1/notes/[userId]/[id]
```


* sample success response body

```node
{
    "_id": "5e07375e14bf4d65365435a7",
    "content": "this is my  note baby archived",
    "userId": "chamupathi",
    "archived": true,
    "__v": 0
}
```

## get all archived notes of a user


* api

```node
localhost:4000/api/v1/notes/[userId]/archived
```


* sample success response body

```node
[
    {
        "_id": "5e070ef4620e6d2bb221ca69",
        "content": "5e071892f3296439563a7c74 updated",
        "userId": "chamupathi",
        "archived": true,
        "__v": 0
    },
    {
        "_id": "5e071892f3296439563a7c74",
        "content": "5e071892f3296439563a7c74 updated",
        "userId": "chamupathi",
        "archived": true,
        "__v": 0
    }
]
```

## get all un-archived notes of a user


* api

```node
localhost:4000/api/v1/notes/[userId]/notArchived
```


* sample success response body

```node
[
    {
        "_id": "5e071023aef9392d27b6ded6",
        "content": "first content",
        "userId": "chamupathi",
        "archived": false,
        "__v": 0
    },
    {
        "_id": "5e0721b59668694518e55bab",
        "content": "second content",
        "userId": "chamupathi",
        "archived": false,
        "__v": 0
    }
]
```

## delete a note

### if archived, delete archived note too

* api

```node
localhost:4000/api/v1/notes/delete/
```

* sample body

```node
{
	"userId":"chamupathi",
	"id":"5e073b6d7ac788699360ba57"
}
```

* sample success response body

```node
{
    "note": "Note Deleted!",
    "id": "5e073b6d7ac788699360ba57"
}
```



## archive a note


* api

```node
localhost:4000/api/v1/notes/archive/
```

* sample body

```node
{
	"userId":"chamupathi",
	"id":"5e07375e14bf4d65365435a7"
}
```

* sample success response body

```node
{
    "note": "Note Archived!",
    "id": "5e07375e14bf4d65365435a7"
}
```


## un-archive a note

* api

```node
localhost:4000/api/v1/notes/unarchive/
```

* sample body

```node
{
	"userId":"chamupathi",
	"id":"5e07375e14bf4d65365435a7"
}
```

* sample success response body

```node
{
    "note": "Note unarchived",
    "id": "5e07375e14bf4d65365435a7"
}
```


