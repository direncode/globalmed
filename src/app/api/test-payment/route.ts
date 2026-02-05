import { NextRequest, NextResponse } from 'next/server';

// Simulated payment processing for testing/demo purposes
export async function POST(request: NextRequest) {
  try {
    const { amount, donorName, donorEmail, cardNumber } = await request.json();

    // Validate amount
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid donation amount' },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Test card number validation (for demo purposes)
    // 4242424242424242 = success
    // 4000000000000002 = declined
    // Any other = success
    if (cardNumber === '4000000000000002') {
      return NextResponse.json(
        { error: 'Card declined. Please try a different card.' },
        { status: 400 }
      );
    }

    // Generate a fake transaction ID
    const transactionId = `TEST_${Date.now()}_${Math.random().toString(36).substring(7).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      transactionId,
      amount,
      donorName: donorName || 'Anonymous',
      donorEmail: donorEmail || '',
      message: 'Test payment processed successfully!',
      note: 'This is a test transaction. No real payment was processed.',
    });
  } catch (error) {
    console.error('Test payment error:', error);
    return NextResponse.json(
      { error: 'Failed to process test payment' },
      { status: 500 }
    );
  }
}
