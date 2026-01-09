
import root from '../root.js';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '$app/paths/internal/server';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	async: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	csrf_trusted_origins: [],
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hash_routing: false,
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	service_worker_options: undefined,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\r\n<html lang=\"vi\" data-theme=\"luxury\">\r\n\t<head>\r\n\t\t<!-- Google tag (gtag.js) -->\r\n\t\t<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-KSWVM2K976\"></script>\r\n\t\t<script>\r\n\t\t\twindow.dataLayer = window.dataLayer || [];\r\n\t\t\tfunction gtag() {\r\n\t\t\t\tdataLayer.push(arguments);\r\n\t\t\t}\r\n\t\t\tgtag('js', new Date());\r\n\r\n\t\t\tgtag('config', 'G-KSWVM2K976');\r\n\t\t</script>\r\n\r\n\t\t<!-- Google Tag Manager -->\r\n\t\t<script>\r\n\t\t\t(function (w, d, s, l, i) {\r\n\t\t\t\tw[l] = w[l] || [];\r\n\t\t\t\tw[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });\r\n\t\t\t\tvar f = d.getElementsByTagName(s)[0],\r\n\t\t\t\t\tj = d.createElement(s),\r\n\t\t\t\t\tdl = l != 'dataLayer' ? '&l=' + l : '';\r\n\t\t\t\tj.async = true;\r\n\t\t\t\tj.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;\r\n\t\t\t\tf.parentNode.insertBefore(j, f);\r\n\t\t\t})(window, document, 'script', 'dataLayer', 'GTM-WGCM73HP');\r\n\t\t</script>\r\n\t\t<!-- End Google Tag Manager -->\r\n\r\n\t\t<meta charset=\"utf-8\" />\r\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\r\n\t\t<title>Error404-Labs | Học lập trình C/C++, Web, Game, Mobile & AI - R&D Programmer</title>\r\n\r\n\t\t<!-- ✅ Cấu hình SEO cơ bản -->\r\n\t\t<meta\r\n\t\t\tname=\"description\"\r\n\t\t\tcontent=\"Error404-Labs là nơi học lập trình C/C++, C#, Java, Python, HTML, CSS, JS, JavaScript, Web, Game, Mobile và AI. Chia sẻ dự án, hướng dẫn và nghiên cứu phát triển công nghệ thực tế.\"\r\n\t\t/>\r\n\t\t<meta\r\n\t\t\tname=\"keywords\"\r\n\t\t\tcontent=\"Error404-Labs, học lập trình, C++, C, C#, Java, Python, HTML, CSS, JS, JavaScript, Web Developer, Game Developer, AI, R&D, Phạm Xuân Hoài, kitajima2910, pxh2910\"\r\n\t\t/>\r\n\t\t<meta name=\"robots\" content=\"index, follow\" />\r\n\t\t<!-- <link rel=\"canonical\" href=\"https://www.error404-labs.info.vn/\" /> -->\r\n\r\n\t\t<!-- ✅ Open Graph (Facebook, Zalo, LinkedIn, Messenger...) -->\r\n\t\t<meta property=\"og:type\" content=\"website\" />\r\n\t\t<meta property=\"og:url\" content=\"https://www.error404-labs.info.vn/\" />\r\n\t\t<meta\r\n\t\t\tproperty=\"og:title\"\r\n\t\t\tcontent=\"Error404-Labs | R&D Web, Game, Mobile và AI Programmer / Developer\"\r\n\t\t/>\r\n\t\t<meta\r\n\t\t\tproperty=\"og:description\"\r\n\t\t\tcontent=\"Nơi nghiên cứu và phát triển Web, Game, Mobile và AI.\"\r\n\t\t/>\r\n\t\t<meta property=\"og:image\" content=\"https://www.error404-labs.info.vn/og-image.jpg\" />\r\n\t\t<meta property=\"og:image:alt\" content=\"Error404-Labs Thumbnail\" />\r\n\t\t<meta property=\"og:image:width\" content=\"1200\" />\r\n\t\t<meta property=\"og:image:height\" content=\"630\" />\r\n\t\t<meta property=\"og:locale\" content=\"vi_VN\" />\r\n\t\t<meta property=\"og:site_name\" content=\"Error404-Labs\" />\r\n\r\n\t\t<!-- ✅ Twitter Card -->\r\n\t\t<meta name=\"twitter:card\" content=\"summary_large_image\" />\r\n\t\t<meta\r\n\t\t\tname=\"twitter:title\"\r\n\t\t\tcontent=\"Error404-Labs | R&D Web, Game, Mobile, AI Programmer / Developer\"\r\n\t\t/>\r\n\t\t<meta\r\n\t\t\tname=\"twitter:description\"\r\n\t\t\tcontent=\"Error404-Labs là nơi nghiên cứu và phát triển Web, Game, Mobile và AI.\"\r\n\t\t/>\r\n\t\t<meta name=\"twitter:image\" content=\"https://www.error404-labs.info.vn/og-image.jpg\" />\r\n\r\n\t\t<!-- ✅ Icon + Theme -->\r\n\t\t<link rel=\"icon\" type=\"image/png\" href=\"/favicon-96x96.png\" sizes=\"96x96\" />\r\n\t\t<link rel=\"icon\" type=\"image/svg+xml\" href=\"/favicon.svg\" />\r\n\t\t<link rel=\"shortcut icon\" href=\"/favicon.ico\" />\r\n\t\t<link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/apple-touch-icon.png\" />\r\n\t\t<meta name=\"apple-mobile-web-app-title\" content=\"Error404-Labs\" />\r\n\t\t<link rel=\"manifest\" href=\"/site.webmanifest\" />\r\n\r\n\t\t<link rel=\"alternate\" href=\"/rss.xml\" type=\"application/atom+xml\" title=\"Atom\">\r\n\r\n\t\t<script type=\"application/ld+json\">\r\n\t\t\t{\r\n\t\t\t\t\"@context\": \"https://schema.org\",\r\n\t\t\t\t\"@type\": \"EducationalOrganization\",\r\n\t\t\t\t\"name\": \"Error404-Labs\",\r\n\t\t\t\t\"url\": \"https://www.error404-labs.info.vn/\",\r\n\t\t\t\t\"logo\": \"https://www.error404-labs.info.vn/favicon-96x96.png\",\r\n\t\t\t\t\"description\": \"RnD và học lập trình C/C++, C#, Java, Python, HTML, CSS, JS, JavaScript, Web, Game, Mobile, AI.\",\r\n\t\t\t\t\"sameAs\": [\r\n\t\t\t\t\t\"https://www.facebook.com/kitajima2910\",\r\n\t\t\t\t\t\"https://github.com/kitajima2910/error404-labs\",\r\n\t\t\t\t\t\"https://github.com/kitajima2910\"\r\n\t\t\t\t],\r\n\t\t\t\t\"knowsAbout\": [\r\n\t\t\t\t\t\"C/C++\",\r\n\t\t\t\t\t\"C#\",\r\n\t\t\t\t\t\"Java\",\r\n\t\t\t\t\t\"Python\",\r\n\t\t\t\t\t\"HTML\",\r\n\t\t\t\t\t\"CSS\",\r\n\t\t\t\t\t\"JS\",\r\n\t\t\t\t\t\"JavaScript\",\r\n\t\t\t\t\t\"Web Development\",\r\n\t\t\t\t\t\"Game Development\",\r\n\t\t\t\t\t\"AI\",\r\n\t\t\t\t\t\"Mobile App\"\r\n\t\t\t\t],\r\n\t\t\t\t\"founder\": {\r\n\t\t\t\t\t\"@type\": \"Person\",\r\n\t\t\t\t\t\"name\": \"Phạm Xuân Hoài\",\r\n\t\t\t\t\t\"jobTitle\": \"Research & Developer\",\r\n\t\t\t\t\t\"url\": \"https://www.error404-labs.info.vn/\"\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t</script>\r\n\r\n\t\t<!-- ✅ Các phần động của SvelteKit -->\r\n\t\t" + head + "\r\n\r\n\t\t<script type=\"module\">\r\n\t\t\tconst theme = localStorage.getItem('data-theme')\r\n\t\t\ttheme ? document.documentElement.setAttribute('data-theme', theme) : localStorage.setItem('data-theme', 'luxury')\r\n\t\t</script>\r\n\t</head>\r\n\t<body data-sveltekit-preload-data=\"hover\">\r\n\t\t<!-- Google Tag Manager (noscript) -->\r\n\t\t<noscript\r\n\t\t\t><iframe\r\n\t\t\t\tsrc=\"https://www.googletagmanager.com/ns.html?id=GTM-WGCM73HP\"\r\n\t\t\t\theight=\"0\"\r\n\t\t\t\twidth=\"0\"\r\n\t\t\t\tstyle=\"display: none; visibility: hidden\"\r\n\t\t\t></iframe\r\n\t\t></noscript>\r\n\t\t<!-- End Google Tag Manager (noscript) -->\r\n\t\t<div style=\"display: contents\">" + body + "</div>\r\n\t</body>\r\n</html>\r\n",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "6tr505"
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let handleValidationError;
	let init;
	

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		handleValidationError,
		init,
		reroute,
		transport
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation };
