import React, { useEffect, useState } from 'react'

export const CartContext = React.createContext()

export function CartContextProvider({children}) {
    const [cart, setCart] = useState({
        products: [],
        finalPrice: 0
    });

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || {
            products: [],
            finalPrice: 0
        })
        if (cart) setCart(cart)
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    /*const getTotalPrice = (products) => {
        return products.reduce((price, product) => {
            return price + product.price * product.quantity
         }, 0)
    }*/

    function createProduct(product) {
        const isSelected = cart.products.some(e =>  e.id === product.id)

        if (!isSelected) {
            const cartUpdated = {
                products: [...cart.products, product],
                finalPrice: cart.finalPrice + ( product.price * product.quantity)
            };
            setCart(cartUpdated)
        } else {
            
        }
    }

    function editProduct(id, keyQuantity) {

        const cartUpdated = {
            products: [...cart.products],
            finalPrice: cart.finalPrice
        }

        const newProducts = cartUpdated.products.map((elem, i) => {
            if (elem.id === id) {
                const productUpdated = {...elem};
                if (keyQuantity === 'add') {
                    productUpdated.quantity += 1;
                    //productUpdated.price += elem.price;
                    cartUpdated.finalPrice += productUpdated.price
                } else {
                    productUpdated.quantity -= 1;
                    //productUpdated.price -= elem.price * elem.quantity;
                    cartUpdated.finalPrice -= productUpdated.price
                }
                return productUpdated
            } else {
                return elem
            }
        });

        cartUpdated.products = newProducts

        setCart(cartUpdated)
    }

    function deleteProduct(id) {
        const cartUpdated = {
            products: [...cart.products],
            finalPrice: cart.finalPrice
        }

        const newProducts = cart.products.filter((elem, i) => {
            if (elem.id === id) {
                cartUpdated.finalPrice = cartUpdated.finalPrice - elem.price * elem.quantity
                return false
            } else {
                return true
            }
        });
        cartUpdated.products = newProducts

        setCart(cartUpdated)
    }
    
    const clearCart = () => {
        //localStorage.removeItem('cart');
        setCart({
            products: [],
            finalPrice: 0
        })
    }

    const value = {
        cart,
        createProduct,
        editProduct,
        deleteProduct,
        clearCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

/*const newProducts = cart.products.filter((elem, i) => {
            if (elem.id === id) {
                cartUpdated.products.quantity + elem.quantity;
                cartUpdated.finalPrice = cartUpdated.finalPrice - elem.price * elem.quantity
                return false
            } else {
                return true
            }
        });

        cartUpdated.products = newProducts*/
