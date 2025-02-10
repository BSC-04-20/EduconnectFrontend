import ResearchPaoer from "../../../assets/Research paper-amico.svg"

export default function LectureWelcome(){
    return(
        <div className="flex flex-row items-start bg-sky-900 h-[30vh] w-[95%] my-5 rounded-lg">
            <div className="flex flex-col gap-3 pl-6 text-slate-100 pt-5">
                <span className="font-bold text-3xl">Welcome Back Professor</span>
                <span>Here's what's happening in your educational network</span>
            </div>
            <div className="h-[95%] ml-auto mr-10">
                <img src={ResearchPaoer} className="size-full"/>
            </div>
        </div>
    )
}