// import image1 from '../../assets/Monochrome Architectural Drama.jpeg';
// import image2 from '../../assets/Collaborative Work Setting in Black and White.jpeg';

function ImprovedPromoBanners() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="relative overflow-hidden rounded-lg h-[150px] bg-black">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://cdn.pixabay.com/photo/2022/11/03/15/24/coffee-7567749_1280.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "right",
              opacity: 0.6,
            }}
          />
          <div className="relative z-10 p-6 flex flex-col h-full justify-center">
            <h2 className="text-3xl font-bold text-gray-100 leading-tight">
              The Only Online Home Service
              <br />
              You Need.
            </h2>
            <div className="mt-2">
              <a href="#" className="text-white text-sm font-medium hover:underline">
                Book now
              </a>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg h-[150px] bg-black">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_1280.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.8,
            }}
          />
          <div className="relative z-10 p-6 flex flex-col items-center justify-center h-full text-center">
            <p className="text-xs font-medium tracking-widest text-white uppercase">Brand Day</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 my-1">Get 30% OFF</h2>
            <div>
              <a href="#" className="text-white text-sm font-medium hover:underline">
                Book now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImprovedPromoBanners