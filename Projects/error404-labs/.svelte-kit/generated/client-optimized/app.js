export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17')
];

export const server_loads = [];

export const dictionary = {
		"/": [~3],
		"/gioi-thieu": [4],
		"/huong-dan-hoc": [5,[2]],
		"/huong-dan-hoc/codeptit-c": [6,[2]],
		"/huong-dan-hoc/lap-trinh-c-cpp": [7,[2]],
		"/huong-dan-hoc/lap-trinh-c-cpp/oj.isp88.win": [8,[2]],
		"/huong-dan-hoc/lap-trinh-c-cpp/tu-co-ban-den-nang-cao": [9,[2]],
		"/huong-dan-hoc/lap-trinh-web": [10,[2]],
		"/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare": [11,[2]],
		"/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/[lesson]": [~12,[2]],
		"/huong-dan-hoc/lap-trinh-web/tao-trang-web-tap-chi-dien-tu": [13,[2]],
		"/lien-he": [14],
		"/tro-choi": [15],
		"/ve-toi": [~16],
		"/[slug]": [17]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';