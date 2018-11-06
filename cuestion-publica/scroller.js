var controller = new ScrollMagic.Controller({
    globalScenesOptions: {
        triggerHook: 'onLeave'
    }
});

var slides = document.querySelectorAll('section');

for (var i = 0; i < slides.length; i++) {
    new ScrollMagic.Scene({
            triggerElement: slides[i],
            duration: 400,
            offset: 100
        })
        .setPin(slides[i])
        .addTo(controller);
}