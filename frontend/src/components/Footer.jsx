import React from 'react'

const Footer = () => {
  return (
    <div className='footer container'>
      <div className="footer-section">
        <p className="title">FoodRecipe.com</p>
        <p>
          FoodRecipe is a place where you can please your soul and tummy with delicious food recepies of all cuisine. And our service is absolutely free. So start exploring now.
        </p>
        <p>&copy; 2023 | All Rights Reserved</p>
      </div>
      <div className="footer-section">
        <p className="title">Contact Us</p>
        <p>aresky1105@gmail.com</p>
        <p>+84-966-477-078</p>
        <p>Vietnam - Hanoi</p>
      </div>
      <div className="footer-section">
        <p className="title">Socials</p>
        <p className='social-item'>Facebook</p>
        <p className='social-item'>Twitter</p>
        <p className='social-item'>Instagram</p>
      </div>
    </div>
  )
}

export default Footer
