## API RATE LIMITER WITH SLIDING WINDOW ALGORITHM 

This repo contains the code to a micro service rate limiter with the slidingwindow algorithm to curb burst requests.

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

---

_this code has not been written for production._

