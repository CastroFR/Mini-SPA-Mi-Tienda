import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Products, useProductFunctions } from './views/products/Products'
import { SessionView } from './views/session/SessionView'
import { AddProduct } from './views/products/components/AddProduct'
import { LoginComponent } from './views/session/components/LoginComponent'
import { SearchProduct } from './views/products/SearchProducts/SearchProduct';
import { Main } from './components/Main';
import './index.css';
import './App.css';

function App() {
  const { addProduct } = useProductFunctions()

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct onAddProduct={addProduct} />} />
            <Route path="/session" element={<SessionView />} />
            <Route path="/search-product" element={<SearchProduct />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

// Genera un componente de React llamado LoginComponent y 
// utiliza Bootstrap para el diseño. El formulario debe 
// contener dos inputs, uno para correo y otro para contraseña
// y un boton para enviar