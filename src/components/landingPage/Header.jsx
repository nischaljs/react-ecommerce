import { CiLocationOn } from 'react-icons/ci';
import { FaShippingFast } from 'react-icons/fa';
import { RiArrowGoBackLine, RiSecurePaymentFill } from 'react-icons/ri';
import Navbar from './Navbar';

const Header = () => {



  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-xs border-b border-gray-100 bg-gray-800 px-4">
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white hover:text-primary flex items-center gap-2"> <CiLocationOn size={16} />Ship to: Nepal</a>

          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white hover:text-primary flex items-center gap-2"> <FaShippingFast size={16} />Trusted Shipping</a>
            <a href="#" className="text-white hover:text-primary flex items-center gap-2"> <RiArrowGoBackLine size={16} />Easy Returns</a>
            <a href="#" className="text-white hover:text-primary flex items-center gap-2"> <RiSecurePaymentFill size={16} />Secure Shopping</a>

          </div>
        </div>

        <Navbar />
      </div>
    </header>
  );
};

export default Header; 