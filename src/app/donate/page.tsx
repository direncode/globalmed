'use client';

import { useState, useEffect, Suspense } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type DonationType = 'one-time' | 'monthly';
type TributeType = 'none' | 'honor' | 'memory';
type PaymentMethod = 'stripe' | 'paypal' | 'test';

interface DonationTier {
  amount: number;
  label: string;
  impact: string;
  popular?: boolean;
}

const DONATION_TIERS: DonationTier[] = [
  { amount: 25, label: '$25', impact: 'Provides basic health supplies for 5 patients' },
  { amount: 50, label: '$50', impact: 'Funds HPV screenings for 2 women', popular: true },
  { amount: 100, label: '$100', impact: 'Supports dental clinic operations for a day' },
  { amount: 250, label: '$250', impact: 'Provides pediatric care for 30 children' },
  { amount: 500, label: '$500', impact: 'Funds a community health education program' },
  { amount: 1000, label: '$1,000', impact: 'Sponsors medical equipment and supplies' },
];

function DonationForm() {
  const searchParams = useSearchParams();

  // Donation settings
  const [donationType, setDonationType] = useState<DonationType>('one-time');
  const [selectedTier, setSelectedTier] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>('');

  // Tribute settings
  const [tributeType, setTributeType] = useState<TributeType>('none');
  const [tributeName, setTributeName] = useState('');
  const [notifyRecipient, setNotifyRecipient] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [tributeMessage, setTributeMessage] = useState('');

  // Donor information
  const [donorFirstName, setDonorFirstName] = useState('');
  const [donorLastName, setDonorLastName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorAddress, setDonorAddress] = useState('');
  const [donorCity, setDonorCity] = useState('');
  const [donorState, setDonorState] = useState('');
  const [donorZip, setDonorZip] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [wantTaxReceipt, setWantTaxReceipt] = useState(true);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  // Payment settings
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Test payment form
  const [testCardNumber, setTestCardNumber] = useState('4242424242424242');
  const [testExpiry, setTestExpiry] = useState('12/28');
  const [testCvc, setTestCvc] = useState('123');
  const [testSuccess, setTestSuccess] = useState<{ transactionId: string; amount: number } | null>(null);

  // Corporate matching
  const [employerMatch, setEmployerMatch] = useState(false);
  const [employerName, setEmployerName] = useState('');

  // Calculate effective amount
  const effectiveAmount = customAmount ? parseFloat(customAmount) : (selectedTier || 0);

  // Handle URL params
  useEffect(() => {
    const amountParam = searchParams.get('amount');
    if (amountParam) {
      const amount = parseInt(amountParam);
      if (DONATION_TIERS.find(t => t.amount === amount)) {
        setSelectedTier(amount);
      } else {
        setCustomAmount(amountParam);
        setSelectedTier(null);
      }
    }
  }, [searchParams]);

  const handleTierSelect = (amount: number) => {
    setSelectedTier(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value) {
      setSelectedTier(null);
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
          donorName: `${donorFirstName} ${donorLastName}`.trim(),
          donorEmail,
          isRecurring: donationType === 'monthly',
          tributeType: tributeType !== 'none' ? tributeType : undefined,
          tributeName: tributeType !== 'none' ? tributeName : undefined,
          isAnonymous,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

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
          donorName: `${donorFirstName} ${donorLastName}`.trim(),
          donorEmail,
          cardNumber: testCardNumber.replace(/\s/g, ''),
          isRecurring: donationType === 'monthly',
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
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-[#dfe1e2]">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ol className="usa-breadcrumb-list text-sm">
            <li>
              <Link href="/" className="text-[#005ea2] hover:underline">Home</Link>
            </li>
            <li className="before:content-['/'] before:mx-2 before:text-[#565c65]">
              <span className="text-[#565c65]">Donate</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#162e51] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="text-[#00bde3] font-bold text-sm uppercase tracking-wider mb-2">
              Support Our Mission
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Make a Donation
            </h1>
            <p className="text-lg text-[#dfe1e2] leading-relaxed">
              Your donation supports ASSADE&apos;s healthcare programs in Guatemala, providing essential
              medical services to over 800 patients monthly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 bg-[#f0f0f0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Donation Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Donation Type */}
              <div className="bg-white rounded border border-[#dfe1e2]">
                <div className="p-6 border-b border-[#dfe1e2]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#005ea2] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <h2 className="text-xl font-bold text-[#1b1b1b]">Choose Your Giving Type</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() => setDonationType('one-time')}
                      className={`p-4 rounded border-2 font-bold transition-colors ${
                        donationType === 'one-time'
                          ? 'border-[#005ea2] bg-[#e7f6f8] text-[#005ea2]'
                          : 'border-[#dfe1e2] hover:border-[#565c65]'
                      }`}
                    >
                      <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      One-Time Gift
                    </button>
                    <button
                      onClick={() => setDonationType('monthly')}
                      className={`p-4 rounded border-2 font-bold transition-colors ${
                        donationType === 'monthly'
                          ? 'border-[#005ea2] bg-[#e7f6f8] text-[#005ea2]'
                          : 'border-[#dfe1e2] hover:border-[#565c65]'
                      }`}
                    >
                      <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Monthly Giving
                    </button>
                  </div>
                  {donationType === 'monthly' && (
                    <div className="usa-alert usa-alert-info">
                      <div className="flex gap-3">
                        <svg className="w-5 h-5 text-[#00bde3] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg>
                        <p className="text-sm">
                          <strong>Monthly donors</strong> provide sustainable support for ASSADE&apos;s programs.
                          You can cancel or modify your recurring donation at any time.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2: Select Amount */}
              <div className="bg-white rounded border border-[#dfe1e2]">
                <div className="p-6 border-b border-[#dfe1e2]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#005ea2] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <h2 className="text-xl font-bold text-[#1b1b1b]">Select Your Gift Amount</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {DONATION_TIERS.map((tier) => (
                      <button
                        key={tier.amount}
                        onClick={() => handleTierSelect(tier.amount)}
                        className={`relative p-4 rounded border-2 text-left transition-colors ${
                          selectedTier === tier.amount
                            ? 'border-[#005ea2] bg-[#e7f6f8]'
                            : 'border-[#dfe1e2] hover:border-[#565c65]'
                        }`}
                      >
                        {tier.popular && (
                          <span className="absolute -top-2 -right-2 bg-[#d83933] text-white text-xs px-2 py-0.5 rounded font-bold">
                            Popular
                          </span>
                        )}
                        <p className={`text-xl font-bold ${selectedTier === tier.amount ? 'text-[#005ea2]' : 'text-[#1b1b1b]'}`}>
                          {tier.label}
                          {donationType === 'monthly' && <span className="text-sm font-normal">/mo</span>}
                        </p>
                        <p className="text-xs text-[#565c65] mt-1">{tier.impact}</p>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-[#dfe1e2] pt-6">
                    <label htmlFor="customAmount" className="block text-sm font-bold text-[#1b1b1b] mb-2">
                      Or enter a custom amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#565c65] font-bold">$</span>
                      <input
                        type="number"
                        id="customAmount"
                        min="1"
                        step="0.01"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none"
                      />
                      {donationType === 'monthly' && customAmount && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#565c65] text-sm">/month</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Tribute Gift (Optional) */}
              <div className="bg-white rounded border border-[#dfe1e2]">
                <div className="p-6 border-b border-[#dfe1e2]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#005ea2] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <h2 className="text-xl font-bold text-[#1b1b1b]">Dedicate Your Gift (Optional)</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tribute"
                        checked={tributeType === 'none'}
                        onChange={() => setTributeType('none')}
                        className="w-4 h-4 text-[#005ea2]"
                      />
                      <span className="text-sm">No dedication</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tribute"
                        checked={tributeType === 'honor'}
                        onChange={() => setTributeType('honor')}
                        className="w-4 h-4 text-[#005ea2]"
                      />
                      <span className="text-sm">In honor of someone</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tribute"
                        checked={tributeType === 'memory'}
                        onChange={() => setTributeType('memory')}
                        className="w-4 h-4 text-[#005ea2]"
                      />
                      <span className="text-sm">In memory of someone</span>
                    </label>
                  </div>

                  {tributeType !== 'none' && (
                    <div className="space-y-4 p-4 bg-[#f0f0f0] rounded">
                      <div>
                        <label htmlFor="tributeName" className="block text-sm font-bold text-[#1b1b1b] mb-2">
                          {tributeType === 'honor' ? 'Honoree Name' : 'In Memory Of'}
                        </label>
                        <input
                          type="text"
                          id="tributeName"
                          value={tributeName}
                          onChange={(e) => setTributeName(e.target.value)}
                          placeholder="Enter name"
                          className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none"
                        />
                      </div>

                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyRecipient}
                          onChange={(e) => setNotifyRecipient(e.target.checked)}
                          className="w-4 h-4 mt-1 text-[#005ea2]"
                        />
                        <span className="text-sm">
                          Send a notification card to the {tributeType === 'honor' ? 'honoree or their family' : 'family'}
                        </span>
                      </label>

                      {notifyRecipient && (
                        <>
                          <div>
                            <label htmlFor="recipientEmail" className="block text-sm font-bold text-[#1b1b1b] mb-2">
                              Recipient Email Address
                            </label>
                            <input
                              type="email"
                              id="recipientEmail"
                              value={recipientEmail}
                              onChange={(e) => setRecipientEmail(e.target.value)}
                              placeholder="recipient@email.com"
                              className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label htmlFor="tributeMessage" className="block text-sm font-bold text-[#1b1b1b] mb-2">
                              Personal Message (Optional)
                            </label>
                            <textarea
                              id="tributeMessage"
                              value={tributeMessage}
                              onChange={(e) => setTributeMessage(e.target.value)}
                              placeholder="Add a personal message..."
                              rows={3}
                              className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none resize-none"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Step 4: Donor Information */}
              <div className="bg-white rounded border border-[#dfe1e2]">
                <div className="p-6 border-b border-[#dfe1e2]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#005ea2] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <h2 className="text-xl font-bold text-[#1b1b1b]">Your Information</h2>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 text-[#005ea2]"
                    />
                    <span className="text-sm font-bold">Make this an anonymous donation</span>
                  </label>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-bold text-[#1b1b1b] mb-2">
                        First Name <span className="text-[#d83933]">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={donorFirstName}
                        onChange={(e) => setDonorFirstName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-bold text-[#1b1b1b] mb-2">
                        Last Name <span className="text-[#d83933]">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={donorLastName}
                        onChange={(e) => setDonorLastName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-[#1b1b1b] mb-2">
                        Email Address <span className="text-[#d83933]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-[#1b1b1b] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none"
                      />
                    </div>
                  </div>

                  {wantTaxReceipt && (
                    <>
                      <div>
                        <label htmlFor="address" className="block text-sm font-bold text-[#1b1b1b] mb-2">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          value={donorAddress}
                          onChange={(e) => setDonorAddress(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-bold text-[#1b1b1b] mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            value={donorCity}
                            onChange={(e) => setDonorCity(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-bold text-[#1b1b1b] mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            id="state"
                            value={donorState}
                            onChange={(e) => setDonorState(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="zip" className="block text-sm font-bold text-[#1b1b1b] mb-2">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            id="zip"
                            value={donorZip}
                            onChange={(e) => setDonorZip(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2 pt-4 border-t border-[#dfe1e2]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wantTaxReceipt}
                        onChange={(e) => setWantTaxReceipt(e.target.checked)}
                        className="w-4 h-4 text-[#005ea2]"
                      />
                      <span className="text-sm">I would like a tax receipt for this donation</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={subscribeNewsletter}
                        onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                        className="w-4 h-4 text-[#005ea2]"
                      />
                      <span className="text-sm">Subscribe to our newsletter for updates on our work</span>
                    </label>
                  </div>

                  {/* Employer Matching */}
                  <div className="pt-4 border-t border-[#dfe1e2]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={employerMatch}
                        onChange={(e) => setEmployerMatch(e.target.checked)}
                        className="w-4 h-4 text-[#005ea2]"
                      />
                      <span className="text-sm font-bold">My employer will match my donation</span>
                    </label>
                    {employerMatch && (
                      <div className="mt-4">
                        <label htmlFor="employer" className="block text-sm font-bold text-[#1b1b1b] mb-2">
                          Employer Name
                        </label>
                        <input
                          type="text"
                          id="employer"
                          value={employerName}
                          onChange={(e) => setEmployerName(e.target.value)}
                          placeholder="Enter your employer's name"
                          className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none"
                        />
                        <p className="text-xs text-[#565c65] mt-2">
                          Many employers match employee donations. Check with your HR department to double your impact!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 5: Payment Method */}
              <div className="bg-white rounded border border-[#dfe1e2]">
                <div className="p-6 border-b border-[#dfe1e2]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#005ea2] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      5
                    </div>
                    <h2 className="text-xl font-bold text-[#1b1b1b]">Payment Method</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <button
                      onClick={() => setPaymentMethod('stripe')}
                      className={`p-4 rounded border-2 transition-colors ${
                        paymentMethod === 'stripe'
                          ? 'border-[#005ea2] bg-[#e7f6f8]'
                          : 'border-[#dfe1e2] hover:border-[#565c65]'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <svg className="h-8" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M60 12.5C60 8.35 57.75 5 54.15 5C50.55 5 47.85 8.35 47.85 12.5C47.85 17.45 51.15 20 54.75 20C56.55 20 57.9 19.55 58.95 18.95V15.5C57.9 16.1 56.7 16.45 55.2 16.45C53.7 16.45 52.35 15.9 52.2 14H59.95C59.95 13.8 60 13.05 60 12.5ZM52.1 11C52.1 9.55 53.1 8.85 54.15 8.85C55.2 8.85 56.1 9.55 56.1 11H52.1ZM41.4 5C39.9 5 38.85 5.7 38.25 6.2L38.05 5.25H33.85V25L38.35 24.05V18.8C38.95 19.2 39.85 19.85 41.35 19.85C44.4 19.85 47.2 17.35 47.2 12.25C47.2 7.6 44.35 5 41.4 5ZM40.35 16.05C39.35 16.05 38.7 15.7 38.35 15.25V9.8C38.7 9.3 39.4 8.95 40.35 8.95C42 8.95 43.1 10.65 43.1 12.5C43.1 14.35 42 16.05 40.35 16.05ZM28.8 4.2L33.35 3.25V0L28.8 0.95V4.2ZM33.35 5.25H28.8V19.6H33.35V5.25ZM24.25 6.5L23.95 5.25H19.85V19.6H24.35V9.65C25.35 8.4 27.15 8.65 27.75 8.85V5.25C27.1 5 25.25 4.65 24.25 6.5ZM15.25 1.6L10.85 2.5L10.85 15.85C10.85 18.2 12.6 20 14.95 20C16.25 20 17.2 19.75 17.75 19.45V16.05C17.2 16.25 15.25 16.8 15.25 14.45V9H17.75V5.25H15.25V1.6ZM4.5 9.8C4.5 9.05 5.1 8.75 6.15 8.75C7.65 8.75 9.55 9.2 11.05 10V5.7C9.4 5.05 7.8 4.85 6.15 4.85C2.45 4.85 0 6.8 0 9.95C0 14.95 6.9 14.2 6.9 16.35C6.9 17.25 6.1 17.55 5 17.55C3.35 17.55 1.25 16.9 0 16.2V20.55C1.55 21.2 3.15 21.45 5 21.45C8.8 21.45 11.4 19.55 11.4 16.35C11.4 10.9 4.5 11.8 4.5 9.8Z" fill="#6772E5"/>
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-[#1b1b1b]">Credit Card</p>
                      <p className="text-xs text-[#565c65]">Powered by Stripe</p>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-4 rounded border-2 transition-colors ${
                        paymentMethod === 'paypal'
                          ? 'border-[#005ea2] bg-[#e7f6f8]'
                          : 'border-[#dfe1e2] hover:border-[#565c65]'
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
                      <p className="text-sm font-bold text-[#1b1b1b]">PayPal</p>
                      <p className="text-xs text-[#565c65]">Pay with PayPal</p>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('test')}
                      className={`p-4 rounded border-2 transition-colors ${
                        paymentMethod === 'test'
                          ? 'border-[#005ea2] bg-[#e7f6f8]'
                          : 'border-[#dfe1e2] hover:border-[#565c65]'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-2 h-8">
                        <svg className="w-8 h-8 text-[#565c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-[#1b1b1b]">Test Mode</p>
                      <p className="text-xs text-[#565c65]">Demo payment</p>
                    </button>
                  </div>

                  {error && (
                    <div className="usa-alert usa-alert-error mb-6">
                      <div className="flex gap-3">
                        <svg className="w-5 h-5 text-[#d54309] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                        <p className="text-sm">{error}</p>
                      </div>
                    </div>
                  )}

                  {testSuccess && (
                    <div className="usa-alert usa-alert-success mb-6">
                      <div className="flex gap-3">
                        <svg className="w-5 h-5 text-[#00a91c] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <div>
                          <p className="font-bold">Test Payment Successful!</p>
                          <p className="text-sm">Transaction ID: {testSuccess.transactionId}</p>
                          <p className="text-sm">Amount: ${testSuccess.amount.toFixed(2)}</p>
                          <p className="text-xs mt-1">This was a test transaction. No real payment was processed.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stripe Payment */}
                  {paymentMethod === 'stripe' && (
                    <div>
                      <p className="text-[#565c65] mb-6">
                        You&apos;ll be redirected to Stripe&apos;s secure checkout to complete your donation.
                      </p>
                      <button
                        onClick={handleStripePayment}
                        disabled={isProcessing || effectiveAmount < 1}
                        className="w-full bg-[#005ea2] text-white py-4 rounded font-bold hover:bg-[#1a4480] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? 'Processing...' : `Donate $${effectiveAmount.toFixed(2)}${donationType === 'monthly' ? '/month' : ''} with Stripe`}
                      </button>
                    </div>
                  )}

                  {/* PayPal Payment */}
                  {paymentMethod === 'paypal' && (
                    <div>
                      <p className="text-[#565c65] mb-6">
                        Complete your donation securely with PayPal.
                      </p>
                      <PayPalScriptProvider options={{
                        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb',
                        currency: 'USD',
                        vault: donationType === 'monthly',
                        intent: donationType === 'monthly' ? 'subscription' : 'capture',
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
                                  description: `${donationType === 'monthly' ? 'Monthly ' : ''}Donation to GlobeMed at UNC`,
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
                      <div className="usa-alert usa-alert-warning mb-6">
                        <div className="flex gap-3">
                          <svg className="w-5 h-5 text-[#ffbe2e] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                          </svg>
                          <p className="text-sm">
                            <strong>Test Mode:</strong> This is a demo payment form. No real transactions will be processed.
                            Use card <code className="bg-[#faf3d1] px-1 rounded">4242 4242 4242 4242</code> for success.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold text-[#1b1b1b] mb-2">Card Number</label>
                          <input
                            type="text"
                            value={testCardNumber}
                            onChange={(e) => setTestCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                            placeholder="4242 4242 4242 4242"
                            className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-[#1b1b1b] mb-2">Expiry Date</label>
                            <input
                              type="text"
                              value={testExpiry}
                              onChange={(e) => setTestExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-[#1b1b1b] mb-2">CVC</label>
                            <input
                              type="text"
                              value={testCvc}
                              onChange={(e) => setTestCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                              placeholder="123"
                              className="w-full px-4 py-3 border-2 border-[#565c65] rounded focus:border-[#005ea2] focus:outline-none font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleTestPayment}
                        disabled={isProcessing || effectiveAmount < 1}
                        className="w-full mt-6 bg-[#1b1b1b] text-white py-4 rounded font-bold hover:bg-[#2e2e2e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? 'Processing Test Payment...' : `Test Donate $${effectiveAmount.toFixed(2)}${donationType === 'monthly' ? '/month' : ''}`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Donation Summary */}
              <div className="bg-white rounded border border-[#dfe1e2] sticky top-24">
                <div className="p-6 border-b border-[#dfe1e2] bg-[#162e51] text-white rounded-t">
                  <h3 className="text-lg font-bold">Donation Summary</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-[#565c65]">Type</span>
                      <span className="font-bold">{donationType === 'monthly' ? 'Monthly' : 'One-Time'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#565c65]">Amount</span>
                      <span className="font-bold text-[#005ea2]">
                        ${effectiveAmount.toFixed(2)}
                        {donationType === 'monthly' && <span className="text-sm font-normal">/mo</span>}
                      </span>
                    </div>
                    {tributeType !== 'none' && tributeName && (
                      <div className="flex justify-between">
                        <span className="text-[#565c65]">Tribute</span>
                        <span className="font-bold text-sm">
                          {tributeType === 'honor' ? 'In honor of' : 'In memory of'} {tributeName}
                        </span>
                      </div>
                    )}
                    {employerMatch && employerName && (
                      <div className="flex justify-between">
                        <span className="text-[#565c65]">Employer Match</span>
                        <span className="font-bold text-sm">{employerName}</span>
                      </div>
                    )}
                    <div className="border-t border-[#dfe1e2] pt-4">
                      <div className="flex justify-between text-lg">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-[#005ea2]">
                          ${effectiveAmount.toFixed(2)}
                          {donationType === 'monthly' && <span className="text-sm font-normal">/mo</span>}
                        </span>
                      </div>
                    </div>
                  </div>

                  {donationType === 'monthly' && (
                    <div className="mt-4 p-3 bg-[#e7f6f8] rounded text-sm">
                      <p className="font-bold text-[#005ea2]">Annual Impact</p>
                      <p className="text-[#565c65]">
                        ${(effectiveAmount * 12).toFixed(2)} per year to support healthcare in Guatemala
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Impact Info */}
              <div className="bg-white rounded border border-[#dfe1e2]">
                <div className="p-6 border-b border-[#dfe1e2]">
                  <h3 className="text-lg font-bold text-[#1b1b1b]">Your Impact</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#00a91c] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>800+ patients served monthly through ASSADE</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#00a91c] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>60% of patients are children receiving pediatric care</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#00a91c] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>HPV screenings for indigenous women</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#00a91c] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>Dental clinic services and education programs</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-[#f0f0f0] rounded p-6 text-center">
                <svg className="w-12 h-12 mx-auto mb-3 text-[#005ea2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="font-bold text-[#1b1b1b] mb-1">Secure Donation</p>
                <p className="text-xs text-[#565c65]">
                  Your payment information is encrypted and secure. We use industry-standard SSL encryption.
                </p>
              </div>

              {/* Tax Info */}
              <div className="bg-white rounded border border-[#dfe1e2] p-6">
                <p className="text-xs text-[#565c65]">
                  <strong>Tax Information:</strong> GlobeMed at UNC is a registered student organization.
                  Donations may be tax-deductible. You will receive a receipt for your records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-12 px-4 bg-white border-t border-[#dfe1e2]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1b1b1b] mb-8 text-center">Other Ways to Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-[#dfe1e2] rounded">
              <svg className="w-12 h-12 mx-auto mb-4 text-[#005ea2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-bold text-[#1b1b1b] mb-2">Corporate Partnerships</h3>
              <p className="text-sm text-[#565c65] mb-4">
                Partner with us to maximize your company&apos;s social impact through matching gifts or sponsorships.
              </p>
              <Link href="/contact" className="text-[#005ea2] font-bold text-sm hover:underline">
                Contact us →
              </Link>
            </div>
            <div className="text-center p-6 border border-[#dfe1e2] rounded">
              <svg className="w-12 h-12 mx-auto mb-4 text-[#005ea2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-bold text-[#1b1b1b] mb-2">Attend Events</h3>
              <p className="text-sm text-[#565c65] mb-4">
                Join our fundraising events throughout the year to support ASSADE while connecting with our community.
              </p>
              <Link href="/get-involved" className="text-[#005ea2] font-bold text-sm hover:underline">
                View events →
              </Link>
            </div>
            <div className="text-center p-6 border border-[#dfe1e2] rounded">
              <svg className="w-12 h-12 mx-auto mb-4 text-[#005ea2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-bold text-[#1b1b1b] mb-2">Donate to ASSADE Directly</h3>
              <p className="text-sm text-[#565c65] mb-4">
                Support our partner organization directly through their website.
              </p>
              <a
                href="https://www.assadeguatemala.com/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#005ea2] font-bold text-sm hover:underline"
              >
                Visit ASSADE →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#005ea2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#565c65]">Loading donation form...</p>
        </div>
      </div>
    }>
      <DonationForm />
    </Suspense>
  );
}
