const superagent = require('superagent');
const XMLparser = require('xml2js').parseString;
const key = process.env.GOODREADS_KEY; 

async function endpointPromise() {
    return new Promise(resolve => {
        const superagentRequest = superagent.get('https://www.goodreads.com/search/index.xml');
        superagentRequest.buffer();
        superagentRequest.type('xml');
        superagentRequest.query({ key, q: 'ab', search: 'all', page: '1' })
        .then(res => {
                XMLparser(res.text, function (err, result) {
                    resolve(JSON.stringify(result));
                });
            })   
            .catch(err => {
                resolve('error');
        });
    })
}

exports.endpointPromise = endpointPromise;


exports.endpoint = async function(request, response) {
    const responseFromPromise = await endpointPromise();
    response.end(responseFromPromise)
}