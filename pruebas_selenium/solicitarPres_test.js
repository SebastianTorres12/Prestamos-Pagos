// Script automatizado para el escenario SolicitarPrestamo usando selenium-webdriver y Firefox
const {Builder, By, Key, until} = require('selenium-webdriver');

async function solicitarPrestamo() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get(process.env.BASE_URL || 'http://localhost:3000');
    // Maximiza la ventana para evitar problemas de visualización
    await driver.manage().window().maximize();
    await driver.findElement(By.id('iniciar-sesion-btn')).click();
    await driver.findElement(By.css('.mb-3:nth-child(1)')).click();
    // Espera a que el campo correo esté presente antes de llenarlo
    await driver.wait(until.elementLocated(By.id('correo')), 10000);
    await driver.findElement(By.id('correo')).click();
    await driver.findElement(By.id('correo')).sendKeys('sebastatoo9@gmail.com');
    await driver.findElement(By.id('contrasena')).click();
    await driver.findElement(By.id('contrasena')).click(); // click repetido
    await driver.findElement(By.id('contrasena')).click(); // click repetido
    await driver.findElement(By.id('contrasena')).sendKeys('SebasTorres2512?');
    await driver.findElement(By.css('.w-100')).click();
    // Espera adicional para notificación/redirección
    await driver.sleep(2000);
    // Espera y click en el botón de la pestaña de préstamos
    await driver.wait(until.elementLocated(By.id('btnSolicitarPrestamo')), 10000);
    const btnSolicitar = await driver.findElement(By.id('btnSolicitarPrestamo'));
    await btnSolicitar.click();
    // Espera adicional para que cargue el formulario de solicitud de préstamo
    await driver.sleep(5000);
    // Espera a que el campo de monto esté presente antes de interactuar
    await driver.wait(until.elementLocated(By.css('.mb-3:nth-child(1) > .form-control')), 10000);
    await driver.findElement(By.css('.mb-3:nth-child(1) > .form-control')).click();
    await driver.findElement(By.css('.mb-3:nth-child(1) > .form-control')).sendKeys('850');
    await driver.findElement(By.css('.btn-warning')).click();
    // Espera y scroll hacia el campo de cuota
    await driver.sleep(1000);
    const cuotaInput = await driver.wait(until.elementLocated(By.css('.mb-3:nth-child(5) > .form-control')), 10000);
    await driver.wait(until.elementIsVisible(cuotaInput), 5000);
    // Depuración: imprime el HTML del input
    const cuotaHtml = await driver.executeScript('return arguments[0].outerHTML;', cuotaInput);
    console.log('HTML del input de cuota:', cuotaHtml);
    try {
      await driver.executeScript('arguments[0].scrollIntoView({behavior: "smooth", block: "center"});', cuotaInput);
      await cuotaInput.click();
      await cuotaInput.clear();
      await cuotaInput.sendKeys('1000');
    } catch (e) {
      // Si falla el click, usa JS para focus y set value
      await driver.executeScript('arguments[0].focus(); arguments[0].value = "1000";', cuotaInput);
    }
    // Espera y click en el botón Calcular Préstamo
    const btnInfo = await driver.wait(until.elementLocated(By.css('.btn-info')), 5000);
    await driver.wait(until.elementIsVisible(btnInfo), 5000);
    await btnInfo.click();
    // Espera y click en el botón Solicitar Préstamo
    const btnSuccess = await driver.wait(until.elementLocated(By.css('.btn-success')), 5000);
    await driver.wait(until.elementIsVisible(btnSuccess), 5000);
    await btnSuccess.click();
    await driver.sleep(2000);
    // Espera adicional para ver el resultado final
    await driver.sleep(5000);
  } finally {
    await driver.quit();
  }
}

solicitarPrestamo();
