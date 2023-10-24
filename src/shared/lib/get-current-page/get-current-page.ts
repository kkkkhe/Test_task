export const getCurrentPage = () => {
  const url = new URL(window.location.href);
  const currentPage = url.searchParams.get("page") || "1";
  return +currentPage;
};
