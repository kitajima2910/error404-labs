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
            products: [...get().products, data.message],
        });

        return {
            success: true,
            message: "Product created successfully",
        };
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({
            products: data.message,
        });
    },
    deleteProducts: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });

        const data = await res.json();
        if (!data.success) {
            return {
                success: false,
                message: data.message,
            };
        }

        set({
            products: get().products.filter((product) => product._id !== pid),
        });
        return {
            success: true,
            message: data.message,
        };
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });

        const data = await res.json();
        if (!data.success) {
            return {
                success: false,
                message: data.message,
            };
        }

        set({
            products: get().products.map((product) =>
                product._id === pid ? data.message : product
            ),
        });
        return {
            success: true,
            message: data.message,
        };
    },
}));
