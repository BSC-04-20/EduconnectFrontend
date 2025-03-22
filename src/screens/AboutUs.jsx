import AboutUsNavBar from "../components/AboutUs/AboutUsNavBar"
import HerosSection from "../components/AboutUs/HerosSection"
import JoinUs from "../components/AboutUs/JoinUs"
import OurStory from "../components/AboutUs/OurStory"
import WhatWeOffer from "../components/AboutUs/WhatWeOffer"
import Navbar from "../components/NavBar/NavBar"

export default function AboutUs(){
    return(
        <>
        <Navbar/>
        <HerosSection/>
        <OurStory/>
        <WhatWeOffer/>
        <JoinUs/>
        </>
    )
}