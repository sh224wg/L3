Scrapenext page
Error Handling (Chapter 7): Add appropriate logs to indicate why the scraping might stop.
Simpler Flow: Use concise and meaningful condition checks.

didnt change too much as i felt that it would make it less logical and add multiple arguemnts which i wanted to avoid


FINAL
much better end result as its not one large confusing json file but formatted 

# Reflection
The project provided me alot of insight into the way that i write and develop my code. As i began comparing my code to that of the ideal version described in clean code i realised how much i lack or am less aware of. 
It was a very positive experience to actively learn about how to improve the way you write code, something i feel that we have not done so much of as we are mainly focusing on a solution. 

## Kapitel 2 Names
In my reflection on L2, I realized that I overuse the word get in function names like getMetadata and getTitles for extracting DOM elements. According to Clean Code principles, using precise names is crucial, and the term get can often be misunderstood, especially since it might imply a getter method rather than an action like scraping or extracting data. As a result I renamed my functions, changing getMETHOD to extractMETHOD, resulting in names like extractMetaData and extractTitles. This change better communicates the purpose of each method, making it clear that these functions are extracting specific HTML elements from the DOM. Communicating the functions responsibility. I also renamed the main scraping method to scrapeWebPage to indicate its purpose. I wanted each function to do just one thing, but I ended up with functions like findAndScrapeNextPage and scrapeNextPage and the names were so similar that it got confusing. Even though they are doing different things, it felt like I might be complicating things. My main focus was on the Intention-Revealing Names aspect of the code so that functions would indicates their intention without additional explanation. It was insightful to see how simply naming could improve the readability of the code.  

## Kapitel 3 Functions
There were alot of improvements to be made based on the functions chapter that i thought would be most challenging as my functions were very long. I was able to seperate my methods into much shorter ones, using helper methods and it was interesting to see how easy it was to break them into three of four functions to align with single responsiblity as is discussed in clean code. ScrapeWebPage could be seperated into one helper function for formatting, headers, user agents and a main function which significantly reduced length as it was my longest. I also tried to break down and work on the multiple page scraping aspect and the result was many helper functions to handle specific elements, like pagination, next buttons, and links, which did make my longest functions shorter. However, due to variety in next page buttons and html structure differing on various websites, its difficult to find the next page as it is often hidden in divs, in classes, and lists. This is unfortunate but the universality of navigation is perhaps too much to conquer for now. In L2 my functions were very repetive and so i tried to follow Do Not Repeat yourself more, i feel that i acheived this as my extract methods are shorter and broken into helper functions that make things much clearer and easier to understand. Overall aligning the code with Clean code functions was difficult as i struggled to find a balance between short and understandable.

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
