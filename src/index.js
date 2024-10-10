import { parseLogFile } from './parser.js'
import { analyseLogs } from './analyser.js'

async function main() {
    const logFilePath = './logs/programming-task-example-data.log'
    try {
        const entries = await parseLogFile(logFilePath)
        const analysis = analyseLogs(entries)

        console.log('## Log Analysis Results')
        console.log(`- **Unique IP Addresses**: ${analysis.uniqueIPCount}`)
        console.log('- **Top 3 Most Visited URLs**:')
        analysis.topURLs.forEach((item, index) => {
            console.log(`  ${index + 1}. ${item.url} (${item.count} visits)`)
        })
        console.log('- **Top 3 Most Active IP Addresses**:')
        analysis.topIPs.forEach((item, index) => {
            console.log(`  ${index + 1}. ${item.ip} (${item.count} requests)`)
        })
    } catch (error) {
        console.error('Error processing log file:', error)
    }
}

main().then()

