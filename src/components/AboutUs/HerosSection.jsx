import Background from "/Users/bchil/Final Project/EduconnectFrontend/src/assets/0x0.jpg"

export default function HerosSection(){
    return(
        <div className="h-[40vh] bg-cover" style={{backgroundImage:`url(${Background})`}}>
            <div className="h-[40vh] pt-20 bg-gray-950/50 text-center pl-[30%] pr-[30%]">
                <div>
                    <span className="text-white font-bold text-3xl">
                        Enhancing academic collaboration through seamless learning, discussion,
                        and engagement.
                    </span>
                </div>
            </div>
        </div>
    )
}