import ScraperCLI from './src/controlLineSetup.js'
import fs from 'fs'
import os from 'os'
import path from 'path'

jest.mock('fs')
jest.mock('os')
jest.mock('./src/module/scraper.js')
