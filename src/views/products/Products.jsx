import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../repositories/firebase/config";
import { useEffect, useState } from "react";


export const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showProducts, setShowProducts] = useState(true);

    //Obtener los productos de Firestore
    // Traer todos los productos
    // GET Request - Obtiene todos los productos
    const getProducts = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    //Utilizar la funcion en un formulario
    // POST Request - Añade un nuevo producto
    const addProduct = async (product) => {
        try {
            const docRef = await addDoc(collection(db, "products"), {
                name: product.name,
                price: Number(product.price),
                stock: Number(product.stock)
            });
            console.log("Document written with ID: ", docRef.id);
            return docRef;
        } catch (error) {
            console.error("Error adding document: ", error);
            throw error;
        }
    }

    const handleAddProduct = async (product) => {
        try {
            await addProduct(product);
            await getProducts(); // Recargar la lista después de agregar
            return Promise.resolve();
        } catch (error) {
            console.error("Error adding product: ", error);
            throw error; // Propagar el error para que el componente AddProduct pueda manejarlo
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="display-4 text-primary">Nuestros Productos</h1>
                <button 
                    className="btn btn-custom btn-outline-primary"
                    onClick={() => setShowProducts(!showProducts)}
                >
                    {showProducts ? 'Ocultar Productos' : 'Mostrar Productos'}
                </button>
            </div>
            
            {showProducts && (
                <div className="products-grid">
                    {products.map((product, index) => (
                        <div key={product.id} 
                             className="card h-100 shadow-sm slide-up"
                             style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.name}</h5>
                                <div className="price-tag">
                                    ${Number(product.price).toFixed(2)}
                                </div>
                                <div className="stock-badge mt-auto">
                                    Stock: {product.stock}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Exportar las funciones para usar en otros componentes
export const useProductFunctions = () => {
    const addProduct = async (product) => {
        try {
            const docRef = await addDoc(collection(db, "products"), {
                name: product.name,
                price: Number(product.price),
                stock: Number(product.stock)
            });
            console.log("Document written with ID: ", docRef.id);
            return docRef;
        } catch (error) {
            console.error("Error adding document: ", error);
            throw error;
        }
    };

    return { addProduct };
};