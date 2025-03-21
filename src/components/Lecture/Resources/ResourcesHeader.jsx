import Resource from "../../../assets/Research paper-amico.svg";

export default function ResourcesHeader() {
    return (
        <div className="flex flex-col md:flex-row items-center bg-sky-900 h-auto md:h-[30vh] w-[95%] my-5 rounded-lg p-5">
            <div className="flex flex-col gap-3 text-slate-100 md:pt-5">
                <span className="font-bold text-2xl md:text-3xl">Resources</span>
                <span className="text-sm md:text-base">Checkout all your upcoming events</span>
            </div>
            <div className="h-48 md:h-[95%] ml-auto md:ml-auto md:mr-10 mt-5 md:mt-0 w-full md:w-auto">
                <img src={Resource} className="h-full w-full object-contain" />
            </div>
        </div>
    );
}
