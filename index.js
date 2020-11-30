const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.leitura.com.br/');

  const images = await page.evaluate(() =>{

    const List = document.querySelectorAll('[class="owl-stage"] img');

    const array = [...List];

    const lis = array.map( img => ({
        src: img.src
    }) )

    return lis;
  })

  const names = await page.evaluate(() =>{
      const List = document.querySelectorAll('[class="owl-stage-outer"] h2');

      let Names = [...List];
      console.log(Names);

      const array = Names.map((text) => ({
        name: text.innerText,
      }))
      return (array);
  })


  console.log(names);

  fs.writeFile('leitura.json', JSON.stringify(names, null, 2), (err) =>{
      if(err) throw new error('Deu ruim');

      console.log('Isso ai meu chapinha');
  });

})();