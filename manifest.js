{
  "manifest_version": 3,
  "name": "Gemini Meet Auto-Notes",
  "version": "1.0",
  "description": "Automatically enables Gemini 'Take notes for me' in Google Meet.",
  "permissions": ["storage"],
  "action": {
    "default_popup": "popup.html"
  },
  "content_scripts": [
    {
      "matches": ["https://meet.google.com/*"],
      "js": ["content.js"]
    }
  ]
}
