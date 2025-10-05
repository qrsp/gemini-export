// ==UserScript==
// @name         Gemini Export
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add export button to Google Gemini conversations
// @author       qrsp
// @match        https://gemini.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function extractConversationData() {
        const titleElement = document.querySelector('.selected > .conversation-title');
        const modelElement = document.querySelector('.bot-name-text');

        const conversationTitle = titleElement ? titleElement.textContent.trim() : '';
        const modelName = modelElement ? modelElement.textContent.trim() : 'Gemini';

        const conversationContainer = document.querySelectorAll('.conversation-container');
        let conversationText = '';

        if (conversationTitle) {
            conversationText += conversationTitle + '\n\n';
        }

        conversationContainer.forEach((container) => {
            const userQuery = container.querySelector('user-query .query-text');
            if (userQuery) {
                conversationText += '你：\n';
                conversationText += userQuery.textContent.trim() + '\n\n';
            }

            const modelResponse = container.querySelector('model-response .markdown');
            if (modelResponse) {
                conversationText += modelName + ':\n';
                conversationText += modelResponse.textContent.trim() + '\n\n';
                conversationText += '--------------------\n\n';
            }
        });

        let filename;
        if (conversationTitle) {
            filename = `${modelName}-${conversationTitle}.txt`;
        } else {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            filename = `對話紀錄_${timestamp}.txt`;
        }

        // Clean filename (remove invalid characters)
        filename = filename.replace(/[<>:"/\\|?*]/g, '_');

        return {
            content: conversationText,
            filename: filename
        };
    }

    function handleExport() {
        const data = extractConversationData();

        if (!data.content.trim()) {
            alert('找不到任何對話內容可以擷取。');
            return;
        }

        const userFilename = prompt('檔案名稱:', data.filename);
        if (userFilename === null) {
            return; // User cancelled
        }

        const finalFilename = userFilename || data.filename;
        downloadFile(data.content, finalFilename);
    }

    function createExportButton() {
        // Check if button already exists
        if (document.getElementById('gemini-export-btn')) {
            return;
        }

        const button = document.createElement('button');
        button.id = 'gemini-export-btn';
        button.textContent = '匯出';
        button.style.cssText = `
            position: fixed;
            bottom: 0px;
            right: 5px;
            z-index: 10000;
            padding: 5px 10px;
            background-color: #FF8080;
            color: white;
            border: none;
            border-radius: 24px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            font-weight: bold;
        `;

        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#1557b0';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#1a73e8';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        });

        button.addEventListener('click', handleExport);

        document.body.appendChild(button);
    }

    // Set up periodic button injection
    setInterval(createExportButton, 2000);
})();
