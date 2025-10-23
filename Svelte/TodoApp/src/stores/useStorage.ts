import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Writable } from 'svelte/store';

export function useStorage<Value>(key: string, initialValue: Value): Writable<Value> {
	// Load từ localStorage an toàn
	const loadedValue = browser
		? (() => {
				try {
					const item = localStorage.getItem(key);
					return item ? JSON.parse(item) : initialValue;
				} catch (error) {
					console.warn(`Error loading ${key} from localStorage:`, error);
					return initialValue;
				}
			})()
		: initialValue;

	const store = writable<Value>(loadedValue);

	// Subscribe để auto-save (chỉ trên browser)
	if (browser) {
		store.subscribe((value) => {
			try {
				localStorage.setItem(key, JSON.stringify(value));
			} catch (error) {
				console.error(`Error saving ${key} to localStorage:`, error);
			}
		});
	}

	return store;
}
