import { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiGlobe, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../../operations/auth";
import { MdOutlineLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { MdOutlineSell } from "react-icons/md";
import { getSearchingList, loadData } from "../../operations/search";
import { getAllCategories } from "../../operations/category";
import { getRelativeBrandProducts } from "../../operations/listing";

const Navbar = () => {
  const [searchData, setSerachData] = useState([]);
  const [loadingSearchData, setLoadingSerachData] = useState([])
  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState("");
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currPath = useLocation().pathname
  const bag = useSelector(store => store.bag);

  const currUser = useSelector(store => store.auth);

  const categories = useSelector(store => store.category);

  useEffect(() => {
    if (categories.length == 0) {
      getAllCategories(dispatch);
    }
    loadData(setSerachData, setLoadingSerachData);
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleNavigateLogin = () => {
    if (currPath === '/signup') {
      navigate('/');
    }
    return document.getElementById('my_modal_3').showModal();
  }

  const handleSignOut = () => {
    return signOut(dispatch, navigate, setUserDropdown);
  }

  const handleSearching = (e) => {
    const typedData = e.target.value.toLowerCase();
    const filterData = searchData.filter(
      (item) =>
        item.productName.toLowerCase().includes(typedData) ||
        item.brand.toLowerCase().includes(typedData) ||
        item.category.name.toLowerCase().includes(typedData)
    );
    if (typedData === '') {
      setData([])
    } else {
      setData([...filterData])
    }
  }

  const handleSearchItems = (listing) => {
    setData([])
    document.getElementById('searchBar').value = '';
    if (currPath !== '/search-result') {
      return navigate('/search-result', { state: { listingId: listing._id } })
    } else {
      if (listing._id) {
        getSearchingList(dispatch, listing._id)
      }
    }
  }

  const handleFetchBrandProduct = (brand,categoryId) => {
    if (currPath !== '/listings') {
      if(isOpen){
        setIsOpen(()=>false)
       }
      return navigate(`/listings?category=${categoryId}&brand=${brand}`)
    } else {
      const productInfo = {
        category:categoryId,
        brandName: brand.toUpperCase()
      }
      if(isOpen){
        setIsOpen(()=>false)
       }
       getRelativeBrandProducts(dispatch, productInfo);
       navigate(`/listings?category=${categoryId}&brand=${brand}`)
    }
  
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
                    {category.relativeBrands.map((brand) => (
                      <p
                        key={brand}
                        className="block px-4 py-2 text-sm font-[400] hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleFetchBrandProduct(brand,category._id)}
                      >
                        {brand && brand.charAt(0) + brand.substring(1, brand.length).toLowerCase()}
                      </p>
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
                id="searchBar"
                disabled={loadingSearchData}
                placeholder="Search products..."
                className="sm:w-[25rem] md:w-[19rem] lg:w-[18rem] xl:w-[25rem]  px-4 py-2  border focus:outline-none focus:ring-[1px] focus:ring-blue-300 bg-blue-50 disabled:cursor-not-allowed "
                // value={searchQuery}
                onChange={(e) => handleSearching(e)}
              />
              <FiSearch className="absolute right-4 top-2.5 text-gray-400" />
              {data.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white  shadow-lg rounded-md mt-2">
                  {data.map((suggestion) => (
                    <div
                      onClick={() => handleSearchItems(suggestion)}
                      key={suggestion._id}
                      className="px-4 py-2 hover:bg-gray-100  cursor-pointer flex items-center gap-2 font-[600] text-sm"
                    ><IoSearchOutline />
                      <span>{suggestion.brand.charAt(0) + suggestion.brand.toLowerCase().substring(1, suggestion.brand.length)}</span>
                      <span>{suggestion.category.name.charAt(0) + suggestion.category.name.toLowerCase().substring(1, suggestion.category.name.length)}</span>
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
                            <IoSettingsOutline className="" />
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
                    {category.relativeBrands.map((brand) => (
                      <p
                      key={brand}
                      className="block px-4 py-2 text-sm font-[400] hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleFetchBrandProduct(brand,category._id)}
                    >
                      {brand && brand.charAt(0) + brand.substring(1, brand.length).toLowerCase()}
                    </p>
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