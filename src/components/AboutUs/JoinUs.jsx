import GettyImages from "../../assets/GettyImages.jpg";

export default function JoinUs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-[4%] py-10 gap-10">
      <div className="flex justify-center items-center">
        <div
          className="w-full h-[50vh] bg-cover bg-center rounded-md"
          style={{ backgroundImage: `url(${GettyImages})` }}
        ></div>
      </div>

      <div className="flex flex-col justify-center">
        <span className="text-2xl md:text-3xl font-bold text-sky-900 mb-5">
          Join Us in Transforming Learning!
        </span>
        <span className="text-gray-800 text-base md:text-xl font-light mb-5">
          We believe in the power of education and digital innovation. Whether you’re a student
          looking for study support or a lecturer seeking an efficient way to share materials,
          MADISS is here for you.
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <button className="text-white py-3 bg-sky-500 text-lg font-bold hover:bg-sky-600 rounded-md">
            Lecturer
          </button>
          <button className="text-white py-3 bg-sky-500 text-lg font-bold hover:bg-sky-600 rounded-md">
            Student
          </button>
        </div>
      </div>
    </div>
  );
}
