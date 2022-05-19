const accordions = document.querySelectorAll(".spoiler-answer");

const openAccordion = (accordion) => {
	const content = accordion.querySelector(".spoiler-answer__text");
	accordion.classList.add("spoiler-answer_active");
	content.style.maxHeight = content.scrollHeight + "px";
};

const closeAccordion = (accordion) => {
	const content = accordion.querySelector(".spoiler-answer__text");
	accordion.classList.remove("spoiler-answer_active");
	content.style.maxHeight = null;
};

accordions.forEach((accordion) => {
	const intro = accordion.querySelector(".spoiler-answer__close");
	const content = accordion.querySelector(".spoiler-answer__text");
	intro.onclick = () => {
		if (content.style.maxHeight) {
			closeAccordion(accordion);
		} else {
			accordions.forEach((accordion) => closeAccordion(accordion));
			openAccordion(accordion);
		}
	};
});