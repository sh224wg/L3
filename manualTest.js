import ScraperCLI from './src/controlLineSetup.js'

/**
 * Manual test script for ScraperCLI.
 * This script tests the formatResult method of ScraperCLI.
 */

const scraperCLI = new ScraperCLI()

const result = {
    title: 'Test Title',
    paragraphs: ['Paragraph 1', 'Paragraph 2'],
    links: ['http://example.com', 'http://example.org']
}

const formattedResult = scraperCLI.formatResult(result)

console.log(formattedResult)