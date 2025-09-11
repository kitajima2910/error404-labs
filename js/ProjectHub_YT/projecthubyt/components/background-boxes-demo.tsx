"use client";
import { Boxes } from "@/components/ui/background-boxes";
import SearchForm from "./SearchForm";

export default function BackgroundBoxesDemo() {
    return (
        <div className="h-[530px] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

            <Boxes />
            <h1 className="text-white text-7xl uppercase z-20 bg-black pt-5 pb-5 pl-10 pr-10 rounded-4xl font-bold mb-4">Tailwind is Awesome</h1>
            <p className="text-white font-bold text-2xl z-20 mb-5">Framer motion is the best animation library ngl</p>

            <SearchForm />
        </div>
    );
}
