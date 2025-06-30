import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaMoneyCheckAlt, FaCalculator, FaCreditCard, FaSignOutAlt } from "react-icons/fa";
import "../../../styles/sideBar.css"; // Importamos los estilos

const SideBarUser = () => {
  const navigate = useNavigate();

  // 🔹 Función para obtener el nombre y apellido desde el token
  const getUserName = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return "Usuario"; // Fallback si no hay token

      // Decodificar el payload del JWT
      const payloadBase64 = token.split(".")[1]; // Obtener la parte del payload
      const decodedPayload = atob(payloadBase64); // Decodificar de base64
      const payload = JSON.parse(decodedPayload); // Convertir a objeto JSON

      // Retornar nombre completo
      return `${payload.nombre} ${payload.apellido}`;
    } catch (error) {
      console.error("Error decoding token:", error);
      return "Usuario"; // Fallback en caso de error
    }
  };

  // 🔹 Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar token de autenticación
    navigate("/auth/login"); // Redirigir a la página de login
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>ESPECITO</h2>
        <p className="role">{getUserName()}</p>
        <span className="text-muted">Solicitud de préstamo</span>
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/user/home">
            <FaHome className="icon" /> Home
          </Link>
        </li>
        <li>
          <Link to="/user/prestamos">
            <FaMoneyCheckAlt className="icon" /> Préstamos
          </Link>
        </li>
        <li>
          <Link to={`/user/amortizacion/${localStorage.getItem("idPrestamo")}`}>
            <FaCalculator className="icon" /> Tabla de Amortización
          </Link>
        </li>
        <li>
          <Link to="/user/pagos">
            <FaCreditCard className="icon" /> Historial de Pagos
          </Link>
        </li>
      </ul>

      {/* 🔹 Botón de Salir */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="icon" /> Salir
        </button>
      </div>
    </div>
  );
};

export default SideBarUser;