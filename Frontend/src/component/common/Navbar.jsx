import { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiGlobe, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../../operations/auth";
import { MdOutlineLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { MdOutlineSell } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState("");
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bag = useSelector(store => store.bag);

  const currUser = useSelector(store => store.auth);


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

  const currPath = useLocation().pathname;
  const handleNavigateLogin = () => {
    if (currPath === '/signup') {
      navigate('/');
    }
    return document.getElementById('my_modal_3').showModal();
  }

  const handleSignOut = () => {
    return signOut(dispatch, navigate, setUserDropdown);
  }

  return (
    <nav className={`w-full fixed top-0 z-50 shadow-lg bg-white text-black`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to={'/'}>
            <div className="flex items-center btn  w-[8rem]">
              E-commerce
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
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
          <div className="hidden sm:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="xl:w-64 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-100 "
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

              <div className="relative group"
                onMouseEnter={() => setUserDropdown(() => true)}
                onMouseLeave={() => setUserDropdown(() => false)}
              >
                <FiUser className="h-6 w-6 cursor-pointer" />

                {/* User account options */}
                {userDropdown ?
                  <>
                    {(currUser?.email) ? (
                      <div className="absolute top-full  right-[-70px] w-[10rem] bg-white  shadow-lg rounded-md py-2 mt-0">
                        {currUser.accountType === 'Buyer'
                          &&
                          <>
                            <Link
                              to={'/profile'}
                              className="block px-4 py-2 text-sm font-[600] hover:bg-gray-100 flex items-center gap-2"
                            >
                              <FaRegUserCircle className="text-lg" />
                              Profile
                            </Link>
                            <Link
                              to={'/my-order'}
                              className="block px-4 py-2 text-sm font-[600] hover:bg-gray-100 flex items-center gap-2"
                            > <FiBox className="text-lg" />
                              My Order
                            </Link>
                            <Link
                              to={'/become-seller'}
                              className="block px-4 py-2 text-sm font-[600] hover:bg-gray-100 flex items-center gap-2"
                            >
                              <MdOutlineSell className="text-lg" />
                              Become a Seller
                            </Link>
                          </>
                        }
                        {(currUser.accountType === 'Admin' || currUser.accountType === 'Seller')
                          &&
                          <>
                            <Link
                              to={'/dashbord'}
                              className="block px-4 py-2 text-sm  font-[600] hover:bg-gray-100 flex items-center gap-1"
                            >
                              <RxDashboard className="text-lg" />
                              Dashbord
                            </Link>
                            <Link
                              to={'/dashbord'}
                              className="block px-4 py-2 text-sm font-[600] hover:bg-gray-100 flex items-center gap-1"
                            >
                              <IoSettingsOutline className="text-lg" />
                              Setting
                            </Link>

                          </>
                        }
                        <p
                          onClick={handleSignOut}
                          className="block px-4 py-2 text-sm font-[600] hover:bg-gray-100 cursor-pointer flex items-center gap-1"
                        >
                          <MdOutlineLogout className="text-lg" /> Logout
                        </p>
                      </div>
                    ) : (
                      <div className="absolute top-full  right-[-70px] w-[8.2rem] bg-white  shadow-lg rounded-md py-2 mt-0">
                        <Link
                          to={'/signup'}
                          className="block px-4 py-2 text-sm  font-[600] hover:bg-gray-100 flex items-center gap-1  "
                        >
                          Signup
                        </Link>

                        <p
                          onClick={handleNavigateLogin}
                          className="block px-4 py-2 text-sm font-[600] hover:bg-gray-100 cursor-pointer"
                        >
                          Login
                        </p>

                        <p
                          className="block px-4 py-2 text-sm font-[600] hover:bg-gray-100 cursor-pointer"
                        >
                          Help
                        </p>
                      </div>
                    )}
                  </> :
                  null
                }

              </div>

              {currUser.accountType === 'Buyer' &&
                <div className="relative">
                  <Link to={'/bag'}>
                    <FiShoppingCart className="h-6 w-6 cursor-pointer" />
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {bag?.length || 0}
                    </span>
                  </Link>
                </div>
              }
            </div>
          </div>

          <div className="flex items-center justify-end pr-5 space-x-4 w-full sm:hidden">

            <div className="relative group"
              onMouseEnter={() => setUserDropdown(() => true)}
              onMouseLeave={() => setUserDropdown(() => false)}
            >
              <FiUser className="h-6 w-6 cursor-pointer" />


              {/* For responsive */}
              {userDropdown ?
                <>
                  {(currUser?.email) ? (
                    <div className="absolute top-full  right-[-96px] w-[10rem] bg-white  shadow-lg rounded-md py-2 mt-0">
                      {/* Buyer */}
                      {currUser.accountType === 'Buyer'
                        &&
                        <>
                          <Link
                            to={'/profile'}
                            className="block px-4 py-2 text-sm font-[600] hover:bg-gray-100 flex items-center gap-2"
                          >
                            <FaRegUserCircle className="text-lg" />
                            Profile
                          </Link>
                          <Link
                            to={'/my-order'}
                            className="block px-4 py-2 text-sm font-[600] hover:bg-gray-100 flex items-center gap-2"
                          > <FiBox className="text-lg" />
                            My Order
                          </Link>
                          <Link
                            to={'/become-seller'}
                            className="block px-4 py-2 text-sm font-[600] hover:bg-gray-100 flex items-center gap-2"
                          >
                            <MdOutlineSell className="text-lg" />
                            Become a Seller
                          </Link>
                        </>
                      }
                      {(currUser.accountType === 'Admin' || currUser.accountType === 'Seller')
                        &&
                        <>
                          <Link
                            to={'/dashbord'}
                            className="block px-4 py-2 text-sm  font-[600] hover:bg-gray-100 flex items-center gap-2"
                          >
                            <RxDashboard className="" />
                            Dashbord
                          </Link>
                          <Link
                            to={'/dashbord'}
                            className="block px-4 py-2 text-sm font-[600] hover:bg-gray-100 flex items-center gap-2"
                          >
                            <IoSettingsOutline  className=""/>
                            Setting
                          </Link>

                        </>
                      }
                      <p
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm font-[600] hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      >
                        <MdOutlineLogout className="" /> Logout
                      </p>
                    </div>
                  ) : (
                    <div className="absolute top-full  right-[-54px] w-[7rem] bg-white  shadow-lg rounded-md py-2 mt-0">
                      <Link
                        to={'/signup'}
                        className="block px-4 py-2 text-sm  font-[600] hover:bg-gray-100 flex items-center gap-1 "
                      >
                        Signup
                      </Link>

                      <p
                        onClick={handleNavigateLogin}
                        className="block px-4 py-2 text-sm  font-[600] hover:bg-gray-100 flex items-center gap-1"
                      >
                        Login
                      </p>

                      <p
                        className="block px-4 py-2 text-sm  font-[600] hover:bg-gray-100 flex items-center gap-1 "
                      >
                        Help
                      </p>
                    </div>
                  )}
                </> :
                null
              }

            </div>

            {/* Bag */}
            {currUser.accountType === 'Buyer' &&
              <div className="relative">
                <Link to={'/bag'}>
                  <FiShoppingCart className="h-6 w-6 cursor-pointer" />
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {bag?.length || 0}
                  </span>
                </Link>
              </div>
            }
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
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
                  <div className="lg:ml-4 mt-2 space-y-2">
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