"use strict";

const body = document.body;
const inputs = document.querySelectorAll('input');

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

let div = document.createElement('div');
div.textContent = 'Введены неверные данные';
div.classList.add('_error__text');


if (isMobile.any()) {
	body.classList.add('_touch');
	const menuArrow = document.querySelectorAll('.menu__arrow');
	if (menuArrow.length > 0) {
		for (let index = 0; index < menuArrow.length; index++) {
			const menuArrowItem = menuArrow[index];
			document.addEventListener('click', function (e) {
				if (e.target == menuArrowItem) {
					menuArrowItem.parentElement.classList.toggle('_active');
				} else {
					menuArrowItem.parentElement.classList.remove('_active');
				}
			})
		}
	}
} else {
	body.classList.add('_pc')
}


// Menu burger
//-----------------------------------------------------------------------------------------------------------------------------------------

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
const menuBody = document.querySelector('.menu__body');
const menuBurger = document.querySelector('.menu__burger');

if (menuLinks.length > 0) {
	menuLinks.forEach(item => {
		item.addEventListener('click', onMenuLinkClick)
	})
	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			if (menuBody.classList.contains('_active')) {
				menuBody.classList.remove('_active');
				menuBurger.classList.remove('_active');
				bodyUnlock();
			}
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			let alwaysTop = window.pageYOffset + gotoBlock.getBoundingClientRect().top - document.querySelector('.header').offsetHeight;
			window.scrollTo({
				top: alwaysTop,
				behavior: 'smooth'
			})
			e.preventDefault();
		}
	}
}

menuBurger.addEventListener('click', function () {
	if (!menuBurger.classList.contains('_active')) {
		openBurger()
	} else {
		closeBurger();
	}
})

function openBurger() {
	menuBurger.classList.add('_active');
	menuBody.classList.add('_active');
	arrow.style.display = 'none';
	bodyLock();
}

function closeBurger() {
	menuBurger.classList.remove('_active');
	menuBody.classList.remove('_active');
	arrow.style.display = 'block';
	bodyUnlock();
}

//-----------------------------------------------------------------------------------------------------------------------------------------


// Arrow
//-----------------------------------------------------------------------------------------------------------------------------------------

const arrow = document.querySelector('.arrow');

window.addEventListener('scroll', function () {
	if (!body.classList.contains('_lock')) {
		if (window.pageYOffset >= document.documentElement.clientHeight) {
			arrow.style.display = 'block';
		} else {
			arrow.style.display = 'none';
		}
	}
})


arrow.addEventListener('click', function (event) {
	document.documentElement.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
	event.preventDefault();
})



// Accordion
//-----------------------------------------------------------------------------------------------------------------------------------------


const accordionTitles = document.querySelectorAll('.accordion__title');

function firstOpen() {
	const firstElementTitle = document.querySelector('.accordion__title._active');
	const firstElementContent = firstElementTitle.nextElementSibling;
	firstElementContent.style.height = firstElementContent.scrollHeight + 'px';
}

firstOpen();

accordionTitles.forEach(accordionTitle => {
	accordionTitle.addEventListener('click', function (event) {
		accordionTitle.classList.toggle('_active');
		for (let index = 0; index < document.querySelectorAll('.accordion__title').length; index++) {
			const el = document.querySelectorAll('.accordion__title')[index];
			let accordionContent = el.nextElementSibling;
			if (el != accordionTitle) {
				el.classList.remove('_active');
			}
			if (el.classList.contains('_active')) {
				accordionContent.style.height = accordionContent.scrollHeight + 'px';
			} else {
				accordionContent.style.height = 0;
			}
		}
	})
})

document.addEventListener('pointerdown', function (event) {
	if (!event.target.closest('.accordion__title')) return;
	event.preventDefault();
})

//-----------------------------------------------------------------------------------------------------------------------------------------



// Tabs
//-----------------------------------------------------------------------------------------------------------------------------------------

const tabLinks = document.querySelectorAll('.tabs__link[data-tab]');

function tabFirstPos() {
	let currentLink = document.querySelector('.tabs__link');
	let currentBlock = document.querySelector(`.${currentLink.dataset.tab}`);
	let objBlockCss = getComputedStyle(currentBlock);
	currentLink.style.backgroundColor = objBlockCss.backgroundColor;
}

tabFirstPos();

document.addEventListener('click', function (event) {
	let currentLink = event.target.closest('.tabs__link');
	if (!currentLink) return;
	let currentBlock = document.querySelector(`.${currentLink.dataset.tab}`);
	let objBlockCss = getComputedStyle(currentBlock);
	currentBlock.classList.add('_active');
	currentLink.style.backgroundColor = objBlockCss.backgroundColor;
	for (let index = 0; index < tabLinks.length; index++) {
		const tabLink = tabLinks[index];
		if (tabLink != currentLink) {
			document.querySelector(`.${tabLink.dataset.tab}`).classList.remove('_active');
			tabLink.style.backgroundColor = '';
		}
	}
})

document.addEventListener('pointerdown', function (event) {
	if (!event.target.closest('.tabs__link')) return;
	event.preventDefault();
})


//-----------------------------------------------------------------------------------------------------------------------------------------

// range slider
//-----------------------------------------------------------------------------------------------------------------------------------------

const rangeInput = document.querySelectorAll('.range-slider__input input');
const priceInput = document.querySelectorAll('.price-slider__item input');
const progress = document.querySelector('.range-slider__progress');

let rangeGap = 2000;

if (priceInput.length > 0) {
	priceInput.forEach(input => {
		input.addEventListener('input', function (event) {
			let priceMin = parseInt(priceInput[0].value);
			let priceMax = parseInt(priceInput[1].value);
			if (priceMax - priceMin >= rangeGap && priceMin >= rangeInput[0].min && priceMax <= rangeInput[0].max) {
				if (event.target.closest('.price-slider_min')) {
					rangeInput[0].value = priceMin;
					progress.style.left = (priceMin - rangeInput[0].min) / (rangeInput[0].max - rangeInput[0].min) * 100 + '%';
				} else {
					rangeInput[1].value = priceMax;
					progress.style.right = 100 - (priceMax - rangeInput[1].min) / (rangeInput[1].max - rangeInput[1].min) * 100 + '%';
				}
			}
		})
	})
}
if (rangeInput.length > 0) {
	rangeInput.forEach(input => {
		input.addEventListener('input', function (event) {
			let rangeMin = parseInt(rangeInput[0].value);
			let rangeMax = parseInt(rangeInput[1].value);
			if (rangeMax - rangeMin < rangeGap) {
				if (event.target.closest('.range-slider_min')) {
					rangeInput[0].value = rangeMax - rangeGap;
				} else {
					rangeInput[1].value = rangeMin + rangeGap;
				}
			} else {
				priceInput[0].value = rangeMin;
				priceInput[1].value = rangeMax;
				progress.style.left = (rangeMin - rangeInput[0].min) / (rangeInput[0].max - rangeInput[0].min) * 100 + '%';
				progress.style.right = 100 - (rangeMax - rangeInput[1].min) / (rangeInput[1].max - rangeInput[1].min) * 100 + '%';
			}
		})
	})
}


//-----------------------------------------------------------------------------------------------------------------------------------------


// Popup
//-----------------------------------------------------------------------------------------------------------------------------------------

const popupLinks = document.querySelectorAll('[data-popup]');
if (popupLinks.length > 0) {
	popupLinks.forEach(popupLink => {
		popupLink.addEventListener('click', function (event) {
			const popupBlock = document.getElementById(popupLink.dataset.popup)
			openPopup(popupBlock);
			event.preventDefault();
		})
	})
}

const popupCloseIcon = document.querySelectorAll('.popup__close');

if (popupCloseIcon.length > 0) {
	popupCloseIcon.forEach(item => {
		item.addEventListener('click', function (event) {
			event.target.closest('.popup').classList.remove('_active')
			bodyUnlock();
		})
	})
}


function openPopup(popupBlock) {
	if (popupBlock) {
		popupBlock.classList.add('_active');
		menuBody.classList.remove('_active');
		menuBurger.classList.remove('_active');
		arrow.style.display = 'none';
		bodyLock();
		popupBlock.addEventListener('click', function (event) {
			if (!event.target.closest('.popup__content')) {
				closePopup(event.target.closest('.popup'))
			}
		})
	}
}

function closePopup(popupBlock) {
	popupBlock.classList.remove('_active');
	arrow.style.display = 'block';
	bodyUnlock();
}

function bodyLock() {
	const paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth;
	body.classList.add('_lock');
	body.paddingRight = paddingValue + 'px';
}

function bodyUnlock() {
	body.classList.remove('_lock');
	body.paddingRight = '';
}

//-----------------------------------------------------------------------------------------------------------------------------------------



// client sign
//-----------------------------------------------------------------------------------------------------------------------------------------

const clientButtons = document.querySelectorAll('.client-sign__button');
const clientBtns = document.querySelectorAll('.client-sign__btn input');

if (clientButtons.length > 0) {
	clientButtons.forEach(clientButton => {
		clientButton.addEventListener('click', function (event) {
			if (!event.target.classList.contains('_active')) {
				removeClientActive();
				event.target.classList.add('_active');
				document.getElementById(event.target.dataset.clientButton).classList.add('_active');
				clientBtns.forEach(btn => {
					if (btn.classList.contains('_active')) {
						btn.classList.remove('_active');
					} else {
						btn.classList.add('_active');
					}
				})
			}
			event.preventDefault();
		})
	})
	function removeClientActive() {
		clientButtons.forEach(el => {
			el.classList.remove('_active');
			document.getElementById(el.dataset.clientButton).classList.remove('_active');
		})
	}
}


//-----------------------------------------------------------------------------------------------------------------------------------------

// Inputs
//-----------------------------------------------------------------------------------------------------------------------------------------

const inputEyes = document.querySelectorAll('.input-eye__item');
const inputElements = document.querySelectorAll('.input-eye__input input');
let namePattern = /[а-яА-Я]/;
let telPattern = /[0-9]+()/;

inputEyes.forEach(inputEye => {
	inputEye.addEventListener('click', function (event) {
		let inputParent = event.target.closest('.input-eye__icon').previousElementSibling;
		if (inputEye.classList.contains('input-eye__item_lock')) {
			inputEye.style.display = 'none';
			inputEye.nextElementSibling.style.display = 'block';
			inputParent.type = 'text';
		} else {
			inputEye.style.display = 'none';
			inputEye.previousElementSibling.style.display = 'block';
			inputParent.type = 'password';
		}
	})
})

inputs.forEach(input => {
	if (input.type == 'date') {
		input.value = getTodayDate();
	}
	input.addEventListener('blur', function (event) {
		switch (event.target.type) {
			case 'email':
				if (!event.target.value.includes('@')) {
					addError(event);
				} else {
					removeError(event);
				}
				break;
			case 'text':
				if (!namePattern.test(event.target.value)) {
					addError(event);
				} else {
					removeError(event);
				}
			case 'date':
				let valueDate = new Date(event.target.value);
				let doneDate = new Date(valueDate.getFullYear() + 18, valueDate.getMonth(), valueDate.getDate());
				if (Date.now() - doneDate < 0) {
					addError(event);
					div.textContent = 'Регистрация с 18 лет';
				} else {
					removeError(event);
				}
			case 'tel':
				let elVal = event.target.value;
				if (!telPattern.test(elVal) || elVal.length != 11) {
					addError(event);
				} else {
					removeError(event);
				}
			default:

				break;
		}
	})
})


function addError(event) {
	event.target.parentElement.append(div);
	event.target.parentElement.classList.add('_error-input');
	event.target.focus();
}

function removeError(event) {
	div.remove()
	event.target.parentElement.classList.remove('_error-input');
}


function getTodayDate() {
	let currentDate = new Date();
	let arrDate = ['0' + currentDate.getMonth(), '0' + currentDate.getDate()].map(item => item.slice(-2));
	arrDate.unshift(currentDate.getFullYear())
	return arrDate.join('-');
}

//-----------------------------------------------------------------------------------------------------------------------------------------
