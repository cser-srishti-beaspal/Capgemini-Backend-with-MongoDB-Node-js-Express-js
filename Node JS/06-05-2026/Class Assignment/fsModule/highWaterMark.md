# Node.js Streams – highWaterMark (Size 20)
## What is highWaterMark?
### highWaterMark is the buffer size limit for streams.

### It tells Node.js:
### “How much data should be stored in memory before stopping the flow temporarily?”

### Think of it like a water tank level:
### Tank empty → allow more water (read more data)
### Tank full → stop filling until some water is used
### This is the core of Backpressure in Node.js.


## Default values (important for interviews)

### Stream type	                      |   Default highWaterMark
### Readable streams (binary)	        |  64 KB
### Readable streams (object mode)	  |  16 objects
### Writable streams (binary)	        |  16 KB
### Writable streams (object mode)	  |  16 objects
### When we say size 20, we are overriding this default.


## Why highWaterMark exists?

### Without it:
### => Node would load huge files into RAM
### => Memory crash 
### With streams + highWaterMark:
### => Read small chunks
### => Process chunk
### => Read next chunk
### => Memory stays stable
### This is why streams are used for:
### => Large files
### => Video streaming
### => Network requests
### => Databases


## Where we use highWaterMark
### You’ll see it mainly in:
### 1 File Streams
### => fs.createReadStream()
### => fs.createWriteStream()
### 2 HTTP Streams
### => req
### => res
### 3 Custom Streams
### => new stream.Readable()
### =>new stream.Writable()
### 4 Pipe Operations
### => readStream.pipe(writeStream)

## How we use highWaterMark (size 20)
### Example 1 — Read stream with buffer size 20 bytes
const fs = require("fs");

const stream = fs.createReadStream("bigfile.txt", {
  highWaterMark: 20   // read only 20 bytes per chunk
});

stream.on("data", chunk => {
  console.log("Chunk:", chunk.toString());
});

### Node reads file in 20-byte pieces
### Instead of:
loading whole file 
loads small chunks 

### Example 2 — Writable stream
const writeStream = fs.createWriteStream("out.txt", {
  highWaterMark: 20
});

### This means:
### Only 20 bytes allowed in buffer
### If buffer full → stop writing → wait → resume
### This prevents memory overflow.

## How highWaterMark works internally (Flow)
### Step-by-step
1 Stream reads data into buffer
2 Buffer reaches highWaterMark
3 Stream pauses reading
4 Data is consumed (written/processed)
5 Buffer free → resume reading
### This is called Backpressure mechanism
### Interview keyword: Flow control

## Flow vs Pause mode relation
Mode	          |     Role of highWaterMark
Flowing mode	  |   Controls chunk size
Paused mode	    |   Controls when to resume

### Why size = 20? (R&D angle)

Setting a small value like 20 helps in:
: Testing backpressure behavior
: Debugging stream flow
: Memory performance testing
: Learning chunk processing

In real apps you may use:
: 64KB for files
: MBs for video streaming

### Real-world example
Uploading big file to server:
Without streams:
Client → send 1GB → server RAM 

With streams + highWaterMark:
Client → send 20KB → process → send next → safe 

## INTERVIEW QUESTIONS (Very Important)
### Basic

### Q1. What is highWaterMark?
A buffer limit that controls how much data a stream stores before pausing.

### Q2. Why do we need highWaterMark?
To implement backpressure and prevent memory overflow.

### Q3. Default value of highWaterMark?
Readable binary → 64KB
Writable binary → 16KB
Object mode → 16 objects


### Q4. What happens when buffer exceeds highWaterMark?
Stream stops reading until buffer drains.

### Q5. What problem does highWaterMark solve?
Producer-consumer speed mismatch.
Producer fast → Consumer slow → buffer fills → pause.

### Q6. Is highWaterMark memory limit?
No
It’s a threshold, not strict limit.

Streams can exceed slightly internally.

### Q7. Difference between chunk size and highWaterMark?

Chunk	                |   highWaterMark
Actual piece of data	| Max buffer capacity

### Q8. How is highWaterMark related to backpressure?
It triggers backpressure when buffer is full.

### Q9. When should you increase highWaterMark?
Fast disks
High bandwidth networks
Large file streaming
Video/audio pipelines

### Q10. When should you decrease it?
Low memory systems
IoT devices
Debugging streams