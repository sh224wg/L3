import WebScraper from './src/module/scraper.js'

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
        expect(scraper.validateUrl('https://example.edu')).toBe(true)
    })
})