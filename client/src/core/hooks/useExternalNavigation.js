const EXTERNAL_LINKS = {
  githubProject: "https://github.com/solu7/to-do-app",
  githubProfile: "https://github.com/solu7",
  linkedin: "https://www.linkedin.com/in/solu7/",
};

export const useExternalNavigation = () => {
  const openLink = (url) => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  return {
    goToGitHubProject: () => openLink(EXTERNAL_LINKS.githubProject),
    goToGitHubProfile: () => openLink(EXTERNAL_LINKS.githubProfile),
    goToLinkedIn: () => openLink(EXTERNAL_LINKS.linkedin),
    openCustomLink: (url) => openLink(url),
  };
};
