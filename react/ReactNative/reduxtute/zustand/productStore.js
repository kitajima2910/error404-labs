import { create } from "zustand";

const useProductStore = create((set, get) => ({
    product: "pxh2910-zustand",

    addProduct: (value) => {
        set({
            product: value,
        });
    },
}));

export default useProductStore;
