import React from "react";
import Form from "next/form";
import { Search } from "lucide-react";

const SearchForm = () => {
    return (
        <Form action="/" scroll={false} className="search-form relative flex justify-center max-w-[100%] w-[730px] z-20">
            <input type="text" name="query" defaultValue="" className="search-input bg-white outline w-[100%] pl-5 pr-5 pt-4 pb-4 rounded-4xl" placeholder="Search Projects" />
            <div className="flex gap-2 z-21 bg-black top-[10%] left-[92%] p-3 rounded-4xl absolute">
                { false && (
                    <div>Reset</div>
                ) }

                <button type="submit" className="search-btn text-white">
                    <Search className="size-5" />
                </button>
            </div>
        </Form>
    );
};

export default SearchForm;
