import { Resend } from 'resend';
import { InviteUserEmail } from '../../../email';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { firstName, inviteLink, invitedByUsername } =
    await request.json();
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'cvtqx@protonmail.com',
      subject: 'You are invited to join WeSplit App!',
      react: InviteUserEmail({
        username: firstName,
        inviteLink,
        invitedByUsername,
      }),
    });
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
