## Distributed Rate Limiter as a Service
A standalone HTTP microservice that any backend can integrate with 
to enforce rate limiting without building the logic themselves.


---
###  HOW IT WORKS
 This uses redis under the hood to store the requests and uses a lua script to count and remove the records from redis. There is only one algorithm being used at the moment and that is the sliding window algorithm which is implemented in the slidingWindow.lua file.
#### This rate limiter only has three routes
 **/consume**
the consume route receives the requests and runs the sliding window algorithm on them, it returns a json  object containing the the status of the request( allowed or denied ), the count of the request within the window and the remaining requests.

**/check**
The check route is read-only, it runs it's own lua script called checkCount.lua to check how many requests are left in redis and returns a json object with the count of the request and the remainnig requests left in that window.

**/stats/:key**
The check route returns the stats of the /:key in the url which returns a json object with the stats of that key which are: 

- key
- count 
- entries 
- ttl


---
###  HOW TO RUN IT  
To run this code make sure you have redis installed, however do not run the redis start command because that command has been added to the dev script in package.json

#### Run this command to start the api rate limiter
`npm run dev` 

#### Usage
POST /consume
```
 fetch('http://localhost:3000/consume', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      key: `user:${userId}:api`,
      limit: 100,
      window: 60
    })
  })
```

#### Why Lua Scripts
Rate limiting requires an atomic check-and-increment operation. 
Without atomicity, two concurrent requests can both pass the limit 
check before either increments the counter. Lua scripts run atomically 
inside Redis, making this race condition impossible.

_this code has not been written for production._

