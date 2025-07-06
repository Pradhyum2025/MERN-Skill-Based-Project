import React, { useState, useEffect } from 'react';
import { User, Phone, ShoppingBag, Star } from 'lucide-react';

const UserDataDisplay = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // Generate random rating between 1-10
  const generateRandomRating = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:8080/auth/alluser');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.currUser) {
          const processedUsers = data.currUser.map(user => ({
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            contact: user.contact,
            orders: user.myOrders ? user.myOrders.length : 0,
            rating: generateRandomRating(),
            image: user.image,
            email: user.email
          }));
          setUsers(processedUsers);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Users</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Dashboard</h1>
          <p className="text-gray-600">Overview of all registered users</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
            >
              {/* User Avatar */}
              <div className="flex items-center justify-center mb-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
              </div>

              {/* User Name */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              {/* User Stats */}
              <div className="space-y-3">
                {/* Contact */}
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">{user.contact}</span>
                </div>

                {/* Orders */}
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">
                    {user.orders} {user.orders === 1 ? 'Order' : 'Orders'}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-purple-600" />
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-700 mr-2">
                      {user.rating}/10
                    </span>
                    <div className="flex space-x-1">
                      {renderStars(user.rating)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Status Badge */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.orders > 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {user.orders > 0 ? 'Active Customer' : 'New User'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{users.length}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {users.reduce((sum, user) => sum + user.orders, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {users.filter(user => user.orders > 0).length}
              </p>
              <p className="text-sm text-gray-600">Active Customers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {(users.reduce((sum, user) => sum + user.rating, 0) / users.length).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDataDisplay;