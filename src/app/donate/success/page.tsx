import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You for Your Donation | GlobeMed at UNC',
  description: 'Thank you for supporting GlobeMed at UNC and ASSADE.',
};

export default function DonationSuccess() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-[#0a1628] mb-4">
          Thank You!
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Your generous donation has been received. Your support helps provide essential healthcare
          services to communities in Guatemala through ASSADE.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-[#0a1628] mb-2">What Happens Next?</h2>
          <p className="text-gray-600 text-sm">
            You will receive a confirmation email with details of your donation.
            Your contribution will directly support ASSADE&apos;s healthcare programs,
            including women&apos;s health services, dental care, and community health education.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-[#0047bb] text-white px-8 py-3 rounded font-semibold hover:bg-[#002d72] transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/get-involved"
            className="border-2 border-[#0047bb] text-[#0047bb] px-8 py-3 rounded font-semibold hover:bg-[#0047bb] hover:text-white transition-colors"
          >
            Get Involved
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Questions about your donation? Contact us at{' '}
            <a href="mailto:globemed@unc.edu" className="text-[#0047bb] hover:underline">
              globemed@unc.edu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
