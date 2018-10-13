const endpoint = require('./getBooks').endpoint;
const responseFromGoodreads = require('./responseFromGoodreads.json');

describe('when the getBooks endpoint is called', () => {
    describe('with a valid request', () => {
        it('should respond back with all the books', async () =>{
            const mockResponse = {
                end: jest.fn()
            }; 
            
            await endpoint({url: "https://find-books-by-title-author-or-isbn-ztnewtvsrs9y.runkit.sh/?text=ch"}, mockResponse);
            const books = mockResponse.end.mock.calls[0][0];
            const jsonBooks = JSON.parse(books);
            const [ firstBook, secondBook ] = jsonBooks;
            expect(firstBook).toMatchObject({
                title:  "Khobbit: Anglijskij yazyk s Dzhonom R.R. Tolkienom V 2 ch. Ch. 1 (Metod chteniya Il'i Franka)",
                author: "J.R.R. Tolkien",   
            });
            expect(secondBook).toMatchObject({
                title:  "Jane Eyre (Ch)",
                author: "Charlotte Brontë"
            });
            expect(jsonBooks.length).toBe(20);
        })
    })
});