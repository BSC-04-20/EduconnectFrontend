import ResearchPaper from "../../../assets/Research paper-amico.svg"


export default function LearningMaterials(){
    return(

        <div className="flex flex-row items-start bg-sky-900 h-[30vh] w-[95%] my-5 rounded-lg">
                    <div className="flex flex-col gap-3 pl-6 text-slate-100 pt-5">
                        <span className="font-bold text-3xl">Learning Materials</span>
                        <span>Access course materials and study resources</span>
                    </div>
                    <div className="h-[95%] ml-auto mr-10">
                        <img src={ResearchPaper} className="size-full"/>
                    </div>
                </div>



     )



}    