import BackgroundBoxesDemo from "@/components/background-boxes-demo";
import { ThreeDCard } from "@/components/ThreeDCard";

const page = () => {
    return (
        <>
            <BackgroundBoxesDemo />

            <section className="container mx-auto w-[100cqw] bg-pink-50">
                <p className="font-semibold text-[30px]">Trendy Projects</p>
                <ul className="mt-5 card_grid grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-1 justify-center">
                    {[
                        { id: 123, title: "a new project", desc: "a greate descrip" },
                        { id: 123, title: "a new project", desc: "a greate descrip" },
                        { id: 123, title: "a new project", desc: "a greate descrip" },
                        { id: 123, title: "a new project", desc: "a greate descrip" },
                    ].map((item, i) => (
                        <li key={i}>
                            <ThreeDCard />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};

export default page;
