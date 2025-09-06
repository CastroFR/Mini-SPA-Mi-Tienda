export const Footer = () => {
  return (
    <footer className="custom-footer py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-3">
            <h5 className="text-gradient mb-3">Mi Tienda</h5>
            <p className="text-muted mb-0">Tu mejor opción para compras online</p>
          </div>
          <div className="col-md-3">
            <h5 className="text-gradient mb-3">Asistencia</h5>
            <ul className="list-unstyled text-muted">
              <li><a href="#" className="text-muted">Centro de ayuda</a></li>
              <li><a href="#" className="text-muted">Antidiscriminación</a></li>
              <li><a href="#" className="text-muted">Apoyo para discapacitados</a></li>
              <li><a href="#" className="text-muted">Opciones de cancelación</a></li>
              <li><a href="#" className="text-muted">Problemas en la zona</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="text-gradient mb-3">Compañía</h5>
            <ul className="list-unstyled text-muted">
              <li><a href="#" className="text-muted">Acerca de nosotros</a></li>
              <li><a href="#" className="text-muted">Prensa</a></li>
              <li><a href="#" className="text-muted">Empleo</a></li>
              <li><a href="#" className="text-muted">Inversores</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="text-gradient mb-3">Legal</h5>
            <ul className="list-unstyled text-muted">
              <li><a href="#" className="text-muted">Privacidad</a></li>
              <li><a href="#" className="text-muted">Términos</a></li>
              <li><a href="#" className="text-muted">Mapa del sitio</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center text-muted">
          <small>&copy; {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.</small>
          <div className="mt-3">
            <a href="#" className="text-muted mx-2">Español</a> |
            <a href="#" className="text-muted mx-2">USD</a> |
            <a href="#" className="text-muted mx-2"><i className="bi bi-facebook"></i></a> |
            <a href="#" className="text-muted mx-2"><i className="bi bi-instagram"></i></a> |
            <a href="#" className="text-muted mx-2"><i className="bi bi-twitter-x"></i></a> |
            <a href="#" className="text-muted mx-2"><i className="bi bi-tiktok"></i></a>
          </div>
        </div>
      </div>
    </footer>
  )
}