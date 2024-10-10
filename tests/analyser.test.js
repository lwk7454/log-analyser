import { analyseLogs } from '../src/analyser.js'

test('analyseLogs correctly computes metrics', () => {
    const entries = [
        { ip: '192.168.1.1', url: '/home' },
        { ip: '192.168.1.2', url: '/about' },
        { ip: '192.168.1.1', url: '/home' },
        { ip: '192.168.1.3', url: '/contact' },
        { ip: '192.168.1.1', url: '/about' },
    ]

    const result = analyseLogs(entries)

    expect(result.uniqueIPCount).toBe(3)
    expect(result.topURLs).toEqual([
        { url: '/home', count: 2 },
        { url: '/about', count: 2 },
        { url: '/contact', count: 1 },
    ])
    expect(result.topIPs).toEqual([
        { ip: '192.168.1.1', count: 3 },
        { ip: '192.168.1.2', count: 1 },
        { ip: '192.168.1.3', count: 1 },
    ])
})