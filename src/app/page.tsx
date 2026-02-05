import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section - Pfizer-style bold hero */}
      <section className="bg-[#0047bb] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-[#7eb8ff] font-semibold text-sm uppercase tracking-wider mb-4">
              Student-Led Global Health Organization
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Health is a human right
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              People deserve the right to not just survive, but thrive. We partner with communities
              to build sustainable solutions for global health equity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/get-involved"
                className="bg-white text-[#0047bb] px-8 py-4 rounded font-semibold hover:bg-blue-50 transition-colors text-center"
              >
                Get Involved
              </Link>
              <Link
                href="/our-partner"
                className="border-2 border-white text-white px-8 py-4 rounded font-semibold hover:bg-white hover:text-[#0047bb] transition-colors text-center"
              >
                Meet ASSADE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#0047bb]">800+</p>
              <p className="text-gray-600 mt-2 text-sm">Patients Served Monthly</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#0047bb]">60%</p>
              <p className="text-gray-600 mt-2 text-sm">Pediatric Patients</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#0047bb]">15+</p>
              <p className="text-gray-600 mt-2 text-sm">Years of Impact</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#0047bb]">1</p>
              <p className="text-gray-600 mt-2 text-sm">Global Partner</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#0047bb] font-semibold text-sm uppercase tracking-wider mb-4">
                About Us
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-6">
                Partnering for Global Health Equity
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  GlobeMed is a student-led organization that partners with and fundraises for our global partner
                  <strong className="text-[#0a1628]"> ASSADE</strong>, a Guatemalan grassroots nonprofit organization
                  that provides primary healthcare services to the population of San Andrés Itzapa and Chimaltenango.
                </p>
                <p>
                  In addition to our international partnership, we collaborate with various nonprofit
                  organizations in the Research Triangle Park area. Our work includes public health educational
                  outreach projects aimed at raising awareness and promoting education on important health topics
                  within the UNC community and among local high school and middle school students.
                </p>
              </div>
              <Link
                href="/our-partner"
                className="inline-flex items-center text-[#0047bb] font-semibold mt-6 hover:underline"
              >
                Learn more about ASSADE
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="bg-[#0047bb] rounded-2xl p-12 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-blue-100 leading-relaxed">
                At GlobeMed, we believe that health is a human right. Our goal is to produce leaders in
                public health and prepare them to create positive change in this world. We provide a space
                for students to think critically about issues in public health and connect with a national
                network of students committed to the same cause.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0047bb] font-semibold text-sm uppercase tracking-wider mb-4">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628]">
              Making an Impact
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-gray-50 rounded-xl p-8 h-full hover:bg-[#0047bb] transition-colors duration-300">
                <div className="w-14 h-14 bg-[#0047bb] group-hover:bg-white rounded-lg flex items-center justify-center mb-6 transition-colors duration-300">
                  <svg className="w-7 h-7 text-white group-hover:text-[#0047bb] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#0a1628] group-hover:text-white mb-4 transition-colors duration-300">
                  Fundraising
                </h3>
                <p className="text-gray-600 group-hover:text-blue-100 transition-colors duration-300">
                  Throughout the year, we host fundraising and volunteering events to raise money for ASSADE
                  and our local partners, directly supporting healthcare access in Guatemala.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gray-50 rounded-xl p-8 h-full hover:bg-[#0047bb] transition-colors duration-300">
                <div className="w-14 h-14 bg-[#0047bb] group-hover:bg-white rounded-lg flex items-center justify-center mb-6 transition-colors duration-300">
                  <svg className="w-7 h-7 text-white group-hover:text-[#0047bb] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#0a1628] group-hover:text-white mb-4 transition-colors duration-300">
                  Summer Internships
                </h3>
                <p className="text-gray-600 group-hover:text-blue-100 transition-colors duration-300">
                  Each summer, we send interns to Guatemala to work directly with ASSADE, gaining practical
                  insight into the challenges and rewards of international NGO work.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gray-50 rounded-xl p-8 h-full hover:bg-[#0047bb] transition-colors duration-300">
                <div className="w-14 h-14 bg-[#0047bb] group-hover:bg-white rounded-lg flex items-center justify-center mb-6 transition-colors duration-300">
                  <svg className="w-7 h-7 text-white group-hover:text-[#0047bb] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#0a1628] group-hover:text-white mb-4 transition-colors duration-300">
                  Weekly Meetings
                </h3>
                <p className="text-gray-600 group-hover:text-blue-100 transition-colors duration-300">
                  General body meetings where we discuss public health issues, host guest speakers,
                  and work on committee projects with tangible community impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Philosophy */}
      <section className="py-20 px-4 bg-[#0a1628] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#7eb8ff] font-semibold text-sm uppercase tracking-wider mb-4">
            Our Approach
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Partnership Philosophy
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            By partnering with communities abroad and close to home, students and communities are able to
            work in tandem to learn from one another and create a greater change. We believe in sustainable,
            community-driven solutions that empower local organizations to lead their own health initiatives.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#0047bb] to-[#002d72] rounded-2xl p-12 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join GlobeMed and become part of a community dedicated to improving global health equity.
            </p>
            <Link
              href="/get-involved"
              className="inline-block bg-white text-[#0047bb] px-8 py-4 rounded font-semibold hover:bg-blue-50 transition-colors"
            >
              Join Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
