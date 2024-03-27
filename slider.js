const scrollsData = {}

function sliderValidate(data) {
    if(
        data.slider.direction == 'horizontal' && 
        data.slider.elem.offsetWidth > data.slider.line.offsetWidth + data.slider.styles.padding
    ) data.slider.scrollMax = 0
    if(
        data.slider.direction == 'vertical' && 
        data.slider.elem.offsetHeight > data.slider.line.offsetHeight + data.slider.styles.padding
    ) data.slider.scrollMax = 0
}

function sliderUpdate(data) {
    // достаём важные блоки (slider)
    let sliderLink = data.slider
    sliderLink.btnPrev = document.querySelector(`.${data.name}-btn-prev`)
    sliderLink.btnNext = document.querySelector(`.${data.name}-btn-next`)
    sliderLink.shadowPrev = document.querySelector(`.${data.name}-shadow-prev`)
    sliderLink.shadowNext = document.querySelector(`.${data.name}-shadow-next`)
    sliderLink.direction = sliderLink.elem.getAttribute('direction') ? 
        sliderLink.elem.getAttribute('direction') : 
        (sliderLink.line.offsetWidth > sliderLink.elem.offsetWidth ? 'horizontal' : 'vertical') ;
    sliderLink.styles = {
        padding: sliderLink.direction == 'horizontal' ? 
            parseInt(window.getComputedStyle(sliderLink.elem).paddingLeft, 10) + parseInt(window.getComputedStyle(sliderLink.elem).paddingRight, 10) :
            parseInt(window.getComputedStyle(sliderLink.elem).paddingTop, 10) + parseInt(window.getComputedStyle(sliderLink.elem).paddingBottom, 10) ,
        gap: window.getComputedStyle(sliderLink.line).gap != 'normal' ?
            parseInt(window.getComputedStyle(sliderLink.line).gap, 10) : 0,
    }
    sliderLink.points = sliderLink.elem.getAttribute('points') ? JSON.parse(sliderLink.elem.getAttribute('points')) : false ;
    if(sliderLink.points) {
        sliderLink.itemsCount = getItemCount(sliderLink)
        sliderLink.itemWidth = (
            sliderLink.elem.offsetWidth - sliderLink.styles.padding - 
            sliderLink.styles.gap * (sliderLink.itemsCount > 0 ? sliderLink.itemsCount-1 : sliderLink.itemsCount)
        ) / sliderLink.itemsCount   
        sliderLink.items.forEach(item => { item.style.width = `${sliderLink.itemWidth}px` });
    }
    sliderLink.direction = sliderLink.elem.getAttribute('direction') ? 
        sliderLink.elem.getAttribute('direction') : 
        (sliderLink.line.offsetWidth > sliderLink.elem.offsetWidth ? 'horizontal' : 'vertical') ;
    
    sliderLink.size = {
        elem: sliderLink.direction == 'horizontal' ? sliderLink.elem.offsetWidth : sliderLink.elem.offsetHeight,
        line: (sliderLink.direction == 'horizontal' ? sliderLink.line.offsetWidth : sliderLink.line.offsetHeight) + sliderLink.styles.padding
    }
    sliderLink.scrollMax = sliderLink.size.line - sliderLink.size.elem
    sliderLink.move = 0

    // достаём важные блоки (scroll)
    if(document.querySelector(`.${data.name}-scroll`)) {
        scrollsData[data.name].scroll = {}
        let scrollLink = scrollsData[data.name].scroll
        scrollLink.elem = document.querySelector(`.${data.name}-scroll`)
        scrollLink.thumb = document.querySelector(`.${data.name}-thumb`)
        scrollLink.thumb.classList.add('scroll-thumb--transition')
        scrollLink.direction = scrollLink.elem.getAttribute('direction') ? 
            scrollLink.elem.getAttribute('direction') : 
            (scrollLink.elem.offsetWidth > scrollLink.elem.offsetHeight ? 'horizontal' : 'vertical') ;
        scrollLink.size = {}
            scrollLink.size.elem = scrollLink.direction == 'horizontal' ? scrollLink.elem.offsetWidth : scrollLink.elem.offsetHeight ;
            scrollLink.size.thumb = (scrollLink.size.elem/100) * ((sliderLink.size.elem*100) / sliderLink.size.line)
        scrollLink.direction == 'horizontal' ? 
            scrollLink.thumb.style.width = `${scrollLink.size.thumb}px` :
            scrollLink.thumb.style.height = `${scrollLink.size.thumb}px` ;
        scrollLink.scrollMax = scrollLink.size.elem - scrollLink.size.thumb
        scrollLink.move = 0

        data.global.step = scrollLink.scrollMax/sliderLink.scrollMax
    } else {scrollsData[data.name].scroll = false}

    sliderValidate(data)
    setEvents(data)
    rollScroll(data)
}

function updateScrollAll() {
    document.querySelectorAll('.DTScroll').forEach((scroll) => {
        sliderUpdate(scrollsData[scroll.id])
    })
}

function scrollWheel(event, data) {
    event.preventDefault()

    data.slider.move -= event.deltaY
    if(data.scroll) data.scroll.move = -data.slider.move * data.global.step

    rollScroll(data)
}

function scrollButton(data, direction) {
    event.preventDefault()

    let localMove = data.slider.elem.offsetWidth - data.slider.styles.padding + 
        data.slider.styles.gap * (data.slider.itemsCount > 0 ? data.slider.itemsCount-1 : data.slider.itemsCount)

    direction ? data.slider.move -= localMove : data.slider.move += localMove ;
    if(data.scroll) data.scroll.move = -data.slider.move * data.global.step

    rollScroll(data)
}

function rollScroll(data) {
    if( data.slider.move > 0 ) data.slider.move = 0
    if( data.scroll && data.scroll.move < 0 ) data.scroll.move = 0

    if( data.slider.move < -data.slider.scrollMax ) data.slider.move = -data.slider.scrollMax
    if( data.scroll && data.scroll.move > data.scroll.scrollMax ) data.scroll.move = data.scroll.scrollMax

    if( data.slider.shadowPrev ) data.slider.shadowPrev.style.opacity = 1
    if( data.slider.shadowPrev && data.slider.move >= 0 ) data.slider.shadowPrev.style.opacity = 0

    if( data.slider.shadowNext ) data.slider.shadowNext.style.opacity = 1
    if( data.slider.shadowNext && data.slider.move <= -data.slider.scrollMax ) data.slider.shadowNext.style.opacity = 0

    data.slider.line.style.transform = data.slider.direction == 'horizontal' ? 
        `translateX(${data.slider.move}px)` : 
        `translateY(${data.slider.move}px)` ;
    if(data.scroll) data.scroll.thumb.style.transform = data.scroll.direction == 'horizontal' ? 
        `translateX(${data.scroll.move}px)` : 
        `translateY(${data.scroll.move}px)` ;
}

function getItemCount(slider) {
    let count

    for (const key in slider.points) {
        if (!count && window.innerWidth <= key) {
            count = slider.points[key]
        }
    } if (!count) count = slider.points[0]

    return count <= slider.items.length ? count : slider.items.length
}

function sliderTouch(event, data, elem) {
    event.preventDefault()
    data.slider.line.classList.remove('slider-line--transition')
    if(data.scroll) data.scroll.thumb.classList.remove('scroll-thumb--transition')

    let shift = data[elem].direction == "horizontal" ? event.clientX : event.clientY ;
    let localLineMove = 0
    let localThimbMove = 0

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    function onMouseMove(e) { 
        let localMove = shift - (data[elem].direction == "horizontal" ? e.clientX : e.clientY)

        if(elem == 'scroll') {
            localLineMove = data.slider.move + localMove / data.global.step
            if(data.scroll) localThimbMove = data.scroll.move - localMove
        } else {
            localLineMove = data.slider.move - localMove
            if(data.scroll) localThimbMove = data.scroll.move + localMove * data.global.step
        }

        data.slider.line.style.transform = data.slider.direction == 'horizontal' ? 
            `translateX(${localLineMove}px)` : 
            `translateY(${localLineMove}px)` ;
        if(data.scroll) data.scroll.thumb.style.transform = data.scroll.direction == 'horizontal' ? 
            `translateX(${localThimbMove}px)` : 
            `translateY(${localThimbMove}px)` ;
    }

    function onMouseUp(e) {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)

        data.slider.line.classList.add('slider-line--transition') 
        data.slider.line.style.pointerEvents = 'all'
        if(data.scroll) data.scroll.thumb.classList.add('scroll-thumb--transition')

        data.slider.move = localLineMove
        if(data.scroll) data.scroll.move = localThimbMove

        rollScroll(data)
    }
}

function setEvents(data) {
    if (data.scroll) data.scroll.thumb.onmousedown = (event) => { sliderTouch(event, data, 'scroll') }
    if (data.scroll) data.scroll.thumb.ondragstart = () => { return false }

    if (data.slider.btnPrev) data.slider.btnPrev.onclick = () => { scrollButton(data, false) }
    if (data.slider.btnNext) data.slider.btnNext.onclick = () => { scrollButton(data, true) }

    data.slider.line.onmousedown = (event) => { sliderTouch(event, data, 'slider') }
    data.slider.line.ondragstart = () => { return false }
    data.slider.line.onwheel = (event) => scrollWheel(event, data)
}

function initScroll(sliderId) {
    // создаём хранилище
    scrollsData[sliderId] = {}
    scrollsData[sliderId].name = sliderId
    scrollsData[sliderId].global = {}

    // достаём важные блоки (slider)
    scrollsData[sliderId].slider = {}
    let sliderLink = scrollsData[sliderId].slider
    sliderLink.elem = document.querySelector(`.${sliderId}-slider`)
    sliderLink.line = sliderLink.elem.querySelector(`.${sliderId}-line`)
    sliderLink.line.classList.add('slider-line--transition')
    sliderLink.items = sliderLink.elem.querySelectorAll(`.${sliderId}-item`)

    sliderUpdate(scrollsData[sliderId])
}

function initScrollAll() {
    document.querySelectorAll('.DTScroll').forEach((scroll) => {
        initScroll(scroll.id)
    })

    window.onresize = () => {updateScrollAll()}
}


window.onload = () => initScrollAll()


const slider = {
    initScrollAll,
    initScroll,
    updateScrollAll,
    sliderUpdate,
    scrollsData
}
  
export  { slider }