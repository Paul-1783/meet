import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 250, // slow down by 250ms,
      timeout: 0, // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  test("An event is collapsed by default", async () => {
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide its details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeNull();
  });
});

describe(" Filter Events By City", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      // slowMo: 250, // slow down by 250ms,
      timeout: 0, // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
  });

  test("When user hasn’t searched for a city, show upcoming events from all cities.", async () => {
    const eventList = await page.$("#event-list");
    expect(eventList).toBeDefined();
  });

  test("User should see a list of suggestions when they search for a city.", async () => {
    await page.waitForSelector("#city-search");
    await page.keyboard.type("Berlin");
    const citySugggestions = await page.$(".suggestions");
    expect(citySugggestions).toBeDefined();
  });

  test("User can select a city from the suggested list.", async () => {
    await page.waitForSelector(".city");
    await page.type(".city", "Berlin, Germany");
    const selectedSuggestion = await page.$eval(".city", (e) => e.value);
    expect(selectedSuggestion).toBe("Berlin, Germany");
  });
});
