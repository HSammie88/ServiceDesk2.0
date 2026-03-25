interface ICategory {
  category_id: number;
  category_name: string;
  category_depart: number;
  deleted: boolean;
}

interface ISubcategory {
  subcategories_id: number;
  subcategories_name: string;
  categories: number;
  deleted: boolean;
}

export { type ICategory, type ISubcategory };
