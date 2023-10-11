import { Category } from "../types/category";

export const useCategoryStore = () => {
  return new CategoryStore();
}

class CategoryStore {
  _state: Ref<Category[]>;
  constructor() {
    this._state = useState('category', () => []);
  }

  get state(): Readonly<Ref<readonly Category[]>> {
    return readonly(this._state);
  }

  setCategory(category: Category[]) {
    this._state.value = category;
  }
}
