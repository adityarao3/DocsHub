import dotenv from 'dotenv';
dotenv.config();

console.log('=== Environment Variable Test ===');
console.log('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
console.log('GEMINI_API_KEY length:', process.env.GEMINI_API_KEY?.length);
console.log('GEMINI_API_KEY starts with:', process.env.GEMINI_API_KEY?.substring(0, 10));
console.log('GEMINI_API_KEY has quotes:', process.env.GEMINI_API_KEY?.includes('"') || process.env.GEMINI_API_KEY?.includes("'"));
console.log('GEMINI_API_KEY has spaces:', process.env.GEMINI_API_KEY?.includes(' '));
console.log('Full key (first 20 chars):', process.env.GEMINI_API_KEY?.substring(0, 20));
