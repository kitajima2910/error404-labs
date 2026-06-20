---
name: webs-frontend
description: Frontend React production — component patterns, custom hooks, data fetching, bundle optimization. Core Web Vitals, 90+ Lighthouse.
---

# webs-frontend — Frontend

## Mẫu Component

```typescript
// Polymorphic component
interface BoxProps<T extends React.ElementType = "div"> {
  as?: T;
  children?: React.ReactNode;
  className?: string;
}

export function Box<T extends React.ElementType = "div">({
  as,
  children,
  className,
  ...props
}: BoxProps<T> & React.ComponentPropsWithoutRef<T>) {
  const Component = as || "div";
  return <Component className={className} {...props}>{children}</Component>;
}

// Compound component pattern
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

function Tabs({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.List = function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="tabs-list flex gap-2 border-b" role="tablist">{children}</div>;
};

Tabs.Tab = function TabsTab({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  return (
    <button
      role="tab"
      aria-selected={ctx.activeTab === value}
      className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
        ctx.activeTab === value ? "border-blue-500 text-blue-600" : "border-transparent"
      }`}
      onClick={() => ctx.setActiveTab(value)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function TabsPanel({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  if (ctx.activeTab !== value) return null;
  return <div role="tabpanel" className="pt-4">{children}</div>;
};
```

## Custom Hooks (production)

```typescript
// useAsync — không memory leak, abort controller
function useAsync<T>(fn: (signal: AbortSignal) => Promise<T>, deps: any[] = []) {
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: Error | null }>({
    data: null, loading: true, error: null,
  });

  useEffect(() => {
    const abort = new AbortController();
    let cancelled = false;

    setState(s => ({ ...s, loading: true, error: null }));
    fn(abort.signal)
      .then(data => { if (!cancelled) setState({ data, loading: false, error: null }); })
      .catch(error => { if (!cancelled) setState({ data: null, loading: false, error }); });

    return () => { cancelled = true; abort.abort(); };
  }, deps);

  return state;
}

// useDebounce
function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// useLocalStorage
function useLocalStorage<T>(key: string, initial: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch { return initial; }
  });

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { console.warn(`Failed to save ${key} to localStorage`); }
  }, [key, value]);

  return [value, setValue];
}
```

## Truy vấn dữ liệu (TanStack Query)

```typescript
import { QueryClient, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

interface Todo { id: string; title: string; completed: boolean; }

function useTodos(page = 1) {
  return useQuery({
    queryKey: ["todos", "list", page],
    queryFn: async ({ signal }) => {
      const res = await fetch(`/api/todos?page=${page}`, { signal });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json() as Promise<{ data: Todo[]; total: number }>;
    },
    placeholderData: keepPreviousData,
  });
}

function useCreateTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error("Failed to create");
      return res.json() as Promise<Todo>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
```

## Tối ưu Bundle

```typescript
// Dynamic import cho route
const Dashboard = lazy(() => import("./pages/Dashboard"));

// Dynamic import cho heavy library
const PDFViewer = lazy(() => import("./components/PDFViewer"));

// Tree-shaking friendly import
import { format } from "date-fns"; // Không import entire date-fns

// CSS purging với Tailwind (mặc định)
// purge: ["./src/**/*.{ts,tsx}"]
```
