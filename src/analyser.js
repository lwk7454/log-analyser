/**
 * Analyses log entries to extract metrics.
 * @param {Array} entries - Array of parsed log entries.
 * @returns {
 *     uniqueIPCount,
 *     topURLs,
 *     topIPs,
 * }
 */
export function analyseLogs(entries) {
    const urlCount = {}
    const ipActivity = {}

    entries.forEach(({ ip, url }) => {
        urlCount[url] = (urlCount[url] || 0) + 1
        ipActivity[ip] = (ipActivity[ip] || 0) + 1
    })

    const uniqueIPCount = Object.keys(ipActivity).length

    const topURLs = Object.entries(urlCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([url, count]) => ({ url, count }))

    const topIPs = Object.entries(ipActivity)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([ip, count]) => ({ ip, count }))

    return {
        uniqueIPCount,
        topURLs,
        topIPs,
    }
}