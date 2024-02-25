const paths = {
  homePage() {
    return "/";
  },
  categoriesPage() {
    return "/category";
  },

  showCategory(id: string) {
    return `/category/${id}`;
  },
};

export default paths;
