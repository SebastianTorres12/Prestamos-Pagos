// Script automatizado para el escenario ReportePagos usando selenium-webdriver y Firefox
const {Builder, By, Key, until} = require('selenium-webdriver');

async function reportePagos() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get(process.env.BASE_URL || 'http://localhost:3000');
    await driver.manage().window().maximize();
    await driver.findElement(By.id('iniciar-sesion-btn')).click();
    await driver.wait(until.elementLocated(By.id('correo')), 10000);
    await driver.findElement(By.id('correo')).click();
    await driver.findElement(By.id('correo')).sendKeys('admin2@example.com');
    await driver.findElement(By.id('contrasena')).click();
    await driver.findElement(By.id('contrasena')).sendKeys('adminpassword123');
    await driver.findElement(By.css('.w-100')).click();
    // Espera a que cargue la pantalla principal
    await driver.sleep(2000);
    // Navega a Pagos
    await driver.wait(until.elementLocated(By.linkText('Pagos')), 10000);
    const linkPagos = await driver.findElement(By.linkText('Pagos'));
    await linkPagos.click();
    // MouseOver en Pagos
    await driver.actions({bridge: true}).move({origin: linkPagos}).perform();
    // MouseOut (mover fuera de Pagos)
    const body = await driver.findElement(By.tagName('body'));
    await driver.actions({bridge: true}).move({origin: body, x: 0, y: 0}).perform();
    // Click en el botón de la sección
    const btn = await driver.wait(until.elementLocated(By.css('.btn')), 10000);
    await driver.wait(until.elementIsVisible(btn), 5000);
    await btn.click();
    await driver.sleep(3000);
  } finally {
    await driver.quit();
  }
}
reportePagos();
