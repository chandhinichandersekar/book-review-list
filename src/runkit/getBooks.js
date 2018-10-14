const superagent = require('superagent');
const parseQuery = require('url').parse;
const XMLparser = require('xml2js').parseString;
const key = process.env.GOODREADS_KEY; 

async function endpointPromise(query) {
    return new Promise(resolve => {
        const {text, page} = query;
        const pageOrDefault = page ? page : '1';
        const superagentRequest = superagent.get('https://www.goodreads.com/search/index.xml');
        superagentRequest.buffer();
        superagentRequest.type('xml');
        superagentRequest.query({ key, q: text, search: 'all', page })
        .then(res => {
                XMLparser(res.text, function (err, result) {
                    // const firstTile = result.GoodreadsResponse.search[0].results[0].work[0].best_book[0].title[0];
                    const books = result.GoodreadsResponse.search[0].results[0].work.map(work => {
                        return {
                            title: work.best_book[0].title[0],
                            author: work.best_book[0].author[0].name[0],
                            average_rating: work.average_rating[0]
                        }
                    });
                    resolve(JSON.stringify(books));
                });
            })   
            .catch(err => {
                resolve('error');
        });
    })
}

exports.endpointPromise = endpointPromise;


exports.endpoint = async function(request, response) {
    const parsedUrl = parseQuery(request.url, true);
    console.log("query", parsedUrl.query);
    const responseFromPromise = await endpointPromise(parsedUrl.query);
    response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
    });
    response.end(responseFromPromise)
}