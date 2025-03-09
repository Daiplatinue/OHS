import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

// Sample slideshow images
const slideshowImages = [
  {
    src: "https://cdn.pixabay.com/photo/2018/02/23/08/03/expression-3174967_1280.jpg",
    alt: "Fashion model with shopping bags",
  },
  {
    src: "https://cdn.pixabay.com/photo/2017/07/23/14/44/builder-2531572_1280.jpg",
    alt: "Urban fashion collection",
  },
  {
    src: "https://cdn.pixabay.com/photo/2017/09/14/12/19/building-2748841_960_720.jpg",
    alt: "Streetwear showcase",
  },
];

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side with image and description */}
      <div className="relative w-full md:w-1/2 overflow-hidden justify-center items-center p-8">
        <div className="relative h-full">
          {/* Slideshow */}
          <div className="relative h-full w-full rounded-full">
            {slideshowImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  activeSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="text-2xl font-semibold leading-relaxed">
              Urbanmusio is an online fashion store that provides a variety of clothes, shoes, bags, and accessories for
              men and women.
            </p>
          </div> */}

          {/* Slideshow indicators */}
          <div className="absolute top-5 left-0 right-0 flex justify-center gap-2">
            {slideshowImages.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-2 rounded-full transition-all ${
                  activeSlide === index ? "bg-white w-7" : "bg-white/50"
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center max-w-md mx-auto">
        <div className="mb-10">
          <h1 className="text-lg font-medium mb-1">
            HandyGo
          </h1>
          <h2 className="text-3xl font-bold text-sky-400">
            Welcome Back!
          </h2>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <a
                href="#"
                className="text-xs text-gray-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            className={`w-full bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-full h-12 font-medium transition-colors
              ${(!email || !password) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
            disabled={!email || !password}
          >
            Sign in
          </button>

          <div className="relative flex items-center justify-center text-xs text-gray-500 my-4 mt-[-15px]">
            <span className="bg-white px-2 mt-10">
              or sign in with
            </span>
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              className="flex items-center justify-center gap-2 rounded-full text-sm font-medium border border-gray-300 py-2 hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.1711 8.36788H17.5V8.33329H10V11.6666H14.6789C14.0454 13.6063 12.1909 15 10 15C7.23858 15 5 12.7614 5 10C5 7.23858 7.23858 5 10 5C11.2843 5 12.4565 5.48078 13.3569 6.28118L15.8211 3.81705C14.2709 2.32555 12.2539 1.42857 10 1.42857C5.25329 1.42857 1.42857 5.25329 1.42857 10C1.42857 14.7467 5.25329 18.5714 10 18.5714C14.7467 18.5714 18.5714 14.7467 18.5714 10C18.5714 9.43363 18.5214 8.88263 18.4257 8.34933L18.1711 8.36788Z"
                  fill="#FFC107"
                />
                <path
                  d="M2.62891 6.12416L5.5049 8.23416C6.25462 6.38155 7.9907 5 10.0003 5C11.2846 5 12.4568 5.48078 13.3572 6.28118L15.8214 3.81705C14.2712 2.32555 12.2542 1.42857 10.0003 1.42857C6.75891 1.42857 3.95498 3.39048 2.62891 6.12416Z"
                  fill="#FF3D00"
                />
                <path
                  d="M9.99968 18.5714C12.2018 18.5714 14.1761 17.7053 15.7129 16.2643L12.9975 13.9857C12.1368 14.6394 10.9979 15 9.99968 15C7.81968 15 5.97168 13.6161 5.33168 11.6875L2.49268 13.8946C3.80332 16.6768 6.64368 18.5714 9.99968 18.5714Z"
                  fill="#4CAF50"
                />
                <path
                  d="M18.1711 8.36795H17.5V8.33337H10V11.6667H14.6789C14.3746 12.5902 13.8055 13.3973 13.0578 13.9867L13.0589 13.986L15.7743 16.2646C15.6057 16.4196 18.5714 14.1667 18.5714 10.0001C18.5714 9.4337 18.5214 8.8827 18.4257 8.3494L18.1711 8.36795Z"
                  fill="#1976D2"
                />
              </svg>
              Google
            </button>
            <button
              className="flex items-center justify-center gap-2 rounded-full text-sm font-medium border border-gray-300 py-2 hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.0756 10.5C14.0654 9.25225 14.6607 8.10938 15.6725 7.4165C15.0908 6.54163 14.1432 5.97488 13.1166 5.9165C12.0287 5.80925 10.8854 6.56188 10.3332 6.56188C9.74844 6.56188 8.7666 5.94275 7.91094 5.94275C6.42969 5.96675 4.82656 7.07613 4.82656 9.34275C4.82656 10.0166 4.94219 10.7155 5.17344 11.4395C5.49531 12.4155 6.74219 15.2249 8.04219 15.1916C8.84844 15.1749 9.39844 14.6124 10.4332 14.6124C11.4322 14.6124 11.9412 15.1916 12.8412 15.1916C14.1578 15.1749 15.2791 12.6082 15.5834 11.6291C13.8537 10.8207 14.0756 10.5498 14.0756 10.5Z"
                  fill="black"
                />
                <path
                  d="M12.3084 4.6875C12.8209 4.06838 13.1178 3.25325 13.0459 2.5C12.2709 2.5835 11.5584 2.9585 11.0334 3.56675C10.5459 4.12263 10.2178 4.9585 10.3053 5.6875C11.1428 5.7335 11.7959 5.30663 12.3084 4.6875Z"
                  fill="black"
                />
              </svg>
              Apple ID
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">
            Don't have account?{" "}
            <a href="#" className="font-medium text-black hover:underline">
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;