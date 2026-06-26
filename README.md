# ** API RATE LIMIMTER WITH SLIDING WINDOW ALGORITHM **

#### This repo contains the code to a micro service rate limiter with the slidingwindow algorithm to curb burst requests

### ** HOW IT WORKS **
#### This uses redis under the hood to store the requests and uses a lua script to count and remove the records the from redis. There is only one algorithm being used at the moment at that is the sliding window algorithm which is implemented in the lua file.

### ** HOW TO RUN IT ** 
#### To run this code make sure you have redis installed, however do not run the redis start command because that command has been added to the dev script in package.json
#### Run `npm run dev` to start the rate limiter

