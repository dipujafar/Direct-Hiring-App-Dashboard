import dollarImage from "@/assets/image/DollarBlueIcon.png"
import dollarImage2 from "@/assets/image/DollarYellowIcon.png"
import Image from "next/image";

const EarningStatic = () => {
  return (
    <div className="flex gap-5">
      <div
        className={`bg-[#E6F4EA] rounded-3xl p-6 shadow-sm flex-1`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center  `}
          >
            <Image  src={dollarImage} alt="dollar_icon"></Image>
          </div>
          <div>
            <p className="text-[#333] text-xl">Today Income</p>
            <p className="text-xl font-semibold text-[#33A954]">$500.99</p>
          </div>
        </div>
      </div>
      {/* =============== total earning ============ */}
      <div
        className={`bg-[#E6F4EA] rounded-3xl  p-6 shadow-sm flex-1`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center  `}
          >
           <Image  src={dollarImage2} alt="dollar_icon"></Image>
          </div>
          <div>
            <p className="text-[#333] text-xl">Total Earning</p>
            <p className="text-xl font-semibold text-[#FFB468]">$5000.09</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningStatic;
