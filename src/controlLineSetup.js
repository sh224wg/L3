import WebScraper from './module/scraper.js'
import fs from 'fs'
import path from 'path'
import os from 'os'


/**
 * Class representing a command-line interface for the WebScraper.
 */
class ScraperCLI {
    /**
     * Creates an instance of ScraperCLI.
     * Initializes the WebScraper instance and sets up file paths for saving scraped content.
     */
    constructor() {
        this.scraper = new WebScraper()
        this.url = process.argv[2]
        this.desktopPath = path.join(os.homedir(), 'Desktop')
        this.fileName = `scraped-content-${Date.now()}.txt`
        this.filePath = path.join(this.desktopPath, this.fileName)
    }

    /**
     * Runs the web scraping process.
     * Validates the input URL, scrapes the web page, retrieves the scraped data, and saves it to a file.
     * Exits the process with an error message if any step fails.
     */
    async run() {
        try {
            this.validateInput()
            await this.scraper.scrapeWebPage(this.url)
            const result = this.scraper.getScrapedData()
            this.saveToFile(result)
            console.log('Scraping successful! The result has been saved to:', this.filePath)
        } catch (error) {
            console.error(`Error: ${error.message}`)
            process.exit(1)
        }
    }

    /**
     * Validates the input URL provided to the CLI.
     * Exits the process with an error message if the URL is missing or invalid.
     */
    validateInput() {
        if (!this.url) {
            console.error('Please enter URL to scrape.')
            process.exit(1)
        }
        if (!this.scraper.validateUrl(this.url)) {
            console.error('Invalid Url, Please enter valid URL')
            process.exit(1)
        }
    }

    /**
     * Formats the scraped result into a readable string.
     * @param {Object} result - The scraped result to be formatted.
     * @returns {string} The formatted result as a string.
     */
    formatResult(result) {
        let content = 'Scraped Data:\n\n'
        for (const [key, value] of Object.entries(result)) { // iterate over object key value pairs
            content += `${key.toUpperCase()}:\n` // key to upper case
            if (Array.isArray(value)) { // if value is array join elements into string otherwise add to content
                content += value.map(item => typeof item === 'object' ? JSON.stringify(item, null, 2) : item).join('\n') + '\n'
            } else if (typeof value === 'object') {
                content += JSON.stringify(value, null, 2) + '\n'
            } else {
                content += value + '\n'
            }
            content += '\n'
        }
        return content
    }

    /**
     * Saves the scraped result to a file on the desktop.
     * @param {Object} result - The scraped result to be saved.
     */
    saveToFile(result) {
        try {
            if (!fs.existsSync(this.desktopPath)) {
                fs.mkdirSync(this.desktopPath, { recursive: true })
            }
            const formatContent = this.formatResult(result)
            fs.writeFileSync(this.filePath, formatContent)
        } catch (error) {
            console.error(`Failed to save result to file. Error${error.message}`)
        }
    }
}
export default ScraperCLI