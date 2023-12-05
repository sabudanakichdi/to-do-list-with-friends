import axios from "axios";
import config from "../../../config.json";
const backendUrl = config.backendUrl;
const groupStats = async (group) => {
  try {
    const response = await axios.get(backendUrl + `api/dashboard/${group}/stats`);
    const data = response.data;
    console.log("Group Stats", data);
    return data;

  } catch (error) {
    console.error(error);
  }
};

export default groupStats;