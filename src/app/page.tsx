import Link from 'next/link';

export default function Home() {
  return (
    <div id="top">
      {/* Alert Banner */}
      <div className="usa-alert usa-alert-info">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
          <svg className="w-6 h-6 text-[#00bde3] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          <p className="text-sm">
            <strong>Applications Open:</strong> Summer internship applications for Guatemala are now being accepted.{' '}
            <Link href="/get-involved" className="text-[#005ea2] font-bold hover:underline">
              Learn more and apply
            </Link>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#162e51] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#00bde3] font-bold text-sm uppercase tracking-wider mb-4">
                Global Health Organization
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Health Is a Human Right
              </h1>
              <p className="text-xl text-[#dfe1e2] mb-8 leading-relaxed">
                GlobeMed at UNC partners with ASSADE in Guatemala to build sustainable,
                community-driven solutions for global health equity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/donate"
                  className="bg-[#d83933] hover:bg-[#b50909] text-white px-8 py-4 rounded font-bold text-center transition-colors"
                >
                  Donate Now
                </Link>
                <Link
                  href="/get-involved"
                  className="bg-white hover:bg-[#f0f0f0] text-[#162e51] px-8 py-4 rounded font-bold text-center transition-colors"
                >
                  Get Involved
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-[#1a4480] rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Quick Stats</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-4xl font-bold text-[#00bde3]">800+</p>
                    <p className="text-sm text-[#a9aeb1]">Patients Served Monthly</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-[#00bde3]">60%</p>
                    <p className="text-sm text-[#a9aeb1]">Pediatric Patients</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-[#00bde3]">15+</p>
                    <p className="text-sm text-[#a9aeb1]">Years of Partnership</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-[#00bde3]">100%</p>
                    <p className="text-sm text-[#a9aeb1]">Student-Led</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Grid - HHS Style */}
      <section className="py-16 px-4 bg-[#f0f0f0]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1b1b1b] mb-8">Our Focus Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Topic Card 1 */}
            <Link href="/our-partner" className="usa-card bg-white rounded border border-[#dfe1e2] hover:border-[#005ea2] transition-colors group">
              <div className="p-6">
                <div className="w-12 h-12 bg-[#005ea2] rounded flex items-center justify-center mb-4 group-hover:bg-[#1a4480] transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#005ea2] mb-2 group-hover:underline">Global Partnership</h3>
                <p className="text-sm text-[#565c65]">
                  Supporting ASSADE in Guatemala with healthcare access for underserved communities.
                </p>
              </div>
            </Link>

            {/* Topic Card 2 */}
            <Link href="/programs" className="usa-card bg-white rounded border border-[#dfe1e2] hover:border-[#005ea2] transition-colors group">
              <div className="p-6">
                <div className="w-12 h-12 bg-[#005ea2] rounded flex items-center justify-center mb-4 group-hover:bg-[#1a4480] transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#005ea2] mb-2 group-hover:underline">Women&apos;s Health</h3>
                <p className="text-sm text-[#565c65]">
                  HPV screenings and reproductive healthcare for indigenous women in Guatemala.
                </p>
              </div>
            </Link>

            {/* Topic Card 3 */}
            <Link href="/programs" className="usa-card bg-white rounded border border-[#dfe1e2] hover:border-[#005ea2] transition-colors group">
              <div className="p-6">
                <div className="w-12 h-12 bg-[#005ea2] rounded flex items-center justify-center mb-4 group-hover:bg-[#1a4480] transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#005ea2] mb-2 group-hover:underline">Health Education</h3>
                <p className="text-sm text-[#565c65]">
                  Community outreach and education programs promoting health awareness.
                </p>
              </div>
            </Link>

            {/* Topic Card 4 */}
            <Link href="/get-involved" className="usa-card bg-white rounded border border-[#dfe1e2] hover:border-[#005ea2] transition-colors group">
              <div className="p-6">
                <div className="w-12 h-12 bg-[#005ea2] rounded flex items-center justify-center mb-4 group-hover:bg-[#1a4480] transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#005ea2] mb-2 group-hover:underline">Student Leadership</h3>
                <p className="text-sm text-[#565c65]">
                  Developing future public health leaders through hands-on experience.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Two Column */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-[#1b1b1b] mb-6">About GlobeMed at UNC</h2>
              <div className="prose max-w-none text-[#565c65]">
                <p className="text-lg mb-4">
                  GlobeMed is a student-led organization that partners with and fundraises for our global partner
                  <strong className="text-[#1b1b1b]"> ASSADE</strong>, a Guatemalan grassroots nonprofit organization
                  that provides primary healthcare services to the population of San Andrés Itzapa and Chimaltenango.
                </p>
                <p className="mb-4">
                  ASSADE provides critical primary health services and health education to an average of 800 vulnerable
                  persons monthly. Approximately 60% of the patients are children, and the remainder are mostly women
                  seeking essential healthcare services.
                </p>
                <p className="mb-6">
                  In addition to our international partnership, we collaborate with various nonprofit organizations
                  in the Research Triangle Park area through public health educational outreach projects.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center text-[#005ea2] font-bold hover:underline"
              >
                Learn more about our organization
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="bg-[#f0f0f0] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#1b1b1b] mb-4 pb-4 border-b border-[#dfe1e2]">
                Our Mission
              </h3>
              <p className="text-[#565c65] mb-6">
                At GlobeMed, we believe that health is a human right. People deserve the right to
                not just survive, but thrive.
              </p>
              <h3 className="text-lg font-bold text-[#1b1b1b] mb-4 pb-4 border-b border-[#dfe1e2]">
                Our Approach
              </h3>
              <p className="text-[#565c65]">
                By partnering with communities abroad and close to home, students and communities work
                in tandem to learn from one another and create lasting change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4 bg-[#f0f0f0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#1b1b1b] mb-2">Programs & Initiatives</h2>
              <p className="text-[#565c65]">Explore how we make an impact through our various programs.</p>
            </div>
            <Link
              href="/programs"
              className="text-[#005ea2] font-bold hover:underline mt-4 md:mt-0"
            >
              View all programs →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded border border-[#dfe1e2] overflow-hidden">
              <div className="h-2 bg-[#005ea2]"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1b1b1b] mb-3">Summer Internships</h3>
                <p className="text-[#565c65] text-sm mb-4">
                  Each summer, we send interns to Guatemala to work directly with ASSADE,
                  gaining practical insight into international NGO work.
                </p>
                <Link href="/get-involved" className="text-[#005ea2] font-bold text-sm hover:underline">
                  Apply now →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded border border-[#dfe1e2] overflow-hidden">
              <div className="h-2 bg-[#d83933]"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1b1b1b] mb-3">Fundraising Events</h3>
                <p className="text-[#565c65] text-sm mb-4">
                  Throughout the year, we host events to raise money for ASSADE and local partners,
                  directly supporting healthcare access.
                </p>
                <Link href="/get-involved" className="text-[#005ea2] font-bold text-sm hover:underline">
                  Get involved →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded border border-[#dfe1e2] overflow-hidden">
              <div className="h-2 bg-[#00bde3]"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1b1b1b] mb-3">Community Outreach</h3>
                <p className="text-[#565c65] text-sm mb-4">
                  We collaborate with local organizations for health education outreach
                  in schools and communities.
                </p>
                <Link href="/programs" className="text-[#005ea2] font-bold text-sm hover:underline">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donate CTA - HHS Style */}
      <section className="py-16 px-4 bg-[#005ea2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Support Our Mission</h2>
              <p className="text-xl text-[#a9aeb1] mb-6">
                Your donation directly supports healthcare services for underserved communities in Guatemala.
                Every contribution makes a difference.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#00bde3]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>$25 provides basic health supplies for patients</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#00bde3]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>$50 funds HPV screenings for women</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#00bde3]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>$100 supports dental clinic operations</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-[#1b1b1b] mb-6">Make a Donation</h3>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[25, 50, 100].map((amount) => (
                  <Link
                    key={amount}
                    href={`/donate?amount=${amount}`}
                    className="py-3 px-4 border-2 border-[#005ea2] text-[#005ea2] rounded font-bold text-center hover:bg-[#005ea2] hover:text-white transition-colors"
                  >
                    ${amount}
                  </Link>
                ))}
              </div>
              <Link
                href="/donate"
                className="block w-full bg-[#d83933] hover:bg-[#b50909] text-white py-4 rounded font-bold text-center transition-colors"
              >
                Donate Now
              </Link>
              <p className="text-xs text-[#565c65] mt-4 text-center">
                Secure payment processing via Stripe and PayPal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News/Updates Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1b1b1b] mb-8">Latest Updates</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <article className="border border-[#dfe1e2] rounded overflow-hidden">
              <div className="h-48 bg-[#162e51] flex items-center justify-center">
                <svg className="w-16 h-16 text-[#005ea2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <div className="p-6">
                <p className="text-xs text-[#565c65] mb-2">January 2026</p>
                <h3 className="text-lg font-bold text-[#1b1b1b] mb-2">Summer Internship Applications Open</h3>
                <p className="text-sm text-[#565c65] mb-4">
                  Apply now for an immersive experience working with ASSADE in Guatemala this summer.
                </p>
                <Link href="/get-involved" className="text-[#005ea2] font-bold text-sm hover:underline">
                  Read more →
                </Link>
              </div>
            </article>

            <article className="border border-[#dfe1e2] rounded overflow-hidden">
              <div className="h-48 bg-[#1a4480] flex items-center justify-center">
                <svg className="w-16 h-16 text-[#00bde3]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="p-6">
                <p className="text-xs text-[#565c65] mb-2">December 2025</p>
                <h3 className="text-lg font-bold text-[#1b1b1b] mb-2">Year-End Fundraising Success</h3>
                <p className="text-sm text-[#565c65] mb-4">
                  Thanks to your generosity, we exceeded our fundraising goal for ASSADE&apos;s programs.
                </p>
                <Link href="/about" className="text-[#005ea2] font-bold text-sm hover:underline">
                  Read more →
                </Link>
              </div>
            </article>

            <article className="border border-[#dfe1e2] rounded overflow-hidden">
              <div className="h-48 bg-[#005ea2] flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <div className="p-6">
                <p className="text-xs text-[#565c65] mb-2">Ongoing</p>
                <h3 className="text-lg font-bold text-[#1b1b1b] mb-2">Weekly General Body Meetings</h3>
                <p className="text-sm text-[#565c65] mb-4">
                  Join us for discussions on public health issues and guest speaker events.
                </p>
                <Link href="/contact" className="text-[#005ea2] font-bold text-sm hover:underline">
                  Join us →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
