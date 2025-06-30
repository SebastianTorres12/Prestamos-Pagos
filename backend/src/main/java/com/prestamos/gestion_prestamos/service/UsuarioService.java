package com.prestamos.gestion_prestamos.service;

import com.prestamos.gestion_prestamos.model.Rol;
import com.prestamos.gestion_prestamos.model.Usuario;
import com.prestamos.gestion_prestamos.repository.UsuarioRepository;
import com.prestamos.gestion_prestamos.security.ActionLogger; // Importar ActionLogger
import com.prestamos.gestion_prestamos.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final JavaMailSender mailSender;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, JavaMailSender mailSender) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.mailSender = mailSender;
    }

    // Método auxiliar para obtener el usuario autenticado del token JWT
    private String getUsuarioAutenticado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !"anonymousUser".equals(authentication.getPrincipal())) {
            return authentication.getName(); // Devuelve el "sub" del JWT (correo)
        }
        return null; // Si no hay usuario autenticado
    }

    public Usuario registrarUsuario(Usuario usuario) {
        usuario.setContrasenaHash(passwordEncoder.encode(usuario.getContrasenaHash()));
        usuario.setIntentosFallidos(0);
        usuario.setCuentaBloqueada(false);
        usuario.setRol(Rol.USUARIO);
        usuario.setIngresos(null);
        usuario.setHistorialCred(null);
        usuario.setFechaDesbloqueo(null);

        Usuario savedUsuario = usuarioRepository.save(usuario);
        ActionLogger.logAction(usuario.getCorreo(), "Registró una nueva cuenta como USUARIO");
        return savedUsuario;
    }

    public void solicitarRecuperacion(String correo) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByCorreo(correo);

        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();

            String token = UUID.randomUUID().toString();
            usuario.setTokenRecuperacion(token);
            usuario.setExpiracionTokenRecuperacion(LocalDateTime.now().plusHours(2));
            usuarioRepository.save(usuario);

            enviarCorreoRecuperacion(usuario.getCorreo(), token);
            ActionLogger.logAction(correo, "Solicitó recuperación de contraseña");
        } else {
            ActionLogger.logAction(correo, "Intentó solicitar recuperación de contraseña (correo no registrado)");
        }
    }

    private void enviarCorreoRecuperacion(String correo, String token) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setFrom("cristhophervillamarin7@gmail.com");
        mensaje.setTo(correo);
        mensaje.setSubject("Recuperación de contraseña");

        String enlace = "http://localhost/auth/restablecer";
        mensaje.setText("Hola, para restablecer tu contraseña, copia el siguiente código de seguridad: " + token + " y haz clic en el siguiente enlace: " + enlace);

        mailSender.send(mensaje);
    }

    public void restablecerContrasena(String token, String nuevaContrasena) {
        Usuario usuario = usuarioRepository.findByTokenRecuperacion(token)
                .orElseThrow(() -> new RuntimeException("El token es inválido o ya ha expirado."));

        if (usuario.getExpiracionTokenRecuperacion().isBefore(LocalDateTime.now())) {
            ActionLogger.logAction(usuario.getCorreo(), "Intentó restablecer contraseña con token expirado: " + token);
            throw new RuntimeException("El token ha expirado. Solicita uno nuevo.");
        }

        usuario.setContrasenaHash(passwordEncoder.encode(nuevaContrasena));
        usuario.setTokenRecuperacion(null);
        usuario.setExpiracionTokenRecuperacion(null);
        usuarioRepository.save(usuario);
        ActionLogger.logAction(usuario.getCorreo(), "Restableció su contraseña con token: " + token);
    }

    public Usuario registrarAdmin(Usuario usuario) {
        if (usuarioRepository.findByCorreo(usuario.getCorreo()).isPresent()) {
            ActionLogger.logAction(usuario.getCorreo(), "Intentó registrar un administrador con correo ya existente");
            throw new RuntimeException("El correo ya está registrado.");
        }

        usuario.setContrasenaHash(passwordEncoder.encode(usuario.getContrasenaHash()));
        usuario.setIntentosFallidos(0);
        usuario.setCuentaBloqueada(false);
        usuario.setRol(Rol.ADMIN);
        usuario.setIngresos(null);
        usuario.setHistorialCred(null);
        usuario.setFechaDesbloqueo(null);

        Usuario savedUsuario = usuarioRepository.save(usuario);
        ActionLogger.logAction(usuario.getCorreo(), "Registró una nueva cuenta como ADMIN");
        return savedUsuario;
    }

    public Optional<Usuario> obtenerUsuarioPorCorreo(String correo) {
        String usuarioAutenticado = getUsuarioAutenticado();
        ActionLogger.logAction(usuarioAutenticado != null ? usuarioAutenticado : "Sistema", "Consultó datos del usuario con correo: " + correo);
        return usuarioRepository.findByCorreo(correo);
    }

    public void incrementarIntentosFallidos(String correo) {
        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con correo: " + correo));

        if (!usuario.getCuentaBloqueada()) {
            usuario.setIntentosFallidos(usuario.getIntentosFallidos() + 1);

            if (usuario.getIntentosFallidos() >= 3) {
                usuario.setCuentaBloqueada(true);
                usuario.setFechaDesbloqueo(LocalDateTime.now().plusMinutes(5));
                usuarioRepository.save(usuario);
                ActionLogger.logAction(correo, "Cuenta bloqueada por 3 intentos fallidos");
                throw new RuntimeException("Cuenta bloqueada por múltiples intentos fallidos. Intente de nuevo en 5 minutos.");
            }

            usuarioRepository.save(usuario);
            ActionLogger.logAction(correo, "Incrementó intentos fallidos a: " + usuario.getIntentosFallidos());
        }
    }

    public Usuario actualizarDatosFinancieros(String correo, Double ingresos, Integer historialCred) {
        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con correo: " + correo));

        usuario.setIngresos(ingresos);
        usuario.setHistorialCred(historialCred);

        Usuario updatedUsuario = usuarioRepository.save(usuario);
        String usuarioAutenticado = getUsuarioAutenticado();
        ActionLogger.logAction(usuarioAutenticado != null ? usuarioAutenticado : correo, "Actualizó datos financieros para: " + correo);
        return updatedUsuario;
    }

    public void desbloquearCuenta(String correo) {
        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con correo: " + correo));

        usuario.setIntentosFallidos(0);
        usuario.setCuentaBloqueada(false);
        usuario.setFechaDesbloqueo(null);
        usuarioRepository.save(usuario);

        String usuarioAutenticado = getUsuarioAutenticado();
        ActionLogger.logAction(usuarioAutenticado != null ? usuarioAutenticado : "Sistema", "Desbloqueó la cuenta de: " + correo);
    }

    public String autenticarUsuario(String correo, String contrasena) {
        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con correo: " + correo));

        if (usuario.getCuentaBloqueada()) {
            if (usuario.getFechaDesbloqueo() != null && usuario.getFechaDesbloqueo().isBefore(LocalDateTime.now())) {
                usuario.setCuentaBloqueada(false);
                usuario.setIntentosFallidos(0);
                usuario.setFechaDesbloqueo(null);
                usuarioRepository.save(usuario);
                ActionLogger.logAction(correo, "Cuenta desbloqueada automáticamente tras expirar el tiempo de bloqueo");
            } else {
                ActionLogger.logAction(correo, "Intento de login fallido - Cuenta bloqueada hasta: " + usuario.getFechaDesbloqueo());
                throw new RuntimeException("Cuenta bloqueada. Intente nuevamente después de " + usuario.getFechaDesbloqueo());
            }
        }

        if (!passwordEncoder.matches(contrasena, usuario.getContrasenaHash())) {
            incrementarIntentosFallidos(correo);
            ActionLogger.logAction(correo, "Intento de login fallido - Credenciales incorrectas");
            throw new RuntimeException("Credenciales incorrectas.");
        }

        usuario.setIntentosFallidos(0);
        usuarioRepository.save(usuario);
        String token = jwtUtil.generarToken(
                usuario.getIdUsuario(),
                usuario.getCorreo(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getRol().name(),
                usuario.getCedula()
        );
        ActionLogger.logAction(correo, "Inició sesión exitosamente");
        return token;
    }

    public void eliminarUsuario(String correo) {
        Optional<Usuario> usuario = usuarioRepository.findByCorreo(correo);
        if (usuario.isEmpty()) {
            String usuarioAutenticado = getUsuarioAutenticado();
            ActionLogger.logAction(usuarioAutenticado != null ? usuarioAutenticado : "Sistema", "Intentó eliminar usuario no existente con correo: " + correo);
            throw new RuntimeException("Usuario no encontrado.");
        }
        usuarioRepository.delete(usuario.get());
        String usuarioAutenticado = getUsuarioAutenticado();
        ActionLogger.logAction(usuarioAutenticado != null ? usuarioAutenticado : "Sistema", "Eliminó al usuario con correo: " + correo);
    }
}