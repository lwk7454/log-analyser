import fs from 'fs'
import readline from 'readline'

/**
 * Parses a single line of the log file.
 * @param {string} line - A line from the log file.
 * @returns {object|null} Parsed log entry or null if invalid.
 */
export function parseLine(line) {
    const regex = /^(\d{1,3}(?:\.\d{1,3}){3}) - - \[.*?\] "GET (.*?) HTTP\/1\.1" \d{3} \d+/
    const match = line.match(regex)
    if (match) {
        return {
            ip: match[1],
            url: match[2],
        }
    }
    return null
}

/**
 * Reads and parses the log file.
 * @param {string} filePath - Path to the log file.
 * @returns {Promise<Array>} Array of parsed log entries.
 */
export async function parseLogFile(filePath) {
    const fileStream = fs.createReadStream(filePath)
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    const entries = []

    for await (const line of rl) {
        const parsed = parseLine(line)
        if (parsed) {
            entries.push(parsed)
        }
    }

    return entries
}