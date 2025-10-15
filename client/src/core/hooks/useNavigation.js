import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();
  const goToFilteredTasks = (filterKey, filterValue) => {
    navigate(`/dashboard/filtered-tasks?${filterKey}=${filterValue}`);
  };
  return {
    goToHome: () => navigate("/"),
    goRegisterPage: () => navigate("/register"),
    goLoginPage: () => navigate("/login"),
    goToDashboard: () => navigate("/dashboard"),
    goToFilteredTasks,
  };
};
