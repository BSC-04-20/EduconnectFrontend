import AboutUsNavBar from "../components/AboutUs/AboutUsNavBar"
import HerosSection from "../components/AboutUs/HerosSection"
import JoinUs from "../components/AboutUs/JoinUs"
import OurStory from "../components/AboutUs/OurStory"
import WhatWeOffer from "../components/AboutUs/WhatWeOffer"

export default function AboutUs(){
    return(
        <>
        <AboutUsNavBar/>
        <HerosSection/>
        <OurStory/>
        <WhatWeOffer/>
        <JoinUs/>
        </>
    )
}