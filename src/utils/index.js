export const createPageUrl = (pageName) => {
  // This is a placeholder. In a real application, you would
  // have a more sophisticated way to generate URLs.
  switch (pageName) {
    case "Map":
      return "/";
    default:
      return `/${pageName.toLowerCase()}`;
  }
};
