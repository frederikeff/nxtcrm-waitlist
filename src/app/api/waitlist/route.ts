// src/app/api/waitlist/route.ts
import { NextResponse } from 'next/server';
import Airtable from 'airtable';
import { Resend } from 'resend';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email address'
      }, { status: 400 });
    }
    
    // Check for existing email
    const existingRecords = await base('Waitlist Database')
      .select({
        filterByFormula: `{Email} = '${email}'`,
        maxRecords: 1
      })
      .firstPage();
    
    if (existingRecords.length > 0) {
      const status = existingRecords[0].get('Status');
      return NextResponse.json({
        success: false,
        message: 'Email already registered',
        status: status
      });
    }
    
    // Create new record with pending status
    await base('Waitlist Database').create({
      'Email': email,
      'Status': 'Pending Confirmation',
      'Join Date': new Date().toISOString().split('T')[0]
    });
    
    // Generate confirmation token and URL
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/confirmed?token=${token}`;
    
    // Send confirmation email
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'NxtCRM.ai <waitlist@mail.nxtcrm.ai>',
      to: email,
      subject: 'Confirm your NxtCRM.ai Waitlist Spot',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #c026d3;">Confirm your NxtCRM.ai Waitlist Spot</h1>
          <p>You're almost there! Click the button below to confirm your spot on the NxtCRM.ai waitlist.</p>
          <a href="${confirmUrl}" style="display: inline-block; background-color: #c026d3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px;">Confirm My Spot</a>
          <p style="margin-top: 30px; color: #666;">If you didn't request to join our waitlist, you can ignore this email.</p>
        </div>
      `
    });
    
    return NextResponse.json({
      success: true,
      message: 'Verification email sent',
      redirect: '/waitlist'  // Updated to point to the new path
    });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}