# Data Parsing

### Requirement
During this test you will be required to write 2 processes that complete each
other. On each process you will write code and configure environments.
* Write a script that will connect to a remote service and retrieve a
JSON-formatted output. Use this API to retrieve the JSON.
* Parse the JSON and iterate through its structure.
* Fetch the contents of each URL (i.e. the file).
* Send the binary, along with the original url to a custom web service that
you will build (create, update).
* Have this service maintain some sort of a data structure to hold your data
(url, file name, file content).
* Have this code run every five minutes (configurable).
* If files already exist, do not overwrite them. Issue a warning and save the
file with an incremented suffix (e.g.: fileName_2).

### Prerequisites
Considering you know about Node.js and Docker, you may run without docker
### Installing
A step by step installation instruction about how to run the application
Clone the repository
```
git clone https://github.com/sunilmnagre/data-parsing.git
```
Navigate to the cloned foler
```
npm install
```

Now, start the application using Docker compose
```
docker-compose up
```
Open the browser and navigate to
```
http://localhost:9000
```

#### Web service API's
POST - http://localhost:9000/api/files
Body
```
{
   "url": "<File URL to get the file from",
   "data": {
     "data": "Data of the file"
    }
}
```

PATCH - http://localhost:9000/api/files/<ID>
