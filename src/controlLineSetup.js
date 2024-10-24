#!/usr/bin/env node
import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'
import WebScraper from './module/scraper.js'
import fs from 'fs'
import path from 'path'
import os from 'os'

const scraper = new WebScraper()
const url = process.argv[2] // url from command line

if(!url) {
    console.log('Please enter a URL to scrape.')
}