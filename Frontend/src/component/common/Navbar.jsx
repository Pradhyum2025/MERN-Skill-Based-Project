import { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiGlobe, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(3);
  const [showDropdown, setShowDropdown] = useState("");
  const navigate = useNavigate();
  const bag= useSelector(store=>store.bag);

  const categories = [
    { name: "Smartphones", items: ["iPhone", "Samsung", "Google Pixel"] },
    { name: "Laptops", items: ["MacBook", "Dell XPS", "HP Spectre"] },
    { name: "Tablets", items: ["iPad", "Samsung Tab", "Surface Pro"] },
    { name: "Accessories", items: ["Cases", "Chargers", "Screen Protectors"] },
    { name: "Audio Equipment", items: ["Headphones", "Speakers", "Earbuds"] },
    { name: "Computer Components", items: ["CPUs", "GPUs", "RAM"] }
  ];

  const suggestions = [
    "iPhone 13 Pro",
    "MacBook Air M1",
    "Samsung Galaxy S21",
    "AirPods Pro",
    "Dell XPS 15"
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const HandleNavigateLogin=()=>{
   navigate('/');
   return document.getElementById('my_modal_3').showModal();
  }

  return (
    <nav className={`w-full fixed top-0 z-50 shadow-lg bg-white text-black`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center btn">
            E-commerce    
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative group"
                onMouseEnter={() => setShowDropdown(category.name)}
                onMouseLeave={() => setShowDropdown("")}
              >
                <button className="hover:text-blue-500 transition-colors text-sm font-[400]">
                  {category.name}
                </button>
                {showDropdown === category.name && (
                  <div className="absolute top-full left-0 w-48 bg-white  shadow-lg rounded-md py-2">
                    {category.items.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-sm font-[400] hover:bg-gray-100"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search, User, and Cart Section */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-100 "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute right-4 top-2.5 text-gray-400" />
              {searchQuery && (
                <div className="absolute top-full left-0 w-full bg-white  shadow-lg rounded-md mt-2">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion}
                      className="px-4 py-2 hover:bg-gray-100  cursor-pointer"
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">

              <div className="">
                <FiUser className="h-6 w-6 cursor-pointer" />
                <div className="w-[100px] absolute bg-gray-700 rounded text-sm text-white font-[500] top-[3.3rem] right-[.3rem] py-3">
                  <ul>
                    <li  className="pl-3 pr-[2rem] py-1  cursor-pointer hover:bg-gray-600">
                      <Link to={'/signup'}>
                      SignUp
                      </Link>
                      </li>
                    <li className="pl-3 pr-[2rem] py-1  cursor-pointer hover:bg-gray-500"
                    onClick={HandleNavigateLogin}
                    >
                      Login
                      </li>
                    <li className="pl-3 pr-[2rem] py-1 cursor-pointer hover:bg-gray-500">Help</li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <Link to={'/bag'}>
                <FiShoppingCart className="h-6 w-6 cursor-pointer" />
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {bag?.length || 0}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {categories.map((category) => (
              <div key={category.name} className="block px-3 py-2">
                <button
                  className="w-full text-left"
                  onClick={() => setShowDropdown(showDropdown === category.name ? "" : category.name)}
                >
                  {category.name}
                </button>
                {showDropdown === category.name && (
                  <div className="ml-4 mt-2 space-y-2">
                    {category.items.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;  