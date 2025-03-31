export default function Board({title, secondaryTxt, url}){
    return(
        <div className="flex flex-row items-start bg-sky-900 h-[30vh] w-[95%] my-5 rounded-lg">
            <div className="flex flex-col gap-3 pl-6 text-slate-100 pt-5">
                <span className="font-bold text-3xl">{title}</span>
                <span>{secondaryTxt}</span>
            </div>
            <div className="h-[95%] ml-auto mr-10">
                <img src={url} className="size-full"/>
            </div>
        </div>
    )
}