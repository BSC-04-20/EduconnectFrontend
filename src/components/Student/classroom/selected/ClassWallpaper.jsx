export default function ClassWallpaper({name}){
    return(
    <div className="flex h-[20vh] w-[95%] p-4 bg-gradient-to-r from-blue-700 to-sky-400">
        <span className="text-white  text-2xl">{name}</span>
    </div>
    )
}