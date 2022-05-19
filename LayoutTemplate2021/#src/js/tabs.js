const tabsContent = document.querySelectorAll('.section-wedrive__tabs ~ .section-wedrive__tabs-content'),
	tabsButtons = document.querySelectorAll('.section-wedrive__tab');



function showTab(i = 0) {
	tabsContent.forEach(e => e.style.display = 'none');
	tabsContent[i].style.display = 'block';
	tabsButtons.forEach(tab => tab.classList.remove('section-wedrive__tab_active'));
	tabsButtons[i].classList.add('section-wedrive__tab_active');
}
showTab();

function checkIfIt(e) {
	tabsButtons.forEach((i, k) => {
		if (i == e.currentTarget) {
			showTab(k);
		}
	});
}

tabsButtons.forEach(tab => {
	tab.addEventListener('click', e => {
		checkIfIt(e);
	});
});

