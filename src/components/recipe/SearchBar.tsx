import { useEffect, useState } from "react";
import type { Recipe } from "../../types/recipetype";
import { searchRecipesApi } from "../../apis/recipes";
import useDebounce from "../../management/useDebounce";

type SearchBarProps = {
  allRecipes: Recipe[];
  filters: {
    difficulty?: string;
    cuisine?: string;
    mealType?: string;
  };
  onResults: (recipes: Recipe[]) => void;
  onSearchState?: (loading: boolean) => void;
  defaultQuery?: string;
  debounceMs?: number;
};

export default function SearchBar({
  allRecipes,
  filters,
  onResults,
  onSearchState,
  defaultQuery = "",
  debounceMs = 400,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(defaultQuery);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  useEffect(() => {
    let cancelled = false;

    const fetchSearch = async () => {
      setLoadingSearch(true);
      onSearchState?.(true);

      try {
        let searchedRecipes: Recipe[] = [];

        if (debouncedSearchTerm.trim()) {
          const response = await searchRecipesApi(debouncedSearchTerm, {
            limit: 100,
          });
          searchedRecipes = response.data?.recipes ?? [];
        } else {
          searchedRecipes = allRecipes;
        }

        let filtered = searchedRecipes;
        if (filters.difficulty)
          filtered = filtered.filter(
            (r) => r.difficulty === filters.difficulty
          );
        if (filters.cuisine)
          filtered = filtered.filter((r) => r.cuisine === filters.cuisine);
        if (filters.mealType)
          filtered = filtered.filter((r) =>
            r.mealType?.includes(filters.mealType!)
          );

        if (!cancelled) onResults(filtered);
      } catch (err) {
        console.error("Search error:", err);
        if (!cancelled) onResults(allRecipes);
      } finally {
        if (!cancelled) {
          setLoadingSearch(false);
          onSearchState?.(false);
        }
      }
    };

    fetchSearch();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearchTerm, filters, allRecipes, onResults, onSearchState]);
  return (
    <div className="relative flex-1 max-w-md ml-4">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border-2 border-gray-400 outline-none focus:border-black transition"
      />
      {loadingSearch && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          Loading...
        </div>
      )}
    </div>
  );
}
