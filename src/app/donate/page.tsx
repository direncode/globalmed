'use client';

import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Link from 'next/link';

const PRESET_AMOUNTS = [10, 25, 50, 100, 250];

type PaymentMethod = 'stripe' | 'paypal' | 'test';

export default function DonatePage() {
  const [amount, setAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Test payment form state
  const [testCardNumber, setTestCardNumber] = useState('4242424242424242');
  const [testExpiry, setTestExpiry] = useState('12/28');
  const [testCvc, setTestCvc] = useState('123');
  const [testSuccess, setTestSuccess] = useState<{ transactionId: string; amount: number } | null>(null);

  const effectiveAmount = customAmount ? parseFloat(customAmount) : amount;

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value) {
      setAmount(0);
    }
  };

  // Stripe Payment Handler
  const handleStripePayment = async () => {
    if (!effectiveAmount || effectiveAmount < 1) {
      setError('Please enter a valid donation amount');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: effectiveAmount,
          donorName,
          donorEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Failed to get checkout URL');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  // Test Payment Handler
  const handleTestPayment = async () => {
    if (!effectiveAmount || effectiveAmount < 1) {
      setError('Please enter a valid donation amount');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setTestSuccess(null);

    try {
      const response = await fetch('/api/test-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: effectiveAmount,
          donorName,
          donorEmail,
          cardNumber: testCardNumber.replace(/\s/g, ''),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Test payment failed');
      }

      setTestSuccess({
        transactionId: data.transactionId,
        amount: data.amount,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Test payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#0047bb] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-[#7eb8ff] font-semibold text-sm uppercase tracking-wider mb-4">
              Support Our Mission
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Make a Donation
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Your donation supports ASSADE&apos;s healthcare programs in Guatemala, providing essential
              medical services to over 800 patients monthly.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Amount Selection */}
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-[#0a1628] mb-6">Select Amount</h2>

              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleAmountSelect(preset)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                      amount === preset && !customAmount
                        ? 'bg-[#0047bb] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047bb] focus:border-transparent outline-none"
                />
              </div>

              {effectiveAmount > 0 && (
                <p className="mt-4 text-[#0047bb] font-semibold text-lg">
                  Donation amount: ${effectiveAmount.toFixed(2)}
                </p>
              )}
            </div>

            {/* Donor Information */}
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-[#0a1628] mb-6">Your Information (Optional)</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="donorName"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047bb] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="donorEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="donorEmail"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047bb] focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-[#0a1628] mb-6">Payment Method</h2>

              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-4 rounded-xl border-2 transition-colors ${
                    paymentMethod === 'stripe'
                      ? 'border-[#0047bb] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <svg className="h-8" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M60 12.5C60 8.35 57.75 5 54.15 5C50.55 5 47.85 8.35 47.85 12.5C47.85 17.45 51.15 20 54.75 20C56.55 20 57.9 19.55 58.95 18.95V15.5C57.9 16.1 56.7 16.45 55.2 16.45C53.7 16.45 52.35 15.9 52.2 14H59.95C59.95 13.8 60 13.05 60 12.5ZM52.1 11C52.1 9.55 53.1 8.85 54.15 8.85C55.2 8.85 56.1 9.55 56.1 11H52.1ZM41.4 5C39.9 5 38.85 5.7 38.25 6.2L38.05 5.25H33.85V25L38.35 24.05V18.8C38.95 19.2 39.85 19.85 41.35 19.85C44.4 19.85 47.2 17.35 47.2 12.25C47.2 7.6 44.35 5 41.4 5ZM40.35 16.05C39.35 16.05 38.7 15.7 38.35 15.25V9.8C38.7 9.3 39.4 8.95 40.35 8.95C42 8.95 43.1 10.65 43.1 12.5C43.1 14.35 42 16.05 40.35 16.05ZM28.8 4.2L33.35 3.25V0L28.8 0.95V4.2ZM33.35 5.25H28.8V19.6H33.35V5.25ZM24.25 6.5L23.95 5.25H19.85V19.6H24.35V9.65C25.35 8.4 27.15 8.65 27.75 8.85V5.25C27.1 5 25.25 4.65 24.25 6.5ZM15.25 1.6L10.85 2.5L10.85 15.85C10.85 18.2 12.6 20 14.95 20C16.25 20 17.2 19.75 17.75 19.45V16.05C17.2 16.25 15.25 16.8 15.25 14.45V9H17.75V5.25H15.25V1.6ZM4.5 9.8C4.5 9.05 5.1 8.75 6.15 8.75C7.65 8.75 9.55 9.2 11.05 10V5.7C9.4 5.05 7.8 4.85 6.15 4.85C2.45 4.85 0 6.8 0 9.95C0 14.95 6.9 14.2 6.9 16.35C6.9 17.25 6.1 17.55 5 17.55C3.35 17.55 1.25 16.9 0 16.2V20.55C1.55 21.2 3.15 21.45 5 21.45C8.8 21.45 11.4 19.55 11.4 16.35C11.4 10.9 4.5 11.8 4.5 9.8Z" fill="#6772E5"/>
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Credit Card</p>
                  <p className="text-xs text-gray-500">Powered by Stripe</p>
                </button>

                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 rounded-xl border-2 transition-colors ${
                    paymentMethod === 'paypal'
                      ? 'border-[#0047bb] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <svg className="h-8" viewBox="0 0 101 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.237 2.4H4.437C3.937 2.4 3.487 2.78 3.407 3.27L0.017 22.53C-0.043 22.89 0.227 23.21 0.597 23.21H4.317C4.817 23.21 5.267 22.83 5.347 22.34L6.177 17.12C6.257 16.63 6.707 16.25 7.207 16.25H9.567C14.457 16.25 17.287 13.89 18.027 9.19C18.367 7.13 18.047 5.52 17.077 4.38C16.007 3.12 14.287 2.4 12.237 2.4ZM13.117 9.48C12.707 12.21 10.617 12.21 8.597 12.21H7.447L8.207 7.35C8.257 7.02 8.537 6.78 8.877 6.78H9.407C10.777 6.78 12.077 6.78 12.747 7.56C13.147 8.03 13.267 8.65 13.117 9.48Z" fill="#253B80"/>
                      <path d="M35.917 9.38H32.187C31.847 9.38 31.567 9.62 31.517 9.95L31.347 11.03L31.077 10.64C30.237 9.42 28.407 9.01 26.577 9.01C22.377 9.01 18.807 12.14 18.097 16.57C17.727 18.78 18.227 20.9 19.467 22.37C20.607 23.73 22.247 24.29 24.187 24.29C27.537 24.29 29.407 22.13 29.407 22.13L29.237 23.2C29.177 23.56 29.447 23.88 29.817 23.88H33.217C33.717 23.88 34.167 23.5 34.247 23.01L36.497 9.96C36.557 9.61 36.287 9.38 35.917 9.38ZM30.487 16.72C30.117 18.87 28.387 20.35 26.207 20.35C25.107 20.35 24.237 20 23.647 19.33C23.067 18.67 22.817 17.73 22.987 16.69C23.327 14.56 25.097 13.03 27.237 13.03C28.317 13.03 29.177 13.39 29.787 14.06C30.387 14.74 30.657 15.69 30.487 16.72Z" fill="#253B80"/>
                      <path d="M55.617 9.38H51.867C51.487 9.38 51.127 9.57 50.907 9.88L45.787 17.39L43.587 10.17C43.447 9.7 43.017 9.38 42.527 9.38H38.837C38.417 9.38 38.127 9.79 38.257 10.19L42.367 21.75L38.487 27.25C38.197 27.67 38.497 28.25 39.007 28.25H42.747C43.127 28.25 43.477 28.07 43.697 27.76L56.137 10.38C56.417 9.96 56.117 9.38 55.617 9.38Z" fill="#253B80"/>
                      <path d="M67.737 2.4H59.937C59.437 2.4 58.987 2.78 58.907 3.27L55.517 22.53C55.457 22.89 55.727 23.21 56.097 23.21H60.077C60.437 23.21 60.747 22.94 60.807 22.58L61.677 17.12C61.757 16.63 62.207 16.25 62.707 16.25H65.067C69.957 16.25 72.787 13.89 73.527 9.19C73.867 7.13 73.547 5.52 72.577 4.38C71.507 3.12 69.787 2.4 67.737 2.4ZM68.617 9.48C68.207 12.21 66.117 12.21 64.097 12.21H62.947L63.707 7.35C63.757 7.02 64.037 6.78 64.377 6.78H64.907C66.277 6.78 67.577 6.78 68.247 7.56C68.647 8.03 68.767 8.65 68.617 9.48Z" fill="#179BD7"/>
                      <path d="M91.417 9.38H87.687C87.347 9.38 87.067 9.62 87.017 9.95L86.847 11.03L86.577 10.64C85.737 9.42 83.907 9.01 82.077 9.01C77.877 9.01 74.307 12.14 73.597 16.57C73.227 18.78 73.727 20.9 74.967 22.37C76.107 23.73 77.747 24.29 79.687 24.29C83.037 24.29 84.907 22.13 84.907 22.13L84.737 23.2C84.677 23.56 84.947 23.88 85.317 23.88H88.717C89.217 23.88 89.667 23.5 89.747 23.01L91.997 9.96C92.057 9.61 91.787 9.38 91.417 9.38ZM85.987 16.72C85.617 18.87 83.887 20.35 81.707 20.35C80.607 20.35 79.737 20 79.147 19.33C78.567 18.67 78.317 17.73 78.487 16.69C78.827 14.56 80.597 13.03 82.737 13.03C83.817 13.03 84.677 13.39 85.287 14.06C85.887 14.74 86.157 15.69 85.987 16.72Z" fill="#179BD7"/>
                      <path d="M95.337 2.75L91.887 22.53C91.827 22.89 92.097 23.21 92.467 23.21H95.677C96.177 23.21 96.627 22.83 96.707 22.34L100.097 3.08C100.157 2.72 99.887 2.4 99.517 2.4H95.917C95.577 2.4 95.297 2.64 95.337 2.75Z" fill="#179BD7"/>
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">PayPal</p>
                  <p className="text-xs text-gray-500">Pay with PayPal</p>
                </button>

                <button
                  onClick={() => setPaymentMethod('test')}
                  className={`p-4 rounded-xl border-2 transition-colors ${
                    paymentMethod === 'test'
                      ? 'border-[#0047bb] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2 h-8">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Test Mode</p>
                  <p className="text-xs text-gray-500">Demo payment</p>
                </button>
              </div>
            </div>

            {/* Payment Form */}
            <div className="p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              {testSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  <p className="font-semibold">Test Payment Successful!</p>
                  <p className="text-sm mt-1">Transaction ID: {testSuccess.transactionId}</p>
                  <p className="text-sm">Amount: ${testSuccess.amount.toFixed(2)}</p>
                  <p className="text-xs mt-2 text-green-600">This was a test transaction. No real payment was processed.</p>
                </div>
              )}

              {/* Stripe Payment */}
              {paymentMethod === 'stripe' && (
                <div>
                  <p className="text-gray-600 mb-6">
                    You&apos;ll be redirected to Stripe&apos;s secure checkout to complete your donation.
                  </p>
                  <button
                    onClick={handleStripePayment}
                    disabled={isProcessing || effectiveAmount < 1}
                    className="w-full bg-[#0047bb] text-white py-4 rounded-lg font-semibold hover:bg-[#002d72] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : `Donate $${effectiveAmount.toFixed(2)} with Stripe`}
                  </button>
                </div>
              )}

              {/* PayPal Payment */}
              {paymentMethod === 'paypal' && (
                <div>
                  <p className="text-gray-600 mb-6">
                    Complete your donation securely with PayPal.
                  </p>
                  <PayPalScriptProvider options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb',
                    currency: 'USD'
                  }}>
                    <PayPalButtons
                      style={{ layout: 'vertical', shape: 'rect' }}
                      disabled={effectiveAmount < 1}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          intent: 'CAPTURE',
                          purchase_units: [
                            {
                              amount: {
                                currency_code: 'USD',
                                value: effectiveAmount.toFixed(2),
                              },
                              description: 'Donation to GlobeMed at UNC',
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        if (actions.order) {
                          const details = await actions.order.capture();
                          window.location.href = `/donate/success?paypal=true&id=${details.id}`;
                        }
                      }}
                      onError={(err) => {
                        setError('PayPal payment failed. Please try again.');
                        console.error('PayPal error:', err);
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              )}

              {/* Test Payment */}
              {paymentMethod === 'test' && (
                <div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-yellow-800 text-sm">
                      <strong>Test Mode:</strong> This is a demo payment form. No real transactions will be processed.
                      Use card number <code className="bg-yellow-100 px-1 rounded">4242 4242 4242 4242</code> for success
                      or <code className="bg-yellow-100 px-1 rounded">4000 0000 0000 0002</code> to simulate a decline.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={testCardNumber}
                        onChange={(e) => setTestCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047bb] focus:border-transparent outline-none font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={testExpiry}
                          onChange={(e) => setTestExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047bb] focus:border-transparent outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVC
                        </label>
                        <input
                          type="text"
                          value={testCvc}
                          onChange={(e) => setTestCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047bb] focus:border-transparent outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleTestPayment}
                    disabled={isProcessing || effectiveAmount < 1}
                    className="w-full mt-6 bg-gray-800 text-white py-4 rounded-lg font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing Test Payment...' : `Test Donate $${effectiveAmount.toFixed(2)}`}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure payment processing</span>
            </div>
            <p>Your payment information is encrypted and secure.</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#0047bb] font-semibold text-sm uppercase tracking-wider mb-4">
              Your Impact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628]">
              How Your Donation Helps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0047bb] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">$25</span>
              </div>
              <h3 className="text-lg font-bold text-[#0a1628] mb-2">Basic Health Supplies</h3>
              <p className="text-gray-600 text-sm">
                Provides essential medical supplies for patient care
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0047bb] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">$50</span>
              </div>
              <h3 className="text-lg font-bold text-[#0a1628] mb-2">Health Screenings</h3>
              <p className="text-gray-600 text-sm">
                Funds HPV screenings for women in the community
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0047bb] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">$100</span>
              </div>
              <h3 className="text-lg font-bold text-[#0a1628] mb-2">Dental Care</h3>
              <p className="text-gray-600 text-sm">
                Supports dental clinic operations and equipment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Ways */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0a1628] mb-4">Other Ways to Support</h2>
          <p className="text-gray-600 mb-8">
            You can also donate directly to ASSADE or get involved with GlobeMed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.assadeguatemala.com/donate"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-[#0047bb] text-[#0047bb] px-8 py-4 rounded font-semibold hover:bg-[#0047bb] hover:text-white transition-colors"
            >
              Donate to ASSADE Directly
            </a>
            <Link
              href="/get-involved"
              className="bg-[#0047bb] text-white px-8 py-4 rounded font-semibold hover:bg-[#002d72] transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
