import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Collapse } from 'react-bootstrap';

function App() {
    const [products, setProducts] = useState([]);
    const [openProduct, setOpenProduct] = useState(null);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setProducts(response.data);
            });
    }, []);

    const scrollToProducts = () => {
        const productsSection = document.getElementById('products');
        productsSection.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleProductDescription = (productId) => {
        if (openProduct === productId) {
            setOpenProduct(null);
        } else {
            setOpenProduct(productId);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>LOJA FAKE</h1>
                <p>Seja você um entusiasta das compras online ou apenas um curioso à procura das últimas tendências, a Loja Fake é o seu destino definitivo para uma experiência de compras única. Fundada com a visão de tornar o ato de comprar online simples, conveniente e empolgante, nossa loja oferece uma ampla variedade de produtos de alta qualidade, desde moda e eletrônicos até beleza e decoração para a casa. Na Loja Fake, acreditamos que cada produto deve contar uma história e atender às suas necessidades específicas. É por isso que trabalhamos incansavelmente para oferecer uma coleção cuidadosamente selecionada de produtos que atendem aos mais altos padrões de qualidade e estilo.</p>
                <button onClick={() => scrollToProducts()} className="btn btn-outline-light">
                    Saiba Mais
                </button>
            </header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <h1><a className="nav-link" href="#products">Produtos Populares</a></h1>
                        </li>
                    </ul>
                </div>
            </nav>
            <main className="container mt-4" id="products">
                <div className="row justify-content-center">
                    {products.map(product => (
                        <div key={product.id} className="col-md-4 mb-3">
                            <div className="card h-100">
                                <img src={product.image} className="card-img-top" alt={product.title} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">
                                        <button
                                            className="btn btn-btn btn-outline-primary"
                                            onClick={() => toggleProductDescription(product.id)}
                                            aria-controls={`description-${product.id}`}
                                            aria-expanded={openProduct === product.id}
                                        >
                                            Descrição
                                        </button>
                                    </p>
                                    <Collapse in={openProduct === product.id}>
                                        <div id={`description-${product.id}`}>
                                            {product.description}
                                        </div>
                                    </Collapse>
                                    <p className="card-text">Price: ${product.price}</p>
                                    <a href="#" className="btn btn-primary mt-auto">Comprar Agora</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;
