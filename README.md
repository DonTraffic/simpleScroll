# Scroll.DonTraffic
## Может использоваться для слайдера и скрола

----------------------

### Установка и использование

Для **import** в проект, использовать скрипт, который лежит в корне  
Для **Подключения через script** использовать файл, который лежит в папке preview/script/DTScroll.js  

.**DTScroll** -- инициализатор блока с id  

### *Объявления:*  
#***slider-id*** -- имени слайдера и его компонентов (его имя)  
.***ИМЯ*-slider** -- слайдера (область видимости) (viewport)  
.***ИМЯ*-line** -- области движения  
.***ИМЯ*-item** -- контента  

.***ИМЯ*-scroll** -- области скролбара  
.***ИМЯ*-thumb** -- области трекера скролбара  

.***ИМЯ*-shadow** -- блок появляющийся при наличии возможности прокрутки в ту или иную сторону (рассчитан для тени, но можно использовать как блок для контента)  
    &emsp; **-prev** -- для начала  
    &emsp; **-next** -- для конца  
.***ИМЯ*-btn** -- кнопки  
    &emsp; **-prev** -- для начала  
    &emsp; **-next** -- для конца  


```
    <div 
        id="slider-id" 
        class="DTScroll slider-id-slider slider-id-slider--0"
        points='{"0":1.5, "768": 1}' // можно убрать
        direction="vertical" // можно убрать но лучше всегда выставлять
        anchor="true" // можно убрать
        revert="false" // можно убрать
    >
        <div class="slider-id-btn-prev"></div>
        <div class="slider-id-shadow-prev"></div>

        <div class="slider-id-line">
            <div class="slider-id-item">
                ...
            </div>
        </div>

        <div class="slider-id-shadow-next"></div>
        <div class="slider-id-btn-next"></div>
    </div>

    <!-- 
        Если нужны дополнительные слайдеры, 
        которые связанны прокруткой с этим слайдером, 
        то они обьявляются вот так: 
    -->
    
    <div 
        class="slider-id-slider slider-id-slider--1"
        points='{"0":1.5, "768": 1}' // можно убрать
        direction="vertical" // можно убрать но лучше всегда выставлять
        anchor="true" // можно убрать
        revert="false" // можно убрать
    >
        <div class="slider-id-btn-prev"></div>
        <div class="slider-id-shadow-prev"></div>

        <div class="slider-id-line">
            <div class="slider-id-item">
                ...
            </div>
        </div>

        <div class="slider-id-shadow-next"></div>
        <div class="slider-id-btn-next"></div>
    </div>

    <div class="slider-id-scroll" direction="vertical" // можно убрать но лучше всегда выставлять>
        <div class="slider-id-thumb"></div>
    </div>
```

### *Атрибуты:*  
**points** -- json с метками веситься на .***ИМЯ*-slider** (ключ == ширине, а значение == количеству item) -- используется для адаптива. Если в ключе передать "0", то оно применится к самой большой ширине. Пример: `points='{"0":3, "450":1.2, "650":1.8, "1150":2.2}'`, если ширина 1440px, то будет 3 item, если 1000 то 2.2  

**direction** -- 'horizontal' или 'vertical' -- определяем направление скрола (можно повесить на .***ИМЯ*-slider** и .***ИМЯ*-scroll**)  

**anchor** -- 'true' или 'false' -- будет ли прокрутка цепляться за блоки (то есть блочная прокрутка) (можно повесить на .***ИМЯ*-slider**, а так же на .***ИМЯ*-scroll**, но вместо **true** нужно писать **id-count** слайдера. Например, если нужно следить за id-slider--0 слайдером, то пишем просто 0)

**revert** -- 'true' или 'fasle' -- прокрутка в другую сторону (можно повесить на .***ИМЯ*-slider**)


### *Важное:*  
В какую сторону будет скролиться элемент, выбирает сам скрипт (`line.height > elem.height ? 'vertical' : 'horizontal'`), так что, его нужно загружать после отрисовки DOM, или же, выставите атрибут `direction='horizontal/vertical'` к .***ИМЯ*-slider**, что бы определить направление слайдера.

Если вы хотите добавить padding, то добавляйте его к .***ИМЯ*-slider**, а если расстояние между items (gap), то к .***ИМЯ*-line**

Обьявите класс .**slider-line--transition** и .**slider-thumb--transition** с **transition**, что бы у вас была плавность анимации. А так же .**slider-btn--disable** вешаеться на неактивные кнопки (Например, но кнопку "прыдыдущий слайд" если мы в самом начале)

**Не баг, а фича. Всё цепляется за слайдер 0, его убирать нельзя**