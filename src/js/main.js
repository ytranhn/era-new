import { Loading } from './libraries/Loading';
import { getSVGs } from './utilities/util';
import { MoveElement } from './libraries/MoveElement';
import { checkoutEdit } from "./modules/checkout";
import { Subject } from 'rxjs';
// import Swiper from 'swiper';

const headerMobile = document.querySelector('.header__mobile');
const headerToggleMobile = document.querySelector('.header__toggleMobile');
const menuWrapper = document.querySelector('.header__mobile');
const backdrop = document.querySelector('.backdrop');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const main = document.querySelector('main');
const body = document.body;

const backdropObserver = new Subject();
backdropObserver.subscribe((isActive) => {
	if (isActive) {
		backdrop.classList.add('show');
		body.classList.add('overflow-hidden');
	} else {
		backdrop.classList.remove('show');
		body.classList.remove('overflow-hidden');
	}
});

// window.disableLitepickerStyles = true;
document.addEventListener('DOMContentLoaded', () => {
	getSVGs('.svg');
	Loading().then();
	// Quantity add remove
	quantityGroup();
	// init calendar
	initCalendar();
	formTourDateChoose();
	// Rating
	rating();
	// price slider
	priceSlider();
	// toggle cart summary
	cartSummaryToggle();
	cartOptionsItemToggle();
	// Header
	HeaderResponse();
	HeaderToggle();
	backdropHandler();
	// Form search at head of page
	// tourSearch();
	openFormSearch();
	// Index
	homeSliders();
	// Make my trip
	makeMyTripSlider();
	formTourItemToggle();
	swiperSlider();
	//scroll
	// menuSroll();
	//toggle class
	buttonToggle();
	// toggle filter on tour list page
	toggleFilter();
	// scrollspy
	scrollSpy();
	// tour detail slider
	tourDetailSlider();
	questionToggle();

	// Collapse toggle makeMyTrip block
	$('.makeMyTrip__block').each(function () {
		const title = $(this).find('.blockCanCollapse__title');
		const content = $(this).find('.blockCanCollapse__content');
		const arrow = title.find('.fa-chevron-down');
		title.on('click', function (e) {
			content.slideToggle();
			title.toggleClass('active');
			if (title.hasClass('active')) {
				arrow.addClass('fa-chevron-up');
				arrow.removeClass('fa-chevron-down');
			} else {
				arrow.addClass('fa-chevron-down');
				arrow.removeClass('fa-chevron-up');
			}
		});
	});

	// edit quantity in checkout page
	checkoutEdit()
});

//swiper
function swiperSlider() {
	let ourTeam = new Swiper('.ourTeam__slideWrapper .swiper-container', {
		autoplay: {
			delay: 4500,
		},
		spaceBetween: 10,
		speed: 500,
		loop: true,
		navigation: {
			nextEl: '.ourTeam__slideWrapper .swiper__btn--prev',
			prevEl: '.ourTeam__slideWrapper .swiper__btn--next',
		},
		pagination: {
			el: '.ourTeam__slideWrapper .swiper__pagination',
			type: 'bullets',
			clickable: true,
		},
		simulateTouch: false,
		slidesPerView: 1,
		breakpoints: {
			576: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 40,
			},
		},
	});
	let destinationPopularSlider = new Swiper(
		'.popularDestination__slider .swiper-container',
		{
			slidesPerView: 2,
			spaceBetween: 10,
			loop: true,
			pagination: {
				el: '.popularDestination__slider .swiper__pagination',
				type: 'bullets',
				clickable: true,
			},
			navigation: {
				prevEl: '.popularDestination__slider .swiper__btn--prev',
				nextEl: '.popularDestination__slider .swiper__btn--next',
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
				1360: {
					spaceBetween: 40,
					slidesPerView: 4,
				},
			},
		},
	);

	let bestToursSlider = new Swiper(
		'.bestTour__slideWrapper .swiper-container',
		{
			slidesPerView: 1,
			spaceBetween: 10,
			loop: true,
			pagination: {
				el: '.bestTour__slideWrapper .swiper__pagination',
				type: 'bullets',
				clickable: true,
			},
			navigation: {
				prevEl: '.bestTour__slideWrapper .swiper__btn--prev',
				nextEl: '.bestTour__slideWrapper .swiper__btn--next',
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
				1360: {
					spaceBetween: 40,
					slidesPerView: 4,
				},
			},
		},
	);
	let rating = new Swiper('.review__slideWrapper .swiper-container', {
		autoplay: {
			delay: 4500,
		},
		loop: true,
		spaceBetween: 0,
		speed: 500,
		navigation: {
			nextEl: '.review__slideWrapper .swiper__btn--next',
			prevEl: '.review__slideWrapper .swiper__btn--prev',
		},
		pagination: {
			el: '.review__slideWrapper .swiper__pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			1024: {
				slidesPerView: 2.9,
				spaceBetween: -10,
				centeredSlides: true,
			},
			1500: {
				slidesPerView: 2.9,
				spaceBetween: -10,
				centeredSlides: true,
				loop: true,
			},
		},
	});
	//about-slide-year
	var years = new Swiper('.story__years .swiper-container', {
		spaceBetween: 10,
		slidesPerView: 3,
		freeMode: true,
		// loop: true,
		// loopedSlides: 5, //looped slides should be the same
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		init: false,
		breakpoints: {
			1200: {
				slidesPerView: 9,
			},
		},
		on: {
			init: function () {
				itemPerYears.init();
				years.slides[0]
					.querySelector('.yearItem')
					.classList.add('slide-active');
				itemPerYears.slides[0].classList.add('slide-active');
			},
			click: function (e) {
				itemPerYears.slides.forEach((item, index) => {
					if (index == e.clickedIndex) {
						item.classList.add('slide-active');
					} else {
						item.classList.remove('slide-active');
					}
				});
				years.slides.forEach((item, index) => {
					if (index == e.clickedIndex) {
						item.querySelector('.yearItem').classList.add(
							'slide-active',
						);
					} else {
						item.querySelector('.yearItem').classList.remove(
							'slide-active',
						);
					}
				});
			},
		},
	});
	var itemPerYears = new Swiper('.story__itemsPerYear .swiper-container', {
		spaceBetween: 10,
		slidesPerView: 1,
		init: false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		thumbs: {
			swiper: years,
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	});
	if (document.querySelector('.story__itemsPerYear .swiper-container')) {
		years.init();
	}
	var aboutGallery = new Swiper('.ab-7 .swiper-container', {
		spaceBetween: 10,
		slidesPerView: 1,
		pagination: {
			el: '.ab-7 .swiper__pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	});
}
//scroll menu
// function menuSroll() {
// 	function functionScroll() {
// 		var section = document.querySelectorAll('.scroll'),
// 			sections = {},
// 			i = 0;

// 		Array.prototype.forEach.call(section, function (e) {
// 			sections[e.id] = e.offsetTop;
// 		});
// 		for (i in sections) {
// 			if (sections[i] <= window.pageYOffset + 100) {
// 				document.querySelector('.active').classList.remove('active');
// 				document
// 					.querySelector('li a[href*=' + i + ']')
// 					.classList.add('active');
// 			}
// 		}
// 		console.log(123);
// 	}

// 	window.addEventListener('scroll', functionScroll);
// 	window.addEventListener('resize', functionScroll);
// }
function buttonToggle() {
	const btn = document.querySelector('.category__button');
	if (btn) {
		btn.addEventListener('click', () => {
			btn.classList.toggle('active');
		});
	}
}

const scrollSpy = () => {
	const wrapper = document.querySelector('.scrollspyWrapper');
	if (wrapper) {
		const scrollButtons = Array.from(
			wrapper.querySelectorAll('[data-target]'),
		);
		scrollButtons.forEach((btn, btnIndex) => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				scrollButtons.forEach((i, iIndex) => {
					if (iIndex == btnIndex) {
						i.parentNode.classList.add('active');
					} else {
						i.parentNode.classList.remove('active');
					}
				});
				const target = btn.getAttribute('data-target');
				const targetDom = document.querySelector(`[data-id=${target}]`);
				$('html,body').animate(
					{
						scrollTop:
							$(`[data-id=${target}]`).offset().top -
							header.clientHeight,
					},
					1000,
				);
			});
		});
	}

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				// console.log(entry);
				if (entry.isIntersecting) {
					entry.target.classList.add('section-in-viewport');
					const btn = document.querySelector(
						`[data-target=${entry.target.getAttribute('data-id')}]`,
					);
					btn.parentNode.classList.add('active');
				} else {
					entry.target.classList.remove('section-in-viewport');
					const btn = document.querySelector(
						`[data-target=${entry.target.getAttribute('data-id')}]`,
					);
					btn.parentNode.classList.remove('active');
				}
			});
		},
		{
			threshold: 0.8,
		},
	);

	const elements = document.querySelectorAll('[data-id]');
	elements.forEach((element) => {
		observer.observe(element);
	});
};

const initCalendar = () => {
	// Select date
	Array.from(document.querySelectorAll('[data-date]')).forEach((input) => {
		const inlineMode = Boolean(input.getAttribute('data-date-inline'));
		const target = input.getAttribute('data-date-target');
		const inputShow = document.querySelector(target);
		return new Litepicker({
			element: input,
			format: 'DD/MM/YYYY',
			mobileFriendly: true,
			autoApply: true,
			showTooltip: true,
			allowRepick: true,
			singleMode: true,
			inlineMode: inlineMode,
			onSelect: function (date1, date2) {
				console.log(input.value);
				if (inputShow) {
					inputShow.value = input.value;
				}
			},
		});
	});
	// Select date range
	Array.from(document.querySelectorAll('[date-picker]')).forEach((picker) => {
		const input = picker.querySelector('.datePicker__input');
		// const target = picker.getAttribute('data-date-range');
		const pickerObject = new Litepicker({
			element: input,
			format: 'DD/MM/YYYY',
			mobileFriendly: true,
			autoApply: true,
			showTooltip: true,
			allowRepick: true,
			singleMode: false,
			inlineMode: false,
			onSelect: function (date1, date2) {
				input.value = picker.value;
				if (input) {
					picker.classList.add('dirtied');
				} else {
					picker.classList.remove('dirtied');
					pickerObject.clearSelection();
				}
			},
		});
		input.addEventListener('change', () => {
			const value = input.value;
			if (value) {
				picker.classList.add('dirtied');
			} else {
				pickerObject.clearSelection();
				picker.classList.remove('dirtied');
			}
		});
	});
};
const rating = () => {
	Array.from(document.querySelectorAll('.rating__bar')).forEach((item) => {
		const ratingDom = item.querySelector('[data-rating]');
		const percent = Number(ratingDom.getAttribute('data-rating'));
		ratingDom.setAttribute('style', `width:${percent * 100}%`);
		const editable = Boolean(ratingDom.getAttribute('editable'));
		if (editable) {
			item.addEventListener('click', (e) => {
				const percent = e.layerX / item.clientWidth;
				ratingDom.setAttribute('style', `width:${percent * 100}%`);
			});
		}
	});
};


const HeaderResponse = () => {
	const moveMakeMyTrip = new MoveElement('.header__makeMyTrip', {
		desktopNode: '.header__search',
		desktopMethod: 'insertAfter',
		mobileNode: '.header__mobileWrapper',
		mobileMethod: 'appendTo',
	});
	const moveCurrency = new MoveElement('.header__currency', {
		desktopNode: '.header__language',
		desktopMethod: 'insertAfter',
		mobileNode: '.header__mobileWrapper',
		mobileMethod: 'appendTo',
	});
	const moveNav = new MoveElement('.header__nav', {
		desktopNode: '.header__bottom',
		desktopMethod: 'prependTo',
		mobileNode: '.header__mobileWrapper',
		mobileMethod: 'appendTo',
	});
	const moveButtons = new MoveElement('.header__buttons', {
		desktopNode: '.header__bottom',
		desktopMethod: 'appendTo',
		mobileNode: '.header__mobileWrapper',
		mobileMethod: 'appendTo',
	});
};
const HeaderToggle = () => {
	headerToggleMobile.addEventListener('click', () => {
		menuWrapper.classList.add('active');
		main.classList.add('pushedRight');
		footer.classList.add('pushedRight');
		backdropObserver.next(true);
	});
	Array.from(document.querySelectorAll('.header__navItem--hasSub')).forEach(
		(item) => {
			const btnOpen = item.querySelector('.js__toggleNavSub');
			const btnClose = item.querySelector('.js__closeNavSub');
			const navSub = item.querySelector('.header__navSub');
			if (btnOpen) {
				btnOpen.addEventListener('click', (e) => {
					e.preventDefault();
					navSub.classList.add('active');
				});
			}
			if (btnClose) {
				btnClose.addEventListener('click', (e) => {
					e.preventDefault();
					navSub.classList.remove('active');
				});
			}
		},
	);
};
const backdropHandler = () => {
	backdrop.addEventListener('click', () => {
		Array.from(document.querySelectorAll('.header__navSub')).forEach(
			(item) => {
				item.classList.remove('active');
			},
		);
		backdropObserver.next(false);
		headerMobile.classList.remove('active');
		main.classList.remove('pushedRight');
		footer.classList.remove('pushedRight');
	});
};
const openFormSearch = () => {
	const clickHandler = () => {
		$.fancybox.open({
			src: '#tourSearch__form',
			type: 'inline',
			opts: {
				hash: false,
				closeExisting: true,
				touch: false,
			},
		});
	};
	const openSearchTourFormOnClick = (e) => {
		if (btn) {
			if (e.matches) {
				btn.addEventListener('click', clickHandler);
			} else {
				btn.removeEventListener('click', clickHandler);
				document
					.querySelector('#tourSearch__form')
					.removeAttribute('style');
			}
		}
	};
	const btn = document.querySelector('.tourSearch__iconToggle');
	const matchMedia = window.matchMedia('(max-width: 1199.98px)');
	openSearchTourFormOnClick(matchMedia);
	matchMedia.addEventListener('change', openSearchTourFormOnClick);
};
const homeSliders = () => {
	let homeBanner = new Swiper('.homeBanner__slider .swiper-container', {
		slidesPerView: 1,
		loop: true,
		speed: 1200,
		effect: 'fade',
		simulateTouch: false,
		fadeEffect: {
			crossFade: true,
		},
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.homeBanner__slider .swiper__pagination--banner',
			type: 'bullets',
			clickable: true,
		},
		// on: {
		// 	init: function (e) {
		// 		e.$el[0].setAttribute(
		// 			'style',
		// 			`height: ${window.innerHeight - header.clientHeight}px`,
		// 		);
		// 	},
		// },
	});

	let homePopularDestination = new Swiper(
		'.popularDestination__js .swiper-container',
		{
			slidesPerView: 2,
			spaceBetween: 10,
			loop: true,
			pagination: {
				el: '.popularDestination__js .swiper__pagination',
				type: 'bullets',
				clickable: true,
			},
			navigation: {
				prevEl: '.homePopularDestination .swiper__btn--prev',
				nextEl: '.homePopularDestination .swiper__btn--next',
			},
			breakpoints: {
				576: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1200: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				1440: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
		},
	);

	let charmingSlider = new Swiper(
		'.charmingDestination__slideWrapper .swiper-container',
		{
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			simulateTouch: false,
			navigation: {
				prevEl: '.charmingDestination__slideWrapper .swiper__btn--prev',
				nextEl: '.charmingDestination__slideWrapper .swiper__btn--next',
			},
			pagination: {
				el: '.charmingDestination__slideWrapper .swiper__pagination',
				type: 'bullets',
				clickable: true,
			},
			breakpoints: {
				576: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1440: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
		},
	);
	let testimonialsSlider = new Swiper(
		'.testimonials__slideWrapper .swiper-container',
		{
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			simulateTouch: false,
			navigation: {
				prevEl: '.testimonials__slideWrapper .swiper__btn--prev',
				nextEl: '.testimonials__slideWrapper .swiper__btn--next',
			},
			pagination: {
				el: '.testimonials__slideWrapper .swiper__pagination',
				type: 'bullets',
				clickable: true,
			},
			breakpoints: {
				576: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1440: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
		},
	);
	let indexNewsSlider = new Swiper(
		'.indexNews__slideWrapper .swiper-container',
		{
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			simulateTouch: false,
			navigation: {
				prevEl: '.indexNews__slideWrapper .swiper__btn--prev',
				nextEl: '.indexNews__slideWrapper .swiper__btn--next',
			},
			pagination: {
				el: '.indexNews__slideWrapper .swiper__pagination',
				type: 'bullets',
				clickable: true,
			},
			breakpoints: {
				576: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1440: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
		},
	);
};
const makeMyTripSlider = () => {
	let makeMyTripSlider = new Swiper('.destinationSelect .swiper-container', {
		slidesPerView: 2,
		spaceBetween: 10,
		loop: false,
		navigation: {
			prevEl: '.destinationSelect__slideWrapper .swiper__btn--prev',
			nextEl: '.destinationSelect__slideWrapper .swiper__btn--next',
		},
		pagination: {
			el: '.destinationSelect__slideWrapper .swiper__pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			576: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 4,
			},
		},
	});
};
const quantityGroup = () => {
	Array.from(document.querySelectorAll('.quantityGroup')).forEach((item) => {
		const btnMinus = item.querySelector('.quantity__minus');
		const btnPlus = item.querySelector('.quantity__plus');
		const input = item.querySelector('.quantity__number');
		let inputValue = 0;
		const inputSubject = new Subject();
		inputSubject.subscribe({
			next: function (e) {
				input.value = e;
			},
		});
		inputSubject.next(inputValue);
		btnPlus.addEventListener('click', () => {
			inputValue += 1;
			inputSubject.next(inputValue);
		});
		btnMinus.addEventListener('click', () => {
			inputValue -= 1;
			if (inputValue < 0) {
				inputValue = 0;
			}
			inputSubject.next(inputValue);
		});
	});
};
const formTourDateChoose = () => {
	Array.from(document.querySelectorAll('.checkInOut')).forEach((item) => {
		const input = item.querySelector('.dateChoose__input');
		const dateDisplay = item.querySelector('.dateChoose__display');
		let cld = new Litepicker({
			element: input,
			format: 'DD/MM/YYYY',
			mobileFriendly: true,
			autoApply: true,
			showTooltip: true,
			allowRepick: true,
			singleMode: true,
			inlineMode: false,
			onSelect: function (e) {
				dateDisplay.innerHTML = input.value;
			},
		});
	});
};
const formTourItemToggle = () => {
	Array.from(document.querySelectorAll('.formTourSearchItem')).forEach(
		(item) => {
			const actionBtn = item.querySelector('.formTourSearchItem__action');
			const detail = item.querySelector('.formTourSearchItem__detail');
			if (actionBtn) {
				actionBtn.addEventListener('click', () => {
					actionBtn
						.querySelector('span')
						.classList.toggle('fa-chevron-down');
					actionBtn
						.querySelector('span')
						.classList.toggle('fa-chevron-up');
					detail.classList.toggle('d-flex');
				});
			}
		},
	);
};
const cartSummaryToggle = () => {
	const aside = document.querySelector('.cartAside');
	const btn = document.querySelector('.cartAside__mobileToggle');
	if (btn) {
		btn.addEventListener('click', () => {
			aside.classList.toggle('show');
			if (aside.classList.contains('show')) {
				backdropObserver.next(true);
			} else {
				backdropObserver.next(false);
			}
		});
	}
};

const setPositionCartAside = () => {
	// if (window.innerWidth > 1025) {
	// 	let aside = document.querySelector('.cartAside__colWrapper');
	// 	const asideHidden = document.querySelector('.cartAside__width');
	// 	const asideOffsetTop = aside.getBoundingClientRect().top + scrollY;
	// 	const setPos = () => {
	// 		if (aside) {
	// 			const headerHeight = header.clientHeight;
	// 			const scrollY = window.scrollY;
	// 			const asideWidth = asideHidden.clientWidth;
	// 			const asideOffsetLeft = asideHidden.getBoundingClientRect().left;
	// 			if (scrollY > asideOffsetTop - headerHeight - 20) {
	// 				aside.setAttribute(
	// 					'style',
	// 					`position: fixed;
	// 					left: ${asideOffsetLeft}px;
	// 					top: ${header.clientHeight + 20}px;
	// 					width: ${asideWidth}px;`,
	// 				);
	// 			}
	// 		}
	// 	};
	// 	window.addEventListener('resize', () => {
	// 		setPos();
	// 	});
	// 	window.addEventListener('scroll', () => {
	// 		setPos();
	// 	});
	// }
};

const cartOptionsItemToggle = () => {
	const items = Array.from(
		document.querySelectorAll('.cartAsideOption'),
	).forEach((item) => {
		const title = item.querySelector('.cartAsideOption__iconToggle');
		const content = item.querySelector('.cartAsideOption__list');
		title.addEventListener('click', () => {
			content.classList.toggle('d-block');
		});
	});
};
const priceSlider = () => {
	let slider = document.getElementById('priceSlider__bar');
	if (slider) {
		let inputMin = document.getElementById('priceSlider__result--min');
		let inputMax = document.getElementById('priceSlider__result--max');
		let defaultMin = slider.getAttribute('data-min');
		let defaultMax = slider.getAttribute('data-max');
		let currentMin = slider.getAttribute('data-current-min');
		let currentMax = slider.getAttribute('data-current-max');
		let step = slider.getAttribute('data-step');
		let inputPrices = Array.from(
			document.querySelectorAll('.priceSlider__group input'),
		);
		noUiSlider.create(slider, {
			start: [currentMin, currentMax],
			connect: true,
			step: parseFloat(step),
			range: {
				min: parseFloat(defaultMin),
				max: parseFloat(defaultMax),
			},
		});
		slider.noUiSlider.on('slide', function (e) {
			inputMin.value = e[0];
			inputMax.value = e[1];
		});
		slider.noUiSlider.on('set', function (e) {
			inputMin.value = e[0];
			inputMax.value = e[1];
		});
		inputPrices.forEach((input) => {
			input.addEventListener('change', () => {
				let value = [];
				inputPrices.forEach((t) => {
					value.push(t.value);
				});
				slider.noUiSlider.set(value);
			});
		});
	}
};
const toggleFilter = () => {
	const filterBtn = document.querySelector(
		'.filterContainer .filter__mobileToggle',
	);
	const filterWrapper = document.querySelector(
		'.filterContainer .filter__wrapper',
	);
	const filterClose = document.querySelector(
		'.filterContainer .filter__close',
	);
	if (filterBtn && filterWrapper) {
		filterBtn.addEventListener('click', () => {
			filterWrapper.classList.add('show');
			backdropObserver.next(true);
		});
	}
	if (filterClose && filterWrapper) {
		filterClose.addEventListener('click', () => {
			filterWrapper.classList.remove('show');
			backdropObserver.next(false);
		});
	}
};
const tourDetailSlider = () => {
	let smallSlider = new Swiper('.tourDetail__smallSlider .swiper-container', {
		slidesPerView: 3,
		spaceBetween: 10,
		navigation: {
			nextEl: '.tourDetail__smallSlider .swiper__btn--prev',
			prevEl: '.tourDetail__smallSlider .swiper__btn--next',
		},
		breakpoints: {
			576: {
				slidesPerView: 4,
			},
			768: {
				spaceBetween: 20,
				slidesPerView: 4,
			},
			1200: {
				spaceBetween: 30,
				slidesPerView: 4,
			},
		},
	});
	let bigSlider = new Swiper('.tourDetail__bigSlider .swiper-container', {
		slidesPerView: 1,
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		thumbs: {
			swiper: smallSlider,
		},
	});
};

const questionToggle = () => {
	Array.from(document.querySelectorAll('.questionItem')).forEach((item) => {
		item.addEventListener('click', () => {
			item.classList.toggle('active');
		});
	});
};
