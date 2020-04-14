document.addEventListener("DOMContentLoaded", function(){
    document.querySelector(".nav-button").addEventListener("click", function(){
        document.querySelector(".nav-items").classList.toggle("unwrapped");
        document.querySelector(".nav-button").classList.toggle("active");
    });

    var tabSliders = Array.from(document.querySelectorAll(".tabbed-slider"));
    tabSliders.forEach(function(tabSlider){
        var tabs = Array.from(tabSlider.querySelectorAll(".tab"));
        var contents = tabSlider.querySelector(".content-bar");
        contents.classList.add("slide-"+contents.childElementCount);
        tabs.forEach(function(tab){
            tab.addEventListener("click", function(event){
                var currentTabs = Array.from(tab.parentElement.querySelectorAll(".tab"));
                currentTabs.forEach(function(currentTab){
                    if(currentTab != event.target){
                        currentTab.className = "tab";
                    }
                    else{
                        currentTab.className = "tab picked";
                        var ctbar = tab.parentElement.parentElement.querySelector(".content-bar");
                        ctbar.style.left = (currentTabs.indexOf(currentTab) * -100) + "%";
                    }
                });
            });
        });
    });

    var galleryImages = Array.from(document.querySelectorAll(".image"));
    galleryImages.forEach(function(gImage){
        gImage.addEventListener("click", function(){
            document.getElementById("gallery-enlarged").src = event.target.querySelector("img").src;
            document.querySelector(".gallery-overlay").classList.toggle("active");
        });
    });

    var questions = Array.from(document.querySelectorAll(".question"));
    questions.forEach(function(question){
        question.addEventListener("click", function(){
            questions.forEach(function(q){
                if(q == question){
                    if(q.classList.contains("active")){
                        q.className = "question";
                    }
                    else{
                        q.className = "question active";
                    }
                }
                else{
                    q.className = "question";
                }
            });
        });
    });

    document.querySelector(".gallery-overlay").addEventListener("click", function(){
        document.querySelector(".gallery-overlay").classList.toggle("active");
    });

    var simpleSliders = Array.from(document.querySelectorAll(".simple-slider"));
    simpleSliders.forEach(function(simpleSlider){
        initializeSimple(simpleSlider, parseInt(simpleSlider.id.split("init")[1]) - 1);
    });

    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;                                                        
    var yDown = null;

    function getTouches(evt) {
    return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }                                                     

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                

    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */ 
                evt.preventDefault();
                if(evt.target.closest(".simple-slider")){
                    changeSlide("next");
                }
            } else {
                /* right swipe */
                evt.preventDefault();
                if(evt.target.closest(".simple-slider")){
                    changeSlide("prev");
                }
            }                       
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };
});

function initializeSimple(el, initialSlide){
    var pages = Array.from(el.querySelectorAll(".simple-page"));
    showSlide(el, initialSlide);
    if(initialSlide == pages.length - 1){
        el.querySelector(".control-right").className = "control-right disabled";
    }
    else if(initialSlide == 0){
        el.querySelector(".control-left").className = "control-left disabled";
    }
    el.querySelector(".control-left").addEventListener("click", function(){
        changeSlide("prev");
    });
    el.querySelector(".control-right").addEventListener("click", function(){
        changeSlide("next");
    });
}

function changeSlide(variant){
    var el = event.target.closest(".simple-slider");
    var allSlides = Array.from(el.querySelectorAll(".simple-page"));
    var currentSlide = allSlides.indexOf(el.querySelector("[class='simple-page']"));
    el.querySelector(".control-left").className = "control-left";
    el.querySelector(".control-right").className = "control-right";
    if(variant == "prev"){
        if(currentSlide > 0){
            showSlide(el, currentSlide - 1);
        }
        if(currentSlide <= 1){
            el.querySelector(".control-left").className = "control-left disabled";
        }
    }
    else if(variant == "next"){
        if(currentSlide < allSlides.length - 1){
            showSlide(el, currentSlide + 1);
        }
        if(currentSlide >= allSlides.length - 2){
            el.querySelector(".control-right").className = "control-right disabled";
        }
    }
    else if(!isNaN(parseInt(variant))){

    }
}

function showSlide(el, number){
    var pages = Array.from(el.querySelectorAll(".simple-page"));
    pages.forEach(function(page){
        page.className = "simple-page hidden";
        if(page == pages[number]){
            page.className = "simple-page";
        }
    });
}
