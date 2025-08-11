// Global variables
let availableModels = [];
let currentFiles = [];
let conversationHistory = [];

// DOM elements
const elements = {
    themeSelect: null,
    settingsButton: null,
    settingsPanel: null,
    closeSettings: null,
    temperatureSlider: null,
    temperatureValue: null,
    privateCheckbox: null,
    modelSelect: null,
    modelInfo: null,
    chatContainer: null,
    messageInput: null,
    sendButton: null,
    clearButton: null,
    saveButton: null,
    copyLastButton: null,
    fileButton: null,
    fileInput: null,
    filePreview: null,
    statusText: null,
    modelIndicator: null
};

// Initialize extension when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    initializeElements();
    await initializeSettings();
    await loadModels();
    setupEventListeners();
    showStatus('Готов к работе');
});

// Initialize DOM elements
function initializeElements() {
    elements.themeSelect = document.getElementById('theme-select');
    elements.settingsButton = document.getElementById('settings-button');
    elements.settingsPanel = document.getElementById('settings-panel');
    elements.closeSettings = document.getElementById('close-settings');
    elements.temperatureSlider = document.getElementById('temperature-slider');
    elements.temperatureValue = document.getElementById('temperature-value');
    elements.privateCheckbox = document.getElementById('private-checkbox');
    elements.modelSelect = document.getElementById('model-select');
    elements.modelInfo = document.getElementById('model-info');
    elements.chatContainer = document.getElementById('chat-container');
    elements.messageInput = document.getElementById('message-input');
    elements.sendButton = document.getElementById('send-button');
    elements.clearButton = document.getElementById('clear-button');
    elements.saveButton = document.getElementById('save-button');
    elements.copyLastButton = document.getElementById('copy-last-button');
    elements.fileButton = document.getElementById('file-button');
    elements.fileInput = document.getElementById('file-input');
    elements.filePreview = document.getElementById('file-preview');
    elements.statusText = document.getElementById('status-text');
    elements.modelIndicator = document.getElementById('model-indicator');
}

// Initialize settings from storage
async function initializeSettings() {
    try {
        const stored = await chrome.storage.local.get(['theme', 'temperature', 'private', 'selectedModel']);
        
        // Apply theme
        const theme = stored.theme || 'dark';
        document.body.setAttribute('data-theme', theme);
        elements.themeSelect.value = theme;
        
        // Apply temperature
        const temperature = stored.temperature !== undefined ? stored.temperature : 0.7;
        elements.temperatureSlider.value = temperature;
        elements.temperatureValue.textContent = temperature;
        
        // Apply private mode
        const isPrivate = stored.private !== undefined ? stored.private : true;
        elements.privateCheckbox.checked = isPrivate;
        
        // Store selected model for later
        window.selectedModel = stored.selectedModel;
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Load available models from Polination API
async function loadModels() {
    try {
        showStatus('Загрузка моделей...');
        
        const response = await fetch('https://text.pollinations.ai/models');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        availableModels = await response.json();
        populateModelSelect();
        
        showStatus('Модели загружены');
    } catch (error) {
        console.error('Error loading models:', error);
        showStatus('Ошибка загрузки моделей', true);
        
        // Fallback models
        availableModels = [
            { name: 'openai', description: 'OpenAI GPT (Default)', vision: true, tools: true },
            { name: 'claude-hybridspace', description: 'Claude (Vision)', vision: true },
            { name: 'openai-large', description: 'OpenAI Large (Vision)', vision: true }
        ];
        populateModelSelect();
    }
}

// Populate model select dropdown
function populateModelSelect() {
    elements.modelSelect.innerHTML = '';
    
    // Group models by category
    const categories = {
        'Рекомендуемые': [],
        'Текст и Изображения': [],
        'Только текст': [],
        'Аудио': []
    };
    
    availableModels.forEach(model => {
        if (['openai', 'claude-hybridspace', 'openai-large'].includes(model.name)) {
            categories['Рекомендуемые'].push(model);
        } else if (model.vision) {
            categories['Текст и Изображения'].push(model);
        } else if (model.audio) {
            categories['Аудио'].push(model);
        } else {
            categories['Только текст'].push(model);
        }
    });
    
    // Add options by category
    Object.entries(categories).forEach(([category, models]) => {
        if (models.length > 0) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = category;
            
            models.forEach(model => {
                const option = document.createElement('option');
                option.value = model.name;
                option.textContent = `${model.description || model.name}`;
                optgroup.appendChild(option);
            });
            
            elements.modelSelect.appendChild(optgroup);
        }
    });
    
    // Select previously chosen model or default
    if (window.selectedModel && availableModels.some(m => m.name === window.selectedModel)) {
        elements.modelSelect.value = window.selectedModel;
    } else {
        elements.modelSelect.value = 'openai';
    }
    
    updateModelInfo();
}

// Update model info display
function updateModelInfo() {
    const selectedModel = availableModels.find(m => m.name === elements.modelSelect.value);
    if (selectedModel) {
        const features = [];
        if (selectedModel.vision) features.push('👁️ Изображения');
        if (selectedModel.audio) features.push('🎤 Аудио');
        if (selectedModel.tools) features.push('🛠️ Функции');
        if (selectedModel.reasoning) features.push('🧠 Рассуждения');
        
        const tierInfo = selectedModel.tier ? ` (${selectedModel.tier})` : '';
        elements.modelInfo.textContent = `${features.join(' • ')}${tierInfo}`;
        elements.modelIndicator.textContent = selectedModel.name;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Theme selection
    elements.themeSelect.addEventListener('change', function() {
        const theme = this.value;
        document.body.setAttribute('data-theme', theme);
        chrome.storage.local.set({ theme });
    });
    
    // Settings panel
    elements.settingsButton.addEventListener('click', function() {
        const isVisible = elements.settingsPanel.style.display !== 'none';
        elements.settingsPanel.style.display = isVisible ? 'none' : 'block';
    });
    
    elements.closeSettings.addEventListener('click', function() {
        elements.settingsPanel.style.display = 'none';
    });
    
    // Temperature slider
    elements.temperatureSlider.addEventListener('input', function() {
        elements.temperatureValue.textContent = this.value;
        chrome.storage.local.set({ temperature: parseFloat(this.value) });
    });
    
    // Private mode checkbox
    elements.privateCheckbox.addEventListener('change', function() {
        chrome.storage.local.set({ private: this.checked });
    });
    
    // Model selection
    elements.modelSelect.addEventListener('change', function() {
        updateModelInfo();
        chrome.storage.local.set({ selectedModel: this.value });
    });
    
    // Message input and sending
    elements.messageInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });
    
    elements.sendButton.addEventListener('click', sendMessage);
    
    // File upload
    elements.fileButton.addEventListener('click', function() {
        elements.fileInput.click();
    });
    
    elements.fileInput.addEventListener('change', handleFileSelect);
    
    // Action buttons
    elements.clearButton.addEventListener('click', clearChat);
    elements.saveButton.addEventListener('click', saveChat);
    elements.copyLastButton.addEventListener('click', copyLastResponse);
}

// Handle file selection
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
        if (currentFiles.length >= 10) {
            showStatus('Максимум 10 файлов за раз', true);
            return;
        }
        
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            showStatus(`Файл ${file.name} слишком большой (максимум 10MB)`, true);
            return;
        }
        
        currentFiles.push(file);
    });
    
    updateFilePreview();
    elements.fileInput.value = '';
}

// Update file preview
function updateFilePreview() {
    elements.filePreview.innerHTML = '';
    
    currentFiles.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'file-preview-item';
        
        const icon = getFileIcon(file.type);
        const name = file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name;
        
        item.innerHTML = `
            <span>${icon} ${name}</span>
            <button class="remove-file" onclick="removeFile(${index})">×</button>
        `;
        
        elements.filePreview.appendChild(item);
    });
}

// Remove file from current files
function removeFile(index) {
    currentFiles.splice(index, 1);
    updateFilePreview();
}

// Get file icon based on type
function getFileIcon(type) {
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('audio/')) return '🎵';
    if (type.includes('pdf')) return '📄';
    if (type.includes('text') || type.includes('json') || type.includes('javascript')) return '📝';
    return '📎';
}

// Send message to API
async function sendMessage() {
    const message = elements.messageInput.value.trim();
    
    if (!message && currentFiles.length === 0) {
        showStatus('Введите сообщение или выберите файлы', true);
        return;
    }
    
    const selectedModel = elements.modelSelect.value;
    if (!selectedModel) {
        showStatus('Выберите модель AI', true);
        return;
    }
    
    // Disable send button
    elements.sendButton.disabled = true;
    elements.messageInput.disabled = true;
    
    try {
        // Add user message to chat
        if (message) {
            addMessage(message, 'user', currentFiles.slice());
        }
        
        // Prepare message for API
        const messages = await prepareMessages(message);
        
        // Clear input and files
        elements.messageInput.value = '';
        currentFiles = [];
        updateFilePreview();
        
        showStatus('Отправка запроса...');
        
        // Send to Polination API
        await sendToPolination(messages, selectedModel);
        
    } catch (error) {
        console.error('Error sending message:', error);
        addMessage('Произошла ошибка при отправке сообщения: ' + error.message, 'error');
        showStatus('Ошибка отправки', true);
    } finally {
        // Re-enable controls
        elements.sendButton.disabled = false;
        elements.messageInput.disabled = false;
        elements.messageInput.focus();
    }
}

// Prepare messages for API call
async function prepareMessages(userMessage) {
    const messages = [...conversationHistory];
    
    if (userMessage || currentFiles.length > 0) {
        let content = userMessage || '';
        
        // Add file content for text files
        for (const file of currentFiles) {
            try {
                if (file.type.startsWith('text/') || file.name.endsWith('.json') || file.name.endsWith('.md') || file.name.endsWith('.js') || file.name.endsWith('.py')) {
                    const text = await fileToText(file);
                    content += `\n\nСодержимое файла ${file.name}:\n\n${text}`;
                } else if (file.type.startsWith('image/')) {
                    content += `\n\n[Изображение: ${file.name}]`;
                    // For vision models, we'll need to handle images differently
                    // This is a simplified approach for now
                }
            } catch (error) {
                console.error('Error processing file:', file.name, error);
            }
        }
        
        messages.push({
            role: 'user',
            content: content.trim()
        });
    }
    
    return messages;
}

// Send request to Polination API
async function sendToPolination(messages, model) {
    const temperature = parseFloat(elements.temperatureSlider.value);
    const isPrivate = elements.privateCheckbox.checked;
    
    const requestBody = {
        model: model,
        messages: messages,
        temperature: temperature,
        stream: true,
        private: isPrivate
    };
    
    const response = await fetch('https://text.pollinations.ai/openai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // Handle streaming response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';
    
    // Create message element for streaming
    const messageElement = addMessage('', 'bot');
    messageElement.classList.add('streaming');
    
    showStatus('Получение ответа...');
    
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6).trim();
                    
                    if (data === '[DONE]') {
                        break;
                    }
                    
                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta) {
                            const content = parsed.choices[0].delta.content;
                            if (content) {
                                fullResponse += content;
                                updateMessageContent(messageElement, fullResponse);
                            }
                        }
                    } catch (parseError) {
                        // Ignore parsing errors for streaming
                    }
                }
            }
        }
    } catch (streamError) {
        console.error('Streaming error:', streamError);
        if (!fullResponse) {
            throw streamError;
        }
    }
    
    // Update conversation history
    conversationHistory.push(...messages);
    if (fullResponse) {
        conversationHistory.push({
            role: 'assistant',
            content: fullResponse
        });
    }
    
    // Remove streaming indicator
    messageElement.classList.remove('streaming');
    
    showStatus('Ответ получен');
}

// Add message to chat
function addMessage(content, type, files = []) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}-message`;
    
    // Add file attachments if any
    if (files.length > 0) {
        const attachmentsDiv = document.createElement('div');
        files.forEach(file => {
            const attachment = document.createElement('div');
            attachment.className = 'file-attachment';
            
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.className = 'attachment-image';
                img.src = URL.createObjectURL(file);
                img.alt = file.name;
                attachment.appendChild(img);
            } else {
                attachment.innerHTML = `${getFileIcon(file.type)} ${file.name}`;
            }
            
            attachmentsDiv.appendChild(attachment);
        });
        messageElement.appendChild(attachmentsDiv);
    }
    
    // Add text content
    if (content) {
        const textDiv = document.createElement('div');
        textDiv.textContent = content;
        messageElement.appendChild(textDiv);
    }
    
    elements.chatContainer.appendChild(messageElement);
    elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
    
    return messageElement;
}

// Update message content (for streaming)
function updateMessageContent(messageElement, content) {
    const textDiv = messageElement.querySelector('div:last-child') || document.createElement('div');
    textDiv.textContent = content;
    
    if (!messageElement.contains(textDiv)) {
        messageElement.appendChild(textDiv);
    }
    
    elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
}

// Clear chat
function clearChat() {
    if (confirm('Очистить всю историю чата?')) {
        elements.chatContainer.innerHTML = '';
        conversationHistory = [];
        showStatus('Чат очищен');
    }
}

// Save chat to file
function saveChat() {
    const messages = Array.from(elements.chatContainer.querySelectorAll('.message'));
    let chatText = `Polination AI Chat - ${new Date().toLocaleString()}\n\n`;
    
    messages.forEach(message => {
        const type = message.classList.contains('user-message') ? 'Пользователь' : 'AI';
        const content = message.textContent || '';
        chatText += `${type}: ${content}\n\n`;
    });
    
    downloadTextFile(chatText, `polination-chat-${Date.now()}.txt`);
    showStatus('Чат сохранен');
}

// Copy last AI response
function copyLastResponse() {
    const botMessages = elements.chatContainer.querySelectorAll('.bot-message');
    if (botMessages.length > 0) {
        const lastMessage = botMessages[botMessages.length - 1];
        const text = lastMessage.textContent || '';
        
        navigator.clipboard.writeText(text).then(() => {
            showStatus('Ответ скопирован в буфер обмена');
        }).catch(error => {
            console.error('Copy failed:', error);
            showStatus('Ошибка копирования', true);
        });
    } else {
        showStatus('Нет ответов для копирования', true);
    }
}

// Utility functions

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Convert file to text
function fileToText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

// Download text as file
function downloadTextFile(text, filename) {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Show status message
function showStatus(message, isError = false) {
    elements.statusText.textContent = message;
    elements.statusText.style.color = isError ? 'var(--error-color)' : 'var(--text-secondary)';
    
    if (isError) {
        setTimeout(() => {
            elements.statusText.textContent = 'Готов к работе';
            elements.statusText.style.color = 'var(--text-secondary)';
        }, 3000);
    }
}

// Make removeFile function global for HTML onclick
window.removeFile = removeFile;
