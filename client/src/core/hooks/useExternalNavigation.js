const EXTERNAL_LINKS = {
  githubProject: "https://github.com/agustin-salva-dev/to-do-app",
  githubProfile: "https://github.com/agustin-salva-dev",
  githubRepos: "https://github.com/agustin-salva-dev?tab=repositories",
  linkedin: "https://www.linkedin.com/in/agustin-salva-dev/",
};

export const useExternalNavigation = () => {
  const openLink = (url) => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  return {
    goToGitHubProject: () => openLink(EXTERNAL_LINKS.githubProject),
    goToGitHubProfile: () => openLink(EXTERNAL_LINKS.githubProfile),
    goToGitHubRepos: () => openLink(EXTERNAL_LINKS.githubRepos),
    goToLinkedIn: () => openLink(EXTERNAL_LINKS.linkedin),
    openCustomLink: (url) => openLink(url),
  };
};
