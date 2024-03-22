import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header style={{position:'fixed',zIndex:'1'}} class="bg-slate-400 w-[100%]  text-black">
    <section class="wrapper flex justify-around items-center h-[90px] text-white">
        <h1 class="w-[120px] text-[30px]">Shoppy</h1>
        <ul class="flex items-center justify-end">
            <Link to={'/'} class="mr-10 text-decoration-none">Home</Link>
           <Link to={'/profile'} class="mr-10">Profile</Link>
           <Link to={'login'} class="mr-10"></Link>
        </ul>
    </section>
</header>
  )
}

export default Header