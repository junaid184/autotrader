import puppeter from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import CvsMaking from "csv-writer"
import fs from "fs"
import { csvData, OpenWebsite } from './useFunction.js'
import delyTime from './useTimeout.js';
puppeter.use(StealthPlugin())
const url =  //url to visit
    'https://www.autotrader.co.uk/car-search?postcode=SW1W%200NY&make=Volkswagen&model=Caddy%20Maxi&include-delivery-option=on&advertising-location=at_cars&page=1';

const puppeterdiplay = (async () => {
    const browser = await puppeter.launch({
        headless: false,
        defaultViewpageort: null,
        // args: ["--start-maximized", "--no-sandbox", '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36'],
        // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        // userDataDir: "C: /Users/GOOOD/AppData/Local/Google/Chrome/User Data/Default",
    })
    let page = await browser.newPage();
    await page.setViewport({
        width: 1400,
        height: 700,
        deviceScaleFactor: 2,
    });
    await OpenWebsite(url, page)
    await delyTime(1000)

    console.log("finally your csv file is being made, kindly wait for 5 to 7 seconds")
    await delyTime(5000)

    const csvHeaders = [
        { id: 'name', title: 'name                                            ' },

        { id: 'model', title: 'model                                          ' },

        { id: 'mileage', title: 'mileage                                          ' },

        { id: 'engineSize', title: 'engineSize                      ' },

        { id: 'price', title: 'price' },

        { id: 'picture', title: 'picture                    ' },
    ];

    try {
        const cheaderWithName = CvsMaking.createObjectCsvWriter({
            path: 'output.csv',
            header: csvHeaders,
        });

        // Write the data to the CSV file

        cheaderWithName.writeRecords(csvData)
            .then(() => console.log('CSV file successfully written'))
            .catch((err) => console.error(err))

    } catch (error) {
        console.log(error.message)

    }

    //browser close
    // await browser.close()
})
puppeterdiplay()

