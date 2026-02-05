import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donation Cancelled | GlobeMed at UNC',
  description: 'Your donation was cancelled. You can try again anytime.',
};

export default function DonationCancel() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-[#0a1628] mb-4">
          Donation Cancelled
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Your donation was not completed. No payment has been processed.
          If you&apos;d like to try again, you can return to the donation page.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/donate"
            className="bg-[#0047bb] text-white px-8 py-3 rounded font-semibold hover:bg-[#002d72] transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded font-semibold hover:bg-gray-50 transition-colors"
          >
            Return Home
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Having trouble donating? Contact us at{' '}
            <a href="mailto:globemed@unc.edu" className="text-[#0047bb] hover:underline">
              globemed@unc.edu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
