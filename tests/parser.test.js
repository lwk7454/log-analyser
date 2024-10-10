import { parseLine } from '../src/parser.js'

test('parseLine correctly parses a valid log line', () => {
    const line = '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574'
    const result = parseLine(line)
    expect(result).toEqual({
        ip: '177.71.128.21',
        url: '/intranet-analytics/',
    })
})

test('parseLine returns null for invalid log line', () => {
    const line = 'Invalid log entry'
    const result = parseLine(line)
    expect(result).toBeNull()
})