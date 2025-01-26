import React, { useEffect } from 'react'
// import { Navbar } from './navbar';
// import { Home } from './home';
import { Featured } from './featured';
import { SearchBar } from './searchbar';
import { NewArrivals } from './newArrivals';
import { PlantStands } from './plantStand';
import { ShippingCard } from './shippingCard';
import { Footer } from './footer';
import Carousel from './carousel';
import Category from './Category';

export default function MainHome() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <Carousel />
      {/* <Home /> */}
      <SearchBar />
      <Category />
      <Featured />
      <NewArrivals />
      <PlantStands />
      <ShippingCard />
      <Footer />
    </div>
  )
}
