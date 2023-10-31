import delyTime from "./useTimeout.js";

export let csvData = [];

export const OpenWebsite = async (url, page) => {

    try {
        await page.setDefaultNavigationTimeout(100000);
        await page.goto(url);
        try {
            await page.waitForSelector('a[data-testid="search-listing-title"]');
            const anchors = await page.$$('a[data-testid="search-listing-title"]');
            let hrefs = [];
            for (const anchor of anchors) {
                await delyTime(1000);
                const href = await page.evaluate(a => a.getAttribute('href'), anchor);
                console.log('Anchor Href:', href);
                hrefs.push(href);
            }
            for (const href of hrefs) {
                await page.goto(`https://www.autotrader.co.uk${href}`);
                await page.waitForSelector('p[data-testid="advert-title"]');
                const name = await page.$eval('p[data-testid="advert-title"]', el => el.innerText);
                const price = await page.$eval('h2[data-testid="advert-price"]', el => el.innerText);
                const mileage = await page.$eval('#layout-desktop > article > section.sc-fKDIaf.fRGlLh > ul > li:nth-child(1) > span > p', el => el.innerText);
                const engineSize = await page.$eval('#layout-desktop > article > section.sc-fKDIaf.fRGlLh > section > dl:nth-child(1) > div:nth-child(3) > dd', el => el.innerText);
                const url = await page.url();
                const parsedUrl = new URL(url);
                const model = parsedUrl.searchParams.get('model');
                csvData.push({
                    "name": name,
                    "model": model,
                    "mileage": mileage,
                    "engineSize": engineSize,
                    "price": price,
                    "picture": "pictureURL"
                })
                console.log("csv data array", csvData);
                await delyTime(1000)
            }
        } catch (error) {
            console.log(error.message, "error from login inside openWebiste Function")

        }

    } catch (error) {

        console.log(error.message, "error from open website from  openWebiste Function its likly internet issue")
    }
}

// export const fetchingAll

//example to store csv in array
// csvData.push({
//     "name": IDNum,
//     "model": APIkey,
//     "mileage": `https://${IDNum.toLowerCase()}.myshopify.com`,
//     "engineSize": storepassword,
//     "picture": printFulAPIKey
//   });