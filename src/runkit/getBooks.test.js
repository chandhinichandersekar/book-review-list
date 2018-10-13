const endpoint = require('./getBooks').endpoint;
const responseFromGoodreads = require('./responseFromGoodreads.json');

describe('when the getBooks endpoint is called', () => {
    describe('with a valid request', () => {
        it('should respond back with all the books', async () =>{
            const mockResponse = {
                end: jest.fn()
            }; 
            
            await endpoint(jest.fn, mockResponse);
            const response = mockResponse.end.mock.calls[0][0]
            expect(JSON.parse(response)).toMatchObject({
                "GoodreadsResponse": {
                    "Request": [
                      {
                        "authentication": [
                          "true"
                        ],
                        "key": [
                          "RDfV4oPehM6jNhxfNQzzQ"
                        ],
                        "method": [
                          "search_index"
                        ]
                      }
                    ]
                }
            });
        })
    })
});