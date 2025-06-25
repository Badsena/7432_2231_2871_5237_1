import React, {useState} from 'react'

const Counter = () => {
    let [count, setCount] = useState(0)
    const increase_count = () => {
        setCount(++count);
    }
  return (
    <>
    <div>Counter</div> <div>{count}</div>
    <button onClick= {increase_count} >Click me</button>
    </>
  )
}

export default Counter