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

    const getTotalPrice = (products) => {
        return products.reduce((price, product) => {
            return price + product.price * product.quantity
         }, 0)
    }

    function createProduct(product) {
        const cartUpdated = {
            products: [...cart.products, product],
            finalPrice: cart.finalPrice + ( product.price * product.quantity)
        };
        setCart(cartUpdated)
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
                    cartUpdated.finalPrice += productUpdated.price
                } else {
                    productUpdated.quantity -= 1;
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

    const value = {
        cart,
        createProduct,
        editProduct,
        deleteProduct
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}