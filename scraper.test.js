import WebScraper from './src/module/scraper.js'
import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

jest.mock('node-fetch')