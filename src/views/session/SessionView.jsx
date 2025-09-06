// rafc
import { useState } from 'react';
import { LoginComponent } from './components/LoginComponent';
import { RegisterComponent } from './components/RegisterComponent';

// FORMA VISTA EN CLASE DE RESOLVER EL RETO
export const SessionView = () => {
  const [typeForm, setTypeForm] = useState('login');

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <div className="text-center mb-4">
                <h2 className="card-title">Bienvenido</h2>
                <div className="btn-group" role="group">
                  <button 
                    className={`btn ${typeForm === 'login' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setTypeForm('login')}
                  >
                    Iniciar Sesión
                  </button>
                  <button 
                    className={`btn ${typeForm === 'register' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setTypeForm('register')}
                  >
                    Registrarse
                  </button>
                </div>
              </div>
              {typeForm === 'login' ? <LoginComponent /> : <RegisterComponent />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

