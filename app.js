const fetch = require('node-fetch');
const puppeteer = require('puppeteer')


const test = async () => {
    let data = {
        "id": "W09", "items": [{
            "id": "2028660__W09",
            "itemNumber": "2028660",
            "quantityRequested": 1,
            "offerQuantity": null,
            "isOffer": false,
            "newOfferMade": true,
            "offerPrice": null
        }]
    };
    
    let url = "https://buy.hylamobile.com/shopping-carts/json/CUST5";
    let response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        // credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
    });
    console.log('response => ', response);

    // if (response.status === 200) {
    //     console.log('success');
    // } else if (response.status === 400) {
    //     console.log('bad request');
    // } else if (response.status === 401) {
    //     console.log('unauthorized');
    // }
}

const credentials = {
    user: "carloscastillo24@gmail.com",
    pass: "MakitoVerde1@"
}

const login = async () => {
    const username = '#username'
    const password = '#password'
    const login = ".btn.btn-primary.btn-lg.btn-block"

    const browser = await puppeteer.launch({
        headless: false,
        devtools: true
    });
    const page = await browser.newPage()
    let url = "https://buy.hylamobile.com/";
    await page.goto(url)

    await page.waitForSelector(username)
    await page.type('#username', credentials.user)
    await page.click(username)

    await page.waitForSelector(password)
    await page.type(password, credentials.pass)

    await page.waitForSelector(login)
    await page.click(login)
    await page.waitForNavigation()

    await page.evaluate(test);
}

login()