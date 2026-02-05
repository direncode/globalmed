import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | GlobeMed at UNC',
  description: 'Get in touch with GlobeMed at UNC-Chapel Hill. Contact us about membership, events, or partnership opportunities.',
};

export default function Contact() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#0047bb] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-[#7eb8ff] font-semibold text-sm uppercase tracking-wider mb-4">
              Get In Touch
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Have questions about GlobeMed? Want to get involved? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Details */}
            <div>
              <p className="text-[#0047bb] font-semibold text-sm uppercase tracking-wider mb-4">
                Reach Out
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-8">
                We&apos;re Here to Help
              </h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#0047bb] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0a1628] mb-1">Email</h3>
                    <a href="mailto:globemed@unc.edu" className="text-[#0047bb] hover:underline">
                      globemed@unc.edu
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#0047bb] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0a1628] mb-1">Instagram</h3>
                    <a
                      href="https://www.instagram.com/globemedatunc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0047bb] hover:underline"
                    >
                      @globemedatunc
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#0047bb] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0a1628] mb-1">Location</h3>
                    <p className="text-gray-600">
                      University of North Carolina<br />
                      Chapel Hill, NC 27599
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-[#0a1628] mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047bb] focus:border-transparent outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047bb] focus:border-transparent outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047bb] focus:border-transparent outline-none transition-colors bg-white"
                  >
                    <option value="">Select a topic</option>
                    <option value="membership">Membership Inquiry</option>
                    <option value="internship">Summer Internship</option>
                    <option value="events">Events &amp; Fundraising</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047bb] focus:border-transparent outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0047bb] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#002d72] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Info */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#0047bb] font-semibold text-sm uppercase tracking-wider mb-4">
              Join Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628]">
              Weekly Meetings
            </h2>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 md:p-10 shadow-sm text-center">
            <p className="text-gray-600 mb-6">
              We hold weekly general body meetings where we discuss pertinent public health issues,
              invite guest speakers, and work on committee projects.
            </p>
            <p className="text-lg font-semibold text-[#0a1628] mb-2">
              All UNC students are welcome!
            </p>
            <p className="text-gray-600">
              Follow us on Instagram <a href="https://www.instagram.com/globemedatunc/" target="_blank" rel="noopener noreferrer" className="text-[#0047bb] hover:underline">@globemedatunc</a> for meeting times and locations.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Link */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0a1628] rounded-2xl p-12 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Support ASSADE Directly?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Visit ASSADE&apos;s website to learn more about their work and donate directly.
            </p>
            <a
              href="https://www.assadeguatemala.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#0047bb] text-white px-8 py-4 rounded font-semibold hover:bg-[#002d72] transition-colors"
            >
              Visit ASSADE
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
