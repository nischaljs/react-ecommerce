import { FaFacebookF, FaTwitter, FaInstagram, FaApple, FaGooglePlay } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white">
              <span className="text-primary">V</span>eloura
            </h2>
            <p className="text-gray-400 mt-2">We're always here to help</p>
            <p className="text-gray-500 mt-2 text-sm">
              Shop confidently with our secure payment options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <MdLocationOn className="text-primary text-2xl" />
              <div>
                <p className="text-gray-300 font-medium">Help Center</p>
                <a
                  href="mailto:help@veloura.com"
                  className="text-primary text-sm hover:underline"
                >
                  help@veloura.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MdPhone className="text-primary text-2xl" />
              <div>
                <p className="text-gray-300 font-medium">Phone</p>
                <a
                  href="tel:+66597076760"
                  className="text-primary text-sm hover:underline"
                >
                  +66 59 707 6760
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MdEmail className="text-primary text-2xl" />
              <div>
                <p className="text-gray-300 font-medium">Email Support</p>
                <a
                  href="mailto:online@veloura.com"
                  className="text-primary text-sm hover:underline"
                >
                  online@veloura.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-t border-gray-700">
          <div className="col-span-1 md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Shop</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary text-sm">
                      Men's Clothing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary text-sm">
                      Women's Clothing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary text-sm">
                      Electronics
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary text-sm">
                      Home & Kitchen
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Customer Service</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary text-sm">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary text-sm">
                      Shipping & Returns
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary text-sm">
                      Order Tracking
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary text-sm">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">About Us</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary text-sm">
                      Our Story
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary text-sm">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary text-sm">
                      Sustainability
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary text-sm">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-4">
              <a
                href="#"
                className="flex items-center space-x-3 border border-gray-700 rounded-lg px-4 py-2 hover:border-primary transition-colors"
              >
                <FaApple className="text-primary text-2xl" />
                <span className="text-gray-300 font-medium">App Store</span>
              </a>

              <a
                href="#"
                className="flex items-center space-x-3 border border-gray-700 rounded-lg px-4 py-2 hover:border-primary transition-colors"
              >
                <FaGooglePlay className="text-primary text-2xl" />
                <span className="text-gray-300 font-medium">Google Play</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="#"
              className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-colors"
            >
              <FaInstagram />
            </a>
          </div>

          <div className="text-gray-500 text-sm">
            <p>© {currentYear}, Veloura. All rights reserved.</p>
          </div>

          <div className="flex justify-center md:justify-end space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary text-sm">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm">
              Contact
            </a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;