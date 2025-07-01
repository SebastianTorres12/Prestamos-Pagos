// Script automatizado para el escenario AprobarPrestamo usando selenium-webdriver y Firefox
const {Builder, By, Key, until} = require('selenium-webdriver');

async function aprobarPrestamo() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
await driver.get(process.env.BASE_URL || 'http://localhost:3000');    await driver.manage().window().maximize();
    await driver.findElement(By.id('iniciar-sesion-btn')).click();
    // Espera a que el campo correo esté presente antes de llenarlo
    await driver.wait(until.elementLocated(By.id('correo')), 10000);
    await driver.findElement(By.id('correo')).click();
    await driver.findElement(By.id('correo')).sendKeys('admin2@example.com');
    await driver.findElement(By.id('contrasena')).click();
    await driver.findElement(By.id('contrasena')).click(); // click repetido
    await driver.findElement(By.id('contrasena')).sendKeys('adminpassword123');
    await driver.findElement(By.css('.w-100')).click();
    // Espera a que cargue la sección de préstamos
    await driver.sleep(2000);
    await driver.wait(until.elementLocated(By.css('li:nth-child(2) path')), 10000);
    await driver.findElement(By.css('li:nth-child(2) path')).click();
    // Espera y click en el botón Aprobar (btn-success)
    const btnAprobar = await driver.wait(until.elementLocated(By.css('.btn-success')), 10000);
    await driver.wait(until.elementIsVisible(btnAprobar), 5000);
    // Intenta hacer scroll y click, si falla usa JS
    try {
      await driver.executeScript('arguments[0].scrollIntoView({behavior: "smooth", block: "center"});', btnAprobar);
      await btnAprobar.click();
    } catch (e) {
      await driver.executeScript('arguments[0].click();', btnAprobar);
    }
    // Espera y valida el alert
    await driver.wait(until.alertIsPresent(), 5000);
    let alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    console.log('Texto del alert:', alertText);
    if (alertText.includes('Préstamo aprobado exitosamente')) {
      await alert.accept();
    } else {
      throw new Error('El mensaje del alert no es el esperado.');
    }
    await driver.sleep(3000);
  } finally {
    await driver.quit();
  }
}
aprobarPrestamo();
