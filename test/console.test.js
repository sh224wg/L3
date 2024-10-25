import ScraperCLI from '../src/controlLineSetup.js'
import fs from 'fs'

jest.mock('fs')
jest.mock('./src/module/scraper.js')
jest.mock('node-fetch', () => {
    return {
        __esModule: true,
        default: jest.fn(),
    }
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

    test('should validate input URL and exit if URL is missing', () => {
        scraperCLI.url = null
        const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => { })
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { })

        scraperCLI.validateInput()

        expect(consoleErrorSpy).toHaveBeenCalledWith('Please enter URL to scrape.')
        expect(exitSpy).toHaveBeenCalledWith(1)

        exitSpy.mockRestore()
        consoleErrorSpy.mockRestore()
    })

    test('should exit with an error message if run method fails', async () => {
        scraperCLI.url = 'https://example.edu'
        scraperCLI.validateInput = jest.fn()
        scraperCLI.scraper.scrapeWebPage.mockRejectedValue(new Error('Scraping failed'))
        const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => { })
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { })

        await scraperCLI.run()

        expect(consoleErrorSpy).toHaveBeenCalledWith('Error: Scraping failed')
        expect(exitSpy).toHaveBeenCalledWith(1)

        exitSpy.mockRestore()
        consoleErrorSpy.mockRestore()
    })
})