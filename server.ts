import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import {
  generateDemoUmeedReply,
  SimpleTurn,
  UMEED_SYSTEM_INSTRUCTION,
} from './src/data/umeedAiKnowledge.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const GEMINI_MODEL = 'gemini-3.8-flash';

function getValidApiKey(): string | null {
  const raw = process.env.GEMINI_API_KEY?.trim();
  if (!raw || raw === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return raw;
}

function createGeminiClient(apiKey: string): GoogleGenAI {
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '256kb' }));

  // Check whether server-side Gemini is configured (never exposes the API key)
  app.get('/api/chat/status', (_req, res) => {
    const configured = Boolean(getValidApiKey());
    res.json({
      configured,
      mode: configured ? 'gemini' : 'demo',
    });
  });

  // Multi-turn UMEED AI Chat Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const rawMessages = Array.isArray(req.body?.messages) ? req.body.messages : [];
      const sanitizedTurns: SimpleTurn[] = rawMessages
        .filter(
          (m: unknown): m is { role: string; content: string } =>
            typeof m === 'object' &&
            m !== null &&
            'role' in m &&
            'content' in m &&
            typeof (m as { content: unknown }).content === 'string'
        )
        .map((m: { role: string; content: string }): SimpleTurn => ({
          role: m.role === 'model' ? 'model' : 'user',
          content: m.content.trim().slice(0, 4000),
        }))
        .filter((m: SimpleTurn) => m.content.length > 0)
        .slice(-24);

      if (sanitizedTurns.length === 0) {
        res.status(400).json({ error: 'Please enter a message to begin.' });
        return;
      }

      const apiKey = getValidApiKey();
      if (!apiKey) {
        const demoReply = generateDemoUmeedReply(sanitizedTurns);
        res.json({
          reply: demoReply,
          mode: 'demo',
        });
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      try {
        const ai = createGeminiClient(apiKey);
        const contents = sanitizedTurns.map((turn) => ({
          role: turn.role,
          parts: [{ text: turn.content }],
        }));

        const response = await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents,
          config: {
            systemInstruction: UMEED_SYSTEM_INSTRUCTION,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            abortSignal: controller.signal,
          },
        });
        clearTimeout(timeoutId);

        const replyText = response.text?.trim();
        if (!replyText) {
          res.json({
            reply: generateDemoUmeedReply(sanitizedTurns),
            mode: 'demo',
          });
          return;
        }

        res.json({
          reply: replyText,
          mode: 'gemini',
        });
      } catch (sdkError: unknown) {
        clearTimeout(timeoutId);
        const errMessage =
          sdkError instanceof Error ? sdkError.message : 'Unable to reach Gemini API.';
        const shouldUseDemoFallback =
          controller.signal.aborted ||
          errMessage.includes('API_KEY_INVALID') ||
          errMessage.includes('PERMISSION_DENIED') ||
          errMessage.includes('API key not valid') ||
          errMessage.includes('fetch failed') ||
          errMessage.includes('abort');

        if (shouldUseDemoFallback) {
          res.json({
            reply: generateDemoUmeedReply(sanitizedTurns),
            mode: 'demo',
            notice:
              'Demo mode active: verify your Gemini API key in Settings > Secrets to enable live AI generation.',
          });
          return;
        }

        res.status(502).json({
          error:
            'UMEED AI encountered a temporary connection issue. Please try again in a moment.',
        });
      }
    } catch {
      res.status(500).json({
        error: 'Unexpected error processing your message.',
      });
    }
  });

  const isProd =
    process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_event === 'start';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`UMEED server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
