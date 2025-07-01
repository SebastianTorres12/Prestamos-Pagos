// Script automatizado para el escenario ReporteLogsSistema usando selenium-webdriver y Firefox
const {Builder, By, Key, until} = require('selenium-webdriver');

async function reporteLogsSistema() {
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
    // Navega a Logs
    await driver.wait(until.elementLocated(By.linkText('Logs')), 10000);
    await driver.findElement(By.linkText('Logs')).click();
    // Interactúa con los campos del filtro
    await driver.wait(until.elementLocated(By.css('.form-control:nth-child(1)')), 10000);
    await driver.findElement(By.css('.form-control:nth-child(1)')).click();
    await driver.findElement(By.css('.form-control:nth-child(3)')).click();
    await driver.findElement(By.css('.form-control:nth-child(3)')).sendKeys('ini');
    // Click en el botón de buscar
    const btnBuscar = await driver.wait(until.elementLocated(By.css('.btn')), 10000);
    await driver.wait(until.elementIsVisible(btnBuscar), 5000);
    await btnBuscar.click();
    // Click en el sidebar para finalizar
    const sidebar = await driver.wait(until.elementLocated(By.css('.sidebar')), 10000);
    await driver.wait(until.elementIsVisible(sidebar), 5000);
    await sidebar.click();
    await driver.sleep(3000);
  } finally {
    await driver.quit();
  }
}
reporteLogsSistema();
