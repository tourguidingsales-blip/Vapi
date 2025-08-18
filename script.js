// Switched to a more reliable CDN (jsdelivr) to avoid CORS/network issues.
import Vapi from 'https://cdn.jsdelivr.net/npm/@vapi-ai/web/dist/vapi.es.js';

// --------------------------------------------------
// -- תצורה --
// --------------------------------------------------
const VAPI_PUBLIC_KEY = 'be2bf62f-dfd9-4397-9c34-9505da60bab9';
const ASSISTANT_ID = 'f5d72134-9229-4e1f-97f3-653b1329c170';
// --------------------------------------------------

const startButton = document.getElementById('startButton');
const endButton = document.getElementById('endButton');
const statusDiv = document.getElementById('status');

// Initialize Vapi
const vapi = new Vapi(VAPI_PUBLIC_KEY);

const updateUIForCallStart = () => {
    startButton.disabled = true;
    endButton.disabled = false;
    statusDiv.textContent = 'סטטוס: השיחה פעילה...';
};

const updateUIForCallEnd = () => {
    startButton.disabled = false;
    endButton.disabled = true;
    statusDiv.textContent = 'סטטוס: השיחה הסתיימה.';
};

// --- Event Listeners for Vapi events ---
vapi.on('call-start', () => {
    console.log('Call has started.');
    updateUIForCallStart();
});

vapi.on('call-end', () => {
    console.log('Call has ended.');
    updateUIForCallEnd();
});

vapi.on('error', (e) => {
    console.error('Vapi error:', e);
    statusDiv.textContent = `שגיאה: ${e.message}`;
    updateUIForCallEnd(); // Reset UI on error
});

// --- Button Click Handlers ---
startButton.addEventListener('click', () => {
    statusDiv.textContent = 'סטטוס: מתחיל שיחה...';
    vapi.start(ASSISTANT_ID);
});

endButton.addEventListener('click', () => {
    statusDiv.textContent = 'סטטוס: מסיים שיחה...';
    vapi.stop();
});
