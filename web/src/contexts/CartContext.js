import React, { useEffect, useState } from 'react'

export const CartContext = React.createContext()

export function CartContextProvider({children}) {
    const [cart, setCart] = useState({
        products: [],
        finalPrice: 0
    });

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        if (cart) setCart(cart)
    }, [])


    function createProduct(product) {
        console.log(product.price * product.quantity)
        localStorage.setItem('cart', JSON.stringify(
            {
                products: [...cart.products, product],
                finalPrice: cart.finalPrice + ( product.price * product.quantity)
            }
        ));

        setCart({
            products: [...cart.products, product],
            finalPrice: cart.finalPrice + ( product.price * product.quantity)
        })
    }

    const value = {
        cart,
        createProduct
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}