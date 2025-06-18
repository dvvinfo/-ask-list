# Список задач (Task List)

SPA приложение для управления задачами, созданное на Vue 3 с использованием Vuex и TypeScript.

## Функциональность

- ✅ Просмотр списка задач
- ✅ Добавление новых задач
- ✅ Удаление задач
- ✅ Смена статуса выполнения (выполнено/не выполнено)
- ✅ Фильтрация задач:
  - Все задачи
  - Активные задачи
  - Выполненные задачи
- ✅ Эмуляция API с задержками
- ✅ Адаптивный дизайн

## Технологии

- **Vue 3** - основной фреймворк
- **Vuex 4** - управление состоянием
- **TypeScript** - типизация
- **Vite** - сборщик проекта
- **Vue Router** - маршрутизация

## Структура проекта

```
src/
├── api/
│   └── taskApi.ts          # Эмуляция API для работы с задачами
├── components/
│   ├── ui/                 # Базовые UI компоненты
│   │   ├── BaseButton.vue
│   │   ├── BaseInput.vue
│   │   ├── BaseCheckbox.vue
│   │   └── index.ts
│   ├── TaskItem.vue        # Компонент отдельной задачи
│   ├── AddTask.vue         # Компонент добавления задачи
│   ├── TaskFilters.vue     # Компонент фильтров
│   └── TaskList.vue        # Основной компонент списка задач
├── store/
│   ├── index.ts            # Основной store
│   └── modules/
│       └── task.ts         # Модуль для управления задачами
├── types/
│   └── task.ts             # Типы для задач
├── views/
│   └── HomeView.vue        # Главная страница
└── main.ts                 # Точка входа приложения
```

## Архитектура

### Vuex Store

- **State**: задачи, состояние загрузки, ошибки, текущий фильтр
- **Mutations**: синхронные изменения состояния
- **Actions**: асинхронные операции с API
- **Getters**: вычисляемые свойства для фильтрации и подсчета

### API Эмуляция

- Использует `Promise` + `setTimeout` для имитации сетевых задержек
- Поддерживает все CRUD операции
- Включает обработку ошибок

### UI Компоненты

- **BaseButton**: переиспользуемая кнопка с различными вариантами
- **BaseInput**: переиспользуемый инпут с валидацией
- **BaseCheckbox**: кастомный чекбокс
- Все компоненты поддерживают TypeScript типизацию

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

## Использование

1. **Добавление задачи**: Введите название в поле ввода и нажмите "Добавить" или Enter
2. **Изменение статуса**: Кликните на чекбокс рядом с задачей
3. **Удаление задачи**: Нажмите кнопку "✕" справа от задачи
4. **Фильтрация**: Используйте кнопки "Все", "Активные", "Выполненные"

## Особенности реализации

- **Типизация**: Полная поддержка TypeScript
- **Модульность**: Компоненты разделены на логические блоки
- **Переиспользование**: UI компоненты можно использовать в других частях приложения
- **Производительность**: Используется Composition API Vue 3
- **UX**: Плавные анимации и отзывчивый интерфейс
- **CSS переменные**: Все цвета вынесены в CSS переменные для легкого изменения дизайна

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
