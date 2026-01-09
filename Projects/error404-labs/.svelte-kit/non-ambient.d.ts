
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/bai-dang" | "/api/github-avatar" | "/api/github-avatar/u" | "/api/github-avatar/u/[userid]" | "/api/github-profile" | "/api/github-profile/[username]" | "/gioi-thieu" | "/huong-dan-hoc" | "/huong-dan-hoc/codeptit-c" | "/huong-dan-hoc/lap-trinh-c-cpp" | "/huong-dan-hoc/lap-trinh-c-cpp/oj.isp88.win" | "/huong-dan-hoc/lap-trinh-c-cpp/tu-co-ban-den-nang-cao" | "/huong-dan-hoc/lap-trinh-web" | "/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare" | "/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/[lesson]" | "/huong-dan-hoc/lap-trinh-web/tao-trang-web-tap-chi-dien-tu" | "/lien-he" | "/rss.xml" | "/tro-choi" | "/ve-toi" | "/[slug]";
		RouteParams(): {
			"/api/github-avatar/u/[userid]": { userid: string };
			"/api/github-profile/[username]": { username: string };
			"/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/[lesson]": { lesson: string };
			"/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { userid?: string; username?: string; lesson?: string; slug?: string };
			"/api": { userid?: string; username?: string };
			"/api/bai-dang": Record<string, never>;
			"/api/github-avatar": { userid?: string };
			"/api/github-avatar/u": { userid?: string };
			"/api/github-avatar/u/[userid]": { userid: string };
			"/api/github-profile": { username?: string };
			"/api/github-profile/[username]": { username: string };
			"/gioi-thieu": Record<string, never>;
			"/huong-dan-hoc": { lesson?: string };
			"/huong-dan-hoc/codeptit-c": Record<string, never>;
			"/huong-dan-hoc/lap-trinh-c-cpp": Record<string, never>;
			"/huong-dan-hoc/lap-trinh-c-cpp/oj.isp88.win": Record<string, never>;
			"/huong-dan-hoc/lap-trinh-c-cpp/tu-co-ban-den-nang-cao": Record<string, never>;
			"/huong-dan-hoc/lap-trinh-web": { lesson?: string };
			"/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare": { lesson?: string };
			"/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/[lesson]": { lesson: string };
			"/huong-dan-hoc/lap-trinh-web/tao-trang-web-tap-chi-dien-tu": Record<string, never>;
			"/lien-he": Record<string, never>;
			"/rss.xml": Record<string, never>;
			"/tro-choi": Record<string, never>;
			"/ve-toi": Record<string, never>;
			"/[slug]": { slug: string }
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/bai-dang" | "/api/bai-dang/" | "/api/github-avatar" | "/api/github-avatar/" | "/api/github-avatar/u" | "/api/github-avatar/u/" | `/api/github-avatar/u/${string}` & {} | `/api/github-avatar/u/${string}/` & {} | "/api/github-profile" | "/api/github-profile/" | `/api/github-profile/${string}` & {} | `/api/github-profile/${string}/` & {} | "/gioi-thieu" | "/gioi-thieu/" | "/huong-dan-hoc" | "/huong-dan-hoc/" | "/huong-dan-hoc/codeptit-c" | "/huong-dan-hoc/codeptit-c/" | "/huong-dan-hoc/lap-trinh-c-cpp" | "/huong-dan-hoc/lap-trinh-c-cpp/" | "/huong-dan-hoc/lap-trinh-c-cpp/oj.isp88.win" | "/huong-dan-hoc/lap-trinh-c-cpp/oj.isp88.win/" | "/huong-dan-hoc/lap-trinh-c-cpp/tu-co-ban-den-nang-cao" | "/huong-dan-hoc/lap-trinh-c-cpp/tu-co-ban-den-nang-cao/" | "/huong-dan-hoc/lap-trinh-web" | "/huong-dan-hoc/lap-trinh-web/" | "/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare" | "/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/" | `/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/${string}` & {} | `/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/${string}/` & {} | "/huong-dan-hoc/lap-trinh-web/tao-trang-web-tap-chi-dien-tu" | "/huong-dan-hoc/lap-trinh-web/tao-trang-web-tap-chi-dien-tu/" | "/lien-he" | "/lien-he/" | "/rss.xml" | "/rss.xml/" | "/tro-choi" | "/tro-choi/" | "/ve-toi" | "/ve-toi/" | `/${string}` & {} | `/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/about/imgs/computer_gif.webp" | "/android-original.svg" | "/androidstudio-original.svg" | "/apple-touch-icon.png" | "/CodePTIT-C/Slides/1_tong_quan.pdf" | "/computer_gif.mp4" | "/computer_gif.webp" | "/csharp-original.svg" | "/css3-original.svg" | "/favicon-96x96.png" | "/favicon.ico" | "/favicon.svg" | "/git-original.svg" | "/github-original.svg" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-01/bai-tap-1.png" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-01/bai-tap-2.png" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-01/demo-v2.png" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-01/demo.png" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-02/bai-1.png" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-02/bai-2.png" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-02/demo.png" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-03/assets.rar" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-03/demo.png" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-04/assets.rar" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-04/demo.png" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-05/demo.png" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-06/demo.png" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-07/assets.rar" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-07/demo.png" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-08/assets.rar" | "/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-08/demo.png" | "/html5-original.svg" | "/java-original.svg" | "/javascript-original.svg" | "/midcodekid.jpg" | "/midcodekid.png" | "/midcodekid.webp" | "/og-image.jpg" | "/robots.txt" | "/site.webmanifest" | "/sitemap.xml" | "/tao-trang-web-tap-chi-dien-tu/bai01-0.png" | "/tao-trang-web-tap-chi-dien-tu/bai01-1.png" | "/tao-trang-web-tap-chi-dien-tu/bai01-2.png" | "/tao-trang-web-tap-chi-dien-tu/bai01-3.png" | "/tao-trang-web-tap-chi-dien-tu/bai02-0.png" | "/tao-trang-web-tap-chi-dien-tu/bai03-0.png" | "/tao-trang-web-tap-chi-dien-tu/bai04-0.png" | "/tao-trang-web-tap-chi-dien-tu/bai05-0.png" | "/tao-trang-web-tap-chi-dien-tu/bai05-1.png" | "/tao-trang-web-tap-chi-dien-tu/bai05-2.png" | "/tao-trang-web-tap-chi-dien-tu/bai06-0.png" | "/tao-trang-web-tap-chi-dien-tu/bai07-0.png" | "/tao-trang-web-tap-chi-dien-tu/bai08-0.png" | "/tao-trang-web-tap-chi-dien-tu/bai09-0.png" | "/tao-trang-web-tap-chi-dien-tu/bai10-0.png" | "/tortoisegit-original.svg" | "/tro-choi/TestPhaserGame/consts/AudioKeys.js" | "/tro-choi/TestPhaserGame/consts/Fonts.js" | "/tro-choi/TestPhaserGame/consts/SceneKeys.js" | "/tro-choi/TestPhaserGame/demo.png" | "/tro-choi/TestPhaserGame/index.html" | "/tro-choi/TestPhaserGame/jsconfig.json" | "/tro-choi/TestPhaserGame/main.js" | "/tro-choi/TestPhaserGame/phaser.d.ts" | "/tro-choi/TestPhaserGame/phaser.min.js" | "/tro-choi/TestPhaserGame/public/ping_pong_8bit_beeep.ogg" | "/tro-choi/TestPhaserGame/public/ping_pong_8bit_plop.ogg" | "/tro-choi/TestPhaserGame/scenes/Colors.js" | "/tro-choi/TestPhaserGame/scenes/GameBackground.js" | "/tro-choi/TestPhaserGame/scenes/GameOver.js" | "/tro-choi/TestPhaserGame/scenes/GameScreen.js" | "/tro-choi/TestPhaserGame/scenes/TitleScreen.js" | "/web-app-manifest-192x192.png" | "/web-app-manifest-512x512.png" | string & {};
	}
}