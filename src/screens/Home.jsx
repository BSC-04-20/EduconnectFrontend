import KeyFeatures from "../components/Homepage/features";
import HomePage from "../components/Homepage/HomePage";
import Navbar from "../components/NavBar/NavBar";

export default function HomeScreen(){
    return(
        <>
            <Navbar/>
            <HomePage/>
            <KeyFeatures/>
            <footer className="bg-sky-500 text-white text-center py-4 mt-10">
                <p className="text-sm">
                    © {new Date().getFullYear()} EduConnecti. All rights reserved.
                </p>
            </footer>
        </>
    )
}