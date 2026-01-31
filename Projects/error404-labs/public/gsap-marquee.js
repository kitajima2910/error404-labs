/*! GSAP Marquee | MIT License */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'gsap'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'), require('gsap'));
	} else {
		root.gsapMarquee = factory(root.jQuery, root.gsap || root.gsap?.gsap || root.GSAP);
	}
}(typeof self !== 'undefined' ? self : this, function ($, gsapGlobal) {
	'use strict';

	var gsap = (gsapGlobal && gsapGlobal.gsap) ? gsapGlobal.gsap : gsapGlobal;
	if (!gsap || !gsap.ticker) throw new Error('gsapMarquee requires GSAP (gsap.ticker)');

	function normalizeElements(selectorOrElements) {
		if (!selectorOrElements) return [];
		// jQuery object
		if (typeof $ !== 'undefined' && selectorOrElements instanceof $) return selectorOrElements.toArray();
		// selector string
		if (typeof selectorOrElements === 'string') return Array.from(document.querySelectorAll(selectorOrElements));
		// single element
		if (selectorOrElements.nodeType === 1) return [selectorOrElements];
		// NodeList or Array
		if (selectorOrElements instanceof NodeList || Array.isArray(selectorOrElements)) return Array.from(selectorOrElements);
		// jQuery-like collection
		if (selectorOrElements.length && selectorOrElements[0] && selectorOrElements[0].nodeType === 1) return Array.from(selectorOrElements);
		return [];
	}

	function gsapMarquee(selector, options) {
		var settings = Object.assign({
			speed: 100,
			direction: 'ltr', // ltr / rtl
			pauseOnHover: true,
			pauseOnClick: false,
			variableSpeed: false,
			startPaused: false,
			responsive: true,
			loop: true,
			containerSelector: '.customMarquee',
			itemsSelector: '.marquee-item',
			onComplete: null
		}, options || {});

		var instances = [];

		var els = normalizeElements(selector);
		els.forEach(function (marquee) {
			var inner = marquee.querySelector(settings.containerSelector) || marquee;
			var items = Array.from(inner.querySelectorAll(settings.itemsSelector));
			var originalItems = Array.from(items);
			var isPaused = !!settings.startPaused;
			var currentX = 0;
			var resizeHandlerBound = false;
			var tickerFn = null;
			var cycleCount = 0;
			var originalSpeed = settings.speed;

			function outerWidth(el, includeMargin) {
				if (!el) return 0;
				var rect = el.getBoundingClientRect();
				var w = rect.width;
				if (includeMargin) {
					var s = getComputedStyle(el);
					w += parseFloat(s.marginLeft) + parseFloat(s.marginRight);
				}
				return w;
			}

			function resetInner() {
				// remove clones (nodes not in originalItems)
				var all = Array.from(inner.querySelectorAll(settings.itemsSelector));
				all.forEach(function (node) {
					if (!originalItems.includes(node)) {
						node.parentNode && node.parentNode.removeChild(node);
					}
				});
				items = Array.from(inner.querySelectorAll(settings.itemsSelector));
			}

			function getSetWidth(set) {
				if (!set.length) return 0;
				var total = 0;
				set.forEach(function (el, idx) {
					if (idx === 0) {
						total += outerWidth(el, false);
					} else {
						var prev = set[idx - 1];
						var rectPrev = prev.getBoundingClientRect();
						var rectCurr = el.getBoundingClientRect();
						var gap = rectCurr.left - rectPrev.right;
						total += gap + outerWidth(el, false);
					}
				});
				return total;
			}

			function fillToViewport() {
				var total = getSetWidth(items);
				if (items.length === 0) return;
				var i = 0;
				var firstOuter = outerWidth(items[0], true);
				while (total < marquee.clientWidth + firstOuter) {
					var clone = items[i % items.length].cloneNode(true);
					inner.appendChild(clone);
					items.push(clone);
					total = getSetWidth(items);
					i++;
					if (i > 1000) break;
				}
			}

			function childrenItems() {
				return Array.from(inner.children).filter(function (c) { return c.matches && c.matches(settings.itemsSelector); });
			}

			function nextItem(el) {
				var n = el.nextElementSibling;
				while (n) {
					if (n.matches && n.matches(settings.itemsSelector)) return n;
					n = n.nextElementSibling;
				}
				return null;
			}

			function prevItem(el) {
				var n = el.previousElementSibling;
				while (n) {
					if (n.matches && n.matches(settings.itemsSelector)) return n;
					n = n.previousElementSibling;
				}
				return null;
			}

			function loopMarquee() {
				if (tickerFn) return;
				tickerFn = function () {
					if (isPaused) return;
					var delta = gsap.ticker.deltaRatio(60);

					if (settings.direction === 'rtl') {
						currentX += (settings.speed / 60) * delta;
					} else {
						currentX -= (settings.speed / 60) * delta;
					}
					gsap.set(inner, { x: currentX });

					while (true) {
						var children = childrenItems();
						var first = children[0];
						var last = children[children.length - 1];
						if (!first || !last) break;

						var wrapRect = marquee.getBoundingClientRect();
						var firstRect = first.getBoundingClientRect();
						var lastRect = last.getBoundingClientRect();

						if (settings.direction === 'ltr' && firstRect.right <= wrapRect.left) {
							var next = nextItem(first);
							var gap = next ? next.getBoundingClientRect().left - firstRect.right : 0;
							var advance = outerWidth(first, false) + gap;
							inner.appendChild(first);
							currentX += advance;
							gsap.set(inner, { x: currentX });
							if (!settings.loop) {
								unloopMarquee();
								settings.onComplete && settings.onComplete(cycleCount++);
							}
							continue;
						}

						if (settings.direction === 'rtl' && lastRect.left >= wrapRect.right) {
							var prev = prevItem(last);
							var gap2 = prev ? lastRect.left - prev.getBoundingClientRect().right : 0;
							var advance2 = outerWidth(last, false) + gap2;
							inner.insertBefore(last, inner.firstChild);
							currentX -= advance2;
							gsap.set(inner, { x: currentX });
							if (!settings.loop) {
								unloopMarquee();
								settings.onComplete && settings.onComplete(cycleCount++);
							}
							continue;
						}

						break;
					}
				};
				gsap.ticker.add(tickerFn);
			}

			function unloopMarquee() {
				if (tickerFn) {
					gsap.ticker.remove(tickerFn);
					tickerFn = null;
				}
			}

			function handleResize() {
				resetInner();
				currentX = 0;
				gsap.set(inner, { x: 0 });
				fillToViewport();
			}

			function resetInner() {
				// same as earlier but ensures items is updated
				var all = Array.from(inner.querySelectorAll(settings.itemsSelector));
				all.forEach(function (node) {
					if (!originalItems.includes(node)) {
						node.parentNode && node.parentNode.removeChild(node);
					}
				});
				items = Array.from(inner.querySelectorAll(settings.itemsSelector));
			}

			// initial build + ticker
			fillToViewport();
			loopMarquee();

			// pause on hover
			function onMouseEnter() {
				if (settings.variableSpeed) {
					settings.speed = originalSpeed / 3;
				} else {
					isPaused = true;
				}
			}

			function onMouseLeave() {
				if (settings.variableSpeed) {
					settings.speed = originalSpeed;
				} else {
					isPaused = false;
				}
			}

			if (settings.pauseOnHover) {
				marquee.addEventListener('mouseenter', onMouseEnter);
				marquee.addEventListener('mouseleave', onMouseLeave);
			}

			// pause on click
			function onClickToggle() { isPaused = !isPaused; }
			if (settings.pauseOnClick) marquee.addEventListener('click', onClickToggle);

			if (settings.responsive && !resizeHandlerBound) {
				window.addEventListener('resize', handleResize);
				resizeHandlerBound = true;
			}

			instances.push({
				pause: function () { isPaused = true; },
				resume: function () { isPaused = false; },
				isPaused: function () { return !!isPaused; },
				rebuild: function () { handleResize(); },
				reverse: function () { settings.direction = (settings.direction === 'ltr') ? 'rtl' : 'ltr'; },
				destroy: function () {
					// remove event listeners
					try {
						if (settings.pauseOnHover) {
							marquee.removeEventListener('mouseenter', onMouseEnter);
							marquee.removeEventListener('mouseleave', onMouseLeave);
						}
						if (settings.pauseOnClick) marquee.removeEventListener('click', onClickToggle);
					} catch (e) { }
					if (resizeHandlerBound) window.removeEventListener('resize', handleResize);
					unloopMarquee();
					gsap.set(inner, { clearProps: 'x' });
				},
				el: marquee
			});
		});

		return instances.length === 1 ? instances[0] : instances;
	}

	// attach jQuery plugin wrapper if jQuery exists
	if (typeof $ !== 'undefined' && $.fn) {
		$.fn.gsapMarquee = function (options) {
			gsapMarquee(this.toArray(), options);
			return this;
		};
	}

	return gsapMarquee;

}));
