# jQuery Split Arrow

[![npm](https://img.shields.io/npm/v/jquery-split-arrow.svg)](https://www.npmjs.com/package/jquery-split-arrow)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![jQuery](https://img.shields.io/badge/jQuery-%E2%89%A53.0-0769ad.svg)](https://jquery.com/)
[![Split.js](https://img.shields.io/badge/Split.js-%E2%89%A51.6-555.svg)](https://split.js.org/)

jQuery-плагин поверх [Split.js](https://split.js.org/): панели с изменяемыми размерами и «плавающие» стрелки-подсказки над разделителями.

Подходит для многооконных интерфейсов, панелей инструментов и редакторов, где пользователь сам распределяет место между блоками.

---

## Содержание

- [Возможности](#возможности)
- [Установка](#установка)
- [Быстрый старт](#быстрый-старт)
- [Конфигурация](#конфигурация)
- [Параметры](#параметры)
- [API](#api)
- [Встроенные примеры](#встроенные-примеры)
- [Лицензия](#лицензия)

---

## Возможности

| | |
|---|---|
| 🧩 **Именованные конфигурации** | Регистрируйте настройки один раз и подключайте их одной строкой |
| ➡️ **Стрелки-разделители** | Над разделителем (gutter) появляются стрелки, подсказывающие, что его можно тянуть |
| 🗂 **Сложные макеты** | Горизонтальные, вертикальные и вложенные сплиты |
| 🎛 **Гибкая настройка** | Размеры, минимальные размеры, направление, смещения стрелок |
| 🔗 **Зависимые сплиты** | Изменение одного сплита обновляет положение стрелок в другом |
| 👁 **Автопоказ стрелок** | Стрелки появляются при наведении на разделитель |
| 🛠 **Простой API** | Обновление, показ/скрытие стрелок, уничтожение экземпляров |

---

## Установка

### npm

```bash
npm install jquery-split-arrow jquery split.js
```

### CDN

Плагин подключается через `<script>` **после** jQuery и Split.js — он использует глобальные `jQuery` / `$` и `Split`.

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/split.js/dist/split.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-split-arrow/split_arrow.js"></script>
```

---

## Быстрый старт

### 1. Разметка

ID панелей должны совпадать с селекторами в конфигурации.

```html
<div class="box">
  <div class="split">
    <div id="panel_left">Левая панель</div>
    <div id="panel_right">Правая панель</div>
  </div>
  <span id="my_arrow" class="split-arrow">⇔</span>
</div>
```

### 2. Стили

Split.js не задаёт оформление разделителя — добавьте минимальный CSS:

```css
.box   { position: relative; }
.split { display: flex; height: 100%; }

.gutter { background: #e5e7eb; }
.gutter:hover { background: #cbd5e1; }
.gutter-horizontal { cursor: col-resize; }
.gutter-vertical   { cursor: row-resize; }
```

### 3. Инициализация

```js
$(function () {
  $.fn.split_arrow.addConfig('my_split', {
    create_panels_split: ['#panel_left', '#panel_right'],
    sizes: [40, 60],
    minSize: 200,
    arrowSelector: '#my_arrow',
    leftPanelSelector: '#panel_left',
    rightPanelSelector: '#panel_right'
  });

  $('.box').split_arrow('my_split');
});
```

Конфигурацию можно передать и напрямую объектом:

```js
$('.box').split_arrow({
  configName: 'inline_split',
  create_panels_split: ['#panel_left', '#panel_right'],
  sizes: [50, 50]
});
```

---

## Конфигурация

Конфигурация — это объект (один сплит) или массив объектов (несколько связанных сплитов).

<details>
<summary><b>Одиночный сплит</b></summary>

```js
$.fn.split_arrow.addConfig('my_single_split', {
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
  onDrag: function () {
    // Своя логика при перетаскивании
  }
});
```

</details>

<details>
<summary><b>Вложенные и зависимые сплиты</b></summary>

```js
$.fn.split_arrow.addConfig('my_complex_split', [
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
    dependsOn: 'vertical_split',       // стрелка следует за вертикальным сплитом
    lockArrowToBottomOf: '#body_panel' // и не опускается ниже этого блока
  }
]);
```

</details>

<details>
<summary><b>Несколько стрелок на одном разделителе</b></summary>

```js
$.fn.split_arrow.addConfig('two_arrows', {
  arrowSelector: ['#arrow_top', '#arrow_bottom'],
  leftPanelSelector: '#left',
  rightPanelSelector: '#right',
  create_panels_split: ['#left', '#right'],
  offsetX: [0, 0],     // смещение по X для каждой стрелки
  offsetY: [-80, 200], // смещение по Y для каждой стрелки
  sizes: [50, 50],
  minSize: 400
});
```

</details>

---

## Параметры

| Ключ | Тип | По умолчанию | Описание |
|---|---|---|---|
| `create_panels_split` | `string[]` | — | **Обязательный.** Селекторы панелей (минимум две) |
| `sizes` | `number[]` | `[50, 50]` | Начальные размеры панелей в процентах |
| `minSize` | `number \| number[]` | `0` | Минимальный размер панели в пикселях |
| `gutterSize` | `number` | `4` | Толщина разделителя в пикселях |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Направление разделения |
| `expandToMin` | `boolean` | `true` | Растягивать панели до `minSize` при инициализации |
| `arrowSelector` | `string \| string[]` | — | Селектор одной или нескольких стрелок |
| `leftPanelSelector` | `string` | — | Левая (верхняя) панель, рядом с которой ставится стрелка |
| `rightPanelSelector` | `string` | — | Правая (нижняя) панель |
| `offsetX`, `offsetY` | `number \| number[]` | `0` | Смещение стрелки от центра разделителя; массив — для нескольких стрелок |
| `onDrag` | `function` | — | Вызывается во время перетаскивания |
| `name` | `string` | `split_<index>` | Имя сплита внутри массива конфигураций |
| `dependsOn` | `string` | — | Имя сплита, при изменении которого обновляются стрелки текущего |
| `lockArrowToBottomOf` | `string` | — | Селектор блока, ниже которого стрелка не опускается |

> [!NOTE]
> Стрелка показывается, только если заданы все три ключа: `arrowSelector`, `leftPanelSelector` и `rightPanelSelector`.

---

## API

### Экземпляр

`$(el).split_arrow(...)` возвращает объект:

| Метод | Описание |
|---|---|
| `getInstances()` | Созданные экземпляры Split.js |
| `getConfig()` | Копия использованной конфигурации |
| `updateArrows()` | Пересчитать положение стрелок |
| `destroy()` | Снять обработчики и удалить экземпляр из реестра |
| `reinitialize()` | Пересоздать сплит с теми же настройками |

```js
const splitter = $('.box').split_arrow('my_split');

splitter.updateArrows();
splitter.destroy();
```

### Статические методы

| Метод | Описание |
|---|---|
| `$.fn.split_arrow.addConfig(name, config)` | Зарегистрировать конфигурацию |
| `$.fn.split_arrow.getConfig(name)` | Копия конфигурации по имени |
| `$.fn.split_arrow.getAllConfigs()` | Копия всех конфигураций |
| `$.fn.split_arrow.getAvailableConfigs()` | Имена всех конфигураций |
| `$.fn.split_arrow.getAllInstances()` | Все активные экземпляры |
| `$.fn.split_arrow.showAllArrows()` | Показать все стрелки |
| `$.fn.split_arrow.hideAllArrows()` | Скрыть все стрелки |
| `$.fn.split_arrow.initializeGlobalHandlers()` | Заново навесить обработчики наведения на разделители |
| `$.fn.split_arrow.setDebug(enabled)` | Включить или выключить режим отладки |

---

## Встроенные примеры

В плагин уже зарегистрированы конфигурации `example_*` — их можно взять за основу для своих макетов:

| Конфигурация | Что показывает |
|---|---|
| `example_dialog_a`, `example_dialog_b` | Три колонки |
| `example_tab_a`, `example_tab_b` | Две колонки со стрелкой и смещением |
| `example_list_a`, `example_list_b` | Две колонки |
| `example_nested_a`, `example_nested_b` | Вертикальный сплит + вложенный горизонтальный |
| `example_modal` | Две стрелки на одном разделителе |
| `example_three_panels` | Три панели с минимальными размерами |
| `example_catalog_a`, `example_catalog_b` | Стрелка и жёсткое ограничение ширины в `onDrag` |
| `example_preview` | Навигация + контент |
| `example_settings_*` | Типовые двухколоночные экраны настроек |
| `example_builder_blocks` | Зависимые сплиты с `dependsOn` и `lockArrowToBottomOf` |
| `example_builder_report` | Вертикальный сплит из трёх панелей + горизонтальный |

Полный список — `$.fn.split_arrow.getAvailableConfigs()`.

---

## Лицензия

[MIT](LICENSE)
