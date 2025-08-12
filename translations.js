// Translation system for Polination AI Chat
const translations = {
    en: {
        // Header
        title: "Polination AI Chat",
        
        // Theme options
        darkTheme: "Dark Theme",
        lightTheme: "Light Theme",
        blueTheme: "Blue Theme",
        greenTheme: "Green Theme",
        
        // Settings
        settings: "Settings",
        temperature: "Temperature (creativity)",
        privateMode: "Private mode (don't show in public feed)",
        closeSettings: "Close",
        language: "Language",
        
        // Model section
        modelLabel: "AI Model:",
        loadingModels: "Loading models...",
        
        // Model categories
        recommended: "Recommended",
        textAndImages: "Text and Images", 
        textOnly: "Text Only",
        audio: "Audio",
        
        // Model features
        images: "Images",
        audioFeature: "Audio",
        functions: "Functions",
        reasoning: "Reasoning",
        
        // Input section
        messagePlaceholder: "Enter your question...",
        sendButton: "Send",
        clearChat: "Clear chat",
        saveChat: "Save chat",
        copyLastResponse: "Copy last response",
        uploadFiles: "Upload files or images",
        
        // Status messages
        ready: "Ready to work",
        loadingModelsStatus: "Loading models...",
        modelsLoaded: "Models loaded",
        errorLoadingModels: "Error loading models",
        sendingRequest: "Sending request...",
        receivingResponse: "Receiving response...",
        responseReceived: "Response received",
        chatCleared: "Chat cleared",
        chatSaved: "Chat saved",
        responseCopied: "Response copied to clipboard",
        copyError: "Copy error",
        noResponsesToCopy: "No responses to copy",
        sendError: "Send error",
        
        // Error messages
        enterMessage: "Enter message or select files",
        selectModel: "Select AI model",
        maxFiles: "Maximum 10 files at once",
        fileTooLarge: "File {filename} is too large (maximum 10MB)",
        errorSendingMessage: "Error sending message: ",
        confirmClearChat: "Clear entire chat history?",
        
        // File types
        fileContent: "File content {filename}:",
        imageFile: "Image: {filename}",
        
        // User roles in chat
        user: "User",
        ai: "AI",
        
        // Timeout error
        modelsTimeout: "Models Loading Timeout",
        modelsTimeoutMessage: "Failed to load AI models within 20 seconds. This might be due to network issues or server problems.",
        retryButton: "Retry",
        cancelButton: "Cancel"
    },
    ru: {
        // Header
        title: "Polination AI Chat",
        
        // Theme options
        darkTheme: "Темная тема",
        lightTheme: "Светлая тема", 
        blueTheme: "Синяя тема",
        greenTheme: "Зеленая тема",
        
        // Settings
        settings: "Настройки",
        temperature: "Температура (креативность)",
        privateMode: "Приватный режим (не показывать в публичной ленте)",
        closeSettings: "Закрыть",
        language: "Язык",
        
        // Model section
        modelLabel: "Модель AI:",
        loadingModels: "Загрузка моделей...",
        
        // Model categories
        recommended: "Рекомендуемые",
        textAndImages: "Текст и Изображения",
        textOnly: "Только текст", 
        audio: "Аудио",
        
        // Model features
        images: "Изображения",
        audioFeature: "Аудио",
        functions: "Функции",
        reasoning: "Рассуждения",
        
        // Input section
        messagePlaceholder: "Введите ваш вопрос...",
        sendButton: "Отправить",
        clearChat: "Очистить чат",
        saveChat: "Сохранить чат",
        copyLastResponse: "Копировать последний ответ",
        uploadFiles: "Загрузить файлы или изображения",
        
        // Status messages
        ready: "Готов к работе",
        loadingModelsStatus: "Загрузка моделей...",
        modelsLoaded: "Модели загружены",
        errorLoadingModels: "Ошибка загрузки моделей",
        sendingRequest: "Отправка запроса...",
        receivingResponse: "Получение ответа...",
        responseReceived: "Ответ получен",
        chatCleared: "Чат очищен",
        chatSaved: "Чат сохранен",
        responseCopied: "Ответ скопирован в буфер обмена",
        copyError: "Ошибка копирования",
        noResponsesToCopy: "Нет ответов для копирования",
        sendError: "Ошибка отправки",
        
        // Error messages
        enterMessage: "Введите сообщение или выберите файлы",
        selectModel: "Выберите модель AI",
        maxFiles: "Максимум 10 файлов за раз",
        fileTooLarge: "Файл {filename} слишком большой (максимум 10MB)",
        errorSendingMessage: "Произошла ошибка при отправке сообщения: ",
        confirmClearChat: "Очистить всю историю чата?",
        
        // File types
        fileContent: "Содержимое файла {filename}:",
        imageFile: "Изображение: {filename}",
        
        // User roles in chat
        user: "Пользователь",
        ai: "AI",
        
        // Timeout error
        modelsTimeout: "Таймаут загрузки моделей",
        modelsTimeoutMessage: "Не удалось загрузить модели AI за 20 секунд. Это может быть связано с проблемами сети или сервера.",
        retryButton: "Повторить",
        cancelButton: "Отмена"
    }
};

// Translation helper functions
let currentLanguage = 'en'; // Default to English

function t(key, replacements = {}) {
    let text = translations[currentLanguage]?.[key] || translations.en[key] || key;
    
    // Replace placeholders
    for (const [placeholder, value] of Object.entries(replacements)) {
        text = text.replace(`{${placeholder}}`, value);
    }
    
    return text;
}

function setLanguage(lang) {
    currentLanguage = lang;
    updatePageText();
    localStorage.setItem('polinationChatLanguage', lang);
}

function getStoredLanguage() {
    return localStorage.getItem('polinationChatLanguage') || 'en';
}

function updatePageText() {
    // Update all elements with data-translate attributes
    const translatableElements = document.querySelectorAll('[data-translate]');
    translatableElements.forEach(el => {
        const key = el.getAttribute('data-translate');
        const translatedText = t(key);
        
        if (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && el.hasAttribute('placeholder'))) {
            el.placeholder = translatedText;
        } else if (key === 'temperature') {
            // Special handling for temperature label
            const tempValue = document.getElementById('temperature-value')?.textContent || '0.7';
            el.textContent = `${translatedText}: ${tempValue}`;
        } else {
            el.textContent = translatedText;
        }
    });
    
    // Update title
    const titleElement = document.querySelector('h2');
    if (titleElement) {
        titleElement.textContent = t('title');
    }
    
    // Update status text if it shows the ready message
    const statusElement = document.getElementById('status-text');
    if (statusElement && (statusElement.textContent === 'Ready to work' || statusElement.textContent === 'Готов к работе')) {
        statusElement.textContent = t('ready');
    }
    
    // Update button titles (tooltips)
    const settingsButton = document.getElementById('settings-button');
    if (settingsButton) {
        settingsButton.title = t('settings');
    }
    
    const fileButton = document.getElementById('file-button');
    if (fileButton) {
        fileButton.title = t('uploadFiles');
    }
    
    // Update modal buttons
    const modalRetry = document.getElementById('modal-retry');
    const modalCancel = document.getElementById('modal-cancel');
    if (modalRetry && modalCancel) {
        modalRetry.textContent = t('retryButton');
        modalCancel.textContent = t('cancelButton');
    }
    
    // Update model select loading option if present
    const loadingOption = document.querySelector('[data-translate="loadingModels"]');
    if (loadingOption) {
        loadingOption.textContent = t('loadingModels');
    }
}
