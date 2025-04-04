import Resource from "../../../assets/Research paper-amico.svg";

export default function ResourcesHeader() {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start bg-sky-900 h-auto md:h-[30vh] w-[95%] my-5 rounded-lg p-5 md:p-0">
            <div className="flex flex-col gap-3 text-slate-100 pt-10 pl- text-center md:text-left">
                <span className="font-bold text-2xl md:text-3xl">Resources</span>
                <span >Checkout all your upcoming events</span>
            </div>
            <div className="h-[95%] md:ml-auto md:mr-10 flex justify-center md:justify-end w-full md:w-auto">
                <img src={Resource} className="w-40 md:w-auto h-auto object-contain"/>
            </div>
        </div>
    );
}
