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
            await this.scraper.scrapeWebPage(this.url)
            const result = this.scraper.getScrapedData()
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
            console.error('Invalid Url, Please enter valid URL')
            process.exit(1)
        }
    }

    /**
     * 
     * @param {*} result 
     */
    formatResult(result) {
        let content = 'Scraped Data:\n\n'
        for (const [key, value] of Object.entries(result)) { // iterate over object key value pairs
            content += `${key.toUpperCase()}:\n` // key to upper case
            if(Array.isArray(value)) { // if value is array join elements into string otherwise add to content
                content += value.map(item => typeof item === 'object' ? JSON.stringify(item, null, 2) : item).join('\n') + '\n' 
            } else if(typeof value === 'object') {
                content += JSON.stringify(value, null, 2) + '\n'
            } else {
                content += value + '\n'
            }
            content += '\n'
        }
        return content
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
            console.log('Formatted Content:', formatContent); // Debugging line
            fs.writeFileSync(this.filePath, formatContent)
        } catch (error) {
            console.error(`Failed to save result to file. Error${error.message}`)
        }
    }
}
export default ScraperCLI