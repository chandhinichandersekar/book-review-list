const endpoint = require('./getBooks').endpoint;
const responseFromGoodreads = require('./responseFromGoodreads.json');

describe('when the getBooks endpoint is called', () => {
    describe('with a valid request', () => {
        it('should respond back with all the books', async () =>{
            const mockResponse = {
                end: jest.fn()
            }; 
            
            await endpoint(jest.fn, mockResponse);
            const books = mockResponse.end.mock.calls[0][0];
            const jsonBooks = JSON.parse(books);
            const [ firstBook, secondBook ] = jsonBooks;
            expect(firstBook).toMatchObject({
                title:  "ANIMAL FARM (AB)",
                author: "George Orwell",   
            });
            expect(secondBook).toMatchObject({
                title:  "Ardil-22 (Catch-22, # 1)",
                author: "Joseph Heller"
            });
            expect(jsonBooks.length).toBe(20);
        })
    })
});