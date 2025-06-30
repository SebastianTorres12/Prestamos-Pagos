/* eslint-disable no-undef */
describe('Solicitar Préstamo Flujo Completo', () => {
    it('Debería solicitar un préstamo exitosamente', () => {
      // Paso 1: Hacer clic en "Iniciar Sesión"
      cy.visit('/login'); // Navega a la página de inicio de sesión
      cy.get('#iniciar-sesion-btn').click(); // Botón "Iniciar Sesión" inicial
  
      // Paso 2: Llenar datos de inicio de sesión (correo, contraseña, MFA) y hacer clic en "Iniciar Sesión"
      cy.get('#correo').type('sebastatoo9@gmail.com'); // Correo
      cy.get('#contrasena').type('SebasTorres2512?'); // Contraseña
      cy.get('#iniciar-sesion-submit-btn').click(); // Botón "Iniciar Sesión" del formulario
  
      // Verificar que el inicio de sesión fue exitoso (opcional)
      cy.url().should('include', '/user/home'); // Asumimos que redirige a un dashboard
  
      // Paso 3: Hacer clic en "Solicitar Préstamo"
      cy.get('#solicitar-prestamo-btn').click();
      cy.url().should('include', '/prestamo/solicitar'); // Verifica que navegó a la página correcta
  
      // Paso 4: Llenar "Ingresos Mensuales" y hacer clic en "Actualizar Finanzos"
      cy.get('#ingresos-mensuales').type('3000'); // Ingresos mensuales
      cy.get('#actualizar-finanzos-btn').click();
      cy.contains('Finanzas actualizadas con éxito').should('be.visible'); // Verifica mensaje de éxito
  
      // Paso 5: Llenar datos del préstamo
      cy.get('#monto-solicitado').type('5000'); // ¿Cuánto dinero necesitas?
      cy.get('#plazo-meses').select('6'); // Selecciona 6 meses (opciones: 3, 6, 9, 12, 24)
      cy.get('#tipo-amortizacion').select('Francés'); // Selecciona amortización "Francés" (opciones: Francés, Alemán)
  
      // Paso 6: Hacer clic en "Calcular Préstamo"
      cy.get('#calcular-prestamo-btn').click();
      cy.contains('Cálculo realizado con éxito').should('be.visible'); // Verifica mensaje de cálculo
  
      // Paso 7: Hacer clic en "Solicitar Préstamo"
      cy.get('#solicitar-prestamo-final-btn').click();
  
      // Verificar que la solicitud fue exitosa
      cy.contains('Préstamo solicitado con éxito').should('be.visible');
      cy.url().should('include', '/prestamo/confirmacion'); // Asumimos que redirige a una página de confirmación
    });
  });