import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

const ERROR_MESSAGES = {
    INVALID_URL: 'Invalid URL',
    NETWORK_ERROR: 'Network error',
    SCRAPING_FAILED: ' Failed to scrape'
}

/**
 * Class representing a web scraper.
 */
class WebScraper {
    constructor() {
        this.scrapedData = null
    }


    /**
     * Validate if a given URL is valid.
     * @param {string} url - The URL to validate.
     * @returns {boolean} True if the URL is valid, false otherwise.
     */
    validateUrl(url) {
        try {
            new URL(url)
            return true
        } catch (error) {
            return false
        }
    }

    /**
     * Get a random User-Agent string.
     * @returns {string} A random User-Agent string.
     */
    selectRandomUserAgent() {
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
            'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0'
        ]
        return userAgents[Math.floor(Math.random() * userAgents.length)]
    }

    buildHeaderOptions(options) {
        return {
            headers: options.headers || {
                'User-Agent': this.selectRandomUserAgent()
            }
        }
    }

    extractDataFromDom(document) {
        return {
            text: document.body.textContent ? document.body.textContent.trim() : '',
            metaData: this.extractMetaData(document),
            titles: this.extractTitles(document),
            paragraphs: this.extractParagraphs(document),
            lists: this.extractLists(document),
            images: this.extractImages(document),
            links: this.extractLinks(document),
            spans: this.extractSpans(document),
            tables: this.extractTables(document)
        }
    }

    /**
    * Get the scraped data.
    * @returns {Object} The scraped data.
    */
    getScrapedData() {
        return this.scrapedData;
    }

    /**
     * Scrape a URL for content.
     * @param {string} url - The URL to scrape.
     * @param {Object} [options={}] - Optional settings.
     * @param {Object} [options.headers] - Optional headers for the request.
     * @returns {Promise<Object>} The scraped content.
     * @throws {Error} If the network response is not ok or scraping fails.
     */
    async scrapeWebPage(url, options = {}) {
        this.validateUrl(url)
        const fetchOptions = this.buildHeaderOptions(options)
        try {
            const response = await fetch(url, fetchOptions)
            if (!response.ok) {
                throw new Error(ERROR_MESSAGES.NETWORK_ERROR)
            }
            const text = await response.text()
            const dom = new JSDOM(text)
            const document = dom.window.document
            this.scrapedData = this.extractDataFromDom(document)
            return this.scrapedData
        } catch (error) {
            console.log(`Failed to scrape URL: ${url}. Error ${error.message}`)
            throw new Error(ERROR_MESSAGES.SCRAPING_FAILED)
        }
    }


    /**
     * Extract metadata from the document.
     * @param {Document} document - The DOM document.
     * @returns {Object} The extracted metadata.
     */
    extractMetaData(document) {
        const collectMetadata = (name) => {
            const meta = document.querySelector(`meta[name="${name}"]`)
            return meta ? meta.getAttribute('content').trim() : ''
        }
        return {
            title: document.querySelector('title') ? document.querySelector('title').textContent : '',
            description: collectMetadata('description'),
            keywords: collectMetadata('keywords')
        }
    }

    /**
     * Extract titles from the document.
     * @param {Document} document - The DOM document.
     * @returns {Array<Object>} The extracted titles.
     */
    extractTitles(document) {
        const titles = []
        const uniqueTitles = new Set()
        const headerElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        headerElements.forEach(h => {
            const text = h.textContent.trim()
            if (text && !uniqueTitles.has(text)) {
                uniqueTitles.add(text)
                titles.push({ tag: h.tagName.toLowerCase(), text: text })
            }
        })
        return titles
    }

    /**
    * Extract paragraphs from the document.
    * @param {Document} document - The DOM document.
    * @returns {Array<Object>} The extracted paragraphs.
    */
    extractParagraphs(document) {
        const paragraphs = []
        const uniqueParagraphs = new Set()
        const paragraphElements = document.querySelectorAll('p')
        for (let i = 0; i < paragraphElements.length; i++) {
            const p = paragraphElements[i]
            const text = p.textContent.trim()
            if (text && !uniqueParagraphs.has(text)) {
                uniqueParagraphs.add(text)
                paragraphs.push({ tag: 'p', text: text })
            }
        }
        return paragraphs
    }

    /**
     * Extract lists from the document.
     * @param {Document} document - The DOM document.
     * @returns {Array<Object>} The extracted lists.
     */
    extractLists(document) {
        const lists = []
        const uniqueList = new Set()
        const ulElements = document.querySelectorAll('ul')
        ulElements.forEach(ul => {
            const items = this.extractListItems(ul)
            if (items.length > 0) {
                const itemString = JSON.stringify(items)
                if (!uniqueList.has(itemString)) {
                    uniqueList.add(itemString)
                    lists.push({ tag: 'ul', items: items })
                }
            }
        })
        return lists
    }

    extractListItems(ul) {
        const items = []
        const liElements = ul.querySelectorAll('li')
        liElements.forEach(li => {
            const text = li.textContent.trim()
            if (text) { items.push(text) }
        })
        return items
    }

    /**
     * Extract images from the document.
     * @param {Document} document - The DOM document.
     * @returns {Array<Object>} The extracted images.
     */
    extractImages(document) {
        const images = []
        const uniqueImages = new Set()
        const imageElements = document.querySelectorAll('img')
        for (const img of imageElements) {
            const imageData = this.createImageData(img)
            if (imageData && !uniqueImages.has(imageData.uniqueId)) {
                uniqueImages.add(imageData.uniqueId)
                images.push(imageData.data)
            }
        }
        return images
    }

    createImageData(img) {
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt') || ''
        const title = img.getAttribute('title') || ''
        if (!src) {
            return null
        }
        const overlap = src.split('/').slice(-1)[0].split('?')[0]
        const uniqueId = `${overlap}-${alt}-${title}`
        return {
            uniqueId, data: { src, alt, title }
        }
    }

    /**
     * Extract links from the document.
     * @param {Document} document - The DOM document.
     * @returns {Array<Object>} The extracted links.
     */
    extractLinks(document) {
        const links = []
        const uniqueLinks = new Set()
        const aElements = document.querySelectorAll('a')
        aElements.forEach(a => {
            const href = a.getAttribute('href')
            if (href && !uniqueLinks.has(href)) {
                uniqueLinks.add(href)
                links.push({ href: href, text: a.textContent ? a.textContent.trim() : '' })
            }
        })
        return links
    }

    /**
     * Extract spans from the document.
     * @param {Document} document - The DOM document.
     * @returns {Array<string>} The extracted spans.
     */
    extractSpans(document) {
        const spans = []
        const uniqueSpans = new Set()
        const spanElements = document.querySelectorAll('span')
        spanElements.forEach(span => {
            const text = span.textContent.trim()
            if (text && !uniqueSpans.has(text)) {
                uniqueSpans.add(text)
                spans.push(text)
            }
        })
        return spans
    }

    /**
     * Extract tables from the document.
     * @param {Document} document - The DOM document.
     * @returns {Array<Array<string>>} The extracted tables.
     */
    extractTables(document) {
        const tables = []
        const uniqueTables = new Set()
        const tableElements = document.querySelectorAll('table')

        tableElements.forEach((tableElement) => {
            const rows = this.extractTableRows(tableElement)
            const tableHTML = tableElement.outerHTML.trim()

            if (rows.length > 0 && !uniqueTables.has(tableHTML)) {
                uniqueTables.add(tableHTML)
                tables.push(rows)
            }
        })
        return tables
    }

    extractTableRows(tableElement) {
        const rows = []
        const rowElements = tableElement.querySelectorAll('tr')

        rowElements.forEach((rowElement) => {
            const cells = this.extractTableCells(rowElement)
            rows.push(cells)
        })
        return rows
    }

    extractTableCells(rowElement) {
        const cells = []
        const cellElements = rowElement.querySelectorAll('td, th')
        cellElements.forEach((cellElement) => {
            cells.push(cellElement.textContent.trim())
        })
        return cells//rows.push(cells)
    }
    /**
     * Retry scraping a URL a specified number of times.
     * @param {string} url - The URL to scrape.
     * @param {number} [tries=3] - The number of retry attempts.
     * @returns {Promise<Object>} The scraped content.
     * @throws {Error} If all retry attempts fail.
     */
    async retryScrape(url, tries = 3) {
        for (let attempt = 1; attempt <= tries; attempt++) {
            try {
                console.log(`Attempt ${attempt} to scrape ${url}`)
                return await this.scrapeWebPage(url)
            } catch (error) {
                if (attempt < tries) {
                    console.log(`Attempt ${attempt} failed. Trying again...`)
                } else {
                    console.log(`All ${tries} failed.`)
                    throw error
                }
            }
        }
    }

    /**
     * Scrape multiple pages starting from a URL.
     * @param {string} url - The starting URL.
     * @param {number} [maxPages=5] - The maximum number of pages to scrape.
     * @returns {Promise<Array<Object>>} The scraped content from all pages.
     */
    async scrapeNextPage(url, maxPages = 5) {
        let currentUrl = url
        let scrapedContent = []

        for (let i = 1; i <= maxPages; i++) {
            console.log(`Scraping page ${i}: ${currentUrl}`)
            const pageContent = await this.scrapeWebPage(currentUrl)
            if (!pageContent) { console.log(`No content found on page ${page}. Scraping ended.`)
                break
            }
            scrapedContent.push(pageContent)
            const nextPageUrl = this.#findNextPage(new JSDOM(pageContent.text).window.document)
            if (!nextPageUrl) { console.log(`No next page found after page ${i}. Scraping ended.`)
                break
            }
            currentUrl = new URL(nextPageUrl, currentUrl).href
        }
        console.log(`Total pages scraped: ${scrapedContent.length}`)
        return scrapedContent
    }


    /**
     * Find the next page link or button in the content.
     * @param {Document} document - The Dom document.
     * @returns {string|null} The URL of the next page or null if not found.
     */

    #findNextPage(document) {
        const nextLinkOrButton = this.#findNextLinkOrButton(document)
        if (nextLinkOrButton) {
            return nextLinkOrButton.href
        }

        const nextPaginationLink = this.#findNextPaginationLink(document)
        if (nextPaginationLink) {
            return nextPaginationLink.href
        }
        return null
    }

    /**
    * Find the next link or button that represents a "next" action.
    * @param {Document} document - The DOM document.
    * @returns {Element|null} The next link or button element or null.
    */
    #findNextLinkOrButton(document) {
        const potentialNextElements = [
            ...document.querySelectorAll('a, button')
        ]
        return potentialNextElements.find(element => this.#isNextLinkOrButton(element))
    }

    /**
     * Check if an element is a "next" link or button.
     * @param {Element} element - The DOM element to check.
     * @returns {boolean} True if the element is a "next" link or button, otherwise false.
     */
    #isNextLinkOrButton(element){
        const text = element.textContent?.toLowerCase() || '';
        return (
            text.includes('next') || text.includes('>') || text.includes('»') ||
            (element.title?.toLowerCase().includes('next')) || (element.getAttribute('aria-label')?.toLowerCase() === 'next')
        )
    }
    
    /**
     * Find the next pagination link or button in the content.
     * @param {Document} document - The DOM document.
     * @returns {Element|null} The next pagination link or button, null if not found.
     */
    #findNextPaginationLink(document){
        const paginationContainer = document.querySelector('.pagination, .pagination-container')
        if (!paginationContainer) return null

        return paginationContainer.querySelector('a.next, button.next, a[rel="next"], button[rel="next"]') || null
    }
}

export default WebScraper
