import { useState } from 'react'
import { Route, Routes } from "react-router-dom"

import { SidebarProvider } from '@/components/ui/sidebar';
import Nav from '@/partials/Nav.tsx';
import Home from '@/pages/Home'
import Cart from '@/pages/Cart'
import Shop from '@/pages/Shop'
import Search from '@/pages/Search'
import AboutUs from '@/pages/AboutUs'

import './App.css'

function App() {
  const [open, setOpen] = useState(false);
  return (
    <SidebarProvider open={open}>
      <Nav isOpen={open} setIsOpen={setOpen} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </main>
    </SidebarProvider>
  )
}

export default App
