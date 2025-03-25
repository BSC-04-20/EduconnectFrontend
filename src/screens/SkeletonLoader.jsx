import SkeletonHeader from "../components/Skeleton/SkeletonHeader";
import SkeletonList from "../components/Skeleton/SkeletonList";
import SkeletonOverview from "../components/Skeleton/SkeletonOverview";
import SkeletonSideBar from "../components/Skeleton/SkeletonSideBar";

export default function SkeletonLoader(){
    return(
        <div className="flex flex-row gap-5">
            <SkeletonSideBar/>
            <section className="ml-[17%] w-[100%]">
                <SkeletonHeader/>
                <SkeletonOverview/>
                <SkeletonList/>
            </section>
        </div>
    )
}