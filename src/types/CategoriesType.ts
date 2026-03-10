interface ICategory {
  category_id: number;
  category_name: string;
  category_depart: number;
}

interface ISubcategory {
  subcategories_id: number;
  subcategories_name: string;
  categories: number;
}

export { type ICategory, type ISubcategory };
