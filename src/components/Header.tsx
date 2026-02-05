'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBannerExpanded, setIsBannerExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/our-partner', label: 'Our Partner' },
    { href: '/programs', label: 'Programs' },
    { href: '/get-involved', label: 'Get Involved' },
    { href: '/donate', label: 'Donate' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search
    console.log('Search:', searchQuery);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Official Organization Banner */}
      <div className="bg-[#f0f0f0] border-b border-[#dfe1e2]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23005ea2'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E"
                alt=""
                className="w-4 h-4"
              />
              <span className="text-xs text-[#1b1b1b]">
                A student organization at UNC-Chapel Hill
              </span>
            </div>
            <button
              onClick={() => setIsBannerExpanded(!isBannerExpanded)}
              className="text-xs text-[#005ea2] hover:text-[#1a4480] flex items-center gap-1"
              aria-expanded={isBannerExpanded}
            >
              Here&apos;s how you know
              <svg
                className={`w-3 h-3 transition-transform ${isBannerExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Expanded Banner Content */}
          {isBannerExpanded && (
            <div className="py-4 border-t border-[#dfe1e2] grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <svg className="w-10 h-10 text-[#005ea2] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <div>
                  <p className="text-sm font-bold text-[#1b1b1b]">Verified Student Organization</p>
                  <p className="text-xs text-[#565c65]">
                    GlobeMed at UNC is a registered student organization affiliated with GlobeMed National.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <svg className="w-10 h-10 text-[#005ea2] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <div>
                  <p className="text-sm font-bold text-[#1b1b1b]">Secure Donations</p>
                  <p className="text-xs text-[#565c65]">
                    All donations are processed securely through Stripe and PayPal.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-[#dfe1e2]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Bar with Logo and Search */}
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-14 h-14 bg-[#005ea2] rounded flex items-center justify-center">
                <span className="text-white font-bold text-2xl">G</span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#1b1b1b] leading-tight">
                  GlobeMed
                </h1>
                <p className="text-xs md:text-sm text-[#005ea2] font-semibold">
                  at UNC-Chapel Hill
                </p>
              </div>
            </Link>

            {/* Search and Donate */}
            <div className="hidden md:flex items-center gap-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pr-10 border-2 border-[#565c65] rounded text-sm focus:border-[#005ea2] focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#565c65] hover:text-[#005ea2]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
              <Link
                href="/donate"
                className="bg-[#d83933] hover:bg-[#b50909] text-white px-6 py-2.5 rounded font-bold text-sm transition-colors"
              >
                Donate Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#1b1b1b] hover:bg-[#f0f0f0] rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block border-t border-[#dfe1e2]">
            <ul className="flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 text-sm font-bold transition-colors border-b-4 border-transparent hover:border-[#005ea2] hover:bg-[#f0f0f0] ${
                      link.href === '/donate'
                        ? 'text-[#d83933] hover:text-[#b50909]'
                        : 'text-[#005ea2] hover:text-[#1a4480]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#dfe1e2]">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 border-2 border-[#565c65] rounded text-sm focus:border-[#005ea2] focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#565c65] hover:text-[#005ea2]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            {/* Mobile Nav Links */}
            <nav>
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 font-bold rounded transition-colors ${
                        link.href === '/donate'
                          ? 'text-[#d83933] hover:bg-[#f0f0f0]'
                          : 'text-[#005ea2] hover:bg-[#f0f0f0]'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Donate Button */}
            <Link
              href="/donate"
              className="block mt-4 bg-[#d83933] hover:bg-[#b50909] text-white px-6 py-3 rounded font-bold text-center transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
