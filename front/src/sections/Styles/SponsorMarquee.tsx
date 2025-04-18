import { useEffect, useRef } from "react";

import sponsor1 from "../../../src/assets/a.png";
import sponsor2 from "../../../src/assets/shopee-logo.png";
import sponsor3 from "../../../src/assets/DeepSeek_logo.svg.png";
import sponsor4 from "../../../src/assets/shads.png";
import sponsor5 from "../../../src/assets/amazon-logo-transparent.png";
import sponsor6 from "../../../src/assets/Dribbble_logo.png";
import sponsor7 from "../../../src/assets/yt.jpg";
import sponsor8 from "../../../src/assets/Facebook-Logo-2019.png";
import sponsor9 from "../../../src/assets/github-logo-vector.png";

const sponsors = [
  { name: "Tech Co", image: sponsor1, color: "text-blue-500" },
  { name: "Design Studio", image: sponsor2, color: "text-purple-500" },
  { name: "Cloud Services", image: sponsor3, color: "text-sky-500" },
  { name: "Mobile App", image: sponsor4, color: "text-green-500" },
  { name: "Web Development", image: sponsor5, color: "text-amber-500" },
  { name: "Database Solutions", image: sponsor6, color: "text-red-500" },
  { name: "Creative Agency", image: sponsor7, color: "text-pink-500" },
  { name: "Social Network", image: sponsor8, color: "text-indigo-500" },
  { name: "E-commerce", image: sponsor9, color: "text-orange-500" },
];

export default function SponsorMarquee() {
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeAnimation = () => {
      if (marqueeRef1.current && marqueeRef2.current) {
        const speed = 0.5;

        const currentPosition1 = parseFloat(
          marqueeRef1.current.style.transform.replace("translateX(", "").replace("px)", "") || "0"
        );
        const currentPosition2 = parseFloat(
          marqueeRef2.current.style.transform.replace("translateX(", "").replace("px)", "") || "0"
        );

        const newPosition1 = currentPosition1 - speed;
        const newPosition2 = currentPosition2 - speed;

        const width = marqueeRef1.current.offsetWidth;

        marqueeRef1.current.style.transform = `translateX(${
          newPosition1 <= -width ? newPosition2 + width : newPosition1
        }px)`;
        marqueeRef2.current.style.transform = `translateX(${
          newPosition2 <= -width ? newPosition1 + width : newPosition2
        }px)`;
      }

      requestAnimationFrame(marqueeAnimation);
    };

    if (marqueeRef1.current && marqueeRef2.current) {
      const width = marqueeRef1.current.offsetWidth;
      marqueeRef1.current.style.transform = "translateX(0px)";
      marqueeRef2.current.style.transform = `translateX(${width}px)`;
    }

    const animationId = requestAnimationFrame(marqueeAnimation);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="mt-[-2rem] mb-[-5rem] relative overflow-hidden">
      <div className="relative overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 z-10 w-20 h-full bg-gradient-to-r from-white to-transparent" />
        <div className="absolute top-0 right-0 z-10 w-20 h-full bg-gradient-to-l from-white to-transparent" />

        {/* First marquee */}
        <div ref={marqueeRef1} className="flex items-center gap-12 py-6" style={{ whiteSpace: "nowrap" }}>
          {sponsors.map((sponsor, index) => (
            <div key={`sponsor1-${index}`} className="flex-shrink-0">
              <div className={`flex flex-col items-center justify-center p-4 ${sponsor.color}`}>
                <div className="p-4">
                  <img src={sponsor.image} alt={sponsor.name} className="w-50 h-50 object-contain" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second marquee */}
        <div
          ref={marqueeRef2}
          className="flex items-center gap-12 py-6 absolute top-0"
          style={{ whiteSpace: "nowrap" }}
        >
          {sponsors.map((sponsor, index) => (
            <div key={`sponsor2-${index}`} className="flex-shrink-0">
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}