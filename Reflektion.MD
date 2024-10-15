# Reflektion

## Kapitel 2
- getmetadata changed to extract meta data

- getTitles => extractTitles and helement to headerELement

- get lists to extractlist

 Using names like extractUniqueImages and createImageData makes it clear what each function is responsible for.

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

## Kapitel 4

comments 
- workon making functions so clear that perhaps we dont need comments or docs for extract list or titles

extract images && imagedata
The functions are simple enough that they mostly self-explain their purpose, reducing the need for excessive comments.

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

## Kapitel 6  Objects and Data Structures

- extract images Structuring the return of createImageData as an object keeps the data organized, making it easier to modify or extend later.

## Kapitel 7
- Error handling in scrapewebpage is extracted using const outside class
- use try catch

## Kapitel 8

## Kapitel 9

## Kapitel 10 Classes
-  Keeping the list processing logic in a single method could make the code easier to manage within a class context, especially if extractListItems could be reused for other types of list extraction.

- is valid and user agents can also be reused easily

Use of Set for uniqueness is good and aligns with the “keep it simple” principle.

## Kapitel 11