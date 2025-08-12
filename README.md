# Polination AI Chat - Chrome Extension

Расширение для Chrome, которое предоставляет доступ к различным AI моделям через Polination API прямо из боковой панели браузера.

## Особенности

### 🤖 Множество AI моделей
- Динамическая загрузка доступных моделей из Polination API
- Поддержка текстовых, мультимодальных и аудио моделей

### 🎨 Настраиваемые темы оформления
- Темная тема (по умолчанию)
- Светлая тема
- Синяя тема
- Зеленая тема
- Настройки сохраняются в локальном хранилище

### 📁 Загрузка файлов
- Поддержка изображений (JPG, PNG, GIF, WebP)
- Текстовые файлы (TXT, MD, JSON, JS, Python, HTML, CSS)
- PDF файлы
- Аудио файлы
- Ограничение: до 10 файлов, максимум 10MB каждый

### ⚙️ Расширенные настройки
- Регулировка температуры (креативность ответов)
- Приватный режим (не показывать в публичной ленте)
- Потоковые ответы в реальном времени

### 💬 Функции чата
- История разговора
- Сохранение чата в файл
- Копирование последнего ответа
- Очистка истории чата
- Поддержка Shift+Enter для новой строки

## Установка

1. Скачайте или клонируйте этот репозиторий
2. Откройте Chrome и перейдите в `chrome://extensions/`
3. Включите "Режим разработчика" (Developer mode)
4. Нажмите "Загрузить распакованное расширение" (Load unpacked)
5. Выберите папку `Poli_Sidebar`
6. Расширение готово к использованию!

## Использование

### Первый запуск
1. Кликните на иконку расширения в панели инструментов
2. Или используйте боковую панель (Side Panel) в Chrome
3. Дождитесь загрузки доступных моделей
4. Выберите нужную модель AI
5. Начните общение!

### Выбор модели
- **Рекомендуемые**: Лучшие модели для общего использования
- **Текст и Изображения**: Модели с поддержкой анализа изображений
- **Только текст**: Быстрые текстовые модели
- **Аудио**: Модели для работы с аудио

### Загрузка файлов
1. Нажмите кнопку 📎 (скрепка)
2. Выберите файлы для загрузки
3. Просмотрите выбранные файлы
4. Отправьте сообщение с файлами

### Смена темы
1. Выберите тему из выпадающего списка в верхней части
2. Настройки автоматически сохранятся

### Дополнительные настройки
1. Нажмите на ⚙️ для открытия панели настроек
2. Настройте температуру для управления креативностью
3. Включите/выключите приватный режим

## API и Технические детали

### Polination API
Расширение использует Polination API для доступа к различным AI моделям:
- **Endpoint**: `https://text.pollinations.ai/openai`
- **Список моделей**: `https://text.pollinations.ai/models`
- **Формат**: OpenAI-совместимый API

### Поддерживаемые форматы файлов
- **Изображения**: JPG, PNG, GIF, WebP, BMP
- **Текст**: TXT, MD, JSON, JS, PY, HTML, CSS
- **Документы**: PDF
- **Аудио**: MP3, WAV, M4A

### Хранение данных
- Настройки сохраняются в `chrome.storage.local`
- История чата хранится только во время сессии
- Файлы обрабатываются локально и не сохраняются

## Структура файлов

```
Poli_Sidebar/
├── manifest.json       # Манифест расширения
├── popup.html          # Главный интерфейс
├── styles.css          # Стили и темы
├── popup.js            # Основная логика
├── service-worker.js   # Фоновый скрипт
└── README.md           # Документация
```

## Разработка и кастомизация

### Добавление новых тем
1. Откройте `styles.css`
2. Добавьте новый блок `[data-theme="название"]`
3. Определите CSS переменные для цветов
4. Добавьте опцию в `popup.html`

### Модификация интерфейса
- `popup.html` - структура интерфейса
- `styles.css` - внешний вид и темы
- `popup.js` - функциональность

### Добавление новых функций
Основные функции находятся в `popup.js`:
- `sendMessage()` - отправка сообщений
- `loadModels()` - загрузка моделей
- `handleFileSelect()` - обработка файлов

## Устранение неполадок

### Модели не загружаются
- Проверьте интернет-соединение
- Откройте Developer Tools (F12) для просмотра ошибок
- Возможна временная недоступность API

### Файлы не загружаются
- Проверьте размер файла (максимум 10MB)
- Убедитесь, что формат файла поддерживается
- Проверьте количество файлов (максимум 10)

### Расширение не работает
- Убедитесь, что расширение включено в `chrome://extensions/`
- Перезагрузите расширение
- Проверьте разрешения в манифесте

## Лицензия

MIT License - свободно используйте и модифицируйте для личных и коммерческих целей.

## Поддержка

Если у вас есть вопросы или проблемы:
1. Проверьте данную документацию
2. Посмотрите консоль разработчика в браузере
3. Создайте issue с описанием проблемы

---

**Polination AI Chat Extension** - ваш персональный AI-ассистент в браузере!

---

# English Version

# Polination AI Chat - Chrome Extension

A Chrome extension that provides access to various AI models through Polination API directly from the browser's side panel.

## Features

### 🤖 Multiple AI Models
- Dynamic loading of available models from Polination API
- Support for text, multimodal, and audio models

### 🎨 Customizable Themes
- Dark theme (default)
- Light theme
- Blue theme
- Green theme
- Settings saved in local storage

### 📁 File Upload
- Support for images (JPG, PNG, GIF, WebP)
- Text files (TXT, MD, JSON, JS, Python, HTML, CSS)
- PDF files
- Audio files
- Limitation: up to 10 files, maximum 10MB each

### ⚙️ Advanced Settings
- Temperature adjustment (response creativity)
- Private mode (don't show in public feed)
- Real-time streaming responses

### 💬 Chat Functions
- Conversation history
- Save chat to file
- Copy last response
- Clear chat history
- Shift+Enter support for new line

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked extension"
5. Select the `Poli_Sidebar` folder
6. Extension is ready to use!

## Usage

### First Launch
1. Click the extension icon in the toolbar
2. Or use the Side Panel in Chrome
3. Wait for available models to load
4. Select the desired AI model
5. Start chatting!

### Model Selection
- **Recommended**: Best models for general use
- **Text and Images**: Models with image analysis support
- **Text Only**: Fast text-only models
- **Audio**: Models for audio processing

### File Upload
1. Click the 📎 (paperclip) button
2. Select files to upload
3. Review selected files
4. Send message with files

### Theme Change
1. Select theme from dropdown in the top section
2. Settings will be saved automatically

### Additional Settings
1. Click ⚙️ to open settings panel
2. Adjust temperature to control creativity
3. Enable/disable private mode

## API and Technical Details

### Polination API
The extension uses Polination API to access various AI models:
- **Endpoint**: `https://text.pollinations.ai/openai`
- **Models list**: `https://text.pollinations.ai/models`
- **Format**: OpenAI-compatible API

### Supported File Formats
- **Images**: JPG, PNG, GIF, WebP, BMP
- **Text**: TXT, MD, JSON, JS, PY, HTML, CSS
- **Documents**: PDF
- **Audio**: MP3, WAV, M4A

### Data Storage
- Settings saved in `chrome.storage.local`
- Chat history stored only during session
- Files processed locally and not saved

## File Structure

```
Poli_Sidebar/
├── manifest.json       # Extension manifest
├── popup.html          # Main interface
├── styles.css          # Styles and themes
├── popup.js            # Main logic
├── service-worker.js   # Background script
└── README.md           # Documentation
```

## Development and Customization

### Adding New Themes
1. Open `styles.css`
2. Add new `[data-theme="name"]` block
3. Define CSS color variables
4. Add option to `popup.html`

### Interface Modification
- `popup.html` - interface structure
- `styles.css` - appearance and themes
- `popup.js` - functionality

### Adding New Features
Main functions are in `popup.js`:
- `sendMessage()` - sending messages
- `loadModels()` - loading models
- `handleFileSelect()` - file handling

## Troubleshooting

### Models Don't Load
- Check internet connection
- Open Developer Tools (F12) to view errors
- API might be temporarily unavailable

### Files Don't Upload
- Check file size (maximum 10MB)
- Ensure file format is supported
- Check number of files (maximum 10)

### Extension Doesn't Work
- Make sure extension is enabled in `chrome://extensions/`
- Reload the extension
- Check permissions in manifest

## License

MIT License - freely use and modify for personal and commercial purposes.

## Support

If you have questions or issues:
1. Check this documentation
2. Look at the developer console in browser
3. Create an issue with problem description

---

**Polination AI Chat Extension** - your personal AI assistant in the browser!
