import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Partner - ASSADE | GlobeMed at UNC',
  description: 'Learn about ASSADE, our global partner organization in Guatemala providing primary healthcare services to underserved communities.',
};

export default function OurPartner() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#0047bb] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-[#7eb8ff] font-semibold text-sm uppercase tracking-wider mb-4">
              Our Global Partner
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ASSADE
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Asociación de Salud y Desarrollo (ASSADE) is a non-governmental, non-profit organization
              offering primary health services to the population of San Andrés Itzapa and Chimaltenango, Guatemala.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#0047bb]">800+</p>
              <p className="text-gray-600 mt-2 text-sm">Patients Monthly</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#0047bb]">60%</p>
              <p className="text-gray-600 mt-2 text-sm">Children Served</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#0047bb]">35%</p>
              <p className="text-gray-600 mt-2 text-sm">HPV Rate in Region</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#0047bb]">1</p>
              <p className="text-gray-600 mt-2 text-sm">Regional Ultrasound</p>
            </div>
          </div>
        </div>
      </section>

      {/* About ASSADE */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-[#0047bb] font-semibold text-sm uppercase tracking-wider mb-4">
                About ASSADE
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-6">
                Healthcare for Communities in Need
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  ASSADE provides critical primary health services and health education to an average of
                  800 vulnerable persons monthly. Approximately 60% of the patients are children, and the
                  remainder are mostly women seeking essential healthcare services.
                </p>
                <p>
                  Through our partnership, GlobeMed at UNC raises funds and awareness to support
                  ASSADE&apos;s critical work. Each summer, we send interns to Guatemala to work directly
                  with ASSADE, gaining firsthand experience in international public health work.
                </p>
                <p>
                  ASSADE&apos;s community-driven approach ensures that healthcare solutions are sustainable
                  and responsive to the actual needs of the communities they serve.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#0a1628] mb-4">Location</h3>
                <p className="text-gray-600 mb-2">San Andrés Itzapa</p>
                <p className="text-gray-600">Chimaltenango, Guatemala</p>
              </div>
              <div className="bg-[#0047bb] rounded-xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Our Partnership</h3>
                <p className="text-blue-100">
                  GlobeMed at UNC works directly with ASSADE through fundraising, awareness campaigns,
                  and summer internship programs that send students to Guatemala.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0047bb] font-semibold text-sm uppercase tracking-wider mb-4">
              Healthcare Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628]">
              What ASSADE Provides
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-14 h-14 bg-[#0047bb] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#0a1628] mb-3">Women&apos;s Health</h3>
              <p className="text-gray-600 text-sm">
                HPV and cervical cancer detection using cryotherapy equipment, critical in a region where
                35% of indigenous women live with HPV.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-14 h-14 bg-[#0047bb] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#0a1628] mb-3">Diagnostic Services</h3>
              <p className="text-gray-600 text-sm">
                State-of-the-art ultrasound equipment—the only one available in this rural region—providing
                accurate diagnosis and quality treatment.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-14 h-14 bg-[#0047bb] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#0a1628] mb-3">Dental Clinic</h3>
              <p className="text-gray-600 text-sm">
                Oral healthcare services providing essential dental care to community members who would
                otherwise lack access.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-14 h-14 bg-[#0047bb] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#0a1628] mb-3">Health Education</h3>
              <p className="text-gray-600 text-sm">
                Community outreach and education programs promoting health awareness and preventive care
                practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Summer Internship Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#0047bb] font-semibold text-sm uppercase tracking-wider mb-4">
                Experiential Learning
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-6">
                Summer Internship Program
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Each summer, GlobeMed at UNC sends student interns to Guatemala to work directly
                with ASSADE. This immersive experience provides students with hands-on experience
                in international public health work.
              </p>
              <Link
                href="/get-involved"
                className="inline-flex items-center bg-[#0047bb] text-white px-6 py-3 rounded font-semibold hover:bg-[#002d72] transition-colors"
              >
                Learn About Opportunities
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#0a1628] mb-6">What Interns Gain</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-[#0047bb] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0a1628]">Hands-on Experience</h4>
                    <p className="text-gray-600 text-sm">Direct involvement in healthcare programs and community initiatives</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-[#0047bb] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0a1628]">Cultural Immersion</h4>
                    <p className="text-gray-600 text-sm">Understanding healthcare within the local cultural context</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-[#0047bb] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0a1628]">Professional Growth</h4>
                    <p className="text-gray-600 text-sm">Skills in international NGO operations and global health practice</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0a1628] rounded-2xl p-12 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Support Our Partnership</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Help us continue supporting ASSADE&apos;s vital healthcare work in Guatemala.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved"
                className="bg-[#0047bb] text-white px-8 py-4 rounded font-semibold hover:bg-[#002d72] transition-colors"
              >
                Get Involved
              </Link>
              <a
                href="https://www.assadeguatemala.com/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded font-semibold hover:bg-white hover:text-[#0a1628] transition-colors"
              >
                Donate to ASSADE
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
