import { registerFormSchema } from '@/schemas/register_form';
import { NextRequest, NextResponse } from 'next/server';

const scriptUrl = process.env.REGISTER_FORM_SCRIPT_URL || '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const z_result = registerFormSchema.safeParse(body);

    if (!z_result.success) {
      return NextResponse.json(
        { status: 'error', message: '' },
        { status: 400 }
      );
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(z_result.data)
    });

    const result = await response.json();
    if (result.status !== 'success') {
      return NextResponse.json(
        { status: 'error', message: result.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { status: 'success', message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}
