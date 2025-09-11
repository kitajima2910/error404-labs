import { create } from "zustand";
// eslint-disable-next-line import/no-unresolved
import { API_NEWS_KEY } from "@env";
import axios from "axios";

type News = {
    categories: any[];
    loading: boolean;
    fetchCategories: (country: string, category: string) => Promise<void>;
};

export const useCategoryStore = create<News>((set) => ({
    categories: [],
    loading: true,
    fetchCategories: async (country: string, category: string) => {
        const newsUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_NEWS_KEY}`;

        try {
            const res = await axios.get(newsUrl);
            set({ categories: res.data.articles, loading: false });
        } catch (error) {
            console.log(error);
            set({ loading: false });
        }
    },
}));
