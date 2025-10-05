# Gemini Export Userscript

A browser userscript that adds an export button to Google Gemini, allowing you to download your conversation history as formatted text files. Perfect for backing up important AI conversations, research notes, or sharing discussions.

### Install Steps

1. **Install a userscript manager**:
   - [Violentmonkey](https://violentmonkey.github.io/) (recommended)
   - [Tampermonkey](https://www.tampermonkey.net/)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)

2. **Install the userscript**:
   - Click on the [gmini-export.user.js](https://raw.githubusercontent.com/qrsp/gemini-export/refs/heads/main/gmini-export.user.js).
   - Userscript manager will prompt to install.

## 🚀 Usage

1. **Open a Gemini conversation** with content you want to export
2. **Click the "匯出" button** in the bottom-right corner
3. **Customize the filename** in the prompt (optional)
4. **Click OK** to download your conversation as a `.txt` file

### Output Format

```txt
Conversation Title

你:
Your question or message...

Gemini:
AI response content...

--------------------

你:
Another message...

Gemini:
Another response...

--------------------
```

### Filename Examples

- With title: `Gemini-How to learn Python.txt`
- Without title: `對話紀錄_2024-01-15T10-30-00.txt`

## 🐛 Troubleshooting

### Empty or incomplete exports
- Make sure the conversation has loaded completely
- Try scrolling through the entire conversation first
- Check browser console for any error messages

### Filename issues
- Special characters are replaced with underscores
- Very long titles may be truncated by the browser

## Special Thanks

Thanks to the author of [gemini-dialogue-exporter](https://github.com/Minijinai75/gemini-dialogue-exporter) , which helped inspire this project.
