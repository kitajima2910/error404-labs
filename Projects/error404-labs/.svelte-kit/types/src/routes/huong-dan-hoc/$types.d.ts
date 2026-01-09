import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = {  };
type RouteId = '/huong-dan-hoc';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = Omit<EnsureDefined<import('../$types.js').LayoutData>, keyof LayoutData> & EnsureDefined<LayoutData>;
type LayoutRouteId = RouteId | "/huong-dan-hoc" | "/huong-dan-hoc/codeptit-c" | "/huong-dan-hoc/lap-trinh-c-cpp" | "/huong-dan-hoc/lap-trinh-c-cpp/oj.isp88.win" | "/huong-dan-hoc/lap-trinh-c-cpp/tu-co-ban-den-nang-cao" | "/huong-dan-hoc/lap-trinh-web" | "/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare" | "/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/[lesson]" | "/huong-dan-hoc/lap-trinh-web/tao-trang-web-tap-chi-dien-tu"
type LayoutParams = RouteParams & { lesson?: string }
type LayoutParentData = EnsureDefined<import('../$types.js').LayoutData>;

export type PageServerData = null;
export type PageData = Expand<PageParentData>;
export type PageProps = { params: RouteParams; data: PageData }
export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;
export type LayoutProps = { params: LayoutParams; data: LayoutData; children: import("svelte").Snippet }