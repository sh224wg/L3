import ScraperCLI from './controlLineSetup.js'
import fs from 'fs'
import path from 'path'
import os from 'os'

jest.mock('fs')
jest.mock('./module/scraper.js', () => {
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

})