import image3 from "../../assets/Converging Giants_ A Symmetrical Skyscraper Ascent.jpeg"

export default function ProductShowcase() {
  return (
    <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto p-4">
      <div
        className="flex-1 rounded-lg overflow-hidden bg-black p-6 relative min-h-[300px] before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-30 before:z-0"
        style={{
          backgroundImage: `url('https://cdn.pixabay.com/photo/2017/04/25/22/28/despaired-2261021_1280.jpg')` ,
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <div className="z-10 relative">
          <h2 className="text-3xl font-bold text-gray-100 mb-1">
            Home Cleaning
            <br />
            Services
          </h2>
          <p className="text-gray-200 mb-2">Starting at ₱12,000</p>
        </div>
      </div>

      <div
        className="flex-1 rounded-lg overflow-hidden bg-black p-6 relative min-h-[300px] before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-40 before:z-0"
        style={{
          backgroundImage: `url('https://cdn.pixabay.com/photo/2018/03/27/21/43/startup-3267505_1280.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          position: "relative",
        }}
      >
        <div className="z-10 relative">
          <h2 className="text-3xl font-bold text-gray-100 mb-1">Handyman 
            <br />
            Services
          </h2>
          <p className="text-gray-200 mb-2">Starting at ₱5,499</p>
        </div>
      </div>

      <div
        className="flex-1 rounded-lg overflow-hidden bg-black p-6 relative min-h-[300px] before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-10 before:z-0"
        style={{
          backgroundImage: `url(${image3})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          position: "relative",
        }}
      >
        <div className="z-10 relative">
          <h2 className="text-3xl font-bold text-gray-100 mb-1">
            Plumbling
            <br />
            Services
          </h2>
          <p className="text-gray-200 mb-2">Starting at ₱8,000</p>
        </div>
      </div>
    </div>
  )
}