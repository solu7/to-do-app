import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const goToFilteredTasks = (filterKey, filterValue, filterName) => {
    const params = new URLSearchParams();
    params.set(filterKey, filterValue);
    params.set("name", filterName);

    navigate(`/dashboard/filtered-tasks?${params.toString()}`);
  };
  return {
    goToHome: () => navigate("/"),
    goToAboutMe: () => navigate("/about-me"),
    goRegisterPage: () => navigate("/register"),
    goLoginPage: () => navigate("/login"),
    goToDashboard: () => navigate("/dashboard"),
    goToFilteredTasks,
  };
};
