import { NextResponse } from 'next/server';
import { processMessage } from '../../lib/conversation-engine';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message: string = body?.message ?? '';
    const history: { role: string; text: string }[] = body?.history ?? [];

    if (!message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const result = processMessage(message, history);

    return NextResponse.json({
      reply: result.reply,
      complete: result.complete,
      state: {
        intentId: result.state.intentId,
        stage: result.state.stage,
        data: result.state.data,
      },
    });
  } catch (err) {
    console.error('Assistant API error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
