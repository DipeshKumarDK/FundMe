import React , {useEffect , useState , useRef} from "react";
import CampaignCard from "../../components/CampaignCard";
import loader from "../../assets/loader.svg";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import {changeSearch} from "../../actions/index"
import { useStateContext } from "../../context"; 

function CampaignsList({ isLoading, campaigns }) {
  const navigate = useNavigate();
  const [hi,setHi] = useState(null);
  const { getSearchCampaigns } = useStateContext();
  const dispatch = useDispatch();
  const search = useRef();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  const mySearch=useSelector((state)=>
  state.changeSearch
  );

  const fetchSearch = async () => {
    try{
    if(mySearch!==null){  
    const data = await getSearchCampaigns(mySearch);
    setHi(data)
    }
    }catch(e){
      console.log(e)
    }
  };

  useEffect(() => {
    fetchSearch();
    dispatch(changeSearch(null));
  }, [mySearch])

  const Search = () => {
    dispatch(changeSearch(search.current.value));
    navigate("/all")
  }

  return (
    <div className="wt:bg-slate-800 min-h-[450px] bg-slate-700 xl:pl-32 lg:pl-24 sm:pl-12 lg:pr-32 xl:pr-32 sm:pr-12 pl-3 pr-3">
      <div className="flex flex-wrap gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] mt-[20px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] mt-[20px] leading-[30px] text-[#818183]">
            No Campaigns found.
          </p>
        )}
      </div>
      <div className="w-full sm:hidden mt-3">
      <div className="lg:flex flex flex-row py-2 pl-4 pr-2 h-[44px] bg-slate-600 rounded-[100px]">
            <input ref={search}
              type="text"
              placeholder="Search for campaigns"
              className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#bfc8de] text-white bg-transparent outline-none"
            />

            <div className="w-[30px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer" onClick={Search}>
              <FiSearch className="w-[15px] h-[15px] text-white object-contain" />
            </div>
          </div>
        </div>
      <div className={`grid xl:grid-cols-4 ${hi===null ? "" : "hidden"} md:grid-cols-3 pt-4 pb-4 sm:grid-cols-2 grid-cols-1 items-baseline`}>
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <CampaignCard
              key={campaign?.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
      <div className={`grid xl:grid-cols-4 ${hi===null ? "hidden" : ""} md:grid-cols-3 pt-4 pb-4 sm:grid-cols-2 grid-cols-1 items-baseline`}>
        {!isLoading &&
          hi?.length > 0 &&
          hi?.map((campaign) => (
            <CampaignCard
              key={campaign?.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
}

export default CampaignsList;
