import WebScraper from './module/scraper.js'
import fs from 'fs'
import path from 'path'
import os from 'os'

/**
 * 
 */
class ScraperCLI {
    constructor() {
        this.scraper = new WebScraper()
        this.url = process.argv[2]
        this.desktopPath = path.join(os.homedir(), 'Desktop')
        this.fileName = `scraped-content-${Date.now()}.txt`
        this.filePath = path.join(this.desktopPath, this.fileName)
    }

    //scraper
    async run() {
        try {
            this.validateInput()
            const result = await this.scraper.scrapeWebPage(this.url)
            this.saveToFile(result)
        } catch (error) {
            console.error(`Error: ${error.message}`)
            process.exit(1)
        }
    }

    /**
     * 
     */
    validateInput() {
        if (!this.url) {
            console.error('Please enter URL to scrape.')
            process.exit(1)
        }
        if (!this.scraper.validateUrl(this.url)) {
            console.error('Invalid Url')
            process.exit(1)
        }
    }

    /**
     * 
     * @param {*} result 
     */
    formatResult(result) {

    }
    
    /**
     * 
     */
    saveToFile(result) {
        try {
            if (!fs.existsSync(this.desktopPath)) {
                fs.mkdirSync(this.desktopPath, { recursive: true })
            }
            const formatContent = this.formatResult(result)
            fs.writeFileSync(this.filePath, formatContent)
            console.log(`Scraped data saved to ${this.filePath}`)
        } catch (error) {
            console.error(`Failed to save result to file. Error${error.message}`)
        }
    }
}
export default ScraperCLI
