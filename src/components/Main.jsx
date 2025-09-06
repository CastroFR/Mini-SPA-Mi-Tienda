import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export const Main = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleVideoLoad = () => {
        setVideoLoaded(true);
    };

    return (
        <div className="main-container">
            <section className="hero-section">
                <div className="container">
                    <div className={`text-center hero-content ${isVisible ? 'fade-in' : ''}`}>
                        <h1 className="display-2 fw-bold text-gradient">Mi Tienda</h1>
                        <p className="lead mb-4">Descubre una nueva forma de comprar</p>
                        <Link to="/products" className="btn btn-custom btn-lg">
                            Explorar Productos
                        </Link>
                    </div>
                </div>
            </section>

            <section className="features-section py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="feature-card slide-up">
                                <i className="bi bi-shield-check display-4 text-primary mb-3"></i>
                                <h3>Calidad Garantizada</h3>
                                <p>Todos nuestros productos pasan por rigurosos controles de calidad.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card slide-up" style={{ animationDelay: '0.2s' }}>
                                <i className="bi bi-truck display-4 text-primary mb-3"></i>
                                <h3>Envío Rápido</h3>
                                <p>Entrega garantizada en tiempo récord a cualquier parte del país.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card slide-up" style={{ animationDelay: '0.4s' }}>
                                <i className="bi bi-headset display-4 text-primary mb-3"></i>
                                <h3>Soporte 24/7</h3>
                                <p>Estamos aquí para ayudarte en cualquier momento que nos necesites.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="video-section py-5">
                <div className="container">
                    <h2 className="text-center mb-5 display-4">Descubre la Experiencia</h2>
                    <div className="video-container">
                        {!videoLoaded && (
                            <div className="text-center p-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                        )}
                        <video 
                            autoPlay 
                            muted 
                            loop 
                            playsInline
                            className="feature-video"
                            onLoadedData={handleVideoLoad}
                            preload="metadata"
                            poster="/src/assets/images/video-poster.jpg" // Añade una imagen de poster
                        >
                            <source 
                                src="/src/assets/images/apple.mp4" 
                                type="video/mp4"
                            />
                            Tu navegador no soporta videos HTML5.
                        </video>
                    </div>
                </div>
            </section>

            <section className="showcase-section py-5">
                <div className="container">
                    <div className="row align-items-center gy-4">
                        <div className="col-lg-6">
                            <div className="showcase-content fade-in">
                                <h2 className="display-4 mb-4">Innovación y Diseño</h2>
                                <p className="lead">Nuestra tienda combina lo mejor en tecnología y diseño para ofrecerte una experiencia de compra única.</p>
                                <div className="mt-4 d-flex flex-wrap gap-3">
                                    <Link to="/search-product" className="btn btn-outline-primary">
                                        Buscar Productos
                                    </Link>
                                    <Link to="/add-product" className="btn btn-primary">
                                        Agregar Producto
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="showcase-image parallax-effect">
                                <img src="/src/assets/images/showcase.jpg" alt="Showcase" className="img-fluid rounded shadow" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
