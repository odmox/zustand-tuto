
import { useEffect } from 'react'
import { useCounterStore } from './store/counterStore'
import { shallow } from 'zustand/shallow'

export default function App() {

  const {count, title, posts } = useCounterStore( (state) => ({
    count: state.count,
    title: state.title,
    posts: state.posts
  }), shallow )
    
  const {increment, getPosts, clearStore, multiply} = useCounterStore( )

  useEffect( () => {
    async function fetchData() {
      await getPosts()
    }
    fetchData()
  } 
  ,[])

  return (
    <div> 
      <h1>{title} : {count}</h1>
      <button onClick={() => increment(10)}>Increment</button>  
      <button onClick={() => clearStore()}>ClearStore</button> 
      <button onClick={() => multiply(2)}>multiply</button>  


      <hr />
      {
        JSON.stringify(posts)
      }
    </div>
   
  )
}
