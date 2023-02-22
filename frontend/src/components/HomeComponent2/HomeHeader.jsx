import React from 'react'
import CustomImage from '../CustomImage'

const HomeHeader = ({ handleClickToScroll }) => {

    const images = [
        "/img/gallery/img_1.jpg",
        "/img/gallery/img_2.jpg",
        "/img/gallery/img_3.jpg",
        "/img/gallery/img_4.jpg",
        "/img/gallery/img_5.jpg",
        "/img/gallery/img_6.jpg",
        "/img/gallery/img_7.jpg",
        "/img/gallery/img_8.jpg",
        "/img/gallery/img_9.jpg"
    ]

    return (
        <div className='section home-header'>
            <div className="col typography">
                <h1 className="title">
                    What Are We About
                </h1>
                <p className="info">
                    FoodRecipe is a place where you can please your soul and tummy with delicious food recipes of all cuisine. Let's start exploring now.
                </p>
                <button onClick={handleClickToScroll} className="btn-search-now">Search now</button>
            </div>
            <div className="col gallery">
                {images.map((src, index) => (
                    <CustomImage imgSrc={src} pt={"90%"} key={index} />
                ))}
            </div>
        </div>
    )
}

export default HomeHeader
