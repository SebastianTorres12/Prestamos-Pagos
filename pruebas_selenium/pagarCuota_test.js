// Script automatizado para el escenario PagarCuota usando selenium-webdriver y Firefox
const {Builder, By, Key, until} = require('selenium-webdriver');

async function pagarCuota() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get(process.env.BASE_URL || 'http://localhost:3000');
    await driver.manage().window().maximize();
    await driver.findElement(By.css('.display-3')).click();
    await driver.findElement(By.id('iniciar-sesion-btn')).click();
    await driver.findElement(By.css('.mb-3:nth-child(1)')).click();
    await driver.wait(until.elementLocated(By.id('correo')), 10000);
    await driver.findElement(By.id('correo')).click();
    await driver.findElement(By.id('correo')).sendKeys('sebastatoo9@gmail.com');
    await driver.findElement(By.id('contrasena')).click();
    await driver.findElement(By.id('contrasena')).sendKeys('SebasTorres2512?');
    await driver.findElement(By.css('.w-100')).click();
    // Espera a que cargue la pantalla principal
    await driver.sleep(2000);
    // MouseOver y click en Tabla de Amortización
    const linkTabla = await driver.wait(until.elementLocated(By.linkText('Tabla de Amortización')), 10000);
    await driver.actions({bridge: true}).move({origin: linkTabla}).perform();
    await linkTabla.click();
    // Espera a que la tabla esté visible
    const tabla = await driver.wait(until.elementLocated(By.css('.table-responsive')), 10000);
    await driver.wait(until.elementIsVisible(tabla), 5000);
    // Simula mouseDown, mouseMove, mouseUp (opcional, normalmente no necesario en Selenium)
    await driver.actions({bridge: true}).move({origin: tabla}).press().move({origin: tabla}).release().perform();
    // Click en el primer botón de pago disponible (no deshabilitado)
    const btnsPagar = await driver.findElements(By.css('.table-responsive tr .btn'));
    let btnPagarDisponible = null;
    for (const btn of btnsPagar) {
      const disabled = await btn.getAttribute('disabled');
      if (!disabled) {
        btnPagarDisponible = btn;
        break;
      }
    }
    if (!btnPagarDisponible) throw new Error('No hay cuotas disponibles para pagar');
    await driver.wait(until.elementIsVisible(btnPagarDisponible), 5000);
    await btnPagarDisponible.click();
    // Click en el botón Pagar (btn-success)
    const btnSuccess = await driver.wait(until.elementLocated(By.css('.btn-success')), 10000);
    await driver.wait(until.elementIsVisible(btnSuccess), 5000);
    await btnSuccess.click();
    await driver.sleep(3000);
  } finally {
    await driver.sleep(2000);
    await driver.quit();
  }
}
pagarCuota();
