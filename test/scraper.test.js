import WebScraper from '../src/module/scraper.js'
import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'

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

    test('validateUrl should return false for invalid URLs', () => {
        expect(scraper.validateUrl('invalid-url')).toBe(false)
    })

    test('selectRandomUserAgent should return a non-empty string', () => {
        const userAgent = scraper.selectRandomUserAgent()
        expect(typeof userAgent).toBe('string')
        expect(userAgent.length).toBeGreaterThan(0)
    })

    test('buildHeaderOptions should include a User-Agent header', () => {
        const headers = scraper.buildHeaderOptions({})
        expect(headers.headers['User-Agent']).toBeDefined()
    })

    test('extractDataFromDom should extract text content from a DOM document', () => {
        const dom = new JSDOM('<html><body><p>Test paragraph</p></body></html>')
        const data = scraper.extractDataFromDom(dom.window.document)
        expect(data.text).toBe('Test paragraph')
    })

    test('scrapeWebPage should return scraped content', async () => {
        const url = 'https://example.edu'
        const mockResponse = '<html><body><p>Test paragraph</p></body></html>'
        fetch.mockImplementation(() =>
            Promise.resolve({
                ok: true,
                text: () => Promise.resolve(mockResponse),
            })
        )
        const data = await scraper.scrapeWebPage(url)
        expect(data.text).toBe('Test paragraph')
    })

    test('scrapeAndFindNextPage should return the next page URL when a next link is present', async () => {
        scraper.scrapeWebPage = jest.fn().mockResolvedValue({
            text: `
                <html>
                    <body>
                        <p>Test paragraph</p>
                        <a href="/next" rel="next">Next</a>
                    </body>
                </html>
            `,
        })
        const url = 'http://example.edu'
        const { pageContent, nextPageUrl } = await scraper.scrapeAndFindNextPage(url, 1)

        expect(pageContent).not.toBeNull()
        expect(pageContent.text).toContain('Test paragraph')
        expect(nextPageUrl).toBe('/next')
    })
})
