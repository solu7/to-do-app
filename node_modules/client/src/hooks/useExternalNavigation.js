export const useExternalNavigation = () => {
  return {
    goToGitHubProject: () =>
      window.open("https://github.com/solu7/to-do-app", "_blank"),
  };
};