import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../repositories/firebase/config';

export const SearchProduct = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    // Cargar todos los productos una vez
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(productsData);
            } catch (error) {
                setError('Error al cargar productos');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Búsqueda en tiempo real
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProducts([]);
            return;
        }

        const searchTermLower = searchTerm.toLowerCase();
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchTermLower)
        );

        setFilteredProducts(filtered);

        // Mostrar notificación solo si no se encuentran resultados
        if (filtered.length === 0 && searchTerm.trim() !== '') {
            setNotification({
                show: true,
                message: 'No se encontraron productos',
                type: 'warning'
            });
        } else {
            setNotification({ show: false, message: '', type: '' });
        }
    }, [searchTerm, products]);

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            {notification.show && (
                                <div className={`alert alert-${notification.type} alert-dismissible fade show`} role="alert">
                                    {notification.message}
                                    <button type="button" className="btn-close" onClick={() => setNotification({ show: false })}></button>
                                </div>
                            )}

                            <h3 className="card-title text-center mb-4">Buscar Producto</h3>

                            <div className="mb-4">
                                <label className="form-label">Nombre del producto:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Comience a escribir para buscar..."
                                />
                            </div>

                            {loading ? (
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    {filteredProducts.map(product => (
                                        <div key={product.id} className="col-md-6 mb-3">
                                            <div className="card h-100 shadow-sm">
                                                <div className="card-body">
                                                    <h5 className="card-title">{product.name}</h5>
                                                    <div className="price-tag">
                                                        ${Number(product.price).toFixed(2)}
                                                    </div>
                                                    <div className="stock-badge mt-2">
                                                        Stock: {product.stock}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
