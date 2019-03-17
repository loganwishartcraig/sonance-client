if (global && !global.requestAnimationFrame) {
    global.requestAnimationFrame = function(cb) {
        global.setTimeout(cb, 16);
    };
}