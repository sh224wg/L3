Scrapenext page
Single Responsibility (Chapter 3): Each function should do one thing. We can separate out the logic for scraping a single page and handling the process of iterating through pages.
Meaningful Naming (Chapter 2): Use clear function and variable names.
Error Handling (Chapter 7): Add appropriate logs to indicate why the scraping might stop.
Simpler Flow: Use concise and meaningful condition checks.

didnt change too much as i felt that it would make it less logical and add multiple arguemnts which i wanted to avoid

changed find next link to smaller anad devloped it more so it now functions. However, due ot variety in next page buttons and html structure differing on various websites, its difficult to find the next page as it is often hidden in divs, in classes, and lists. This is unfortunate but i am happy that it is now more integrated and works. THe universality of navigation is perhaps too much to conquer for now.

FINAL
much better end result as its not one large confusing json file but formatted 

# Reflection
The project provided me alot of insight into the way that i write and develop my code. As i began comparing my code to that of the ideal version described in clean code i realised how much i lack or am less aware of. 
It was a very positive experience to actively learn about how to improve the way you write code, something i feel that we have not done so much of as we are mainly focusing on a solution. 

## Kapitel 2 Names
In my reflection on L2, I realized that I overuse the word get in function names like getMetadata and getTitles for extracting DOM elements. According to Clean Code principles, using precise names is crucial, and the term get can often be misunderstood, especially since it might imply a getter method rather than an action like scraping or extracting data. As a result I renamed my functions, changing getMETHOD to extractMETHOD, resulting in names like extractMetaData and extractTitles. This change better communicates the purpose of each method, making it clear that these functions are extracting specific HTML elements from the DOM. Communicating the functions responsibility. I also renamed the main scraping method to scrapeWebPage to indicate its purpose. My main focus was on the Intention-Revealing Names aspect of the code so that functions would indicates their intention without additional explanation. It was insightful to see how simply naming could improve the readability of the code.

## Kapitel 3 Functions
dont repeat yourself 
- changed getmetadata to simpler less repetitive function
- shorter now too
- considered turning it into smaller helper funcitons but it would have made it more confusing espcially with names 

extractParagraph
- made it shorter by variables in same line for push

extractlistdetails
- helper function for li which makes function shorter and focuses main elemnts into extractlist, because it is so long

extactimages && createImageData
- By breaking down the image extraction logic into smaller methods, each method does one thing well.

Alignment: The refactoring breaks the code into smaller functions, each with a clear purpose:
scrapeNextPage manages the loop and controls the scraping process.
scrapeSinglePage focuses on scraping one page and finding the next page.
#findNextLink and #findNextButton focus on locating specific elements.
Where It Could Improve: The functions are concise, but keeping each function as small as possible while ensuring clarity is key. This has largely been achieved here.


## Kapitel 4

comments 
- workon making functions so clear that perhaps we dont need comments or docs for extract list or titles

extract images && imagedata
The functions are simple enough that they mostly self-explain their purpose, reducing the need for excessive comments.

Alignment: The code doesn’t rely on comments, which is generally good as it implies that the code is self-explanatory.

## Kapitel 5 Formatting
tables method : 
Structure the code for better readability. in tables and images they are aligned in a narrative structure 

the code as a whole follows a clear narrative to how the methods intertwine 

Reduce Nesting:
With smaller functions, the original deeply nested logic is now flattened, which makes it easier to follow.

Each function has a specific responsibility:

findTables handles finding and filtering tables.
ExtractTableRow focuses on extracting rows from a given table.
extracttablecell deals with extracting and trimming text from cells.

Moved retry scraper to top so its closer to scraper because its calls scraper (dependent functions)

Alignment: The code is well-organized and consistently formatted:
Each function is separated clearly.
Proper indentation and spacing make the code easy to read.
Array.from() is used for better readability when working with collections.
Where It Could Improve: The formatting is already clear and consistent, so the focus should be on maintaining

## Kapitel 6  Objects and Data Structures

- extract images Structuring the return of createImageData as an object keeps the data organized, making it easier to modify or extend later.

Alignment: The use of an object to pass multiple arguments into scrapeSinglePage keeps related data together, which is a key principle.
The code uses objects effectively but always good to ensure that the data structures chosen (e.g., arrays for links) match the needs of the function. 

## Kapitel 7
- Error handling in scrapewebpage is extracted using const outside class
- use try catch

Alignment: The code incorporates basic error handling and user feedback through logging:
Logs are used to indicate why the scraping stops (No content found, No next page found).
Using a clear message when breaking out of loops helps with understanding the flow during debugging.


## Kapitel 8

Alignment: The code isolates different parts of the logic into helper functions, respecting the boundaries between various tasks:
scrapeNextPage focuses on controlling the pagination.
#findNextLink, extractCells and rows focus on finding specific elements.

## Kapitel 9 Unit Tests

Alignment: code structure makes unit testing easier:
Smaller functions like scrapeSinglePage and #findNextLink can be tested independently.
By isolating responsibilities, functions can be mocked or tested without reliance on other parts of the code.



## Kapitel 10 Classes
-  Keeping the list processing logic in a single method could make the code easier to manage within a class context, especially if extractListItems could be reused for other types of list extraction.

- is valid and user agents can also be reused easily

Use of Set for uniqueness is good and aligns with the “keep it simple” principle.

Alignment: The code uses methods within a class (this.scrapeWebPage, this.#findNextPage). The methods are organized in a way that respects encapsulation, like using # for private methods (#findNextLink, #findNextButton).

## Kapitel 11 Systems

Alignment: The code is modular, making it easy to change one part without affecting others:
If the logic for a function or method changes the methods dependant on it can be modified accordingly tex finding the next page changes, #findNextPage can be modified without affecting scrapeNextPage.
If the scraping mechanism needs to be adjusted, scrapeSinglePage can be updated independently.
