import { createSlice } from '@reduxjs/toolkit'

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    value: items,
}

export const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload
            const duplicate = state.value.filter(i => {
                console.log(i.id, newItem.id, '...', i.color.id, newItem.color.id)
                return i.id === newItem.id && i.color.id === newItem.color.id
            } )
            console.log(duplicate)
            if (duplicate.length > 0) {
                state.value = state.value.filter(i => i.id !== newItem.id || i.color.id  !== newItem.color.id)
                state.value = [...state.value, {
                    id: duplicate[0].id,
                    slug: newItem.slug,
                    color: newItem.color,
                    size: newItem.size,
                    price: newItem.price,
                    quantity: newItem.quantity + duplicate[0].quantity
                }]
            } else {
                state.value = [...state.value, {
                    ...action.payload,
                }]
            }
            localStorage.setItem('cartItems', JSON.stringify(state.value.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))))
        },
        updateItem: (state, action) => {
            const newItem = action.payload
            const item = state.value.filter(i => i.id === newItem.id && i.color.id === newItem.color.id)
            console.log(item.length)
            if (item.length > 0) {
                state.value = state.value.filter(i => i.id !== newItem.id || i.color.id !== newItem.color.id)
                state.value = [...state.value, {
                    id: item[0].id,
                    slug: newItem.slug,
                    color: newItem.color,
                    size: newItem.size,
                    price: newItem.price,
                    quantity: newItem.quantity
                }]
            }
            localStorage.setItem('cartItems', JSON.stringify(state.value.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))))
        },
        removeItem: (state, action) => {
            const item = action.payload
            state.value = state.value.filter(i => i.id !== item.id || i.color.id !== item.color.id)
            localStorage.setItem('cartItems', JSON.stringify(state.value.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))))
        },
    },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateItem } = cartItemsSlice.actions

export default cartItemsSlice.reducer