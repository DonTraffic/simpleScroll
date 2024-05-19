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

function getItemCount(slider) {
    let count

    for (const key in slider.points) {
        if (!count && window.innerWidth <= key) {
            count = slider.points[key]
        }
    } if (!count) count = slider.points[0]

    return count <= slider.items.length ? count : slider.items.length
}



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

function changeButton(data, move) {
    let itemSize = data.sliders[0].itemSize/2
    let moveMin = move < 0 + itemSize
    let moveMax = move > data.sliders[0].scrollMax - itemSize

    data.btns.prev.forEach(btn => {
        moveMin ?
            btn.classList.add('slider-btn--disable') :
            btn.classList.remove('slider-btn--disable') ;
    })
    data.btns.next.forEach(btn => {
        moveMax ?
            btn.classList.add('slider-btn--disable') :
            btn.classList.remove('slider-btn--disable') ;
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

function sliderTouch(event, type, data, elem, index) {
    let elemDinamic = elem == 'slider' ? 
        (index ? data.sliders[index] : data.sliders[0]) : data.scroll
    let clientY = type == 'mouse' ? event.clientY : event.touches[0].clientY ;
    let clientX = type == 'mouse' ? event.clientX : event.touches[0].clientX ;
    let shift = elemDinamic.direction == "horizontal" ? clientX : clientY ;
    let localMove = data.global.move

    for (const key in data.sliders) {
        let slider = data.sliders[key]

        slider.skip = elem == 'slider' ? 
            !slider.anchor || (index == key ? true : false) : 
            !slider.anchor ;

        if (slider.skip) slider.line.classList.remove('slider-line--transition')
    }
    if(data.scroll) {
        let scroll = data.scroll

        scroll.skip = elem == 'scroll' ? true : !scroll.anchor ;

        if (scroll.skip) scroll.thumb.classList.remove('scroll-thumb--transition')
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchmove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('touchend', onMouseUp)

    function onMouseMove(e) {
        let localClientY = type == 'mouse' ? e.clientY : e.touches[0].clientY ;
        let localClientX = type == 'mouse' ? e.clientX : e.touches[0].clientX ;
        let move = (shift - (elemDinamic.direction == "horizontal" ? localClientX : localClientY)) / elemDinamic.step

        localMove = data.global.move + (elemDinamic.revert || elem == 'scroll' ? -move : move)

        for (const key in data.sliders) {            
            let slider = data.sliders[key]
            let itemSize = (slider.itemSize + slider.styles.gap)
            let sliderMove = localMove * slider.step
                sliderMove = slider.revert ? slider.scrollMax - sliderMove : sliderMove ;
            slider.percent = (localMove/itemSize) * slider.step
            let anchorMove = slider.skip ? sliderMove : itemSize * Math.round(slider.percent) ;

            if (elemDinamic.anchor) anchorMove = anchorMove - slider.move
            if (!elemDinamic.anchor && slider.revert) anchorMove = slider.scrollMax - anchorMove

            slider.line.style.pointerEvents = 'none'
            slider.line.style.transform = `translate${slider.direction == 'horizontal' ? 'X' : 'Y'}(
                ${slider.anchor ? -anchorMove : -sliderMove}px)`

            changeShadow(data.sliders[0].scrollMax, slider, localMove)
            changeButton(data, localMove)
        }

        if(data.scroll) {
            let scroll = data.scroll
            if (scroll.anchor) {
                let itemSize = scroll.size.thumb
                    scroll.percent = (localMove/itemSize) * scroll.step
                let anchorMove = scroll.skip ? localMove : itemSize * Math.round(scroll.percent) ;

                scroll.thumb.style.transform = `translate${scroll.direction == 'horizontal' ? 'X' : 'Y'}(
                    ${elem == 'scroll' ? localMove*scroll.step - scroll.move : anchorMove}px)`
            } else {
                scroll.thumb.style.transform = `translate${scroll.direction == 'horizontal' ? 'X' : 'Y'}(
                    ${localMove*scroll.step}px)`
            }
        }
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
    if (data.scroll && !data.scroll.disable) {
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
        if(slider.disable) return false
    
        slider.line.onmousedown = (event) => { sliderTouch(event, 'mouse', data, 'slider', key) }
        slider.line.ontouchstart = (event) => { sliderTouch(event, 'touch', data, 'slider', key) }
        slider.line.ondragstart = () => { return false }
        slider.line.onwheel = (event) => scrollWheel(event, data, slider.revert) 
    }
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

        slider.line.style.transform = `translate${slider.direction == 'horizontal' ? 'X' : 'Y'}(${-localMove}px)`

        changeShadow(data.sliders[0].scrollMax, slider, data.global.move)
        changeButton(data, data.global.move)
    }

    if(data.scroll) {
        let scroll = data.scroll
        scroll.percent = (data.global.move*scroll.step)/scroll.size.thumb
        
        let scrollMove = scroll.anchor ? 
            scroll.size.thumb * Math.round(scroll.percent) : 
            data.global.move*scroll.step ;

        if (scroll.anchor) {
            scroll.move = (data.global.move*scroll.step) - (scroll.size.thumb * Math.round(scroll.percent))
        } else {scroll.move = 0}

        scroll.thumb.style.transform = `translate${scroll.direction == 'horizontal' ? 'X' : 'Y'}(${scrollMove}px)`
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

    sliderUpdateDeep(sliderId)
}

function sliderUpdateDeep(name) {
    let data = scrollsData[name]

    // достаём важные блоки (sliders)
    document.querySelectorAll(`.${data.name}-slider`).forEach((slider, index) => {
        scrollsData[data.name].sliders[index] = {}
        let sliderLink = scrollsData[data.name].sliders[index]

        sliderLink.elem = document.querySelector(`.${data.name}-slider--${index}`)
        sliderLink.line = sliderLink.elem.querySelector(`.${data.name}-line`)
        sliderLink.line.classList.remove('slider-line--transition')
        sliderLink.items = sliderLink.elem.querySelectorAll(`.${data.name}-item`)
        sliderLink.shadowPrev = document.querySelector(`.${data.name}-shadow-prev`) ?
            sliderLink.elem.querySelector(`.${data.name}-shadow-prev`) :
            document.querySelector(`.${data.name}-shadow-prev--${index}`)
        sliderLink.shadowNext = document.querySelector(`.${data.name}-shadow-next`) ?
            sliderLink.elem.querySelector(`.${data.name}-shadow-next`) :
            document.querySelector(`.${data.name}-shadow-next--${index}`)

        sliderLink.revert = sliderLink.elem.getAttribute('revert')
            sliderLink.revert = sliderLink.revert == 'true' ? true : false ;
        sliderLink.disable = sliderLink.elem.getAttribute('disable')
            sliderLink.disable = sliderLink.disable == 'true' ? true : false ;
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
                item.style.width = `auto`
                item.style.height = `auto`

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
        sliderLink.move = 0
        sliderLink.skip = false

        sliderLink.line.classList.add('slider-line--transition')
        sliderLink.line.style.userSelect = 'none'
    });

    // достаём важные блоки (scroll)
    if(document.querySelector(`.${data.name}-scroll`)) {
        scrollsData[data.name].scroll = {}
        let scrollLink = scrollsData[data.name].scroll
        let sliderLink = scrollsData[data.name].sliders[0]

        scrollLink.elem = document.querySelector(`.${data.name}-scroll`)
        scrollLink.thumb = document.querySelector(`.${data.name}-thumb`)
        scrollLink.disable = scrollLink.elem.getAttribute('disable')
            scrollLink.disable = scrollLink.disable == 'true' ? true : false ;
        scrollLink.anchor = scrollLink.elem.getAttribute('anchor')
            if(scrollLink.anchor) {
                scrollLink.moveOffset = 0
                sliderLink = scrollsData[data.name].sliders[Number(scrollLink.anchor)]
            }
        scrollLink.direction = scrollLink.elem.getAttribute('direction') ? 
            scrollLink.elem.getAttribute('direction') : 
            (scrollLink.elem.offsetWidth > scrollLink.elem.offsetHeight ? 'horizontal' : 'vertical') ;
        scrollLink.size = {}
            scrollLink.size.elem = scrollLink.direction == 'horizontal' ? 
                scrollLink.elem.offsetWidth : scrollLink.elem.offsetHeight ;
            scrollLink.size.thumb = scrollLink.anchor ? 
            scrollLink.size.elem / (sliderLink.items.length <= 2 ? sliderLink.items.length : sliderLink.items.length-1) :
                (scrollLink.size.elem/100) * ((sliderLink.size.elem*100) / sliderLink.size.line) ;
        scrollLink.direction == 'horizontal' ? 
            scrollLink.thumb.style.width = `${scrollLink.size.thumb}px` :
            scrollLink.thumb.style.height = `${scrollLink.size.thumb}px` ;
        scrollLink.scrollMax = scrollLink.size.elem - scrollLink.size.thumb
        scrollLink.step = scrollLink.scrollMax/sliderLink.scrollMax
        scrollLink.percent = 0
        scrollLink.skip = false

        scrollLink.thumb.classList.add('scroll-thumb--transition')
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



function initScrollAll() {
    document.querySelectorAll('.DTScroll').forEach((scroll) => {
        initScroll(scroll.id)
    })

    window.onresize = () => {updateScrollAll()}
}

function updateScrollAll() {
    document.querySelectorAll('.DTScroll').forEach((scroll) => {
        sliderUpdateDeep(scroll.id)
    })
}



window.onload = () => initScrollAll()