import OpenAI from 'openai';

let openaiClient = null;
const getOpenAI = () => {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openaiClient;
};

export const generateAnswer = async (question, documents) => {
  try {
    if (!documents || documents.length === 0) {
      return {
        answer: "You haven't uploaded any documents yet. Please upload documents first to ask questions.",
        references: []
      };
    }

    // Limit context to ~12000 tokens (48000 characters) to stay within model limits
    const MAX_CONTEXT_CHARS = 48000;
    const systemPrompt = `
You are a helpful AI assistant.

Your primary task is to answer questions using ONLY the information provided in the uploaded documents.

IMPORTANT RULES:
1. First, carefully check whether the answer exists in the documents below.
2. If the answer IS found in the documents:
   - Answer clearly and concisely.
   - Base the answer strictly on the document content.
3. If the answer is NOT found in the documents:
   - Clearly state: "The uploaded documents do not contain enough information to answer this."
   - Then, provide a helpful answer using your general knowledge.
   - Explicitly mention that this part of the answer is NOT based on the uploaded documents.
4. Do NOT hallucinate document references.
5. Be accurate, concise, and honest about the source of your answer.

DOCUMENTS:
`;

    let contextText = systemPrompt;
    let remainingChars = MAX_CONTEXT_CHARS - systemPrompt.length - question.length - 200; // Reserve space
    
    const charsPerDoc = Math.floor(remainingChars / documents.length);

    documents.forEach((doc, index) => {
      let docText = doc.extractedText || '';
      if (docText.length > charsPerDoc) {
        docText = docText.substring(0, charsPerDoc) + '... [truncated]';
      }
      contextText += `--- Document ${index + 1}: ${doc.fileName} ---\n`;
      contextText += `${docText}\n\n`;
    });

    contextText += `\nQUESTION: ${question}\n\n`;
    contextText += "ANSWER (based only on the documents above):";

    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: contextText },
        { role: "user", content: question }
      ],
      temperature: 0.3,
      max_tokens: 500
    });

    const answer = completion.choices[0].message.content;

    const references = findReferences(answer, documents);

    return {
      answer: answer.trim(),
      references
    };
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error(`Failed to generate answer: ${error.message}`);
  }
};

const findReferences = (answer, documents) => {
  const references = [];

  if (answer.toLowerCase().includes('do not contain enough information') ||
    answer.toLowerCase().includes('cannot answer') ||
    answer.toLowerCase().includes('not found in the documents')) {
    return references;
  }

  documents.forEach(doc => {
    const words = answer.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    const docText = doc.extractedText.toLowerCase();

    let matchCount = 0;
    words.forEach(word => {
      if (docText.includes(word)) {
        matchCount++;
      }
    });

    if (matchCount > 3) {
      let excerpt = '';
      for (let word of words) {
        const index = docText.indexOf(word);
        if (index !== -1) {
          const start = Math.max(0, index - 50);
          const end = Math.min(doc.extractedText.length, index + 100);
          excerpt = doc.extractedText.substring(start, end).trim();
          if (start > 0) excerpt = '...' + excerpt;
          if (end < doc.extractedText.length) excerpt = excerpt + '...';
          break;
        }
      }

      if (!excerpt && doc.extractedText.length > 0) {
        excerpt = doc.extractedText.substring(0, 150).trim() + '...';
      }

      references.push({
        documentId: doc._id,
        documentName: doc.fileName,
        excerpt: excerpt || 'Relevant content found in this document'
      });
    }
  });

  return references;
};
