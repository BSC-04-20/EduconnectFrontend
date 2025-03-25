import { GoCalendar, GoLocation, GoPeople } from "react-icons/go";

export default function EventsOverview() {
    const events = Array(8).fill({
        title: "Advanced Mathematics",
        date: "June 15, 2024 • 2:00 pm",
        location: "Virtual Event",
        attendees: "24 Attendees",
    });

    return (
        <div className="bg-white mx-4 ml-0.5 w-[95%]">
            <div className="w-[95%] grid grid-cols-1 sm:grid-cols-2 ml-6 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
                {events.map((event, index) => (
                    <div key={index} className="shadow-lg rounded-lg p-4 hover:scale-105 transition-transform duration-300">
                        <span className="font-semibold text-sm">{event.title}</span>
                        <div className="flex flex-row gap-3 mt-3 mb-2 items-center">
                            <GoCalendar className="text-gray-500" />
                            <span className="text-xs text-gray-500">{event.date}</span>
                        </div>
                        <div className="flex flex-row gap-3 mb-2 items-center">
                            <GoLocation className="text-gray-500" />
                            <span className="text-xs text-gray-500">{event.location}</span>
                        </div>
                        <div className="flex flex-row gap-3 mb-2 items-center">
                            <GoPeople className="text-gray-500" />
                            <span className="text-xs text-gray-500">{event.attendees}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
