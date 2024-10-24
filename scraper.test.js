import WebScraper from './src/module/scraper.js'
import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

jest.mock('node-fetch', () => {
    return {
        __esModule: true,
        default: jest.fn(),
    }
})

describe('WebScraper', () => {
    let scraper

    beforeEach(() => {
        scraper = new WebScraper()
    })

    test('validateUrl should return true for valid URLs', () => {
        expect(scraper.validateUrl('https://example.com')).toBe(true)
    })
})