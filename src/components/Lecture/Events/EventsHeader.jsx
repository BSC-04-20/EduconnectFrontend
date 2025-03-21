import Schedule from "../../../assets/Schedule-amico.svg";

export default function EventsHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center bg-sky-900 w-[95%] my-5 rounded-lg p-5 md:h-[30vh]">
      <div className="flex flex-col gap-3 text-slate-100">
        <span className="font-bold text-2xl md:text-3xl">Events</span>
        <span className="text-sm md:text-base">Checkout all your upcoming events</span>
      </div>
      <div className="w-full md:w-auto h-40 md:h-[95%] mt-5 md:mt-0 ml-auto">
        <img src={Schedule} className="h-full w-full object-contain" alt="Schedule" />
      </div>
    </div>
  );
}
