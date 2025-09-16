import { create } from "zustand";

export const useProductStore = create((set, get) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {
                success: false,
                message: "Please fill in all fields.",
            };
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        const data = await res.json();

        set({
            products: [...get().products, data.data],
        });

        return {
            success: true,
            message: "Product created successfully"
        }
    },
}));
