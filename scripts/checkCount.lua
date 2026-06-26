local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])

-- Get the current time
local now = tonumber(redis.call('TIME')[1]) * 1000

-- Set the start of the window
local windowStart = now - (window * 1000)

-- Get rid of everything older than the window start time
redis.call('ZREMRANGEBYSCORE', key, 0, windowStart)

-- Count what's in the ZSET
local count = tonumber(redis.call('ZCARD', key))


-- return the count and the remaining
return { count, limit - count}