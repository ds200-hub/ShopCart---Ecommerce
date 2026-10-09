import { useEffect, useState } from "react";
import { FiUser, FiPackage, FiPhone, FiMail, FiMapPin, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;

function Account() {
  const navigate = useNavigate();
  const [listOfOrders, setListOfOrders] = useState([]);
  const [user, setUser] = useState({
    Name: "",
    Year: null,
    Email: ""
  });

  console.log(user);

  const checkUser = async () => {
    try {
      const user = await axios.get(`${URL}/userVerification`, { params:{role: "user"}, withCredentials: true });

      const { success, name, year, email, userId, role } = user.data;
      if(success && role != "user"){
        navigate("/Login");
      }
      const orderedItems = await axios.post(`${URL}/user/account`, { userId });
      const { orders } = orderedItems.data;

      if (!success) {
        navigate("/Login");
        return;
      }

      setUser({
        Name: name,
        Year: year,
        Email: email
      });

      setListOfOrders(orders);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleLogout = async () => {
    const res = await axios.post(`${URL}/deleteCookie`, {role: "user"}, { withCredentials: true });
    const { success } = res.data;
    if (success) {
      navigate("/Login");
      return;
    }
  };

  console.log(listOfOrders);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full grow">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          My Account
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Account Holder Details */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-fit">
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-4">
              <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold">
                <FiUser />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">{user.Name}</h2>
                <p className="text-xs text-gray-500">Member since {user.Year}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-3">
                <FiMail className="text-orange-500 text-base" />
                <span>{user.Email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-orange-500 text-base" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-3">
                <FiMapPin className="text-orange-500 text-base mt-0.5" />
                <span>House No. 123, Flat Street Area, New Delhi - 110001</span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-200 text-red-600 font-semibold py-2.5 px-4 rounded-xl transition duration-200"
            >
              <FiLogOut className="text-lg" />
              <span>Log Out</span>
            </button>
          </div>

          {/* Right: Orders History */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3">
              <FiPackage className="text-orange-500" />
              <h2>Order History</h2>
            </div>

            <div className="space-y-4">

              {listOfOrders.map((order, idx) => (

                <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition">
                  <div className="flex flex-wrap justify-between items-center gap-2 border-b border-gray-100 pb-3 mb-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-gray-500">Order ID: </span>
                      <span className="font-semibold text-gray-800">#{order.orderId}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Date: </span>
                      <span className="font-medium text-gray-700">{order.dateOfOrder}</span>
                    </div>
                    <span className="bg-green-100 text-green-700 font-semibold text-xs px-2.5 py-0.5 rounded-full">
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <img
                      src={`${order.productImg}`}
                      alt="Product"
                      className="w-16 h-16 object-contain bg-gray-50 rounded-lg p-1 border border-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {order.productName}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">Quantity: {order.productQty}</p>
                      <p className="text-sm font-bold text-gray-900 mt-1">₹{order.productTotalPrice}</p>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Account;