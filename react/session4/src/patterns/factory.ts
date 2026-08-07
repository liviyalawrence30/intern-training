interface ReportGenerator {
  generate(data: Record<string, unknown>[]): string
}

class CSVReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    if (data.length === 0) {
      return ''
    }

    const headers = Object.keys(data[0]).join(',')

    const rows = data.map(row =>
      Object.values(row).join(',')
    )

    return [headers, ...rows].join('\n')
  }
}

class JSONReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    return JSON.stringify(data, null, 2)
  }
}

class HTMLReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
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

export {
  type ReportGenerator,
  CSVReportGenerator,
  JSONReportGenerator,
  HTMLReportGenerator,
  createReportGenerator,
}


const data = [
  { name: 'Alice', score: 91, department: 'Backend' },
  { name: 'Bob',   score: 84, department: 'Frontend' },
]

const csv  = createReportGenerator('csv')
const json = createReportGenerator('json')
const html = createReportGenerator('html')

console.log(csv.generate(data))
console.log(json.generate(data))
console.log(html.generate(data))

/*
The caller only uses the ReportGenerator interface and createReportGenerator(), so it does not need to know how each report generator is created. 
This makes the code easier to maintain and extend. 
Without the factory, the caller would have to import and create each report generator directly, resulting in multiple if/else or switch statements for all five report formats.
*/