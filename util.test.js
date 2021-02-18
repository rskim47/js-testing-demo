const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util'); // natively supported in jest

// Output Test
test("should output name and age", () => {
  const text = generateText('Max', 29); // actual test 
  expect(text).toBe('Max (29 years old)');
  const text2 = generateText('Anna', 28);
  expect(text2).toBe('Anna (28 years old)'); // can add to the test
}); // function provided by jest, can define a single test

// Adding a 2nd test might make sense as well 
test('should output data-less text', () => {
  const text = generateText('', null);
  expect(text).toBe(' (null years old)');
});

// Integration Tests
test('should generate a valid text output', () => {
  const text = checkAndGenerate("Max", 29);
  expect(text).toBe('Max (29 years old)');
});

test('should create an element with text and correct class', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 80,
    // args: ['--window-size=1920,1080']
  });
  const page = await browser.newPage();
  await page.goto(
    'file:////Users/rskim47/coding/js-testing-introduction/index.html'
  );
  await page.click('input#name');
  await page.type('input#name', 'Anna');
  await page.click('input#age');
  await page.type('input#age', '28');
  await page.click('#btnAddUser');
  const finalText = await page.$eval('.user-item', el => el.textContent);
  expect(finalText).toBe('Anna (28 years old)');
}, 10000);
