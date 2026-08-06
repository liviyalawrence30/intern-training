/*
Pattern Recognition Audit
File reviewed: useCounter.ts
1.
No — Reason:Each component using the hook needs its own counter state.
2. 
No — Reason:The switch  handles reducer actions, not object creation.
3. 
No design pattern applies because the hook does not create multiple object types or require shared state.
4. 
The hook manages a single counter state and does not create different objects.
so Singleton and Factory patterns would add complexity.
*/



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
interface ReportGenerator {
  generate(data: Record<string, unknown>[]): string
}
class CSVReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `CSVReportGenerator: generated report with ${data.length} rows`
    )

    if (data.length === 0) {
      return ''
    }

    const headers = Object.keys(data[0]).join(',')

    const rows = data.map(row => Object.values(row).join(','))

    return [headers, ...rows].join('\n')
  }
}
class JSONReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `JSONReportGenerator: generated report with ${data.length} rows`
    )

    return JSON.stringify(data, null, 2)
  }
}
class HTMLReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `HTMLReportGenerator: generated report with ${data.length} rows`
    )

    const rows = data
      .map(row => {
        const cells = Object.values(row)
          .map(value => `<td>${value}</td>`)
          .join('')

        return `<tr>${cells}</tr>`
      })
      .join('')

    return `<table>${rows}</table>`
  }
}
function createReportGenerator(format: string): ReportGenerator {
  switch (format.toLowerCase()) {
    case 'csv':
      return new CSVReportGenerator()

    case 'json':
      return new JSONReportGenerator()

    case 'html':
      return new HTMLReportGenerator()

    default:
      throw new Error(
        `createReportGenerator: unknown format '${format}', expected one of: csv, json, html`
      )
  }
}
const data = [
  { name: 'Rahul', score: 92 },
  { name: 'Priya', score: 78 },
]

const csv = createReportGenerator('csv')
const json = createReportGenerator('json')
const html = createReportGenerator('html')

csv.generate(data)
json.generate(data)
html.generate(data)

console.log(Logger.getInstance().getLogs())

/*
Without the singleton, each report generator would need a logger object to be passed into the constructor 
so that they write to the same logger.
*/


/*
Explore:
1. double checked locking prevents multiple threads from creating more than 1 singleton instance at the same time.
It does not apply to Node.js because JS runs on a single-threaded event loop.

2. 
class ReportGeneratorFactory {
  create(format: string): ReportGenerator {
    switch (format.toLowerCase()) {
      case 'csv':
        return new CSVReportGenerator()

      case 'json':
        return new JSONReportGenerator()

      case 'html':
        return new HTMLReportGenerator()

      default:
        throw new Error(
          `createReportGenerator: unknown format '${format}', expected one of: csv, json, html`
        )
    }
  }
}

Factory class can store the state or configuration while factory function creates objects.

I will use factory function for simple object creation and factory class when additional behaviour is needed. 

3. 
A NoOPNotifier is useful when the notification failure is acceptable and the application needs to continue.
Throwing error immediately alerts us and prevents silent failures.
So throwing is safer.

4.
A class based singleton provides private constructors,encapsulation and controlled access to that single instance.
This matters when the Singleton needs initialization logic, inheritance, or stricter control over its state.
Module level state is simpler and wroks well where only shared state and functions are needed. .
*/