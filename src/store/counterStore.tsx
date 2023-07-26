import { create } from 'zustand'

interface Post {
    id : number
    title : string
    body : string
}

interface CounterState {
    count : number
    title : string
    posts : Post[]
    increment : (value : number) => void
    getPosts : () => Promise<void>
    clearStore : () => void
    multiply : (value:number) => void
}

export const useCounterStore = create<CounterState>( (set, get) => ({
    count : 20,
    title: 'Some title',
    posts : [],
    increment : (value : number) => set( state => ({ 
        count : state.count + value
    })),
    getPosts : async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const posts = await res.json()
        set( state => ({ ...state, posts }))
    },
    clearStore : () => {set({}, true)},
    multiply : (value:number) => {
        const { count } = get()
        set({ count : count * value })
    }
}))
