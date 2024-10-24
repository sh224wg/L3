#!/usr/bin/env node
import WebScraper from './module/scraper.js'
import fs from 'fs'
import path from 'path'
import os from 'os'

class ScraperCLI {
    constructor() {
        this.scraper = new WebScraper()
        this.url = process.argv[2]
        this.shouldSaveToFile = process.argv.includes('--save')
        this.desktopPath = path.join(os.homedir(), 'Desktop')
        this.fileName = `scraped-content-${Date.now()}.json`
        this.filePath = path.join(this.desktopPath, this.fileName)
    }

    /* const scraper = new WebScraper()
    const url = process.argv[2] // url from command line
    
    if(!url) {
        console.log('Please enter a URL to scrape.')
    }
    
    // save file to user desktop
    const desktopPath = path.join(os.homedir(),'Desktop') // user desktop
    const fileName = `scraped-content-${Date.now()}.json`// name for each file
    const filePath = path.join(desktopPath, fileName)
     */
    //scraper
    async run() {
        try {
            this.validateInput()
            const result = await this.scraper.scrapeWebPage(this.url)
            this.displayResult(result)
            if (this.shouldSaveToFile) {
                this.saveResultToFile(result)
            }
        } catch (error) {
            console.error(`Error: ${error.message}`)
            process.exit(1)
        }
    }

}


validateInput(){

}

displayResult() {

}

saveToFile(){

}

=> {
    try {
        if (!scraper.validateUrl(url)) {
            console.log('Invalid URL')
            process.exit(1)
        }

        const result = await scraper.scrapeWebPage(url)
        const jsonContent = JSON.stringify(result, null, 2)

        // console.log('Scraped data:', jsonContent);

        fs.writeFileSync(filePath, jsonContent)
        console.log(`Scraped data saved to ${filePath}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
})
