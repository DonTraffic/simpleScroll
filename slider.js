
let slidersData = {}

function rollSlider(anchorSlider) {
    if( anchorSlider.matrix > 0 ) anchorSlider.matrix = 0

    let maxWidth = -( 
        (anchorSlider.items.length * anchorSlider.items[0].offsetWidth) - anchorSlider.width + 
        (window.innerWidth < anchorSlider.width ? anchorSlider.padding*2 : 0) + 
        anchorSlider.gap * (anchorSlider.items.length-1) 
    ) 

    if( anchorSlider.matrix < maxWidth) anchorSlider.matrix = maxWidth

    anchorSlider.sliderLine.style.transform = `translate(${anchorSlider.matrix}px)`
}

function sliderCount(anchorSlider) {
    let count

    for (const key in anchorSlider.setting) {
        if (!count && window.innerWidth <= key) {
            count = anchorSlider.setting[key]
        }
    } if (!count) count = anchorSlider.setting[0]

    return count <= 
        anchorSlider.items.length ? count : 
        anchorSlider.items.length
}

function sliderTouch(event, anchorSlider) {
    event.preventDefault()
    anchorSlider.sliderLine.classList.remove('slider__line--transition')
    anchorSlider.matrix = new WebKitCSSMatrix(window.getComputedStyle(anchorSlider.sliderLine).transform).m41;
    let shiftX = event.clientX - anchorSlider.matrix

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    function onMouseMove(e) { 
        let value = e.clientX - shiftX
        anchorSlider.sliderLine.style.transform = `translate(${value}px)` 
        anchorSlider.matrix = value

        anchorSlider.sliderLine.style.pointerEvents = 'none'
    }

    function onMouseUp(e) {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)

        anchorSlider.sliderLine.classList.add('slider__line--transition')
        anchorSlider.sliderLine.style.pointerEvents = 'all'

        rollSlider(anchorSlider)
    }
}

function sliderUpdate(sliderId) {
    let anchorSlider = slidersData[sliderId]

    anchorSlider.items = anchorSlider.slider.querySelectorAll('.slider__line-item')
    anchorSlider.countMax = sliderCount(anchorSlider)
    anchorSlider.width = anchorSlider.sliderWrap.offsetWidth
    anchorSlider.widthItem = (anchorSlider.width / anchorSlider.countMax) - anchorSlider.gap + anchorSlider.gap/anchorSlider.countMax

    anchorSlider.sliderLine.style.width = `${(anchorSlider.width * anchorSlider.items.length) / anchorSlider.countMax}px`
    anchorSlider.items.forEach( item => {
        item.style.width = `${anchorSlider.widthItem}px`
        item.style.minWidth = `${anchorSlider.widthItem}px`
    })

    anchorSlider.sliderLine.classList.add('slider__line--transition')

    rollSlider(anchorSlider)
}

// Инициализируем отдельный слайдер
function sliderInit(sliderId) {
    slidersData[sliderId] = {}
    let anchorSlider = slidersData[sliderId]

    // достаём важные блоки
    anchorSlider.slider = document.querySelector(`#${sliderId}`)
    anchorSlider.items = anchorSlider.slider.querySelectorAll('.slider__line-item')
    anchorSlider.sliderLine = anchorSlider.slider.querySelector('.slider__line')
    anchorSlider.sliderWrap = anchorSlider.slider.querySelector('.slider__line-wrap')
    anchorSlider.btnPrev = anchorSlider.slider.querySelector('.slider__btn-prev')
    anchorSlider.btnNext = anchorSlider.slider.querySelector('.slider__btn-next')

    // достаём настройки
    anchorSlider.setting = anchorSlider.slider.getAttribute('items-count') ?
        JSON.parse(anchorSlider.slider.getAttribute('items-count')) : {0: 1} ;
    anchorSlider.drag = anchorSlider.slider.getAttribute('drag') ? 
        anchorSlider.slider.getAttribute('drag') : 'true' ;
    anchorSlider.gap = anchorSlider.slider.getAttribute('gap') ?
        JSON.parse(anchorSlider.slider.getAttribute('gap')) : {0: 1} ;
    anchorSlider.padding = anchorSlider.slider.getAttribute('padding') ?
        JSON.parse(anchorSlider.slider.getAttribute('padding')) : '0' ;
    anchorSlider.countMax = sliderCount(anchorSlider)
    anchorSlider.width = anchorSlider.slider.offsetWidth
    anchorSlider.widthItem = 0
    anchorSlider.matrix = new WebKitCSSMatrix(window.getComputedStyle(anchorSlider.sliderLine).transform).m41;

    if (window.innerWidth < anchorSlider.width) anchorSlider.sliderLine.style.padding = `0 ${anchorSlider.padding}px`
    anchorSlider.sliderLine.style.gap = `${anchorSlider.gap}px`

    if (anchorSlider.btnPrev) {anchorSlider.btnPrev.addEventListener('click', e => {
        anchorSlider.matrix = anchorSlider.matrix + anchorSlider.widthItem
        rollSlider(anchorSlider)
    })}

    if (anchorSlider.btnNext) {anchorSlider.btnNext.addEventListener('click', e => {
        anchorSlider.matrix = anchorSlider.matrix - anchorSlider.widthItem
        rollSlider(anchorSlider)
    })}

    if (anchorSlider.drag != 'false') anchorSlider.sliderLine.onmousedown = (event) => sliderTouch(event, anchorSlider)
    anchorSlider.sliderLine.ondragstart = () => { return false }

    // 
    sliderUpdate(sliderId)
    onresize = (e) => sliderUpdate(sliderId);
}

// запускаем инициализацию всех слайдеров
function allSliderInit () {
    document.querySelectorAll('.slider').forEach(slider => {
        sliderInit(slider.id)
    })
}



const slider = {
    allSliderInit,
    sliderInit,
    sliderUpdate,
    slidersData
}
  
export  { slider }