import { NextRequest, NextResponse } from 'next/server';

interface ContactBody {
  name: string;
  email: string;
  subject?: string;
  phone?: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactBody = await req.json();
    const { name, email, subject, phone, message } = body;

    const errors: string[] = [];
    if (!name?.trim()) errors.push('Name is required');
    if (!email?.trim()) errors.push('Email is required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Invalid email');
    if (!message?.trim()) errors.push('Message is required');
    else if (message.trim().length < 10) errors.push('Message too short');

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(', ') }, { status: 400 });
    }

    console.log('[Contact]', { name, email, subject, phone, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
