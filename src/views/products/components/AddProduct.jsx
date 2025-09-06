import { useState } from 'react';

export const AddProduct = ({ onAddProduct }) => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        stock: ''
    });
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [errors, setErrors] = useState({});
    const [showProducts, setShowProducts] = useState(true);

    const validateForm = () => {
        const newErrors = {};
        if (!product.name.trim()) newErrors.name = 'El nombre es requerido';
        if (!product.price) newErrors.price = 'El precio es requerido';
        if (product.price <= 0) newErrors.price = 'El precio debe ser mayor a 0';
        if (!product.stock) newErrors.stock = 'El stock es requerido';
        if (product.stock < 0) newErrors.stock = 'El stock no puede ser negativo';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (!onAddProduct) {
            setNotification({
                show: true,
                message: 'Error: Función de agregar producto no disponible',
                type: 'danger'
            });
            return;
        }

        try {
            await onAddProduct(product);
            setNotification({
                show: true,
                message: '¡Producto agregado exitosamente!',
                type: 'success'
            });
            setProduct({ name: '', price: '', stock: '' });
        } catch (error) {
            console.error('Error en handleSubmit:', error);
            setNotification({
                show: true,
                message: 'Error al agregar el producto: ' + error.message,
                type: 'danger'
            });
        }
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: name === 'price' || name === 'stock' ? 
                    value === '' ? '' : Number(value) : 
                    value
        });
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            {notification.show && (
                                <div className={`alert alert-${notification.type} alert-dismissible fade show`} role="alert">
                                    {notification.message}
                                    <button type="button" className="btn-close" onClick={() => setNotification({ show: false })}></button>
                                </div>
                            )}

                            <h3 className="card-title text-center mb-4">Agregar Nuevo Producto</h3>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre del producto:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        name="name"
                                        value={product.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Precio:</label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                    />
                                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Stock:</label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                                        name="stock"
                                        value={product.stock}
                                        onChange={handleChange}
                                    />
                                    {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Agregar Producto
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
