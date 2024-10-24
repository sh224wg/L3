import WebScraper from './module/scraper.js'
import fs from 'fs'
import path from 'path'
import os from 'os'
import readline from 'readline'

/**
 * 
 */
class ScraperCLI {
    constructor() {
        this.scraper = new WebScraper()
        this.url = process.argv[2]
        this.maxPages = parseInt(process.argv[3], 10 || 1)
        this.desktopPath = path.join(os.homedir(), 'Desktop')
        this.fileName = `scraped-content-${Date.now()}.txt`
        this.filePath = path.join(this.desktopPath, this.fileName)
    }

    async promptForPages() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        
    }

    //scraper
    async run() {
        try {
            this.validateInput()
            await this.scraper.scrapeWebPage(this.url, this.maxPages)
            const result = this.scraper.getScrapedData()
            this.saveToFile(result)
        } catch (error) {
            console.error(`Failed to scrape URL: ${this.url}. Error: ${error.message}`)
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
        if (isNaN(this.maxPages) || this.maxPages < 1 || this.maxPages > 5) {
            console.error('Please enter a valid number of pages to scrape (1-5).')
            process.exit(1)
        }
    }

    /**
     * 
     * @param {*} result 
     */
    formatResult(result) {
        let content = 'Scraped Data:\n\n'
        result.forEach((pageContent, index) => {
            content += `Page ${index + 1}:\n`
            for (const [key, value] of Object.entries(pageContent)) { // iterate over object key value pairs
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
        })
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
            fs.writeFileSync(this.filePath, formatContent)
            console.log(`Scraped data saved to ${this.filePath}`)
        } catch (error) {
            console.error(`Failed to save result to file. Error${error.message}`)
        }
    }
}
export default ScraperCLI
