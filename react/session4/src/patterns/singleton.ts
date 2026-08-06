class Logger{
    private constructor(){
        
    }
    static instance: Logger | null = null;
    static getInstance(): Logger {
  if (this.instance === null) {
    this.instance = new Logger();
  }
  return this.instance;
}
private logs: string[] = [];

log(message: string): void {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${message}`;
  this.logs.push(entry);
  console.log(entry);
}

getLogs(): string[] {
  return [...this.logs];  // Return a copy, not the original
}
}
const a = Logger.getInstance()
const b = Logger.getInstance()

a.log('system started')
b.log('request received')

console.log(a === b)             
console.log(a.getLogs().length) 

/*
If I removed the private constructor, multiple instances of the logger class could be created.
It breaks the singleton pattern.
The breakage can be detected during testing 'a===b' returns true now but if the singleton pattern is broken, it would return false.
*/

function testLoggerStartsEmpty() {
  const logger = Logger.getInstance()
  logger.log('left over from a previous operation')
  const fresh = Logger.getInstance()
  console.log('Logs should be empty:', fresh.getLogs())
}

function testLoggerCountsCorrectly() {
  const logger = Logger.getInstance()
  logger.log('entry one')
  console.log('Expected 1 log, got:', logger.getLogs().length)
}

testLoggerStartsEmpty()
testLoggerCountsCorrectly()

//The singleton persists data so many logs are shown .
//This breaks the test isolation because they are dependent.
//reset() method can be added to the logger class to support testing.