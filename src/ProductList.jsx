import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    
    // Select cart items to calculate total count and track added status
    const cartItems = useSelector(state => state.cart.items);
    
    // Calculate total item count for the navbar badge
    const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://cdn.pixabay.com/photo/2017/07/15/19/42/lavender-2507499_1280.jpg",
                    description: "Calming scent that helps reduce stress and anxiety.",
                    cost: "$20"
                },
                {
                    name: "Jasmine",
                    image: "https://cdn.pixabay.com/photo/2014/06/16/23/10/spice-370114_1280.jpg",
                    description: "Sweet fragrance that improves mood and energy levels.",
                    cost: "$18"
                }
            ]
        },
        {
            category: "Easy Care & Low Light Plants",
            plants: [
                {
                    name: "Cast Iron Plant",
                    image: "https://cdn.pixabay.com/photo/2016/03/09/09/16/cast-iron-plant-1245785_1280.jpg",
                    description: "Extremely hardy plant that survives in near darkness.",
                    cost: "$25"
                },
                {
                    name: "ZZ Plant",
                    image: "https://cdn.pixabay.com/photo/2020/03/12/15/07/zamioculcas-4925345_1280.jpg",
                    description: "Thrives on neglect and needs very little water.",
                    cost: "$22"
                }
            ]
        }
    ];

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    return (
        <div>
            {/* Navbar Section */}
            <nav className="navbar">
                <div className="tag">
                    <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>
                        <div className="tag_home_link">
                            <h3>Paradise Nursery</h3>
                            <i>Where Green Meets Serenity</i>
                        </div>
                    </a>
                </div>
                <div className="ul">
                    <div>
                        <a href="#" onClick={handlePlantsClick}>Plants</a>
                    </div>
                    <div>
                        <a href="#" className="cart" onClick={handleCartClick}>
                            <h1 className="cart_quantity_count">{totalCartCount}</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ height: '68px', width: '68px', fill: 'white' }}>
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 5h14.15l-2.76 5H8.53L6.16 5zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Conditional Page Rendering */}
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((categoryObj, index) => (
                        <div key={index} style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                            <h2 className="plant_heading">{categoryObj.category}</h2>
                            <div className="product-list">
                                {categoryObj.plants.map((plant, pIndex) => {
                                    const isAdded = cartItems.some(item => item.name === plant.name);
                                    return (
                                        <div className="product-card" key={pIndex}>
                                            <img className="product-image" src={plant.image} alt={plant.name} />
                                            <div className="product-title">{plant.name}</div>
                                            <div className="product-description">{plant.description}</div>
                                            <div className="product-price">{plant.cost}</div>
                                            <button 
                                                className={`product-button ${isAdded ? 'added-to-cart' : ''}`} 
                                                disabled={isAdded}
                                                onClick={() => handleAddToCart(plant)}
                                            >
                                                {isAdded ? "Added to Cart" : "Add to Cart"}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handlePlantsClick} />
            )}
        </div>
    );
}

export default ProductList;