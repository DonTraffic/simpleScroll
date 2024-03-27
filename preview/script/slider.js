
// // let slidersData = {}

// // function rollScroll(anchorScroll.slider) {
// //     if( anchorScroll.matrix > 0 ) anchorScroll.matrix = 0

// //     let maxWidth = -( 
// //         (anchorScroll.slider.items.length * anchorScroll.slider.items[0].offsetWidth) - anchorScroll.slider.width + 
// //         (window.innerWidth < anchorScroll.slider.width ? anchorScroll.slider.padding*2 : 0) + 
// //         anchorScroll.slider.gap * (anchorScroll.slider.items.length-1) 
// //     ) 

// //     if( anchorScroll.matrix < maxWidth) anchorScroll.matrix = maxWidth

// //     anchorScroll.slider.line.style.transform = `translate(${anchorScroll.matrix}px)`
// // }

// // function sliderCount(anchorScroll.slider) {
// //     let count

// //     for (const key in anchorScroll.slider.setting) {
// //         if (!count && window.innerWidth <= key) {
// //             count = anchorScroll.slider.setting[key]
// //         }
// //     } if (!count) count = anchorScroll.slider.setting[0]

// //     return count <= 
// //         anchorScroll.slider.items.length ? count : 
// //         anchorScroll.slider.items.length
// // }

// // function sliderTouch(event, anchorScroll.slider) {
// //     event.preventDefault()
// //     anchorScroll.slider.line.classList.remove('slider-line--transition')
// //     anchorScroll.matrix = new WebKitCSSMatrix(window.getComputedStyle(anchorScroll.slider.line).transform).m41;
// //     let shiftX = event.clientX - anchorScroll.matrix

// //     document.addEventListener('mousemove', onMouseMove)
// //     document.addEventListener('mouseup', onMouseUp)

// //     function onMouseMove(e) { 
// //         let value = e.clientX - shiftX
// //         anchorScroll.slider.line.style.transform = `translate(${value}px)` 
// //         anchorScroll.matrix = value

// //         anchorScroll.slider.line.style.pointerEvents = 'none'
// //     }

// //     function onMouseUp(e) {
// //         document.removeEventListener('mousemove', onMouseMove)
// //         document.removeEventListener('mouseup', onMouseUp)

// //         anchorScroll.slider.line.classList.add('slider-line--transition')
// //         anchorScroll.slider.line.style.pointerEvents = 'all'

// //         rollScroll(anchorScroll.slider)
// //     }
// // }

// // function sliderUpdate(sliderId) {
// //     console.log('sliderUpdate');
// //     let anchorScroll.slider = slidersData[sliderId]

// //     anchorScroll.slider.items = anchorScroll.slider.querySelectorAll('.slider-line-item')
// //     anchorScroll.slider.countMax = sliderCount(anchorScroll.slider)
// //     anchorScroll.slider.width = anchorScroll.sliderWrap.offsetWidth
// //     console.log(anchorScroll.slider.width);
// //     anchorScroll.slider.widthItem = (anchorScroll.slider.width / anchorScroll.slider.countMax) - anchorScroll.slider.gap + anchorScroll.slider.gap/anchorScroll.slider.countMax

// //     anchorScroll.slider.line.style.width = `${(anchorScroll.slider.width * anchorScroll.slider.items.length) / anchorScroll.slider.countMax}px`
// //     anchorScroll.slider.items.forEach( item => {
// //         item.style.width = `${anchorScroll.slider.widthItem}px`
// //         item.style.minWidth = `${anchorScroll.slider.widthItem}px`
// //     })

// //     anchorScroll.slider.line.classList.add('slider-line--transition')

// //     rollScroll(anchorScroll.slider)
// // }

// // // Инициализируем отдельный слайдер
// // function sliderInit(sliderId) {
// //     slidersData[sliderId] = {}
// //     let anchorScroll.slider = slidersData[sliderId]

// //     // достаём важные блоки
// //     anchorScroll.slider = document.querySelector(`#${sliderId}`)
// //     anchorScroll.slider.items = anchorScroll.slider.querySelectorAll('.slider-line-item')
// //     anchorScroll.slider.line = anchorScroll.slider.querySelector('.slider-line')
// //     anchorScroll.sliderWrap = anchorScroll.slider.querySelector('.slider-line-wrap')
// //     anchorScroll.slider.btnPrev = anchorScroll.slider.querySelector('.slider__btn-prev')
// //     anchorScroll.slider.btnNext = anchorScroll.slider.querySelector('.slider__btn-next')

// //     // достаём настройки
// //     anchorScroll.slider.setting = anchorScroll.slider.getAttribute('items-count') ?
// //         JSON.parse(anchorScroll.slider.getAttribute('items-count')) : {0: 1} ;
// //     anchorScroll.slider.drag = anchorScroll.slider.getAttribute('drag') ? 
// //         anchorScroll.slider.getAttribute('drag') : 'true' ;
// //     anchorScroll.slider.gap = anchorScroll.slider.getAttribute('gap') ?
// //         JSON.parse(anchorScroll.slider.getAttribute('gap')) : {0: 1} ;
// //     anchorScroll.slider.padding = anchorScroll.slider.getAttribute('padding') ?
// //         JSON.parse(anchorScroll.slider.getAttribute('padding')) : '0' ;
// //     anchorScroll.slider.countMax = sliderCount(anchorScroll.slider)
// //     anchorScroll.slider.width = anchorScroll.slider.offsetWidth
// //     anchorScroll.slider.widthItem = 0
// //     anchorScroll.matrix = new WebKitCSSMatrix(window.getComputedStyle(anchorScroll.slider.line).transform).m41;

// //     if (window.innerWidth < anchorScroll.slider.width) anchorScroll.slider.line.style.padding = `0 ${anchorScroll.slider.padding}px`
// //     anchorScroll.slider.line.style.gap = `${anchorScroll.slider.gap}px`

// //     if (anchorScroll.slider.btnPrev) {anchorScroll.slider.btnPrev.addEventListener('click', e => {
// //         anchorScroll.matrix = anchorScroll.matrix + anchorScroll.slider.widthItem
// //         rollScroll(anchorScroll.slider)
// //     })}

// //     if (anchorScroll.slider.btnNext) {anchorScroll.slider.btnNext.addEventListener('click', e => {
// //         anchorScroll.matrix = anchorScroll.matrix - anchorScroll.slider.widthItem
// //         rollScroll(anchorScroll.slider)
// //     })}

// //     if (anchorScroll.slider.drag != 'false') anchorScroll.slider.line.onmousedown = (event) => sliderTouch(event, anchorScroll.slider)
// //     anchorScroll.slider.line.ondragstart = () => { return false }

// //     // 
// //     sliderUpdate(sliderId)
// //     onresize = (e) => sliderUpdate(sliderId);
// // }

// // // запускаем инициализацию всех слайдеров
// // function allSliderInit () {
// //     document.querySelectorAll('.slider').forEach(slider => {
// //         sliderInit(slider.id)
// //     })
// // }


// // // если нужны модуми, закоментировать
// // allSliderInit()

// // если нужны модуми, раскоментировать
// // const slider = {
// //     allSliderInit,
// //     sliderInit,
// //     sliderUpdate,
// //     slidersData
// // }
  
// // export  { slider }




// let slidersData = {}

// function windowResize(anchorScroll) {
//     console.log('windowResize');
    
//     sliderUpdate(anchorScroll)
// }

// function rollScroll(anchorScroll) {
//     console.log('rollScroll');
//     if( anchorScroll.matrix > 0 ) anchorScroll.matrix = 0

//     let maxWidth = -( 
//         (anchorScroll.slider.items.length * anchorScroll.slider.items[0].offsetWidth) - anchorScroll.slider.width + 
//         (window.innerWidth <= anchorScroll.slider.viewport.offsetWidth ? anchorScroll.slider.padding*2 : 0) +
//         anchorScroll.slider.gap * (anchorScroll.slider.items.length-1)
//     ) 

//     if( anchorScroll.matrix < maxWidth) anchorScroll.matrix = maxWidth

//     anchorScroll.slider.line.style.transform = `translate(${anchorScroll.matrix}px)`
//     anchorScroll.scrollbar.thumb.style.transform = `translate(${-anchorScroll.matrix/anchorScroll.scrollStep}px)`
// }

// function sliderUpdate(anchorScroll) {
//     let lineStyles = getComputedStyle(anchorScroll.slider.line)
//         anchorScroll.slider.gap = parseInt(lineStyles.gap, 10) ? parseInt(lineStyles.gap, 10) : 0
//         anchorScroll.slider.padding = parseInt(lineStyles.padding, 10)

//     anchorScroll.slider.countMax = sliderCount(anchorScroll)

//     anchorScroll.matrix = new WebKitCSSMatrix(window.getComputedStyle(anchorScroll.slider.line).transform).m41

//     anchorScroll.slider.width = anchorScroll.slider.viewport.offsetWidth
//     anchorScroll.slider.widthItem = (anchorScroll.slider.width / anchorScroll.slider.countMax) - anchorScroll.slider.gap + anchorScroll.slider.gap/anchorScroll.slider.countMax

//     anchorScroll.slider.line.style.width = `${(anchorScroll.slider.width * anchorScroll.slider.items.length) / anchorScroll.slider.countMax}px`
//     anchorScroll.slider.items.forEach( item => {
//         item.style.width = `${anchorScroll.slider.widthItem}px`
//         item.style.minWidth = `${anchorScroll.slider.widthItem}px`
//     })

//     anchorScroll.scrollbar.direction = anchorScroll.scrollbar.elem.offsetWidth < anchorScroll.scrollbar.elem.offsetHeight ? 'vertical' : 'gorizont' ;
//     anchorScroll.scrollbar.width = anchorScroll.scrollbar.direction == 'vertical' ? 
//         anchorScroll.scrollbar.elem.offsetHeight : anchorScroll.scrollbar.elem.offsetWidth ;
//     // // anchorScroll.scrollbar.widthThumb = anchorScroll.slider.viewport.offsetWidth - (anchorScroll.slider.line.offsetWidth - anchorScroll.slider.viewport.offsetWidth)
//     // anchorScroll.scrollbar.widthThumb = anchorScroll.slider.viewport.offsetWidth - (anchorScroll.slider.line.offsetWidth - anchorScroll.slider.viewport.offsetWidth)
//     // anchorScroll.scrollbar.thumb.style.width  = `${anchorScroll.scrollbar.widthThumb}px`

//     // console.log(anchorScroll.scrollbar.widthThumb);
//     // console.log(anchorScroll.slider.viewport.offsetWidth);
//     // console.log(anchorScroll.slider.line.offsetWidth);

//     var viewportHeight = anchorScroll.scrollbar.width
//     var contentHeight = anchorScroll.slider.line.offsetWidth + anchorScroll.slider.padding*2
//     console.log(anchorScroll.slider.padding);

//     var viewableRatio = viewportHeight / contentHeight
//     var thumbHeight = viewportHeight * viewableRatio

//     anchorScroll.scrollbar.widthThumb = thumbHeight
//     anchorScroll.scrollbar.thumb.style.width  = `${thumbHeight}px`

//     var scrollTrackSpace = contentHeight - viewportHeight
//     var scrollThumbSpace =  viewportHeight - thumbHeight
//     anchorScroll.scrollStep = scrollTrackSpace / scrollThumbSpace

//     rollScroll(anchorScroll)
// }

// function sliderCount(anchorScroll) {
//     let count

//     for (const key in anchorScroll.slider.points) {
//         if (!count && window.innerWidth <= key) {
//             count = anchorScroll.slider.points[key]
//         }
//     } if (!count) count = anchorScroll.slider.points[0]

//     return count <= 
//         anchorScroll.slider.items.length ? count : 
//         anchorScroll.slider.items.length
// }

// function sliderTouch(event, anchorScroll, direction, elem) {
//     event.preventDefault()
//     anchorScroll.slider.line.classList.remove('slider-line--transition')
//     anchorScroll.scrollbar.thumb.classList.remove('scrollbar-thumb--transition')
//     anchorScroll.matrix = new WebKitCSSMatrix(window.getComputedStyle(anchorScroll.slider.line).transform).m41;
//     let shiftX = event.clientX + (direction ? -anchorScroll.matrix : anchorScroll.matrix/anchorScroll.scrollStep)


//     document.addEventListener('mousemove', onMouseMove)
//     document.addEventListener('mouseup', onMouseUp)

//     function onMouseMove(e) { 
//         let value = e.clientX - shiftX

//         let localLineMove = (direction ? value : -value)*(elem == 'scroll' ? anchorScroll.scrollStep : 1)
//         let localThimbMove = (direction ? -value : value)/(elem == 'content' ? anchorScroll.scrollStep : 1)

//         anchorScroll.slider.line.style.transform = `translate(${localLineMove}px)` 
//         anchorScroll.scrollbar.thumb.style.transform = `translate(${localThimbMove}px)`
//         anchorScroll.matrix = elem == 'scroll' ? (direction ? value : -value) * anchorScroll.scrollStep : (direction ? value : -value) ;

//         anchorScroll.slider.line.style.pointerEvents = 'none'
//     }

//     function onMouseUp(e) {
//         document.removeEventListener('mousemove', onMouseMove)
//         document.removeEventListener('mouseup', onMouseUp)

//         anchorScroll.slider.line.classList.add('slider-line--transition')
//         anchorScroll.scrollbar.thumb.classList.add('scrollbar-thumb--transition')
//         anchorScroll.slider.line.style.pointerEvents = 'all'

//         rollScroll(anchorScroll)
//     }
// }

// // Инициализируем отдельный слайдер
// function sliderInit(sliderId) {
//     slidersData[sliderId] = {}
//     let anchorScroll = slidersData[sliderId]
//     anchorScroll.global = {}
//     anchorScroll.global.mouseMove = false

//     // присваиваем имя
//     anchorScroll.name = sliderId.split('-')[0]

//     // достаём важные блоки (slider)
//     anchorScroll.slider = {}
//     anchorScroll.slider.elem = document.querySelector(`#${sliderId}`)
//     anchorScroll.slider.items = anchorScroll.slider.elem.querySelectorAll('.slider-item')
//     anchorScroll.slider.line = anchorScroll.slider.elem.querySelector('.slider-line')
//     anchorScroll.slider.viewport = anchorScroll.slider.elem.querySelector('.slider-viewport')
//     anchorScroll.slider.btnPrev = anchorScroll.slider.elem.querySelector('.slider-btn-prev')
//     anchorScroll.slider.btnNext = anchorScroll.slider.elem.querySelector('.slider-btn-next')

//     // достаём важные блоки (scrollbar)
//     anchorScroll.scrollbar = {}
//     anchorScroll.scrollbar.elem = document.querySelector(`#${anchorScroll.name}-scrollbar`)
//     anchorScroll.scrollbar.thumb = document.querySelector('.scrollbar-thumb')

//     // достаём настройки
//     anchorScroll.slider.points = anchorScroll.slider.elem.getAttribute('points') ?
//         JSON.parse(anchorScroll.slider.elem.getAttribute('points')) : {0: 1} ;
//     anchorScroll.slider.drag = anchorScroll.slider.elem.getAttribute('drag') ? 
//         JSON.parse(anchorScroll.slider.elem.getAttribute('drag')) : true ;

//     // вычисляем нужные вычисления
//     sliderUpdate(anchorScroll)

//     // 
//     anchorScroll.slider.line.style.gap = `${anchorScroll.slider.gap}px`
//     anchorScroll.slider.line.classList.add('slider-line--transition')
//     anchorScroll.scrollbar.thumb.classList.add('scrollbar-thumb--transition')

//     // присваиваем все events
//     if (anchorScroll.slider.btnPrev) {anchorScroll.slider.btnPrev.onclick = (e) => {
//         anchorScroll.matrix = anchorScroll.matrix + anchorScroll.slider.widthItem
//         rollScroll(anchorScroll)
//     }}

//     if (anchorScroll.slider.btnNext) {anchorScroll.slider.btnNext.onclick = (e) => {
//         anchorScroll.matrix = anchorScroll.matrix - anchorScroll.slider.widthItem
//         rollScroll(anchorScroll)
//     }}

//     if (anchorScroll.scrollbar.thumb) anchorScroll.scrollbar.thumb.onmousedown = (event) => sliderTouch(event, anchorScroll, false, 'scroll')
//     anchorScroll.scrollbar.thumb.ondragstart = () => { return false }

//     if (anchorScroll.slider.drag) anchorScroll.slider.line.onmousedown = (event) => sliderTouch(event, anchorScroll, true, 'content')
//     anchorScroll.slider.line.ondragstart = () => { return false }

//     onresize = (e) => windowResize(anchorScroll);
// }

// // запускаем инициализацию всех слайдеров
// function allSliderInit () {
//     document.querySelectorAll('.DTScroll').forEach(scroll => {
//         sliderInit(scroll.id)
//     })
// }


// // если нужны модуми, закоментировать
// allSliderInit()



// let elemScrollbar = document.querySelector('#first-scrollbar')
// let elemScrollbarThumb = document.querySelector('#first-scrollbar-thumb')
// let elemContent = document.querySelector('#first-content')
// let elemBlock = document.querySelector('#first-block')

// let scrollClientY = 0
// let scrollDirection = true

// let contentPosition = 0
// let contentPositionMax = 0
// let contentPositionDinamic = 0

// let scrollbarThumbHeight = 0
// let scrollbarScrollMax = 0
// let scrollbarPositionDinamic = 0

// function scrollWheel(event) {
//     contentPosition-=event.deltaY

//     if (contentPosition > 0) {
//         contentPosition = 0
//     } else if (contentPosition < -contentPositionMax) {
//         contentPosition = -contentPositionMax
//     }

//     let scrollWheelAnim = () => {
//         setTimeout(() => {
//             let localScrollPositionDinamic = Math.round(contentPositionDinamic)
//             let localScrollPosition = Math.round(contentPosition)

//             if(localScrollPositionDinamic > localScrollPosition) {
//                 contentPositionDinamic--
//                 scrollWheelAnim()
//             } else if (localScrollPositionDinamic < localScrollPosition) {
//                 contentPositionDinamic++
//                 scrollWheelAnim()
//             }

//             elemScrollbarThumb.style.transform = `translateY(${-(contentPositionDinamic * (scrollbarScrollMax/contentPositionMax))}px)`
//             elemContent.style.transform = `translateY(${contentPositionDinamic}px)`
//         }, 1);
//     }; scrollWheelAnim()
// }

// function initProject() {
//     let contentHeight = (elemContent.offsetHeight + parseInt(window.getComputedStyle(elemBlock).padding, 10)*2)

//     contentPositionMax = contentHeight - elemBlock.offsetHeight

//     let scrollbarHeight = elemScrollbar.offsetHeight
//     scrollbarThumbHeight = (scrollbarHeight/100) * ((elemBlock.offsetHeight*100) / contentHeight)
//     scrollbarScrollMax = scrollbarHeight - scrollbarThumbHeight

//     elemScrollbarThumb.style.height = `${scrollbarThumbHeight}px`
// }

// function updateScroll(event) {
//     scrollClientY = event.clientY
//     event.preventDefault()

//     document.addEventListener('mousemove', onMouseMove)
//     document.addEventListener('mouseup', onMouseUp)
// }

// function onMouseMove(e) {    
//     let scrollDinamic = scrollDirection ? contentPosition + (e.clientY-scrollClientY) : contentPosition - (e.clientY-scrollClientY)*(contentPositionMax/scrollbarScrollMax)
//     if (scrollDinamic > 0) return contentPositionDinamic = 0
//     contentPositionDinamic = -contentPositionMax > scrollDinamic ? -contentPositionMax : scrollDinamic

//     elemScrollbarThumb.style.transform = `translateY(${-(contentPositionDinamic * (scrollbarScrollMax/contentPositionMax))}px)`
//     elemContent.style.transform = `translateY(${contentPositionDinamic}px)`
// }

// function onMouseUp(e) {
//     contentPosition = contentPositionDinamic
//     document.removeEventListener('mousemove', onMouseMove)
//     document.removeEventListener('mouseup', onMouseUp)
// }

// elemScrollbarThumb.onmousedown = (event) => {updateScroll(event); scrollDirection=false}
// elemScrollbarThumb.ondragstart = () => { return false }

// elemContent.onmousedown = (event) => {updateScroll(event); scrollDirection=true}
// elemContent.ondragstart = () => { return false }
// elemContent.onwheel = (event) => scrollWheel(event)




let scrollsData = {}


// function updateScroll(event) {
//     scrollsData[sliderId].global.moveClient = event.clientY
//     event.preventDefault()

//     document.addEventListener('mousemove', onMouseMove)
//     document.addEventListener('mouseup', onMouseUp)
// }

// function onMouseMove(e) {    
//     let scrollDinamic = scrollDirection ? contentPosition + (e.clientY-scrollClientY) : contentPosition - (e.clientY-scrollClientY)*(contentPositionMax/scrollbarScrollMax)
//     if (scrollDinamic > 0) return contentPositionDinamic = 0
//     contentPositionDinamic = -contentPositionMax > scrollDinamic ? -contentPositionMax : scrollDinamic

//     elemScrollbarThumb.style.transform = `translateY(${-(contentPositionDinamic * (scrollbarScrollMax/contentPositionMax))}px)`
//     elemContent.style.transform = `translateY(${contentPositionDinamic}px)`
// }

// function onMouseUp(e) {
//     contentPosition = contentPositionDinamic
//     document.removeEventListener('mousemove', onMouseMove)
//     document.removeEventListener('mouseup', onMouseUp)
// }

// function sliderUpdate(data) {
//     // let localMatrix = data.global.matrix

//     // if (data.global.matrix > 0) localMatrix = 0
//     // if (data.global.matrix < 0) localMatrix = 0

//     // let localLineMove = -localMatrix
//     // let localThimbMove = localMatrix * (data.scroll.scrollMax/data.slider.scrollMax)

//     // if(data.slider.line) {
//     //     data.slider.line.style.transform = data.slider.direction == 'horizontal' ? 
//     //         `translateX(${localLineMove}px)` : 
//     //         `translateY(${localLineMove}px)` ;
//     //     // data.slider.line.style.pointerEvents = 'none'
//     // } else {
//     //     data.slider.content.style.transform = data.slider.direction == 'horizontal' ? 
//     //         `translateX(${localLineMove}px)` : 
//     //         `translateY(${localLineMove}px)` ;
//     //     // data.slider.content.style.pointerEvents = 'none'
//     // }
//     // data.scroll.thumb.style.transform = data.slider.direction == 'horizontal' ? 
//     //     `translateX(${localThimbMove}px)` : 
//     //     `translateY(${localThimbMove}px)` ;
// }

// function sliderTouch(event, data, direction, elem) {
//     event.preventDefault()
//     data.slider.line ? 
//         data.slider.line.classList.remove('slider-line--transition') :
//         data.slider.content.classList.remove('slider-line--transition') ;
//     data.scroll.thumb.classList.remove('scrollbar-thumb--transition')

//     // data.matrix = new WebKitCSSMatrix(window.getComputedStyle(data.slider.line).transform).m41;
//     // let shiftX = event.clientX + (direction ? -data.matrix : data.matrix/data.scrollStep)
//     let shift = direction == "horizontal" ? event.clientX : event.clientY ;
//     let localMove = 0
//     let localMove2 = 0

//     // бери значения translate.

//     document.addEventListener('mousemove', onMouseMove)
//     document.addEventListener('mouseup', onMouseUp)

//     function onMouseMove(e) { 
//         // localMove = data.global.matrix + (shift - (direction == "horizontal" ? e.clientX : e.clientY)) * (elem == 'scroll' ? data.global.step : 1)

//         // let localLineMove = direction ? -localMove  : localMove 
//         // let localThimbMove = direction ? 
//         //     localMove * (data.scroll.scrollMax/data.slider.scrollMax) : 
//         //     -(localMove * (data.scroll.scrollMax/data.slider.scrollMax))

//         // console.log(data.global.matrix);

//         localMove = data.global.matrix + (shift - (direction == "horizontal" ? e.clientX : e.clientY))
//         localMove2 = elem == 'scroll' ? localMove * data.global.step : -localMove ;

//         console.log(localMove);
//         console.log(`data.global.matrix: ${data.global.matrix}`);
//         console.log(localMove2);

//         let localLineMove
//         let localThimbMove

//         if(elem == 'scroll') {
//             localThimbMove = localMove * (elem == 'scroll' ? 1 : data.global.step)
//         } else {
//             localLineMove = -localMove / (elem == 'scroll' ? data.global.step : 1)
//             localThimbMove = localMove * (elem == 'scroll' ? 1 : data.global.step)
//         }

//         if(data.slider.line) {
//             data.slider.line.style.transform = data.slider.direction == 'horizontal' ? 
//                 `translateX(${localLineMove}px)` : 
//                 `translateY(${localLineMove}px)` ;
//             data.slider.line.style.pointerEvents = 'none'
//         } else {
//             data.slider.content.style.transform = data.slider.direction == 'horizontal' ? 
//                 `translateX(${localLineMove}px)` : 
//                 `translateY(${localLineMove}px)` ;
//             data.slider.content.style.pointerEvents = 'none'
//         }
//         data.scroll.thumb.style.transform = data.slider.direction == 'horizontal' ? 
//             `translateX(${localThimbMove}px)` : 
//             `translateY(${localThimbMove}px)` ;
//     }

//     function onMouseUp(e) {
//         document.removeEventListener('mousemove', onMouseMove)
//         document.removeEventListener('mouseup', onMouseUp)

//         data.global.matrix = localMove

//         // localMove < 0 ? data.global.matrix = -localMove : data.global.matrix = localMove

//         if(data.slider.line) {
//             data.slider.line.classList.add('slider-line--transition') 
//             data.slider.line.style.pointerEvents = 'all'
//         } else {
//             data.slider.content.classList.add('slider-line--transition')
//             data.slider.content.style.pointerEvents = 'all'
//         }
//         data.scroll.thumb.classList.add('scrollbar-thumb--transition')

//         sliderUpdate(data)
//         // rollScroll(anchorScroll)
//     }
// }

// function initScroll(sliderId) {
//     // let name = sliderId.split('-')[0]

//     // создаём хранилище
//     scrollsData[sliderId] = {}
//     scrollsData[sliderId].name = sliderId

//     // достаём важные блоки (slider)
//     scrollsData[sliderId].slider = {}
//     let sliderLink = scrollsData[sliderId].slider
//     sliderLink.elem = document.querySelector(`.${sliderId}-slider`)
//     console.log(`${sliderId}-slider`);
//     sliderLink.line = sliderLink.elem.querySelector(`.${sliderId}-line`)
//     if (sliderLink.line) {
//         sliderLink.items = sliderLink.elem.querySelectorAll(`.${sliderId}-item`)
//         sliderLink.viewport = sliderLink.elem.querySelector(`.${sliderId}-viewport`)
//     } else {
//         sliderLink.content = sliderLink.elem.querySelector(`.${sliderId}-item`)
//     }
//     sliderLink.direction = sliderLink.line ?
//         (sliderLink.line.offsetWidth > sliderLink.elem.offsetWidth ? 'horizontal' : 'vertical') :
//         (sliderLink.content.offsetWidth > sliderLink.elem.offsetWidth ? 'horizontal' : 'vertical') ;
//     sliderLink.size = {
//         elem: sliderLink.direction == 'horizontal' ? sliderLink.elem.offsetWidth : sliderLink.elem.offsetHeight,
//         content: (sliderLink.direction == 'horizontal' ?
//             sliderLink.content.offsetWidth : sliderLink.content.offsetHeight) +
//             parseInt(window.getComputedStyle(sliderLink.elem).padding, 10)*2,
//     }
//     sliderLink.scrollMax = sliderLink.size.content - sliderLink.size.elem
//     sliderLink.btnPrev = sliderLink.elem.querySelector(`.${sliderId}-btn-prev`)
//     sliderLink.btnNext = sliderLink.elem.querySelector(`.${sliderId}-btn-next`)

//     // достаём важные блоки (scroll)
//     scrollsData[sliderId].scroll = {}
//     let scrollLink = scrollsData[sliderId].scroll
//     scrollLink.elem = document.querySelector(`.${sliderId}-scroll`)
//     scrollLink.thumb = document.querySelector(`.${sliderId}-thumb`)
//     scrollLink.direction = (scrollLink.elem.offsetWidth > scrollLink.elem.offsetHeight ? 'horizontal' : 'vertical') ;
//     scrollLink.size = {}
//         scrollLink.size.elem = scrollLink.direction == 'horizontal' ? scrollLink.elem.offsetWidth : scrollLink.elem.offsetHeight ;
//         scrollLink.size.thumb = (scrollLink.size.elem/100) * ((sliderLink.size.elem*100) / sliderLink.size.content)
//     scrollLink.scrollMax = scrollLink.size.elem - scrollLink.size.thumb

//     // 
//     scrollLink.direction == 'horizontal' ? 
//         scrollLink.thumb.style.width = `${scrollLink.size.thumb}px` :
//         scrollLink.thumb.style.height = `${scrollLink.size.thumb}px` ;

//     // 
//     scrollsData[sliderId].global = {
//         matrix: 0,
//         step: scrollLink.scrollMax/sliderLink.scrollMax
//     }

//     console.log(scrollsData);


//     //
//     scrollLink.thumb.onmousedown = (event) => { sliderTouch(event, scrollsData[sliderId], false, 'scroll') }
//     scrollLink.thumb.ondragstart = () => { return false }

//     sliderLink.content.onmousedown = (event) => { sliderTouch(event, scrollsData[sliderId], true, 'slider') }
//     sliderLink.content.ondragstart = () => { return false }
//     // sliderLink.content.onwheel = (event) => scrollWheel(event)
// }


// function initScrollAll() {
//     document.querySelectorAll('.DTScroll').forEach((scroll) => {
//         initScroll(scroll.id)
//     })
// }


// window.onload = () => initScrollAll()









function sliderUpdate(data) {
    // let localMatrix = data.global.matrix

    // if (data.global.matrix > 0) localMatrix = 0
    // if (data.global.matrix < 0) localMatrix = 0

    // let localLineMove = -localMatrix
    // let localThimbMove = localMatrix * (data.scroll.scrollMax/data.slider.scrollMax)

    // if(data.slider.line) {
    //     data.slider.line.style.transform = data.slider.direction == 'horizontal' ? 
    //         `translateX(${localLineMove}px)` : 
    //         `translateY(${localLineMove}px)` ;
    //     // data.slider.line.style.pointerEvents = 'none'
    // } else {
    //     data.slider.content.style.transform = data.slider.direction == 'horizontal' ? 
    //         `translateX(${localLineMove}px)` : 
    //         `translateY(${localLineMove}px)` ;
    //     // data.slider.content.style.pointerEvents = 'none'
    // }
    // data.scroll.thumb.style.transform = data.slider.direction == 'horizontal' ? 
    //     `translateX(${localThimbMove}px)` : 
    //     `translateY(${localThimbMove}px)` ;
}

// function sliderTouch(event, data, direction, elem) {
//     event.preventDefault()
//     data.slider.line ? 
//         data.slider.line.classList.remove('slider-line--transition') :
//         data.slider.content.classList.remove('slider-line--transition') ;
//     data.scroll.thumb.classList.remove('scrollbar-thumb--transition')

//     let shift = data[elem].direction == "horizontal" ? event.clientX : event.clientY ;
//     let localLineMove = 0
//     let localThimbMove = 0

//     document.addEventListener('mousemove', onMouseMove)
//     document.addEventListener('mouseup', onMouseUp)

//     function onMouseMove(e) { 
//         let localMove = shift - (data[elem].direction == "horizontal" ? e.clientX : e.clientY)

//         if(elem == 'scroll') {
//             localLineMove = data.slider.move + localMove / data.global.step
//             localThimbMove = data.scroll.move - localMove
//         } else {
//             localLineMove = data.slider.move - localMove
//             localThimbMove = data.scroll.move + localMove * data.global.step
//         }

//         if(data.slider.line) {
//             data.slider.line.style.transform = data.slider.direction == 'horizontal' ? 
//                 `translateX(${localLineMove}px)` : 
//                 `translateY(${localLineMove}px)` ;
//             data.slider.line.style.pointerEvents = 'none'
//         } else {
//             data.slider.content.style.transform = data.slider.direction == 'horizontal' ? 
//                 `translateX(${localLineMove}px)` : 
//                 `translateY(${localLineMove}px)` ;
//             data.slider.content.style.pointerEvents = 'none'
//         }
//         data.scroll.thumb.style.transform = data.scroll.direction == 'horizontal' ? 
//             `translateX(${localThimbMove}px)` : 
//             `translateY(${localThimbMove}px)` ;
//     }

//     function onMouseUp(e) {
//         document.removeEventListener('mousemove', onMouseMove)
//         document.removeEventListener('mouseup', onMouseUp)

//         data.slider.move = localLineMove
//         data.scroll.move = localThimbMove

//         if(data.slider.line) {
//             data.slider.line.classList.add('slider-line--transition') 
//             data.slider.line.style.pointerEvents = 'all'
//         } else {
//             data.slider.content.classList.add('slider-line--transition')
//             data.slider.content.style.pointerEvents = 'all'
//         }
//         data.scroll.thumb.classList.add('scrollbar-thumb--transition')

//         sliderUpdate(data)
//         // rollScroll(anchorScroll)
//     }
// }

// function initScroll(sliderId) {
//     // let name = sliderId.split('-')[0]

//     // создаём хранилище
//     scrollsData[sliderId] = {}
//     scrollsData[sliderId].name = sliderId

//     // достаём важные блоки (slider)
//     scrollsData[sliderId].slider = {}
//     let sliderLink = scrollsData[sliderId].slider
//     sliderLink.elem = document.querySelector(`.${sliderId}-slider`)
//     sliderLink.line = sliderLink.elem.querySelector(`.${sliderId}-line`)
//     if (sliderLink.line) {
//         sliderLink.items = sliderLink.elem.querySelectorAll(`.${sliderId}-item`)
//         sliderLink.viewport = sliderLink.elem.querySelector(`.${sliderId}-viewport`)
//     } else {
//         sliderLink.content = sliderLink.elem.querySelector(`.${sliderId}-item`)
//     }
//     console.log(sliderLink.items);
//     sliderLink.direction = sliderLink.line ?
//         (sliderLink.line.offsetWidth > sliderLink.elem.offsetWidth ? 'horizontal' : 'vertical') :
//         (sliderLink.content.offsetWidth > sliderLink.elem.offsetWidth ? 'horizontal' : 'vertical') ;
//         console.log(sliderLink.direction);
//     sliderLink.size = {
//         elem: sliderLink.direction == 'horizontal' ? sliderLink.elem.offsetWidth : sliderLink.elem.offsetHeight,
//         content: (sliderLink.direction == 'horizontal' ?
//             sliderLink.content.offsetWidth : sliderLink.content.offsetHeight) +
//             parseInt(window.getComputedStyle(sliderLink.elem).padding, 10)*2,
//     }
//     sliderLink.scrollMax = sliderLink.size.content - sliderLink.size.elem
//     sliderLink.btnPrev = sliderLink.elem.querySelector(`.${sliderId}-btn-prev`)
//     sliderLink.btnNext = sliderLink.elem.querySelector(`.${sliderId}-btn-next`)
//     sliderLink.move = 0

//     // достаём важные блоки (scroll)
//     scrollsData[sliderId].scroll = {}
//     let scrollLink = scrollsData[sliderId].scroll
//     scrollLink.elem = document.querySelector(`.${sliderId}-scroll`)
//     scrollLink.thumb = document.querySelector(`.${sliderId}-thumb`)
//     scrollLink.direction = (scrollLink.elem.offsetWidth > scrollLink.elem.offsetHeight ? 'horizontal' : 'vertical') ;
//     scrollLink.size = {}
//         scrollLink.size.elem = scrollLink.direction == 'horizontal' ? scrollLink.elem.offsetWidth : scrollLink.elem.offsetHeight ;
//         scrollLink.size.thumb = (scrollLink.size.elem/100) * ((sliderLink.size.elem*100) / sliderLink.size.content)
//     scrollLink.scrollMax = scrollLink.size.elem - scrollLink.size.thumb
//     scrollLink.move = 0

//     // 
//     scrollLink.direction == 'horizontal' ? 
//         scrollLink.thumb.style.width = `${scrollLink.size.thumb}px` :
//         scrollLink.thumb.style.height = `${scrollLink.size.thumb}px` ;

//     // 
//     scrollsData[sliderId].global = {
//         matrix: 0,
//         step: scrollLink.scrollMax/sliderLink.scrollMax
//     }

//     console.log(scrollsData);


//     //
//     scrollLink.thumb.onmousedown = (event) => { sliderTouch(event, scrollsData[sliderId], false, 'scroll') }
//     scrollLink.thumb.ondragstart = () => { return false }

//     sliderLink.content.onmousedown = (event) => { sliderTouch(event, scrollsData[sliderId], true, 'slider') }
//     sliderLink.content.ondragstart = () => { return false }
//     // sliderLink.content.onwheel = (event) => scrollWheel(event)
// }


// function initScrollAll() {
//     document.querySelectorAll('.DTScroll').forEach((scroll) => {
//         initScroll(scroll.id)
//     })
// }


// window.onload = () => initScrollAll()



// function sliderUpdate(data) {
//     console.log(data);
//     // достаём важные блоки (slider)
//     let sliderLink = data.slider
//     sliderLink.styles = {
//         padding: parseInt(window.getComputedStyle(sliderLink.elem).padding, 10)*2,
//         gap: window.getComputedStyle(sliderLink.line).gap != 'normal' ?
//             parseInt(window.getComputedStyle(sliderLink.line).gap, 10) : 0,
//     }
//     sliderLink.points = sliderLink.elem.getAttribute('points') ? JSON.parse(sliderLink.elem.getAttribute('points')) : false ;
//     if(sliderLink.points) {
//         sliderLink.itemsCount = getItemCount(sliderLink)
//         sliderLink.itemWidth = (
//             sliderLink.elem.offsetWidth - sliderLink.styles.padding - 
//             sliderLink.styles.gap * (sliderLink.itemsCount > 0 ? sliderLink.itemsCount-1 : sliderLink.itemsCount)
//         ) / sliderLink.itemsCount   
//         sliderLink.items.forEach(item => { item.style.width = `${sliderLink.itemWidth}px` });
//     }
//     sliderLink.direction = sliderLink.line.offsetWidth > sliderLink.elem.offsetWidth ? 'horizontal' : 'vertical'
//     sliderLink.size = {
//         elem: sliderLink.direction == 'horizontal' ? sliderLink.elem.offsetWidth : sliderLink.elem.offsetHeight,
//         line: (sliderLink.direction == 'horizontal' ? sliderLink.line.offsetWidth : sliderLink.line.offsetHeight) + sliderLink.styles.padding
//     }
//     sliderLink.scrollMax = sliderLink.size.line - sliderLink.size.elem
//     sliderLink.move = 0

//     // достаём важные блоки (scroll)
//     if(document.querySelector(`.${data.name}-scroll`)) {
//         scrollsData[data.name].scroll = {}
//         let scrollLink = scrollsData[data.name].scroll
//         scrollLink.elem = document.querySelector(`.${data.name}-scroll`)
//         scrollLink.thumb = document.querySelector(`.${data.name}-thumb`)
//         scrollLink.thumb.classList.add('scroll-thumb--transition')
//         scrollLink.direction = (scrollLink.elem.offsetWidth > scrollLink.elem.offsetHeight ? 'horizontal' : 'vertical') ;
//         scrollLink.size = {}
//             scrollLink.size.elem = scrollLink.direction == 'horizontal' ? scrollLink.elem.offsetWidth : scrollLink.elem.offsetHeight ;
//             scrollLink.size.thumb = (scrollLink.size.elem/100) * ((sliderLink.size.elem*100) / sliderLink.size.line)
//         scrollLink.direction == 'horizontal' ? 
//             scrollLink.thumb.style.width = `${scrollLink.size.thumb}px` :
//             scrollLink.thumb.style.height = `${scrollLink.size.thumb}px` ;
//         scrollLink.scrollMax = scrollLink.size.elem - scrollLink.size.thumb
//         scrollLink.move = 0

//         data.global.step = scrollLink.scrollMax/sliderLink.scrollMax
//     } else {scrollsData[data.name].scroll = false}


//     rollScroll(data)
// }

// function scrollWheel(event, data) {
//     event.preventDefault()

//     data.slider.move -= event.deltaY
//     if(data.scroll) data.scroll.move = -data.slider.move * data.global.step

//     rollScroll(data)
// }

// function rollScroll(data) {
//     if( data.slider.move > 0 ) data.slider.move = 0
//     if( data.scroll && data.scroll.move < 0 ) data.scroll.move = 0

//     if( data.slider.move < -data.slider.scrollMax ) data.slider.move = -data.slider.scrollMax
//     if( data.scroll && data.scroll.move > data.scroll.scrollMax ) data.scroll.move = data.scroll.scrollMax

//     data.slider.line.style.transform = data.slider.direction == 'horizontal' ? 
//         `translateX(${data.slider.move}px)` : 
//         `translateY(${data.slider.move}px)` ;
//     if(data.scroll) data.scroll.thumb.style.transform = data.scroll.direction == 'horizontal' ? 
//         `translateX(${data.scroll.move}px)` : 
//         `translateY(${data.scroll.move}px)` ;
// }

// function getItemCount(slider) {
//     let count

//     for (const key in slider.points) {
//         if (!count && window.innerWidth <= key) {
//             count = slider.points[key]
//         }
//     } if (!count) count = slider.points[0]

//     return count <= slider.items.length ? count : slider.items.length
// }

// function sliderTouch(event, data, elem) {
//     event.preventDefault()
//     data.slider.line.classList.remove('slider-line--transition')
//     if(data.scroll) data.scroll.thumb.classList.remove('scroll-thumb--transition')

//     let shift = data[elem].direction == "horizontal" ? event.clientX : event.clientY ;
//     let localLineMove = 0
//     let localThimbMove = 0

//     document.addEventListener('mousemove', onMouseMove)
//     document.addEventListener('mouseup', onMouseUp)

//     function onMouseMove(e) { 
//         let localMove = shift - (data[elem].direction == "horizontal" ? e.clientX : e.clientY)

//         if(elem == 'scroll') {
//             localLineMove = data.slider.move + localMove / data.global.step
//             if(data.scroll) localThimbMove = data.scroll.move - localMove
//         } else {
//             localLineMove = data.slider.move - localMove
//             if(data.scroll) localThimbMove = data.scroll.move + localMove * data.global.step
//         }

//         data.slider.line.style.transform = data.slider.direction == 'horizontal' ? 
//             `translateX(${localLineMove}px)` : 
//             `translateY(${localLineMove}px)` ;
//         if(data.scroll) data.scroll.thumb.style.transform = data.scroll.direction == 'horizontal' ? 
//             `translateX(${localThimbMove}px)` : 
//             `translateY(${localThimbMove}px)` ;
//     }

//     function onMouseUp(e) {
//         document.removeEventListener('mousemove', onMouseMove)
//         document.removeEventListener('mouseup', onMouseUp)

//         data.slider.line.classList.add('slider-line--transition') 
//         data.slider.line.style.pointerEvents = 'all'
//         if(data.scroll) data.scroll.thumb.classList.add('scroll-thumb--transition')

//         data.slider.move = localLineMove
//         if(data.scroll) data.scroll.move = localThimbMove

//         rollScroll(data)
//     }
// }

// function initScroll(sliderId) {
//     // создаём хранилище
//     scrollsData[sliderId] = {}
//     scrollsData[sliderId].name = sliderId
//     scrollsData[sliderId].global = {}

//     // достаём важные блоки (slider)
//     scrollsData[sliderId].slider = {}
//     let sliderLink = scrollsData[sliderId].slider
//     sliderLink.elem = document.querySelector(`.${sliderId}-slider`)
//     sliderLink.line = sliderLink.elem.querySelector(`.${sliderId}-line`)
//     sliderLink.line.classList.add('slider-line--transition')
//     sliderLink.items = sliderLink.elem.querySelectorAll(`.${sliderId}-item`)
//     // sliderLink.styles = {
//     //     padding: parseInt(window.getComputedStyle(sliderLink.elem).padding, 10)*2,
//     //     gap: window.getComputedStyle(sliderLink.line).gap != 'normal' ?
//     //         parseInt(window.getComputedStyle(sliderLink.line).gap, 10) : 0,
//     // }
//     // sliderLink.points = sliderLink.elem.getAttribute('points') ? JSON.parse(sliderLink.elem.getAttribute('points')) : false ;
//     // if(sliderLink.points) {
//     //     sliderLink.itemsCount = getItemCount(sliderLink)
//     //     sliderLink.itemWidth = (
//     //         sliderLink.elem.offsetWidth - sliderLink.styles.padding - 
//     //         sliderLink.styles.gap * (sliderLink.itemsCount > 0 ? sliderLink.itemsCount-1 : sliderLink.itemsCount)
//     //     ) / sliderLink.itemsCount   
//     //     sliderLink.items.forEach(item => { item.style.width = `${sliderLink.itemWidth}px` });
//     // }
//     // sliderLink.direction = sliderLink.line.offsetWidth > sliderLink.elem.offsetWidth ? 'horizontal' : 'vertical'
//     // sliderLink.size = {
//     //     elem: sliderLink.direction == 'horizontal' ? sliderLink.elem.offsetWidth : sliderLink.elem.offsetHeight,
//     //     line: (sliderLink.direction == 'horizontal' ? sliderLink.line.offsetWidth : sliderLink.line.offsetHeight) + sliderLink.styles.padding
//     // }
//     // sliderLink.scrollMax = sliderLink.size.line - sliderLink.size.elem
//     sliderLink.btnPrev = sliderLink.elem.querySelector(`.${sliderId}-btn-prev`)
//     sliderLink.btnNext = sliderLink.elem.querySelector(`.${sliderId}-btn-next`)
//     // sliderLink.move = 0

//     // // достаём важные блоки (scroll)
//     // let scrollLink
//     // if(document.querySelector(`.${sliderId}-scroll`)) {
//     //     scrollsData[sliderId].scroll = {}
//     //     scrollLink = scrollsData[sliderId].scroll
//     //     scrollLink.elem = document.querySelector(`.${sliderId}-scroll`)
//     //     scrollLink.thumb = document.querySelector(`.${sliderId}-thumb`)
//     //     // scrollLink.thumb.classList.add('scroll-thumb--transition')
//     //     // scrollLink.direction = (scrollLink.elem.offsetWidth > scrollLink.elem.offsetHeight ? 'horizontal' : 'vertical') ;
//     //     // scrollLink.size = {}
//     //     //     scrollLink.size.elem = scrollLink.direction == 'horizontal' ? scrollLink.elem.offsetWidth : scrollLink.elem.offsetHeight ;
//     //     //     scrollLink.size.thumb = (scrollLink.size.elem/100) * ((sliderLink.size.elem*100) / sliderLink.size.line)
//     //     // scrollLink.direction == 'horizontal' ? 
//     //     //     scrollLink.thumb.style.width = `${scrollLink.size.thumb}px` :
//     //     //     scrollLink.thumb.style.height = `${scrollLink.size.thumb}px` ;
//     //     // scrollLink.scrollMax = scrollLink.size.elem - scrollLink.size.thumb
//     //     // scrollLink.move = 0

//     //     // scrollsData[sliderId].global = {
//     //     //     step: scrollLink.scrollMax/sliderLink.scrollMax
//     //     // }
//     // } else { scrollsData[sliderId].scroll = false }

//     sliderUpdate(scrollsData[sliderId])

//     // выставляем события
//     if (scrollsData[sliderId].scroll) scrollsData[sliderId].scroll.thumb.onmousedown = (event) => { sliderTouch(event, scrollsData[sliderId], 'scroll') }
//     if (scrollsData[sliderId].scroll) scrollsData[sliderId].scroll.thumb.ondragstart = () => { return false }

//     sliderLink.line.onmousedown = (event) => { sliderTouch(event, scrollsData[sliderId], 'slider') }
//     sliderLink.line.ondragstart = () => { return false }
//     sliderLink.line.onwheel = (event) => scrollWheel(event, scrollsData[sliderId])
// }

// function updateScrollAll() {
//     document.querySelectorAll('.DTScroll').forEach((scroll) => {
//         sliderUpdate(scrollsData[scroll.id])
//     })
// }

// function initScrollAll() {
//     document.querySelectorAll('.DTScroll').forEach((scroll) => {
//         initScroll(scroll.id)
//     })

//     window.onresize = () => {updateScrollAll()}
// }


// window.onload = () => initScrollAll()






// function sliderUpdate(data) {
//     // достаём важные блоки (slider)
//     let sliderLink = data.slider
//     sliderLink.btnPrev = document.querySelector(`.${data.name}-btn-prev`)
//     sliderLink.btnNext = document.querySelector(`.${data.name}-btn-next`)
//     sliderLink.shadowPrev = document.querySelector(`.${data.name}-shadow-prev`)
//     sliderLink.shadowNext = document.querySelector(`.${data.name}-shadow-next`)
//     sliderLink.styles = {
//         padding: parseInt(window.getComputedStyle(sliderLink.elem).padding, 10)*2,
//         gap: window.getComputedStyle(sliderLink.line).gap != 'normal' ?
//             parseInt(window.getComputedStyle(sliderLink.line).gap, 10) : 0,
//     }
//     sliderLink.points = sliderLink.elem.getAttribute('points') ? JSON.parse(sliderLink.elem.getAttribute('points')) : false ;
//     if(sliderLink.points) {
//         sliderLink.itemsCount = getItemCount(sliderLink)
//         sliderLink.itemWidth = (
//             sliderLink.elem.offsetWidth - sliderLink.styles.padding - 
//             sliderLink.styles.gap * (sliderLink.itemsCount > 0 ? sliderLink.itemsCount-1 : sliderLink.itemsCount)
//         ) / sliderLink.itemsCount   
//         sliderLink.items.forEach(item => { item.style.width = `${sliderLink.itemWidth}px` });
//     }
//     sliderLink.direction = sliderLink.line.offsetWidth > sliderLink.elem.offsetWidth ? 'horizontal' : 'vertical'
//     sliderLink.size = {
//         elem: sliderLink.direction == 'horizontal' ? sliderLink.elem.offsetWidth : sliderLink.elem.offsetHeight,
//         line: (sliderLink.direction == 'horizontal' ? sliderLink.line.offsetWidth : sliderLink.line.offsetHeight) + sliderLink.styles.padding
//     }
//     sliderLink.scrollMax = sliderLink.size.line - sliderLink.size.elem
//     sliderLink.move = 0

//     // достаём важные блоки (scroll)
//     if(document.querySelector(`.${data.name}-scroll`)) {
//         scrollsData[data.name].scroll = {}
//         let scrollLink = scrollsData[data.name].scroll
//         scrollLink.elem = document.querySelector(`.${data.name}-scroll`)
//         scrollLink.thumb = document.querySelector(`.${data.name}-thumb`)
//         scrollLink.thumb.classList.add('scroll-thumb--transition')
//         scrollLink.direction = (scrollLink.elem.offsetWidth > scrollLink.elem.offsetHeight ? 'horizontal' : 'vertical') ;
//         scrollLink.size = {}
//             scrollLink.size.elem = scrollLink.direction == 'horizontal' ? scrollLink.elem.offsetWidth : scrollLink.elem.offsetHeight ;
//             scrollLink.size.thumb = (scrollLink.size.elem/100) * ((sliderLink.size.elem*100) / sliderLink.size.line)
//         scrollLink.direction == 'horizontal' ? 
//             scrollLink.thumb.style.width = `${scrollLink.size.thumb}px` :
//             scrollLink.thumb.style.height = `${scrollLink.size.thumb}px` ;
//         scrollLink.scrollMax = scrollLink.size.elem - scrollLink.size.thumb
//         scrollLink.move = 0

//         data.global.step = scrollLink.scrollMax/sliderLink.scrollMax
//     } else {scrollsData[data.name].scroll = false}


//     rollScroll(data)
// }

// function scrollWheel(event, data) {
//     event.preventDefault()

//     data.slider.move -= event.deltaY
//     if(data.scroll) data.scroll.move = -data.slider.move * data.global.step

//     rollScroll(data)
// }

// function scrollButton(data, direction) {
//     event.preventDefault()

//     let localMove = data.slider.elem.offsetWidth - data.slider.styles.padding + 
//         data.slider.styles.gap * (data.slider.itemsCount > 0 ? data.slider.itemsCount-1 : data.slider.itemsCount)

//     direction ? data.slider.move -= localMove : data.slider.move += localMove ;
//     if(data.scroll) data.scroll.move = -data.slider.move * data.global.step

//     rollScroll(data)
// }

// function rollScroll(data) {
//     if( data.slider.move > 0 ) data.slider.move = 0
//     if( data.scroll && data.scroll.move < 0 ) data.scroll.move = 0

//     if( data.slider.move < -data.slider.scrollMax ) data.slider.move = -data.slider.scrollMax
//     if( data.scroll && data.scroll.move > data.scroll.scrollMax ) data.scroll.move = data.scroll.scrollMax

//     if( data.slider.shadowPrev ) data.slider.shadowPrev.style.opacity = 1
//     if( data.slider.shadowPrev && data.slider.move >= 0 ) data.slider.shadowPrev.style.opacity = 0

//     if( data.slider.shadowNext ) data.slider.shadowNext.style.opacity = 1
//     if( data.slider.shadowNext && data.slider.move <= -data.slider.scrollMax ) data.slider.shadowNext.style.opacity = 0

//     data.slider.line.style.transform = data.slider.direction == 'horizontal' ? 
//         `translateX(${data.slider.move}px)` : 
//         `translateY(${data.slider.move}px)` ;
//     if(data.scroll) data.scroll.thumb.style.transform = data.scroll.direction == 'horizontal' ? 
//         `translateX(${data.scroll.move}px)` : 
//         `translateY(${data.scroll.move}px)` ;
// }

// function getItemCount(slider) {
//     let count

//     for (const key in slider.points) {
//         if (!count && window.innerWidth <= key) {
//             count = slider.points[key]
//         }
//     } if (!count) count = slider.points[0]

//     return count <= slider.items.length ? count : slider.items.length
// }

// function sliderTouch(event, data, elem) {
//     event.preventDefault()
//     data.slider.line.classList.remove('slider-line--transition')
//     if(data.scroll) data.scroll.thumb.classList.remove('scroll-thumb--transition')

//     let shift = data[elem].direction == "horizontal" ? event.clientX : event.clientY ;
//     let localLineMove = 0
//     let localThimbMove = 0

//     document.addEventListener('mousemove', onMouseMove)
//     document.addEventListener('mouseup', onMouseUp)

//     function onMouseMove(e) { 
//         let localMove = shift - (data[elem].direction == "horizontal" ? e.clientX : e.clientY)

//         if(elem == 'scroll') {
//             localLineMove = data.slider.move + localMove / data.global.step
//             if(data.scroll) localThimbMove = data.scroll.move - localMove
//         } else {
//             localLineMove = data.slider.move - localMove
//             if(data.scroll) localThimbMove = data.scroll.move + localMove * data.global.step
//         }

//         data.slider.line.style.transform = data.slider.direction == 'horizontal' ? 
//             `translateX(${localLineMove}px)` : 
//             `translateY(${localLineMove}px)` ;
//         if(data.scroll) data.scroll.thumb.style.transform = data.scroll.direction == 'horizontal' ? 
//             `translateX(${localThimbMove}px)` : 
//             `translateY(${localThimbMove}px)` ;
//     }

//     function onMouseUp(e) {
//         document.removeEventListener('mousemove', onMouseMove)
//         document.removeEventListener('mouseup', onMouseUp)

//         data.slider.line.classList.add('slider-line--transition') 
//         data.slider.line.style.pointerEvents = 'all'
//         if(data.scroll) data.scroll.thumb.classList.add('scroll-thumb--transition')

//         data.slider.move = localLineMove
//         if(data.scroll) data.scroll.move = localThimbMove

//         rollScroll(data)
//     }
// }

// function initScroll(sliderId) {
//     // создаём хранилище
//     scrollsData[sliderId] = {}
//     scrollsData[sliderId].name = sliderId
//     scrollsData[sliderId].global = {}

//     // достаём важные блоки (slider)
//     scrollsData[sliderId].slider = {}
//     let sliderLink = scrollsData[sliderId].slider
//     sliderLink.elem = document.querySelector(`.${sliderId}-slider`)
//     sliderLink.line = sliderLink.elem.querySelector(`.${sliderId}-line`)
//     sliderLink.line.classList.add('slider-line--transition')
//     sliderLink.items = sliderLink.elem.querySelectorAll(`.${sliderId}-item`)

//     sliderUpdate(scrollsData[sliderId])

//     // выставляем события
//     if (scrollsData[sliderId].scroll) scrollsData[sliderId].scroll.thumb.onmousedown = (event) => { sliderTouch(event, scrollsData[sliderId], 'scroll') }
//     if (scrollsData[sliderId].scroll) scrollsData[sliderId].scroll.thumb.ondragstart = () => { return false }

//     if (sliderLink.btnPrev) sliderLink.btnPrev.onclick = () => { scrollButton(scrollsData[sliderId], false) }
//     if (sliderLink.btnNext) sliderLink.btnNext.onclick = () => { scrollButton(scrollsData[sliderId], true) }

//     sliderLink.line.onmousedown = (event) => { sliderTouch(event, scrollsData[sliderId], 'slider') }
//     sliderLink.line.ondragstart = () => { return false }
//     sliderLink.line.onwheel = (event) => scrollWheel(event, scrollsData[sliderId])
// }

// function updateScrollAll() {
//     document.querySelectorAll('.DTScroll').forEach((scroll) => {
//         sliderUpdate(scrollsData[scroll.id])
//     })
// }

// function initScrollAll() {
//     document.querySelectorAll('.DTScroll').forEach((scroll) => {
//         initScroll(scroll.id)
//     })

//     window.onresize = () => {updateScrollAll()}
// }





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