export const getSVGs = (selector) => {
	const images =
		Array.from(document.querySelectorAll(selector)) ||
		Array.from(document.querySelectorAll("img.svg"));
	for (let i = 0; i < images.length; i++) {
		const url =
			images[i].getAttribute("src") || images[i].getAttribute("data-src");
		const getImageRequest = new XMLHttpRequest();
		getImageRequest.open("GET", url, true);
		getImageRequest.onload = function (e) {
			images[i].outerHTML = e.target.response;
		};
		getImageRequest.send();
	}
};
