
import express from 'express'
import scraper from './src/module/scraper.js'

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

app.post('/scrape', async (req, res) => {
    const { url } = req.body // get URL from form
    try {
        const data = await scraper.scrapeWebPage(url) // call scraper
        res.json({success: true, data}) // send back in Json
    } catch (error) {
        res.json({sucess : false, error: error.message})
    }
})

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`)
})