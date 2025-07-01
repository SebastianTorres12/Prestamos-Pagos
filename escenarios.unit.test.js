// escenarios.unit.test.js
// Pruebas unitarias simuladas para lógica de préstamos y pagos
// Ejecuta con: npx jest escenarios.unit.test.js

// Simulación de modelos y lógica básica
class Usuario {
  constructor({id, correo, bloqueado = false}) {
    this.id = id;
    this.correo = correo;
    this.bloqueado = bloqueado;
  }
}
class Prestamo {
  constructor({id, usuario, monto, plazo, estado = 'PENDIENTE'}) {
    this.id = id;
    this.usuario = usuario;
    this.monto = monto;
    this.plazo = plazo;
    this.estado = estado;
    this.cuotas = [];
  }
}
class Cuota {
  constructor({id, prestamo, estado = 'PENDIENTE'}) {
    this.id = id;
    this.prestamo = prestamo;
    this.estado = estado;
  }
}

// Simulación de base de datos en memoria
let usuarios = [];
let prestamos = [];
let cuotas = [];

// Funciones principales
function solicitarPrestamo(usuarioId, monto, plazo) {
  const usuario = usuarios.find(u => u.id === usuarioId);
  if (!usuario) throw new Error('UsuarioNoEncontrado');
  if (usuario.bloqueado) throw new Error('UsuarioBloqueado');
  if (monto < 100 || monto > 10000) throw new Error('MontoInvalido');
  if (plazo < 3 || plazo > 36) throw new Error('PlazoInvalido');
  const prestamo = new Prestamo({id: prestamos.length+1, usuario, monto, plazo});
  prestamos.push(prestamo);
  return prestamo;
}
function aprobarPrestamo(prestamoId) {
  const prestamo = prestamos.find(p => p.id === prestamoId);
  if (!prestamo) throw new Error('PrestamoNoEncontrado');
  if (prestamo.estado !== 'PENDIENTE') throw new Error('EstadoInvalido');
  prestamo.estado = 'APROBADO';
  // Genera cuotas
  for (let i=1; i<=prestamo.plazo; i++) {
    const cuota = new Cuota({id: cuotas.length+1, prestamo});
    prestamo.cuotas.push(cuota);
    cuotas.push(cuota);
  }
  return prestamo;
}
function rechazarPrestamo(prestamoId) {
  const prestamo = prestamos.find(p => p.id === prestamoId);
  if (!prestamo) throw new Error('PrestamoNoEncontrado');
  if (prestamo.estado !== 'PENDIENTE') throw new Error('EstadoInvalido');
  prestamo.estado = 'RECHAZADO';
  return prestamo;
}
function pagarCuota(cuotaId) {
  const cuota = cuotas.find(c => c.id === cuotaId);
  if (!cuota) throw new Error('CuotaNoEncontrada');
  if (cuota.estado === 'PAGADA') throw new Error('CuotaYaPagada');
  if (cuota.prestamo.estado !== 'APROBADO') throw new Error('PrestamoNoAprobado');
  cuota.estado = 'PAGADA';
  return cuota;
}
function cancelarPagoCuota(cuotaId) {
  const cuota = cuotas.find(c => c.id === cuotaId);
  if (!cuota) throw new Error('CuotaNoEncontrada');
  if (cuota.estado !== 'PAGADA') throw new Error('CuotaNoPagada');
  cuota.estado = 'PENDIENTE';
  return cuota;
}

// Pruebas unitarias con Jest
beforeEach(() => {
  usuarios = [new Usuario({id: 1, correo: 'user1@mail.com'}), new Usuario({id: 2, correo: 'user2@mail.com', bloqueado: true})];
  prestamos = [];
  cuotas = [];
});

test('Solicitar préstamo con datos válidos', () => {
  const prestamo = solicitarPrestamo(1, 500, 12);
  expect(prestamo).toBeDefined();
  expect(prestamo.usuario.id).toBe(1);
  expect(prestamo.monto).toBe(500);
  expect(prestamo.plazo).toBe(12);
});
test('Solicitar préstamo con usuario inexistente', () => {
  expect(() => solicitarPrestamo(99, 500, 12)).toThrow('UsuarioNoEncontrado');
});
test('Solicitar préstamo con monto fuera de rango', () => {
  expect(() => solicitarPrestamo(1, 50, 12)).toThrow('MontoInvalido');
});
test('Solicitar préstamo con plazo fuera de rango', () => {
  expect(() => solicitarPrestamo(1, 500, 2)).toThrow('PlazoInvalido');
});
test('Solicitar préstamo con usuario bloqueado', () => {
  expect(() => solicitarPrestamo(2, 500, 12)).toThrow('UsuarioBloqueado');
});
test('Aprobar préstamo pendiente', () => {
  const prestamo = solicitarPrestamo(1, 500, 6);
  const aprobado = aprobarPrestamo(prestamo.id);
  expect(aprobado.estado).toBe('APROBADO');
  expect(aprobado.cuotas.length).toBe(6);
});
test('Rechazar préstamo pendiente', () => {
  const prestamo = solicitarPrestamo(1, 500, 6);
  const rechazado = rechazarPrestamo(prestamo.id);
  expect(rechazado.estado).toBe('RECHAZADO');
});
test('Intentar aprobar préstamo ya aprobado', () => {
  const prestamo = solicitarPrestamo(1, 500, 6);
  aprobarPrestamo(prestamo.id);
  expect(() => aprobarPrestamo(prestamo.id)).toThrow('EstadoInvalido');
});
test('Intentar rechazar préstamo ya aprobado', () => {
  const prestamo = solicitarPrestamo(1, 500, 6);
  aprobarPrestamo(prestamo.id);
  expect(() => rechazarPrestamo(prestamo.id)).toThrow('EstadoInvalido');
});
test('Pagar cuota pendiente', () => {
  const prestamo = solicitarPrestamo(1, 500, 6);
  aprobarPrestamo(prestamo.id);
  const cuota = prestamo.cuotas[0];
  const pagada = pagarCuota(cuota.id);
  expect(pagada.estado).toBe('PAGADA');
});
test('Intentar pagar cuota ya pagada', () => {
  const prestamo = solicitarPrestamo(1, 500, 6);
  aprobarPrestamo(prestamo.id);
  const cuota = prestamo.cuotas[0];
  pagarCuota(cuota.id);
  expect(() => pagarCuota(cuota.id)).toThrow('CuotaYaPagada');
});
test('Intentar pagar cuota de préstamo no aprobado', () => {
  const prestamo = solicitarPrestamo(1, 500, 6);
  const cuota = new Cuota({id: 99, prestamo});
  cuotas.push(cuota);
  expect(() => pagarCuota(99)).toThrow('PrestamoNoAprobado');
});
test('Cancelar pago de cuota pagada', () => {
  const prestamo = solicitarPrestamo(1, 500, 6);
  aprobarPrestamo(prestamo.id);
  const cuota = prestamo.cuotas[0];
  pagarCuota(cuota.id);
  const cancelada = cancelarPagoCuota(cuota.id);
  expect(cancelada.estado).toBe('PENDIENTE');
});
test('Intentar cancelar pago de cuota no pagada', () => {
  const prestamo = solicitarPrestamo(1, 500, 6);
  aprobarPrestamo(prestamo.id);
  const cuota = prestamo.cuotas[0];
  expect(() => cancelarPagoCuota(cuota.id)).toThrow('CuotaNoPagada');
});
// Puedes agregar más tests para reportes, logs, validaciones, etc.
