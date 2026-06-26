

local key = KEYS[1] -- the user id 
local limit = tonumber(ARGV[1]) -- the number of requests allowed per window e.g: 5 requests per 10 seconds
local window = tonumber(ARGV[2]) -- the number of seconds for a window e.g: 10 seconds


-- Get current server time
-- This returns a list with two numbers, seconds and microseconds like so [seconds , microseconds]
-- lua lists count starting from one
-- multiply by a 1000 to convert to miliseconds
local now = redis.call('TIME')[1] * 1000


-- calculate the start of our window
-- anything outside this gets thrown
local windowStart = now - (window * 1000)

-- remove all entries that are outside the current time
redis.call('ZREMRANGEBYSCORE', key, 0, windowStart)

-- count how many requests are left in the window
local count = tonumber(redis.call('ZCARD', key))

-- if we are at or over the limit deny the request
if count >= limit then 
    return {0, count, limit - count}
end

-- this is where the ZSET is actually created the first run 
-- this adds the timestamps to the specific zset
redis.call('ZADD', key, now, now)

-- this where the clean up happens 
-- after the specific window time is reached the zset is deleted
-- for example if no requests come in after one request and 5 seconds elapse then the zset will be deleted
-- constant requests keep the zset alive because they constantly update the window 
redis.call('EXPIRE', key, window)

-- this is where the values are returned from the calculation
-- these values will be used to determine if the request went through or not
return {1, count + 1, limit - (count + 1)}
