# jQuery Split Arrow Plugin

<h3> Мощный плагин для jQuery, который расширяет функциональность библиотеки Split.js. Он предоставляет удобный способ создания настраиваемых интерфейсов с изменяемыми размерами панелей (сплиттеров) и добавляет к ним интерактивные элементы управления в виде "плавающих" стрелок. </h3>

<hr>

Плагин идеально подходит для создания сложных многооконных интерфейсов, панелей инструментов и редакторов, где требуется гибкое управление пространством.

<hr>

>🌟 Основные возможности
    
    Готовая система конфигураций: плагин содержит примеры настроек (example_*) для типовых макетов: две и три колонки, вложенные сплиты, несколько стрелок, зависимые сплиты. Их можно взять за основу или добавить свои через $.fn.split_arrow.addConfig().

    Интерактивные стрелки-разделители: Над областью изменения размера (gutter) автоматически появляются стилизованные стрелки (.arrowSelector), которые визуально указывают на возможность перетаскивания.

    Поддержка сложных макетов: Легко создает как простые горизонтальные/вертикальные сплиты, так и их вложенные комбинации (например, вертикальный сплит внутри горизонтального).

    Гибкость и кастомизация: Каждая конфигурация позволяет детально настроить размеры панелей (sizes), минимальные размеры (minSize), направление (direction) и отступы для стрелок (offsetX, offsetY).

    Управление зависимостями: Плагин отслеживает связи между разными сплитами. Например, изменение размера в одной панели может автоматически обновить положение стрелки в зависимой панели.

    Автоматическое управление видимостью стрелок: Стрелки появляются при наведении курсора на разделитель (gutter) и скрываются, когда курсор уходит.

    Простой API: Предоставляет удобные методы для инициализации, обновления, показа/скрытия стрелок и уничтожения экземпляров сплитов.

1. Базовая HTML-структура
Создайте контейнер с панелями, которые хотите разделить. ID панелей должны соответствовать селекторам в вашей конфигурации.

    <section class="d-flex section-div-one">
        <div class="split">
            <div id="one_div">
                <div id="place_div_one" class="div-one place-div-one">
                </div>
            </div>
            <div id="two_div">
                <div id="place_div_two" class="div-two place-div-two">
                </div>
            </div>
            <div id="three_div">
                <div id="place_div_three" class="div-three place-div-three">
                </div>
            </div>
        </div>
    </section>

2. Инициализация плагина
Вызовите плагин на родительском контейнере, передав имя зарегистрированной конфигурации или объект с настройками.
    ```js
    $(document).ready(function() {
        $.fn.split_arrow.addConfig('div_example', {
            create_panels_split: ['#one_div', '#two_div', '#three_div'],
            sizes: [34, 33, 33],
            minSize: 200
        });
        $('.box').split_arrow('div_example');
    });
    ```
3. Плагин использует объект split_config, в котором хранятся все настройки для созданных split элементов.
   Пример структуры конфигурации:
    ```js
    const split_config = {
      // Одиночный сплит
      my_single_split: {
        arrowSelector: '#my_arrow',
        leftPanelSelector: '#panel_left',
        rightPanelSelector: '#panel_right',
        create_panels_split: ['#panel_left', '#panel_right'],
        sizes: [40, 60],
        minSize: 300,
        gutterSize: 4,
        direction: 'horizontal',
        offsetX: 0,
        offsetY: 0,
        onDrag: function() {
          // Пользовательская логика при перетаскивании
        }
      },
    
      // Массив для вложенных сплитов
      my_complex_split: [
        {
          name: 'vertical_split',
          direction: 'vertical',
          create_panels_split: ['#header_panel', '#body_panel'],
          sizes: [25, 75],
          minSize: [100, 200]
        },
        {
          name: 'horizontal_split',
          arrowSelector: '#nested_arrow',
          leftPanelSelector: '#body_left',
          rightPanelSelector: '#body_right',
          create_panels_split: ['#body_left', '#body_right'],
          sizes: [50, 50],
          minSize: 300,
          dependsOn: 'vertical_split' // Зависит от вертикального сплита
        }
      ]
    };
    ```
4. Ключи конфигурации:
   Ключ	Тип	Описание
create_panels_split	Array	(Обязательный) Массив селекторов панелей для разделения.
sizes	Array	Начальные размеры панелей в процентах. Должно соответствовать количеству панелей.
minSize	Number / Array	Минимальный размер панели (в пикселях).
gutterSize	Number	Ширина/высота разделителя в пикселях. По умолчанию 4.
direction	String	Направление разделения: 'horizontal' (по умолчанию) или 'vertical'.
expandToMin	Boolean	Если true, панель будет расширяться до минимального размера при перетаскивании.
arrowSelector	String / Array	Селектор(ы) стрелки(ок). Может быть строкой для одной стрелки или массивом для нескольких.
leftPanelSelector	String	Селектор левой (или верхней) панели, рядом с которой позиционируется стрелка.
rightPanelSelector	String	Селектор правой (или нижней) панели.
offsetX, offsetY	Number / Array	Смещение стрелки по оси X/Y относительно центра разделителя. Для нескольких стрелок можно передать массив значений.
onDrag	Function	Функция, вызываемая во время перетаскивания разделителя.
dependsOn	String	Имя другого сплита, от которого зависит текущий. Изменения в родителе вызовут обновление стрелки в потомке.
lockArrowToBottomOf	String	Селектор элемента, ниже которого стрелка не должна опускаться.

5. Публичный API
   
   > ```js $.fn.split_arrow.addConfig(name, config) ``` — добавить новую конфигурацию в плагин.

   $.fn.split_arrow.showAllArrows() — принудительно показать все стрелки.

   $.fn.split_arrow.hideAllArrows() — принудительно скрыть все стрелки.

   $.fn.split_arrow.getConfig(name) — получить конфигурацию по имени.

   $.fn.split_arrow.getAllConfigs() — получить копию всех конфигураций.

   $.fn.split_arrow.setDebug(boolean) — включить/выключить режим отладки (логи в консоль).

## Установка

```bash
npm install jquery-split-arrow jquery split.js
```

Плагин рассчитан на подключение через `<script>`: перед ним должны быть загружены jQuery и Split.js (глобальные `jQuery`/`$` и `Split`).

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/split.js/dist/split.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-split-arrow/split_arrow.js"></script>
```
