/*
Copyright (c) Go Make Things, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

window.onload = function() {

const easeInCubic = function (t) { return t*t*t }	
const scrollElems = document.getElementsByClassName('scroll');


//console.log(scrollElems);
const scrollToElem = (start, stamp, duration, scrollEndElemTop, startScrollOffset) => {
    //debugger;
    const runtime = stamp - start;
    let progress = runtime / duration;
    const ease = easeInCubic(progress);
    
    progress = Math.min(progress, 1);
    
    const newScrollOffset = startScrollOffset + (scrollEndElemTop * ease);
    window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));

    if(runtime < duration){
      requestAnimationFrame((timestamp) => {
        const stamp = new Date().getTime();
        scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
      })
    }
  }

for(let i=0; i<scrollElems.length; i++){
  const elem = scrollElems[i];
  
  elem.addEventListener('click',function(e) {
    e.preventDefault();
    const scrollElemId = e.target.href.split('#')[1];
    const scrollEndElem = document.getElementById(scrollElemId);
    
    const anim = requestAnimationFrame(() => {
      const stamp = new Date().getTime();
      const duration = 1200;
      const start = stamp;
          
      const startScrollOffset = window.pageYOffset;

      const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;
            
      scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
      // scrollToElem(scrollEndElemTop);
      })
    })
  }
}