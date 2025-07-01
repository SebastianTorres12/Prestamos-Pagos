// Script automatizado para el escenario SolicitarPrestamoFail usando selenium-webdriver y Firefox
const {Builder, By, Key, until} = require('selenium-webdriver');

async function solicitarPrestamoFail() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get(process.env.BASE_URL || 'http://localhost:3000');
    await driver.manage().window().maximize();
    await driver.findElement(By.id('iniciar-sesion-btn')).click();
    await driver.wait(until.elementLocated(By.id('correo')), 10000);
    await driver.findElement(By.id('correo')).click();
    await driver.findElement(By.id('correo')).click();
    await driver.findElement(By.id('correo')).click();
    // Doble click en el campo correo
    const correoInput = await driver.findElement(By.id('correo'));
    await driver.actions({bridge: true}).doubleClick(correoInput).perform();
    await driver.findElement(By.id('correo')).click();
    await driver.findElement(By.id('correo')).sendKeys('sebastatoo9@gmail.com');
    await driver.findElement(By.id('contrasena')).click();
    await driver.findElement(By.id('contrasena')).sendKeys('SebasTorres2512?');
    await driver.findElement(By.css('.w-100')).click();
    // Espera a que cargue la pantalla principal
    await driver.sleep(2000);
    // Click en el botón Solicitar Préstamo
    await driver.wait(until.elementLocated(By.id('btnSolicitarPrestamo')), 10000);
    await driver.findElement(By.id('btnSolicitarPrestamo')).click();
    await driver.sleep(2000);
  } finally {
    await driver.quit();
  }
}
solicitarPrestamoFail();
