import ScraperCLI from './src/controlLineSetup.js'
import fs from 'fs'
import path from 'path'
import os from 'os'

jest.mock('fs')
jest.mock('./src/module/scraper.js', () => {
    return jest.fn().mockImplementation(() => {
        return {
            scrapeWebPage: jest.fn(),
            getScrapedData: jest.fn(),
            validateUrl: jest.fn()
        }
    })
})

describe('ScraperCLI', () => {
    let scraperCLI

    beforeEach(() => {
        jest.resetAllMocks()
        scraperCLI = new ScraperCLI()
    })


    test('should save scraped result to file', () => {
        const result = { key: 'value' }
        const formattedResult = 'Scraped Data:\n\nKEY:\nvalue\n\n'
        scraperCLI.formatResult = jest.fn().mockReturnValue(formattedResult)

        scraperCLI.saveToFile(result)

        expect(fs.writeFileSync).toHaveBeenCalledWith(scraperCLI.filePath, formattedResult)
    })
})