
document.addEventListener('DOMContentLoaded', e => {
    const jetPopup6363 = document.querySelector('#jet-popup-6363');

    document.querySelectorAll('*[href]').forEach(link => {
        link.addEventListener('click', e => {
            if (jetPopup6363.matches('.jet-popup--show-state')) {
                requestAnimationFrame(() => {
                    customFadeOut(jetPopup6363.querySelector('.jet-popup__overlay'), jetPopup6363)
                    customFadeOut(jetPopup6363.querySelector('.jet-popup__container'), jetPopup6363)
                })
            }
        })
    })

    function customFadeOut(element, popup) {
        var opacity = 1;
        function decrease() {
            opacity -= 0.05;
            if (opacity <= 0) {
                element.style.opacity = 0;
                popup.classList.remove('jet-popup--show-state');
                popup.classList.add('jet-popup--hide-state');
                return true;
            }
            element.style.opacity = opacity;
            requestAnimationFrame(decrease);
        }
        decrease();
    }
});





 // const jetPopupMy = document.querySelector(".jet-popup"),
    //     jetPopupLinksMy = jetPopupMy.querySelectorAll('*[href]');

    // jetPopupLinksMy.forEach(link => {
    //     link.addEventListener('click', e => {
    //         new Promise((resolve, reject) => {
    //             link.classList.add('jet-popup__close-button');
    //             setTimeout(() => {
    //                 resolve();
    //             }, 10);
    //         }).then(() => {
    //             link.classList.remove('jet-popup__close-button');
    //         });
    //     });
    // });

