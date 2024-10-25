# Web Scraper

## Description
This project is a Command Line Interface (CLI) web scraper app that allows users to input a URL and receive the scraped content as a file.

## Version
1.0.0

## Vision
The vision behind this project is to create an accessible and efficient tool for web scraping that allows users to easily extract and save information from websites. By providing a simple CLI interface, the project aims to make web scraping accessible to both technical and non-technical users. The tool is designed to handle a wide range of HTML elements, ensuring comprehensive data extraction for various use cases such as data analysis, research, and content aggregation.

## Installation
1. Ensure that you have node.js and npm installed on your machine. You can verify this by running:
    ```bash
    node -v
    npm -v
    ```
2. Clone the repository:
    ````
    git clone https://github.com/sh224wg/L3.git
    ````
3. Navigate to the project directory: 
    ````
     cd L3
    ````
4. Run `npm install -g .` to install the CLI tool globally, allowing you to run the `scrape` command from anywhere  
   on your system:
    ```bash
    npm install -g .
    ```

## Usage
To run the Scraper app use the `scrape` comman in the CLI followed by the url. Note that this command will only work if the application has been installed globally:
``bash
    scrape <URL>
``

## Dependencies
- Node.js
- npm
- jsdom
- node-fetch
- standard

## Functional Requirements
1. URL input
    - The user can input a URL and recieve the scraped content

2. Elements
    - The Scraper extracts a wide range of HTML elements

3. Error Handling
    - The scraper should log erros and have error handling to deal with exceptions.

4. Results
    - Results are presented to the user as a file and a message is logged.

### Non Functional requirements
1. Performance
    - The application should only take 3 seconds to scrape the content and save it.
2. Usability
    - The user is able to simply use the application by just writing scrape followed by the URL to scrape.
3. Readability
    - The user is informed through console log messages regarding if the webpage is scraped successfully or not.

### Test 
To run tests use the following command
npx jest
For more information regarding tests please see the test folder.

### License
This project is licensed under the MIT License

### Author 
Saskia Heinemann

