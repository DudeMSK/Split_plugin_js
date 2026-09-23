(function($) {  
  
  // Конфигурации для создания Split (примеры — замените селекторы на свои
  // или добавьте собственные через $.fn.split_arrow.addConfig(name, config))
  const split_config = {

    // Раздел 1 -> Подраздел 1 (три колонки)
    example_dialog_a: {
      create_panels_split: ['#example_tree_a', '#example_indicators_a', '#example_params_a'],
      sizes: [34, 34, 32],
      expandToMin: true,
      gutterSize: 4,
      minSize: [300, 200, 400]
    },

    // Раздел 1 -> Подраздел 2 (три колонки)
    example_dialog_b: {
      create_panels_split: ['#example_tree_b', '#example_indicators_b', '#example_params_b'],
      sizes: [34, 34, 32],
      expandToMin: true,
      gutterSize: 4,
      minSize: [300, 200, 400]
    },

    // Раздел 2 -> Вкладка A (две колонки со стрелкой)
    example_tab_a: {
      arrowSelector: '#example_arrow_a',
      leftPanelSelector: '#example_tab_a_left',
      rightPanelSelector: '#example_tab_a_right',
      gutterSize: 4,
      offsetX: 20,
      offsetY: -16,
      create_panels_split: ['#example_tab_a_left', '#example_tab_a_right'],
      sizes: [20, 80],
      minSize: 300
    },

    // Раздел 2 -> Вкладка B (две колонки со стрелкой)
    example_tab_b: {
      arrowSelector: '#example_arrow_b',
      leftPanelSelector: '#example_tab_b_left',
      rightPanelSelector: '#example_tab_b_right',
      gutterSize: 4,
      offsetX: 20,
      offsetY: -16,
      create_panels_split: ['#example_tab_b_left', '#example_tab_b_right'],
      sizes: [20, 80],
      minSize: 300
    },

    // Раздел 3 -> Подраздел 1 (две колонки)
    example_list_a: {
      create_panels_split: ['#example_list_a_left', '#example_list_a_right'],
      sizes: [50, 50],
      minSize: 300,
      expandToMin: true,
      gutterSize: 4,
    },

    // Раздел 3 -> Подраздел 2 (две колонки)
    example_list_b: {
      create_panels_split: ['#example_list_b_left', '#example_list_b_right'],
      sizes: [50, 50],
      minSize: 300,
      expandToMin: true,
      gutterSize: 4,
    },

    // Раздел 3 -> Подраздел 3 (вертикальный сплит + вложенный горизонтальный)
    example_nested_a: [
      {
        name: 'vertical_split',
        create_panels_split: ['#example_nested_a_header', '#example_nested_a_body'],
        sizes: [25, 75],
        minSize: [103, 104],
        expandToMin: true,
        gutterSize: 4,
        direction: 'vertical',
        onDrag: function() {
          var bodyHeight = $('#example_nested_a_body').height();
          var searchRowHeight = $('#example_nested_a_body .container-fluid').outerHeight(true);
          var availableHeight = bodyHeight - searchRowHeight;
          $('.example-nested-a-left, .example-nested-a-right').css({
            'height': availableHeight + 'px',
            'overflow-y': 'auto'
          });
        }
      },
      {
        name: 'horizontal_split',
        create_panels_split: ['#example_nested_a_left', '#example_nested_a_right'],
        sizes: [50, 50],
        minSize: 250,
        expandToMin: true,
        gutterSize: 4,
      }
    ],

    // Раздел 3 -> Подраздел 4 (вертикальный сплит + вложенный горизонтальный)
    example_nested_b: [
      {
        name: 'vertical_split',
        create_panels_split: ['#example_nested_b_header', '#example_nested_b_body'],
        sizes: [25, 75],
        minSize: [103, 104],
        expandToMin: true,
        gutterSize: 4,
        direction: 'vertical',
        onDrag: function() {
          var bodyHeight = $('#example_nested_b_body').height();
          var searchRowHeight = $('#example_nested_b_body .container-fluid').outerHeight(true);
          var availableHeight = bodyHeight - searchRowHeight;
          $('.example-nested-b-left, .example-nested-b-right').css({
            'height': availableHeight + 'px',
            'overflow-y': 'auto'
          });
        }
      },
      {
        name: 'horizontal_split',
        create_panels_split: ['#example_nested_b_left', '#example_nested_b_right'],
        sizes: [50, 50],
        minSize: 250,
        expandToMin: true,
        gutterSize: 4
      }
    ],

    // Раздел 3 -> Подраздел 4 -> Модальное окно (две стрелки на одном разделителе)
    example_modal: {
      arrowSelector: ['#example_modal_arrow_top', '#example_modal_arrow_bottom'],
      leftPanelSelector: '#example_modal_left',
      rightPanelSelector: '#example_modal_right',
      gutterSize: 4,
      offsetX: [0, 0],    // X-смещение для каждой стрелки
      offsetY: [-80, 200], // Y-смещение для каждой стрелки
      create_panels_split: ['#example_modal_left', '#example_modal_right'],
      sizes: [49, 49],
      minSize: 400
    },

    // Раздел 4 (три панели)
    example_three_panels: {
      gutterSize: 4,
      create_panels_split: ['#example_panel_a', '#example_panel_b', '#example_panel_c'],
      sizes: [30, 50, 20],
      minSize: [400, 400, 400]
    },

    // Раздел 5 -> Подраздел 1 (две колонки со стрелкой)
    example_catalog_a: {
      arrowSelector: '#example_arrow_a',
      leftPanelSelector: '#example_catalog_a_left',
      rightPanelSelector: '#example_catalog_a_right',
      gutterSize: 4,
      create_panels_split: ['#example_catalog_a_left', '#example_catalog_a_right'],
      sizes: [49, 49],
      minSize: 300
    },

    // Раздел 5 -> Подраздел 2 (жёсткое ограничение минимальной ширины в onDrag)
    example_catalog_b: {
      arrowSelector: '#example_arrow_b',
      leftPanelSelector: '#example_catalog_b_left',
      rightPanelSelector: '#example_catalog_b_right',
      gutterSize: 4,
      offsetY: 5,
      create_panels_split: ['#example_catalog_b_left', '#example_catalog_b_right'],
      sizes: [49, 49],
      minSize: 300,
      expandToMin: true,
      onDrag: function() {
        const $left = $('#example_catalog_b_left');
        const $right = $('#example_catalog_b_right');
        const minSize = 300;

        // Принудительно ограничиваем минимальный размер
        if ($left.width() <= minSize) {
          $left.css('min-width', minSize + 'px');
        }
        if ($right.width() <= minSize) {
          $right.css('min-width', minSize + 'px');
        }

        // Обновляем стрелку
        if (this.arrowSelector) {
          updateArrowPosition(this);
        }
      }
    },

    // Раздел 6 (навигация + контент)
    example_preview: {
      create_panels_split: ['#example_preview_nav', '#example_preview_content'],
      gutterSize: 4,
      sizes: [25, 50],
      minSize: [200, 950]
    },

    // Настройки -> Подраздел 1 -> Пункт 1
    example_settings_users: {
      arrowSelector: '#example_users_arrow',
      leftPanelSelector: '#example_users_left',
      rightPanelSelector: '#example_users_right',
      gutterSize: 4,
      offsetY: 70,
      create_panels_split: ['#example_users_left', '#example_users_right'],
      sizes: [50, 50],
      minSize: 400
    },

    // Настройки -> Подраздел 1 -> Пункт 2
    example_settings_roles: {
      arrowSelector: '#example_roles_arrow',
      leftPanelSelector: '#example_roles_left',
      rightPanelSelector: '#example_roles_right',
      gutterSize: 4,
      offsetX: 0,
      offsetY: -30,
      create_panels_split: ['#example_roles_left', '#example_roles_right'],
      sizes: [50, 50],
      minSize: 400
    },

    // Настройки -> Подраздел 2
    example_settings_appearance: {
      create_panels_split: ['#example_appearance_left', '#example_appearance_right'],
      gutterSize: 4,
      sizes: [13, 87],
      minSize: [300, 1700],
    },

    // Настройки -> Подраздел 3
    example_settings_editor: {
      create_panels_split: ['#example_editor_left', '#example_editor_right'],
      gutterSize: 4,
      sizes: [50, 50],
      minSize: [300, 300]
    },

    // Настройки -> Подраздел 4 -> Пункт 1
    example_settings_attributes: {
      create_panels_split: ['#example_attributes_left', '#example_attributes_right'],
      gutterSize: 4,
      sizes: [50, 50],
      minSize: [300, 300]
    },

    // Настройки -> Подраздел 5 -> Пункт 1 (зависимые сплиты: стрелка следует за вертикальным)
    example_builder_blocks: [
      {
        name: 'vertical_split',
        create_panels_split: ['#example_builder_header', '#example_builder_body'],
        sizes: [45, 55],
        minSize: [175, 135],
        expandToMin: true,
        gutterSize: 4,
        direction: 'vertical',
        onDrag: function() {
          var bodyHeight = $('#example_builder_body').height();
          var searchRowHeight = $('#example_builder_body .container-fluid').outerHeight(true);
          var availableHeight = bodyHeight - searchRowHeight;
          $('.example-builder-left, .example-builder-right').css({
            'height': availableHeight + 'px',
            'overflow-y': 'auto'
          });
          // Обновляем стрелки зависимого сплита
          triggerArrowUpdate('example_builder_blocks', 'horizontal_split');
        }
      },
      {
        name: 'horizontal_split',
        arrowSelector: '#example_builder_arrow',
        leftPanelSelector: '#example_builder_left',
        rightPanelSelector: '#example_builder_right',
        gutterSize: 4,
        offsetY: 90,
        create_panels_split: ['#example_builder_left', '#example_builder_right'],
        sizes: [50, 50],
        minSize: [300, 300],
        // Зависимость от вертикального сплита
        dependsOn: 'vertical_split',
        lockArrowToBottomOf: '#example_builder_body'
      },
    ],

    // Настройки -> Подраздел 5 -> Пункт 2 (вертикальный сплит из трёх панелей + горизонтальный)
    example_builder_report: [
      {
        name: 'vertical_split',
        create_panels_split: ['#example_report_top', '#example_report_middle', '#example_report_bottom'],
        sizes: [25, 40, 35],
        expandToMin: true,
        gutterSize: 3,
        minSize: 100,
        direction: 'vertical',
      },
      {
        name: 'horizontal_split',
        create_panels_split: ['#example_report_sidebar', '#example_report_canvas'],
        sizes: [23, 77],
        minSize: [370, 1150],
        expandToMin: true,
        gutterSize: 3,
      },
    ],
  };

  // Глобальные переменные для управления инстансами
  const instances = new Map();
  let debugMode = false;

  // Вспомогательные функции
  // const log = {
  //   info: function(...args) {
  //     if (debugMode) console.log('SplitArrow [INFO]:', ...args);
  //   },
  //   warn: function(...args) {
  //     console.warn('SplitArrow [WARN]:', ...args);
  //   },
  //   error: function(...args) {
  //     console.error('SplitArrow [ERROR]:', ...args);
  //   },
  //   debug: function(...args) {
  //     if (debugMode) console.debug('SplitArrow [DEBUG]:', ...args);
  //   }
  // };

  // Хранилище зависимостей между сплитами
  const splitDependencies = new Map();

  // Функция для вызова обновления стрелок в зависимых сплитах
  const triggerArrowUpdate = function(configName, sourceSplitName) {
    if (!splitDependencies.has(configName)) return;
    
    const dependencies = splitDependencies.get(configName);
    
    // Находим все сплиты, которые зависят от sourceSplitName
    dependencies.forEach(dependentSplit => {
      if (dependentSplit.dependsOn === sourceSplitName) {
        //log.debug(`Обновление стрелок для ${dependentSplit.name}, зависит от ${sourceSplitName}`);
        if (dependentSplit.config.arrowSelector) {
          updateArrowPosition(dependentSplit.config);
        }
      }
    });
  };

  // Функция проверки существования элементов (обновленная для массивов)
  const checkElementsExist = function(selectors) {
    const missing = [];
    
    const checkSelector = function(selector) {
      if (!$(selector).length) {
        missing.push(selector);
      }
    };
    
    if (Array.isArray(selectors)) {
      selectors.forEach(selector => {
        checkSelector(selector);
      });
    } else if (typeof selectors === 'string') {
      checkSelector(selectors);
    }
    
    return missing;
  };

  // Нормализация arrowSelector в массив (новая функция)
  const normalizeArrowSelector = function(arrowSelector) {
    if (!arrowSelector) return [];
    
    if (Array.isArray(arrowSelector)) {
      return arrowSelector;
    } else if (typeof arrowSelector === 'string') {
      return [arrowSelector];
    }
    
    return [];
  };

// Функция для управления видимостью стрелок при наведении на gutter (обновленная)
const ArrowBtnHide = function(config) {
  if (!config.arrowSelector || !config.leftPanelSelector || !config.rightPanelSelector) {
    return false;
  }

  const arrowSelectors = normalizeArrowSelector(config.arrowSelector);
  
  // Изначально скрываем все стрелки
  arrowSelectors.forEach(arrowSelector => {
    const $arrow = $(arrowSelector);
    if ($arrow.length) {
      $arrow.hide();
    }
  });
  
  // Находим gutter между панелями
  const findGutter = function() {
    const $leftPanel = $(config.leftPanelSelector);
    const $rightPanel = $(config.rightPanelSelector);
    
    if (!$leftPanel.length || !$rightPanel.length) {
      return null;
    }
    
    // Ищем gutter разными способами
    const gutter = $leftPanel.next('.gutter').filter(function() {
      return $(this).next().is($rightPanel);
    });
    
    if (gutter.length) return gutter;
    
    // Альтернативный поиск
    return $rightPanel.prev('.gutter').filter(function() {
      return $(this).prev().is($leftPanel);
    });
  };
  
  const $gutter = findGutter();
  
  if (!$gutter || !$gutter.length) {
    //log.warn(`Gutter не найден между панелями: ${config.leftPanelSelector} и ${config.rightPanelSelector}`);
    return false;
  }
  
  // Добавляем title к gutter
  $gutter.attr('title', 'Переместите разделитель для изменения размера блоков');
  
  // Обработчики событий для gutter
  $gutter
    .off('.arrowBtnHide')
    .on('mouseenter.arrowBtnHide', function() {
      arrowSelectors.forEach(arrowSelector => {
        const $arrow = $(arrowSelector);
        if ($arrow.length) {
          $arrow.stop(true, true).fadeIn(300);
          //log.debug(`Стрелка "${arrowSelector}" показана (hover gutter)`);
        }
      });
    })
    .on('mouseleave.arrowBtnHide', function() {
      // Не скрываем стрелки при уходе с gutter - они скроются сами через глобальные обработчики
    });

  //log.info(`Функция ArrowBtnHide активирована для ${arrowSelectors.length} стрелок между ${config.leftPanelSelector} и ${config.rightPanelSelector}`);
  return true;
};

  // Глобальные обработчики для всех gutters (обновленная версия)
  const initializeGlobalGutterHandlers = function() {
    // Удаляем старые обработчики
    $('.box').off('mouseover', '.gutter');
    
    // Собираем ВСЕ возможные стрелки из всех конфигураций
    const allArrowSelectors = [];
    Object.values(split_config).forEach(config => {
      if (config.arrowSelector) {
        const selectors = normalizeArrowSelector(config.arrowSelector);
        allArrowSelectors.push(...selectors);
      }
    });
    
    // Уникализируем селекторы
    const uniqueArrowSelectors = [...new Set(allArrowSelectors)];
    
    // Изначально скрываем все стрелки
    uniqueArrowSelectors.forEach(selector => {
      $(selector).hide();
    });
    
    // Добавляем глобальный обработчик для всех gutters
    $(document).off('mouseenter', '.gutter').on('mouseenter', '.gutter', function() {
      // Добавляем title всем gutters
      $(this).attr('title', 'Переместите разделитель для изменения размера блоков');
      
      // Показываем ВСЕ стрелки из всех конфигураций
      uniqueArrowSelectors.forEach(selector => {
        $(selector).stop(true, true).fadeIn(300);
      });
      
      //log.debug(`Глобальный hover на gutter - показаны ${uniqueArrowSelectors.length} стрелок`);
    });
    
    //log.info(`Глобальные обработчики для gutters инициализированы. Всего стрелок: ${uniqueArrowSelectors.length}`);
  };

  // Функция создания одного split-инстанса (обновленная с учетом зависимостей)
  const createSingleSplit = function(config, configName, splitName) {
    try {
      // Проверяем существование элементов
      const missingElements = checkElementsExist(config.create_panels_split);
      if (missingElements.length > 0) {
        //log.warn(`Не найдены панели: ${missingElements.join(', ')}`);
      }

      // Проверяем стрелки если они есть
      if (config.arrowSelector) {
        const arrowSelectors = normalizeArrowSelector(config.arrowSelector);
        const missingArrows = checkElementsExist(arrowSelectors);
        if (missingArrows.length > 0) {
          //log.warn(`Не найдены стрелки: ${missingArrows.join(', ')}`);
        }
      }

      // Проверяем, что есть как минимум 2 панели
      if (!config.create_panels_split || config.create_panels_split.length < 2) {
        //log.error('Необходимо указать минимум 2 панели');
        return null;
      }

      // Подготавливаем опции для Split.js
      const splitOptions = {
        sizes: config.sizes || [50, 50],
        gutterSize: config.gutterSize || 4,
        expandToMin: config.expandToMin !== undefined ? config.expandToMin : true,
        minSize: config.minSize || 0,
        direction: config.direction || 'horizontal',
        gutter: function(index, direction) {
          const gutter = document.createElement('div');
          gutter.className = `gutter gutter-${direction}`;
          gutter.setAttribute('title', 'Переместите разделитель для изменения размера блоков');
          return gutter;
        },
        onDrag: function() {
          requestAnimationFrame(() => {
            // Вызываем пользовательский onDrag если он есть
            if (config.onDrag && typeof config.onDrag === 'function') {
              config.onDrag();
            }
            
            // Обновляем позиции всех стрелок если они есть
            if (config.arrowSelector && typeof updateArrowPosition === 'function') {
              updateArrowPosition(config);
            }
            // Если этот сплит имеет зависимости, обновляем стрелки зависимых сплитов
            if (configName && splitName && typeof triggerArrowUpdate === 'function') {
              triggerArrowUpdate(configName, splitName);
            }
          });
        },
        onDragEnd: function() {
          setTimeout(() => {
            if (config.arrowSelector && typeof updateArrowPosition === 'function') {
              updateArrowPosition(config);
            }
            // Также обновляем стрелки зависимых сплитов
            if (configName && splitName && typeof triggerArrowUpdate === 'function') {
              triggerArrowUpdate(configName, splitName);
            }
          }, 10);
        }
      };

      //log.debug('Создание Split.js с опциями:', splitOptions);
      
      // Создаем split-инстанс
      const splitInstance = Split(config.create_panels_split, splitOptions);
      
      // Инициализация функционала стрелок
      setTimeout(() => {
        // Обновляем позиции всех стрелок
        if (config.arrowSelector) {
          updateArrowPosition(config);
          
          // Инициализируем показ стрелок при hover
          ArrowBtnHide(config);
        }
        
        // Также добавляем глобальные обработчики для всех gutters
        initializeGlobalGutterHandlers();
      }, 100);

      //log.info(`Split.js создан успешно для панелей: ${config.create_panels_split.join(', ')}`);
      
      return splitInstance;
      
    } catch (error) {
      //log.error('Ошибка создания Split.js:', error);
      return null;
    }
  };

// Функция обновления позиции стрелки (исправленная для массива)
const updateArrowPosition = function(config) {
  if (!config.arrowSelector || !config.leftPanelSelector || !config.rightPanelSelector) {
    return false;
  }

  const arrowSelectors = normalizeArrowSelector(config.arrowSelector);
  
  // Получаем панели
  const $leftPanel = $(config.leftPanelSelector);
  const $rightPanel = $(config.rightPanelSelector);
  
  if (!$leftPanel.length || !$rightPanel.length) {
    //log.warn(`Панели не найдены: ${config.leftPanelSelector} или ${config.rightPanelSelector}`);
    return false;
  }

  try {
    const leftRect = $leftPanel[0].getBoundingClientRect();
    const rightRect = $rightPanel[0].getBoundingClientRect();
    const container = $leftPanel.parent()[0];
    const containerRect = container.getBoundingClientRect();

    const gutterLeft = leftRect.right;
    const gutterRight = rightRect.left;
    const gutterCenterX = (gutterLeft + gutterRight) / 2;
    
    // Используем максимальную высоту из двух панелей
    const visibleHeight = Math.max(leftRect.height, rightRect.height);
    const gutterCenterY = leftRect.top + (visibleHeight / 2);
    
    // Преобразуем offsetX и offsetY в массивы, если они не массивы
    let offsetXArray = [];
    let offsetYArray = [];
    
    if (Array.isArray(config.offsetX)) {
      offsetXArray = config.offsetX;
    } else if (config.offsetX !== undefined) {
      // Если offsetX одно значение - применяем его ко всем стрелкам
      offsetXArray = new Array(arrowSelectors.length).fill(config.offsetX);
    } else {
      offsetXArray = new Array(arrowSelectors.length).fill(0);
    }
    
    if (Array.isArray(config.offsetY)) {
      offsetYArray = config.offsetY;
    } else if (config.offsetY !== undefined) {
      // Если offsetY одно значение - применяем его ко всем стрелкам
      offsetYArray = new Array(arrowSelectors.length).fill(config.offsetY);
    } else {
      offsetYArray = new Array(arrowSelectors.length).fill(0);
    }
    
    // Обрабатываем каждую стрелку
    arrowSelectors.forEach((arrowSelector, index) => {
      const $arrow = $(arrowSelector);
      
      if ($arrow.length) {
        const offsetX = offsetXArray[index] || 0;
        const offsetY = offsetYArray[index] || 0;
        
        // Вычисляем позицию с учетом смещений
        const arrowX = gutterCenterX + offsetX;
        let arrowY = gutterCenterY + offsetY;

        // Ограничение по нижнему краю (если движение стрелок вверх/вниз)
        if (config.lockArrowToBottomOf) {
          const $lockEl = $(config.lockArrowToBottomOf);
          if ($lockEl.length) {
            const lockRect = $lockEl[0].getBoundingClientRect();

            const maxArrowY = lockRect.bottom - 5; // небольшой отступ
            if (arrowY > maxArrowY) {
              arrowY = maxArrowY;
            }
          }
        }
                
        // Преобразуем в относительные координаты
        const relativeX = arrowX - containerRect.left;
        const relativeY = arrowY - containerRect.top;
        
        const leftPercentage = (relativeX / containerRect.width) * 100;
        const topPercentage = (relativeY / containerRect.height) * 100;

        $arrow.css({
          'left': `${leftPercentage}%`,
          'top': `${topPercentage}%`,
          'transform': 'translate(-50%, -50%)',
          'position': 'absolute',
          'z-index': 1000
        });
        
        // log.debug(`Стрелка "${arrowSelector}" обновлена:`, {
        //   index: index,
        //   left: `${leftPercentage.toFixed(2)}%`,
        //   top: `${topPercentage.toFixed(2)}%`,
        //   offsetX: offsetX,
        //   offsetY: offsetY
        // });
      } else {
        //log.warn(`Стрелка "${arrowSelector}" не найдена в DOM`);
      }
    });
    
  } catch (error) {
    //log.error(`Ошибка обновления стрелок:`, error);
  }
  
  return true;
};

  // Основной плагин
  $.fn.split_arrow = function(userOptions) {
    // Инициализируем параметры
    const options = userOptions || {};
    let config = null;
    let configName = '';
    
    // Определяем конфигурацию
    if (typeof options === 'string' && split_config[options]) {
      configName = options;
      config = split_config[configName];
    } 
    else if (options.configName && split_config[options.configName]) {
      configName = options.configName;
      const baseConfig = split_config[configName];
      
      // Если базовая конфигурация - массив (несколько split-инстансов)
      if (Array.isArray(baseConfig)) {
        config = baseConfig.map(item => $.extend(true, {}, item, options));
        delete config.configName;
      } else {
        config = $.extend(true, {}, baseConfig, options);
        delete config.configName;
      }
    }
    else if (typeof options === 'object' && options.create_panels_split) {
      config = $.extend(true, {}, options);
      configName = options.configName || 'custom';
    }
    else {
      // log.error('Конфигурация не указана или не найдена');
      console.log('Доступные конфигурации:', Object.keys(split_config));
      return this;
    }

    // Объект для хранения split-инстансов
    const splitInstances = [];
    
    // Функция инициализации
    const initialize = function() {
      //log.info(`Инициализация конфигурации "${configName}"`);
      
      // Регистрируем зависимости
      splitDependencies.set(configName, []);
      
      // Если конфигурация - массив, создаем несколько split-инстансов
      if (Array.isArray(config)) {
        config.forEach((splitConfig, index) => {
          const splitName = splitConfig.name || `split_${index}`;
          
          //log.debug(`Создание split инстанса ${index + 1}/${config.length}:`, splitName);
          
          // // Регистрируем сплит в системе зависимостей
          splitDependencies.get(configName).push({
            name: splitName,
            config: splitConfig,
            dependsOn: splitConfig.dependsOn
          });
          
          const splitInstance = createSingleSplit(splitConfig, configName, splitName);
          if (splitInstance) {
            splitInstances.push({
              name: splitConfig.name || `split_${index}`, splitName,
              instance: splitInstance,
              config: splitConfig
            });
            
            // Если есть стрелка, обновляем её позицию
            if (splitConfig.arrowSelector) {
              updateArrowPosition(splitConfig);
            }
          }
        });
      } 
      // Если одиночная конфигурация
      else {
        //log.debug('Создание одиночного split инстанса');
        
        const splitName = 'main';
        
        // Регистрируем сплит в системе зависимостей
        splitDependencies.get(configName).push({
          name: splitName,
          config: config,
          dependsOn: config.dependsOn
        });
        
        const splitInstance = createSingleSplit(config, configName, splitName);
        if (splitInstance) {
          splitInstances.push({
            name: splitName,
            instance: splitInstance,
            config: config
          });
          
          // Если есть стрелка, обновляем её позицию
          if (config.arrowSelector) {
            updateArrowPosition(config);
          }
        }
      }
      
      // Обработчик ресайза окна
      const handleResize = function() {
        //log.debug(`Обработка ресайза для "${configName}"`);
        
        splitInstances.forEach(item => {
          if (item.config.arrowSelector) {
            updateArrowPosition(item.config);
          }
        });
      };
      
      $(window).on(`resize.split_arrow_${configName}`, handleResize);
      
      //log.info(`Конфигурация "${configName}" инициализирована. Создано инстансов: ${splitInstances.length}`);
      
      return {
        instances: splitInstances,
        configName: configName,
        config: config
      };
    };

    // Отложенная инициализация
    const initializationResult = initialize();
    
    // Сохраняем в глобальный реестр
    instances.set(configName, {
      element: this,
      result: initializationResult,
      destroy: function() {
        $(window).off(`resize.split_arrow_${configName}`);
        splitDependencies.delete(configName);
        instances.delete(configName);
        //log.info(`Конфигурация "${configName}" уничтожена`);
      }
    });

    // Возвращаем публичный API
    return {
      // Получить инстансы
      getInstances: function() {
        return initializationResult.instances;
      },
      
      // Получить конфигурацию
      getConfig: function() {
        return $.extend(true, {}, config);
      },
      
      // Обновить позицию стрелки
      updateArrows: function() {
        splitInstances.forEach(item => {
          if (item.config.arrowSelector) {
            updateArrowPosition(item.config);
          }
        });
        return this;
      },
      
      // Уничтожить
      destroy: function() {
        const instanceData = instances.get(configName);
        if (instanceData) {
          instanceData.destroy();
        }
        return this;
      },
      
      // Переинициализировать
      reinitialize: function() {
        this.destroy();
        return $(this).split_arrow(userOptions);
      }
    };
  };

  // Статические методы плагина
  $.fn.split_arrow.addConfig = function(name, config) {
    if (name && config) {
      split_config[name] = config;
      //log.info(`Добавлена конфигурация "${name}"`);
    }
    return this;
  };

  $.fn.split_arrow.initializeGlobalHandlers = function() {
    if (typeof initializeGlobalGutterHandlers === 'function') {
      initializeGlobalGutterHandlers();
      //log.info('Глобальные обработчики инициализированы вручную');
    }
    return this;
  };

  // Метод для ручного показа всех стрелок (обновленный)
  $.fn.split_arrow.showAllArrows = function() {
    const allArrowSelectors = [];
    Object.values(split_config).forEach(config => {
      if (config.arrowSelector) {
        const selectors = normalizeArrowSelector(config.arrowSelector);
        allArrowSelectors.push(...selectors);
      }
    });
    
    const uniqueArrowSelectors = [...new Set(allArrowSelectors)];
    
    uniqueArrowSelectors.forEach(selector => {
      $(selector).stop(true, true).fadeIn(300);
    });
    
    //log.debug(`Ручной показ всех ${uniqueArrowSelectors.length} стрелок`);
    return this;
  };

  // Метод для ручного скрытия всех стрелок (обновленный)
  $.fn.split_arrow.hideAllArrows = function() {
    const allArrowSelectors = [];
    Object.values(split_config).forEach(config => {
      if (config.arrowSelector) {
        const selectors = normalizeArrowSelector(config.arrowSelector);
        allArrowSelectors.push(...selectors);
      }
    });
    
    const uniqueArrowSelectors = [...new Set(allArrowSelectors)];
    
    uniqueArrowSelectors.forEach(selector => {
      $(selector).stop(true, true).fadeOut(300);
    });
    
    //log.debug(`Ручное скрытие всех ${uniqueArrowSelectors.length} стрелок`);
    return this;
  };

  $.fn.split_arrow.getConfig = function(name) {
    return split_config[name] ? $.extend(true, {}, split_config[name]) : null;
  };

   $.fn.split_arrow.getAllConfigs = function() {
    return $.extend(true, {}, split_config);
  };

  $.fn.split_arrow.getAvailableConfigs = function() {
    return Object.keys(split_config);
  };

  $.fn.split_arrow.setDebug = function(enabled) {
    debugMode = enabled;
    //log.info(`Режим отладки ${enabled ? 'включен' : 'выключен'}`);
    return this;
  };

  $.fn.split_arrow.getAllInstances = function() {
    const result = {};
    instances.forEach((value, key) => {
      result[key] = value.result;
    });
    return result;
  };

})(jQuery);
