import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { axiosInstance } from "../lib/axios";
import { Menu, X } from "lucide-react";
import Logo from '../assets/logo.png'
import toast from "react-hot-toast";
export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      toast.success("you have seccufully logout")
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("error while  logout please try again ");

    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to='/'><img src={Logo} alt="Logo" className="w-12 h-12" /></Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="text-gray-700 hover:text-black">
              Home
            </Link>
          </li>
       
          {!user ? (
            <>
              <li>
                <Link to="/login" className="text-gray-700 hover:text-black">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-700 hover:text-black">
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>  <li>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-black"
              >
                Logout
              </button>
            </li>
            <li>
              <Link to="/sessions" className="text-gray-700 hover:text-black">mysessions</Link>
            </li>
            </>
          
          )}
          {
            user && (
              <li>
                <Link to="/profile" className="text-gray-700 hover:text-black">profile</Link>
              </li>)
          }
        </ul>
      </div>

      {isOpen && (
        <ul className="md:hidden bg-white border-t py-4 space-y-4 px-6">
          <li>
            <Link to="/" className="block text-gray-700 hover:text-black">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="block text-gray-700 hover:text-black">
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-black"
            >
              Contact
            </Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-black"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block text-gray-700 hover:text-black"
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
