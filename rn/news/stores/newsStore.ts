import { create } from "zustand";
// eslint-disable-next-line import/no-unresolved
import { API_NEWS_KEY } from "@env";
import axios from "axios";

type News = {
    articles: any[];
    loading: boolean;
    fetchNews: (country: string) => Promise<void>;
};

export const useNewsStore = create<News>((set) => ({
    articles: [],
    loading: true,
    fetchNews: async (country: string) => {
        const newsUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_NEWS_KEY}`;

        try {
            const res = await axios.get(newsUrl);
            set({ articles: res.data.articles, loading: false });
        } catch (error) {
            console.log(error);
            set({ loading: false });
        }
    },
}));
