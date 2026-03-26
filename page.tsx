import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full shadow-2xl shadow-cyan-500/30 animate-bounce-slow">
          <i className="ri-check-line text-5xl text-white"></i>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Project Submitted Successfully!
        </h1>
        
        <p className="text-xl text-slate-600 mb-8">
          Thank you for choosing 7Figurestom. We've received your project details and our team will review them shortly.
        </p>

        {/* What's Next Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-left">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <i className="ri-roadmap-line text-cyan-500"></i>
            What happens next?
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Review & Analysis</h3>
                <p className="text-slate-600 text-sm">Our team will analyze your project requirements within 24 hours</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Strategy Call</h3>
                <p className="text-slate-600 text-sm">We'll reach out to schedule a discovery call to discuss your goals</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Custom Proposal</h3>
                <p className="text-slate-600 text-sm">Receive a tailored growth strategy and project roadmap</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg shadow-cyan-500/30 whitespace-nowrap"
          >
            <i className="ri-home-line mr-2"></i>
            Back to Home
          </button>
          
          <a
            href="http://instagram.com/7figurestom"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-50 transition-all border-2 border-slate-200 whitespace-nowrap"
          >
            <i className="ri-instagram-line mr-2"></i>
            Follow Us on Instagram
          </a>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-slate-600 mb-4">
            Need immediate assistance?
          </p>
          <a
            href="http://instagram.com/7figurestom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-600 hover:text-cyan-700 font-semibold inline-flex items-center gap-2"
          >
            <i className="ri-message-3-line"></i>
            Message us on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}