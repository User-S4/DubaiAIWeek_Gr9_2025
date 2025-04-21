import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Twitter, Youtube, Mail } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 py-16">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M0,0 L100,0 L100,100 L0,100 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
              strokeDasharray="10,10" 
              className="text-white"
            />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-white/10 p-3">
                <Leaf className="h-10 w-10 text-primary-300" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold font-serif text-white mb-6">
              About EcoVoices
            </h1>
            
            <p className="text-lg text-white/80 mb-8">
              Amplifying sustainable solutions through conversations that matter
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6 text-center">
              Our Mission
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                EcoVoices was created with a singular purpose: to amplify the voices of those working to create a more sustainable and equitable world. We believe that informed conversations are a catalyst for meaningful change, and our mission is to provide a platform for the exchange of ideas, knowledge, and solutions that address our planet's most pressing environmental challenges.
              </p>
              
              <p>
                Through in-depth interviews, thoughtful discussions, and inspiring stories, we aim to bridge the gap between academic research, policy initiatives, grassroots movements, and everyday actions. Our podcast serves as both an educational resource and a source of inspiration, helping listeners understand complex sustainability issues while empowering them to take action in their own lives and communities.
              </p>
              
              <p>
                We are committed to highlighting diverse perspectives, innovative approaches, and proven solutions across the spectrum of environmental sustainability—from renewable energy and conservation to circular economy and climate justice. By bringing these voices together, we hope to foster a more nuanced understanding of the challenges we face and the paths forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-12 text-center">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Team Member 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden text-center">
              <div className="pt-8 px-8">
                <img
                  src="https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Elena Rodriguez"
                  className="w-32 h-32 object-cover rounded-full mx-auto shadow-md"
                />
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-1">
                  Elena Rodriguez
                </h3>
                
                <p className="text-primary-600 dark:text-primary-400 mb-2">
                  Host & Executive Producer
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Environmental journalist with over a decade of experience covering climate solutions and sustainability innovations.
                </p>
              </div>
              
              <div className="flex justify-center space-x-4 py-4 bg-gray-50 dark:bg-gray-700">
                <a href="#" className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                  <Mail size={18} />
                </a>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden text-center">
              <div className="pt-8 px-8">
                <img
                  src="https://images.pexels.com/photos/8434791/pexels-photo-8434791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Marcus Chen"
                  className="w-32 h-32 object-cover rounded-full mx-auto shadow-md"
                />
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-1">
                  Marcus Chen
                </h3>
                
                <p className="text-primary-600 dark:text-primary-400 mb-2">
                  Producer & Sound Engineer
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Audio production specialist with a background in environmental science, bringing technical expertise and scientific rigor to our episodes.
                </p>
              </div>
              
              <div className="flex justify-center space-x-4 py-4 bg-gray-50 dark:bg-gray-700">
                <a href="#" className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                  <Mail size={18} />
                </a>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden text-center">
              <div className="pt-8 px-8">
                <img
                  src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Aisha Johnson"
                  className="w-32 h-32 object-cover rounded-full mx-auto shadow-md"
                />
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-1">
                  Aisha Johnson
                </h3>
                
                <p className="text-primary-600 dark:text-primary-400 mb-2">
                  Research Director
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Environmental policy expert who ensures our content is well-researched, accurate, and provides context to complex sustainability issues.
                </p>
              </div>
              
              <div className="flex justify-center space-x-4 py-4 bg-gray-50 dark:bg-gray-700">
                <a href="#" className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6 text-center">
              Our Approach
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Solution-Focused
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We prioritize constructive conversations that highlight practical solutions rather than dwelling solely on problems. Each episode aims to leave listeners with actionable insights.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Evidence-Based
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our content is grounded in scientific research and verified data. We work with experts to ensure information is accurate, current, and presented with appropriate context.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Inclusive
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We actively seek diverse voices and perspectives, recognizing that the most effective sustainability solutions come from collaborative efforts across disciplines, cultures, and communities.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Engaging
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We believe that learning about sustainability should be accessible and engaging. We use storytelling techniques and clear language to make complex topics understandable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Get Involved */}
      <section className="py-16 bg-primary-800 dark:bg-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Get Involved
            </h2>
            
            <p className="text-white/80 mb-8">
              We're always looking for innovative sustainability stories, guest recommendations, and audience feedback. Let's work together to amplify sustainability solutions!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-12">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Contact Us
                </h3>
                <p className="mb-4 text-white/80">
                  Have questions, feedback, or want to suggest a topic or guest for the podcast?
                </p>
                <a href="#" className="flex items-center text-primary-300 hover:text-primary-200 transition-colors">
                  <Mail className="mr-2" size={18} />
                  contact@ecovoices.org
                </a>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Follow Us
                </h3>
                <p className="mb-4 text-white/80">
                  Stay connected with us on social media for updates, behind-the-scenes content, and sustainability news.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-primary-300 transition-colors">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="text-white hover:text-primary-300 transition-colors">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="text-white hover:text-primary-300 transition-colors">
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            <Link
              to="/episodes"
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full transition-colors shadow-md inline-block"
            >
              Explore Our Episodes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;