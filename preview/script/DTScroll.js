const scrollsData = {}

function changeShadow(scrollMax, slider, move) {
    if (slider.shadowPrev) {
        slider.shadowPrev.style.opacity = 1
        if( move <= 0 ) slider.shadowPrev.style.opacity = 0
    }
    if (slider.shadowNext) {
        slider.shadowNext.style.opacity = 1
        if( move >= scrollMax ) slider.shadowNext.style.opacity = 0
    }
}

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

function sliderUpdateDeep(data) {
    // достаём важные блоки (sliders)
    document.querySelectorAll(`.${data.name}-slider`).forEach((slider, index) => {
        scrollsData[data.name].sliders[index] = {}
        let sliderLink = scrollsData[data.name].sliders[index]

        sliderLink.elem = document.querySelector(`.${data.name}-slider--${index}`)
        sliderLink.line = sliderLink.elem.querySelector(`.${data.name}-line`)
        sliderLink.line.classList.add('slider-line--transition')
        sliderLink.items = sliderLink.elem.querySelectorAll(`.${data.name}-item`)
        sliderLink.shadowPrev = document.querySelector(`.${data.name}-shadow-prev`) ?
            sliderLink.elem.querySelector(`.${data.name}-shadow-prev`) :
            document.querySelector(`.${data.name}-shadow-prev--${index}`)
        sliderLink.shadowNext = document.querySelector(`.${data.name}-shadow-next`) ?
            sliderLink.elem.querySelector(`.${data.name}-shadow-next`) :
            document.querySelector(`.${data.name}-shadow-next--${index}`)

        sliderLink.revert = sliderLink.elem.getAttribute('revert')
            sliderLink.revert = sliderLink.revert == 'true' ? true : false ;
        sliderLink.anchor = sliderLink.elem.getAttribute('anchor')
            sliderLink.anchor = sliderLink.anchor == 'true' ? true : false ;
            if(sliderLink.anchor) sliderLink.moveOffset = 0
        sliderLink.direction = sliderLink.elem.getAttribute('direction')
            sliderLink.direction = sliderLink.direction == 'horizontal' || sliderLink.direction == 'vertical' ? 
                sliderLink.direction : 'horizontal';
        sliderLink.styles = window.getComputedStyle(sliderLink.elem)
        sliderLink.styles = {
            padding: sliderLink.direction == 'horizontal' ? 
                parseInt(sliderLink.styles.paddingLeft, 10) + parseInt(sliderLink.styles.paddingRight, 10) :
                parseInt(sliderLink.styles.paddingTop, 10) + parseInt(sliderLink.styles.paddingBottom, 10) ,
            gap: window.getComputedStyle(sliderLink.line).gap != 'normal' ?
                parseInt(window.getComputedStyle(sliderLink.line).gap, 10) : 0,
        }
        sliderLink.points = sliderLink.elem.getAttribute('points') ? 
            JSON.parse(sliderLink.elem.getAttribute('points')) : false ;
        if(sliderLink.points) {
            sliderLink.itemsCount = getItemCount(sliderLink)
            sliderLink.itemSize = (
                (sliderLink.direction == 'horizontal' ? sliderLink.elem.offsetWidth : sliderLink.elem.offsetHeight) -
                sliderLink.styles.padding - sliderLink.styles.gap * 
                (sliderLink.itemsCount > 0 ? sliderLink.itemsCount-1 : sliderLink.itemsCount)
            ) / sliderLink.itemsCount   
            sliderLink.items.forEach(item => { 
                sliderLink.direction == 'horizontal' ? 
                    item.style.width = `${sliderLink.itemSize}px` :
                    item.style.height = `${sliderLink.itemSize}px` 
            });
        }
        sliderLink.size = {
            elem: sliderLink.direction == 'horizontal' ? 
                sliderLink.elem.offsetWidth : sliderLink.elem.offsetHeight,
            line: (sliderLink.direction == 'horizontal' ? 
                sliderLink.line.offsetWidth : sliderLink.line.offsetHeight) + sliderLink.styles.padding
        }
        sliderLink.scrollMax = sliderLink.size.line - sliderLink.size.elem
        sliderLink.step = index ? sliderLink.scrollMax/scrollsData[data.name].sliders[0].scrollMax : 1
        sliderLink.percent = 0
        sliderLink.skip = false
    });

    // достаём важные блоки (scroll)
    if(document.querySelector(`.${data.name}-scroll`)) {
        scrollsData[data.name].scroll = {}
        let scrollLink = scrollsData[data.name].scroll
        let sliderLink = scrollsData[data.name].sliders[0]

        scrollLink.elem = document.querySelector(`.${data.name}-scroll`)
        scrollLink.thumb = document.querySelector(`.${data.name}-thumb`)
        scrollLink.thumb.classList.add('scroll-thumb--transition')
        scrollLink.direction = scrollLink.elem.getAttribute('direction') ? 
            scrollLink.elem.getAttribute('direction') : 
            (scrollLink.elem.offsetWidth > scrollLink.elem.offsetHeight ? 'horizontal' : 'vertical') ;
        scrollLink.size = {}
            scrollLink.size.elem = scrollLink.direction == 'horizontal' ? 
                scrollLink.elem.offsetWidth : scrollLink.elem.offsetHeight ;
            scrollLink.size.thumb = (scrollLink.size.elem/100) * ((sliderLink.size.elem*100) / sliderLink.size.line)
        scrollLink.direction == 'horizontal' ? 
            scrollLink.thumb.style.width = `${scrollLink.size.thumb}px` :
            scrollLink.thumb.style.height = `${scrollLink.size.thumb}px` ;
        scrollLink.scrollMax = scrollLink.size.elem - scrollLink.size.thumb
        scrollLink.step = scrollLink.scrollMax/sliderLink.scrollMax
    } else {scrollsData[data.name].scroll = false}

    // достаём все кнопки
    scrollsData[data.name].btns = {
        prev: document.querySelectorAll(`.${data.name}-btn-prev`),
        next: document.querySelectorAll(`.${data.name}-btn-next`)
    }

    // sliderValidate(data)
    setEvents(data)
    rollScroll(data)
}

function updateScrollAll() {
    document.querySelectorAll('.DTScroll').forEach((scroll) => {
        sliderUpdateDeep(scrollsData[scroll.id])
    })
}

function scrollWheel(event, data, revert) {
    event.preventDefault()

    revert ? 
        data.global.move -= event.deltaY : 
        data.global.move += event.deltaY ;

    for (const key in data.sliders) {
        let slider = data.sliders[key]
        let itemSize = slider.itemSize + slider.styles.gap
        slider.percent = (data.global.move/itemSize) * slider.step
    }

    rollScroll(data)
}

function scrollButton(data, direction) {
    event.preventDefault()

    let slider = data.sliders[0]
    let localMove = slider.itemSize + slider.styles.gap

    direction ? data.global.move += localMove : data.global.move -= localMove ;
    for (const key in data.sliders) {
        let slider = data.sliders[key]
        slider.percent = (data.global.move/localMove) * slider.step
    }

    rollScroll(data)
}

function rollScroll(data) {
    if( data.global.move < 0 ) data.global.move = 0
    if( data.global.move > data.sliders[0].scrollMax ) data.global.move = data.sliders[0].scrollMax

    for (const key in data.sliders) {
        let slider = data.sliders[key]

        let localMove = slider.revert ?
            slider.scrollMax - (data.global.move * slider.step) :
            data.global.move * slider.step ;

        if(slider.anchor) {
            let sliderMove = (slider.itemSize + slider.styles.gap) * Math.round(slider.percent)

            if (slider.revert) sliderMove = slider.scrollMax - sliderMove
            if (sliderMove > slider.scrollMax) sliderMove = slider.scrollMax
            if (sliderMove < 0) sliderMove = 0

            slider.move = localMove - sliderMove
            localMove = sliderMove
        }

        slider.line.style.transform = slider.direction == 'horizontal' ? 
            `translateX(${-localMove}px)` : 
            `translateY(${-localMove}px)` ;

        changeShadow(data.sliders[0].scrollMax, slider, data.global.move)
    }

    if (data.scroll) {
        data.scroll.thumb.style.transform = data.scroll.direction == 'horizontal' ? 
            `translateX(${data.global.move * data.scroll.step}px)` : 
            `translateY(${data.global.move * data.scroll.step}px)` ;
    }
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

function sliderTouch(event, type , data, elem, index) {
    event.preventDefault()

    let elemDinamic = elem == 'slider' ? 
        (index ? data.sliders[index] : data.sliders[0]) : data.scroll
    let shift = type == 'mouse' ? 
        (elemDinamic.direction == "horizontal" ? event.clientX : event.clientY) :
        (elemDinamic.direction == "horizontal" ? event.touches[0].clientX : event.touches[0].clientY) ;
    let localMove = data.global.move

    for (const key in data.sliders) {
        let slider = data.sliders[key]

        slider.skip = slider.anchor && !elemDinamic.anchor

        if (!slider.skip) slider.line.classList.remove('slider-line--transition')
        slider.line.style.pointerEvents = 'none'
    }
    if(data.scroll) data.scroll.thumb.classList.remove('scroll-thumb--transition')

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchmove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('touchend', onMouseUp)

    function onMouseMove(e) {
        let move = (shift - (elemDinamic.direction == "horizontal" ? e.clientX : e.clientY)) / elemDinamic.step

        localMove = data.global.move + (elemDinamic.revert || elem == 'scroll' ? -move : move)

        for (const key in data.sliders) {
            let slider = data.sliders[key]
            let itemSize = (slider.itemSize + slider.styles.gap)
            let sliderMove = localMove * slider.step
                sliderMove = slider.revert ? slider.scrollMax - sliderMove : sliderMove ;
            slider.percent = (localMove/itemSize) * slider.step
            let anchorMove = slider.skip ? itemSize * Math.round(slider.percent) : sliderMove ;

            if (elemDinamic.anchor) anchorMove = anchorMove - slider.move
            if (!elemDinamic.anchor && slider.revert) anchorMove = slider.scrollMax - anchorMove  

            slider.line.style.transform = `translate${slider.direction == 'horizontal' ? 'X' : 'Y'}(
                ${slider.anchor ? -anchorMove : -sliderMove}px)`

            changeShadow(data.sliders[0].scrollMax, slider, localMove)
        }

        if(data.scroll) data.scroll.thumb.style.transform = data.scroll.direction == 'horizontal' ? 
            `translateX(${localMove * data.scroll.step}px)`: 
            `translateY(${localMove * data.scroll.step}px)`;
    }

    function onMouseUp(e) {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
        document.removeEventListener('touchmove', onMouseMove)
        document.removeEventListener('touchend', onMouseUp)

        for (const key in data.sliders) {
            let slider = data.sliders[key]
    
            slider.line.classList.add('slider-line--transition') 
            slider.line.style.pointerEvents = 'all'
        }

        if(data.scroll) data.scroll.thumb.classList.add('scroll-thumb--transition')

        data.global.move = localMove

        rollScroll(data)
    }
}

function setEvents(data) {
    if (data.scroll) {
        data.scroll.thumb.onmousedown = (event) => { sliderTouch(event, 'mouse', data, 'scroll') }
        data.scroll.thumb.ontouchstart = (event) => { sliderTouch(event, 'touch', data, 'scroll') }
        data.scroll.thumb.ondragstart = () => { return false }
    }

    if (scrollsData[data.name].btns.prev) { scrollsData[data.name].btns.prev.forEach(btn => {
        btn.onclick = () => { scrollButton(data, false) }
    })}
    if (scrollsData[data.name].btns.next) { scrollsData[data.name].btns.next.forEach(btn => {
        btn.onclick = () => { scrollButton(data, true) }
    })}
    
    for (const key in data.sliders) {
        let slider = data.sliders[key]
    
        slider.line.onmousedown = (event) => { sliderTouch(event, 'mouse', data, 'slider', key) }
        slider.line.ontouchstart = (event) => { sliderTouch(event, 'touch', data, 'slider', key) }
        slider.line.ondragstart = () => { return false }
        slider.line.onwheel = (event) => scrollWheel(event, data, slider.revert) 
    }
}

function initScroll(sliderId) {
    // создаём хранилище
    scrollsData[sliderId] = {}
    scrollsData[sliderId].name = sliderId
    scrollsData[sliderId].global = {
        move: 0,
    }
    scrollsData[sliderId].sliders = {}

    sliderUpdateDeep(scrollsData[sliderId])
}

function initScrollAll() {
    document.querySelectorAll('.DTScroll').forEach((scroll) => {
        initScroll(scroll.id)
    })

    window.onresize = () => {updateScrollAll()}
}


window.onload = () => initScrollAll()