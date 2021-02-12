const container = document.querySelector(".container"),
    slide = document.querySelectorAll(".slide");
let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationId = 0,
    currentIndex = 0;


slide.forEach((current, index) => {
    current.addEventListener("dragstart", function (e) { e.preventDefault() })
    current.addEventListener("touchstart", touchStart(index))
    current.addEventListener("touchend", touchEnd)
    current.addEventListener("touchmove", touchMove)


    current.addEventListener("mousedown", touchStart(index))
    current.addEventListener("mouseup", touchEnd)   
    current.addEventListener("mousemove", touchMove)

})
window.oncontextmenu = function(e){
    e.preventDefault();
    e.stopPropagation()
    return false
}
function touchStart(id) {
    return function (event) {
        isDragging = true;
        currentIndex = id;
        startPos = getPosition(event);
        animationId = requestAnimationFrame(animation);
        container.classList.add("grab")
       

    }


}
function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationId)
    const moved = currentTranslate - prevTranslate
    
    if (moved < -100 && currentIndex < slide.length - 1) {currentIndex += 1;}
    if (moved > -100 && currentIndex > 0) {currentIndex -= 1;}


        setPositionByIndex()
    container.classList.remove("grab")
    
}

function touchMove(e) {
    if (!isDragging) return;
        const currentPosition = getPosition(e)
        currentTranslate = prevTranslate + currentPosition - startPos;
    

}

function getPosition(event) {

    return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setContainerTrans();

    if (isDragging) requestAnimationFrame(animation)
    
}
function setContainerTrans() {
    container.style.transform = `translateX(${currentTranslate}px)`;


}

function setPositionByIndex() {
    currentTranslate = currentIndex * (-window.innerWidth);
    prevTranslate = currentTranslate;
    setContainerTrans()
    
}














