import "./CvCard.css";
import {LeftSite} from "./LeftSite";
import { Navbar } from "./Navbar/Navbar";
import {RightSite} from "./RightSite";

const CvCard: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <div className="Place">

      <LeftSite />
      <RightSite />
      </div>
    </div>
  );
};

export default CvCard;
