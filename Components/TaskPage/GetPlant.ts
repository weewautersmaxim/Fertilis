export const plant = (plant: any) => {
  switch (plant) {
    case "Ivy":
      return require("../../assets/Plants/plantIcons/Plant1.png");
    case "Basil":
      return require("../../assets/Plants/plantIcons/Plant2.png");
    case "Kunal":
      return require("../../assets/Plants/plantIcons/Plant3.png");
    default:
      return require("../../assets/Plants/plantIcons/Plant4.png");
  }
};
