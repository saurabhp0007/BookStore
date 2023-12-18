import React, { useState } from 'react';
import { useGlobalContext } from '../context.';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, setCart ,checkout} = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 
  const totalItems = cart.length;
  const totalPrice = cart.reduce((acc, item) => acc + (item.price || 0),0);

  const handleRemoveItem = (itemTitle) => {
    const updatedCart = cart.filter((item) => item.title !== itemTitle);
    setCart(updatedCart);
  };

  const handleAddSimilarItem = async (itemTitle, cover_img) => {
  setLoading(true);

  try {
   
    const similarItem = await getSimilarItem(itemTitle, cover_img);

    const randomPrice = Math.random() * 10;

    const updatedCart = [...cart, { ...similarItem, price: randomPrice }];
    setCart(updatedCart);
  } catch (error) {
    console.error('Error adding similar item:', error);
  } finally {
    setLoading(false);
  }
};

  const getSimilarItem = async (itemTitle, cover_img) => {
    const similarItem = {
      title: `${itemTitle} `,
      cover_img: `${cover_img} `, 
    };

    return similarItem;
  };

  return (
    <div style={styles.cartContainer}>
      <h2>Your Cart</h2>
      {cart && cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul style={styles.cartList}>
            {cart.map((item) => (
              <li key={item.title} style={styles.cartItem}>
                <img src={item.cover_img} alt={item.title} style={styles.itemImage} />
                <div style={styles.itemDetails}>
                  <p style={styles.itemTitle}>{item.title}</p>
                  <p style={styles.itemAuthor}>{item.author}</p>
                  <p style={styles.itemPrice}>Price: ${Math.floor(Math.random() * 10)}</p>
                </div>
                <button onClick={() => handleRemoveItem(item.title)} style={styles.removeItemButton}>
                  Remove
                </button>
                <button
                  onClick={() => handleAddSimilarItem(item.title, item.cover_img)}
                  style={styles.addSimilarItemButton}
                  disabled={loading}
                >
                  {loading ? 'Adding...' : '+'}
                </button>
              </li>
            ))}
          </ul>

          <div style={styles.cartSummary}>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </div>

          <button
      style={styles.proceedToCheckoutButton}
      onClick={() => {
        checkout();
        
        // Navigate to the orders page after checkout
        navigate('/orders');
      }}
    >
      Proceed to Checkout
    </button>
        </div>
      )}
    </div>
  );
};

// Add a new style for the "Proceed to Checkout" button
const styles = {
  proceedToCheckoutButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  itemPrice: {
    marginTop: '5px',
    fontWeight: 'bold',
  },
  cartContainer: {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  cartList: {
    listStyle: 'none',
    padding: '0',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
  },
  itemImage: {
    width: '50px',
    height: '70px',
    marginRight: '10px',
  },
  itemDetails: {
    flexGrow: 1,
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  removeItemButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#ff6f6f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cartSummary: {
    marginTop: '20px',
  },
addSimilarItemButton: {
  marginLeft: '10px',
  padding: '5px',
  backgroundColor: '#6f6fff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
},
};



export default Cart;
