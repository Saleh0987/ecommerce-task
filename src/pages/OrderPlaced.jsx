import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import checkmark from "../assets/checkmark.png";

const OrderPlaced = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2500);
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-center relative">
        <img className="absolute p-5" src={checkmark} alt="checkmark" />
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"></div>
      </div>
      <div className="text-center text-2xl font-semibold">
        Order Placed Successfully
      </div>
    </div>
  );
};

export default OrderPlaced;
