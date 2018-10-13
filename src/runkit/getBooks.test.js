const endpoint = require('./getBooks').endpoint;
const responseFromGoodreads = require('./responseFromGoodreads.json');

describe('when the getBooks endpoint is called', () => {
    describe('with a valid request of no page', () => {
        it('should respond back with all the books', async () =>{
            const mockRequest = {
                url: "https://find-books-by-title-author-or-isbn-ztnewtvsrs9y.runkit.sh/?text=ch"
            };
            const mockResponse = {
                writeHead: jest.fn(),
                end: jest.fn()
            }; 
            
            await endpoint(mockRequest, mockResponse);
            const books = mockResponse.end.mock.calls[0][0];
            const jsonBooks = JSON.parse(books);
            expect(jsonBooks).toMatchSnapshot();
        })
    })

    describe('with a valid request of page 2', () => {
        it('should respond back with all the books', async () =>{
            const mockRequest = {
                url: "https://find-books-by-title-author-or-isbn-ztnewtvsrs9y.runkit.sh/?text=ch&page=2"
            };
            const mockResponse = {
                writeHead: jest.fn(),
                end: jest.fn()
            }; 
            
            await endpoint(mockRequest, mockResponse);
            const books = mockResponse.end.mock.calls[0][0];
            const jsonBooks = JSON.parse(books);
            expect(jsonBooks).toMatchSnapshot();
        })
    })
});