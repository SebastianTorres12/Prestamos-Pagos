// Script automatizado para el escenario RechazarPrestamo usando selenium-webdriver y Firefox
const {Builder, By, Key, until} = require('selenium-webdriver');

async function rechazarPrestamo() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get(process.env.BASE_URL || 'http://localhost:3000');
    await driver.manage().window().maximize();
    await driver.findElement(By.id('iniciar-sesion-btn')).click();
    await driver.wait(until.elementLocated(By.id('correo')), 10000);
    await driver.findElement(By.id('correo')).click();
    await driver.findElement(By.id('correo')).sendKeys('ad');
    await driver.findElement(By.id('correo')).click();
    await driver.findElement(By.id('correo')).click();
    // Doble click en el campo correo
    const correoInput = await driver.findElement(By.id('correo'));
    await driver.actions({bridge: true}).doubleClick(correoInput).perform();
    await driver.findElement(By.id('correo')).sendKeys('admin2@example.com');
    await driver.findElement(By.id('contrasena')).click();
    await driver.findElement(By.id('contrasena')).sendKeys('adminpassword123');
    await driver.findElement(By.css('.w-100')).click();
    // Espera a que cargue la pantalla principal
    await driver.sleep(2000);
    await driver.wait(until.elementLocated(By.linkText('Prestamos')), 10000);
    await driver.findElement(By.linkText('Prestamos')).click();
    // Espera a que la tabla esté visible
    const tabla = await driver.wait(until.elementLocated(By.css('.table-responsive')), 10000);
    await driver.wait(until.elementIsVisible(tabla), 5000);
    // Simula mouseDown, mouseMove, mouseUp (opcional, normalmente no necesario en Selenium)
    await driver.actions({bridge: true}).move({origin: tabla}).press().move({origin: tabla}).release().perform();
    // Click en el botón Rechazar (btn-danger)
    const btnRechazar = await driver.wait(until.elementLocated(By.css('.btn-danger')), 10000);
    await driver.wait(until.elementIsVisible(btnRechazar), 5000);
    try {
      await driver.executeScript('arguments[0].scrollIntoView({behavior: "smooth", block: "center"});', btnRechazar);
      await btnRechazar.click();
    } catch (e) {
      await driver.executeScript('arguments[0].click();', btnRechazar);
    }
    // Espera y valida el alert
    await driver.wait(until.alertIsPresent(), 5000);
    let alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    console.log('Texto del alert:', alertText);
    if (alertText.includes('Préstamo desaprobado exitosamente')) {
      await alert.accept();
    } else {
      throw new Error('El mensaje del alert no es el esperado.');
    }
    await driver.sleep(3000);
  } finally {
    //await driver.sleep(5000);
    await driver.quit();
  }
}
rechazarPrestamo();
