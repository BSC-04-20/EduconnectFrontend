import ResearchPaper from "../../../assets/Research paper-amico.svg";

export default function LearningMaterials() {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start bg-sky-900 min-h-[30vh] w-[95%] my-5 rounded-lg p-4 md:p-6">
            
            
            <div className="flex flex-col gap-3 text-slate-100">
                <span className="font-bold text-2xl md:text-3xl">Learning Materials</span>
                <span className="text-sm md:text-base">Access course materials and study resources</span>
            </div>

        
            <div className="w-full md:w-auto md:h-[95%] flex justify-center md:ml-auto md:mr-10 mt-4 md:mt-0">
                <img src={ResearchPaper} className="w-[60%] md:w-auto h-auto" />
            </div>

        </div>
    );
}
