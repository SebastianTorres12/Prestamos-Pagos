// Script automatizado para el escenario CancelarPagoCuota usando selenium-webdriver y Firefox
const {Builder, By, Key, until} = require('selenium-webdriver');

async function cancelarPagoCuota() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get(process.env.BASE_URL || 'http://localhost:3000');
    await driver.manage().window().maximize();
    await driver.findElement(By.id('iniciar-sesion-btn')).click();
    await driver.wait(until.elementLocated(By.id('correo')), 10000);
    await driver.findElement(By.id('correo')).click();
    await driver.findElement(By.id('correo')).sendKeys('sebastatoo9@gmail.com');
    await driver.findElement(By.id('contrasena')).click();
    await driver.findElement(By.id('contrasena')).sendKeys('SebasTorres2512?');
    await driver.findElement(By.css('.w-100')).click();
    // Espera a que cargue la pantalla principal
    await driver.sleep(2000);
    // Scroll al tope
    await driver.executeScript('window.scrollTo(0,0)');
    // Navega a Préstamos
    await driver.wait(until.elementLocated(By.linkText('Préstamos')), 10000);
    await driver.findElement(By.linkText('Préstamos')).click();
    // Navega a Tabla de Amortización
    await driver.wait(until.elementLocated(By.linkText('Tabla de Amortización')), 10000);
    await driver.findElement(By.linkText('Tabla de Amortización')).click();
    // Espera a que la tabla esté visible
    const tabla = await driver.wait(until.elementLocated(By.css('.table-responsive')), 10000);
    await driver.wait(until.elementIsVisible(tabla), 5000);
    // Simula mouseDown, mouseMove, mouseUp (opcional, normalmente no necesario en Selenium)
    await driver.actions({bridge: true}).move({origin: tabla}).press().move({origin: tabla}).release().perform();
    // Click en el botón de la segunda fila
    const btnPagar = await driver.wait(until.elementLocated(By.css('tr:nth-child(2) .btn')), 10000);
    await driver.wait(until.elementIsVisible(btnPagar), 5000);
    await btnPagar.click();
    // Click en el botón Cancelar (btn-secondary)
    const btnCancelar = await driver.wait(until.elementLocated(By.css('.btn-secondary')), 10000);
    await driver.wait(until.elementIsVisible(btnCancelar), 5000);
    await btnCancelar.click();
    await driver.sleep(3000);
  } finally {
    await driver.quit();
  }
}
cancelarPagoCuota();
