import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);
  const goToExternalLink = (url) => {
    window.open(url, "_blank", "noopener noreferrer");
  };
  const goToFilteredTasks = (filterKey, filterValue, filterName) => {
    const url = `/dashboard/filtered-tasks?${filterKey}=${filterValue}&name=${encodeURIComponent(
      filterName
    )}`;
    navigate(url);
  };
  return {
    goToHome: () => navigate("/"),
    goToAboutMe: () => navigate("/about-me"),
    goRegisterPage: () => navigate("/register"),
    goLoginPage: () => navigate("/login"),
    goToDashboard: () => navigate("/dashboard"),
    goToFilteredTasks,
    navigateTo,
    goToExternalLink,
  };
};
