import { useCategoryStore } from "../store/useCategoryStore";
import { Category } from "../types/category";

export const fetchCategory = async (
  groupId: number,
) => {
  const apiUrl = `http://seisan.local:3001`;
  const { data: category }: { data: Ref<Category[]> } = await useFetch(
    `${apiUrl}/categories?groupId=${groupId.toString()}`
  );

  const categoryStore = useCategoryStore();
  categoryStore.setCategory(category.value);
}
