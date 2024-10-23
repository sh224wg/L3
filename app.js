import express from 'express'
import scraper from './src/scraper.js'

const app = express()
const port = 3000
// Serve static files from the 'public' folder
app.use(express.static('public'))

// Parse URL coded data
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
// Index.html
app.get('/', (req, res => {
    res.sendFile(__dirname + '/public/index.html')
}))
// scraping