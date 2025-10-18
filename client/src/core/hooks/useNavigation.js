import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);
  const goToFilteredTasks = (filterKey, filterValue, filterName) => {
    const url = `/dashboard/filtered-tasks?${filterKey}=${filterValue}&name=${encodeURIComponent(
      filterName
    )}`;
    navigate(url);
  };
  return {
    goToHome: () => navigate("/"),
    goRegisterPage: () => navigate("/register"),
    goLoginPage: () => navigate("/login"),
    goToDashboard: () => navigate("/dashboard"),
    goToFilteredTasks,
    navigateTo,
  };
};
