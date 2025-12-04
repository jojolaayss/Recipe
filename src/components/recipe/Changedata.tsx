import { useState } from "react";
import type { Recipe } from "../../types/recipetype";
import { deleteRecipeApi, updateRecipeApi } from "../../apis/recipes";
import { toast } from "react-toastify";

type ControlViewProps = {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

const ControlView = ({ recipes, setRecipes }: ControlViewProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Omit<Recipe, "id">>>({});

  const handleDelete = async (id: number) => {
    try {
      await deleteRecipeApi(id);
      setRecipes((prev) => prev.filter((r) => r.id !== id));
      toast.success("Recipe deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to Delete recipe");
    }
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingId(recipe.id);
    setEditData({
      name: recipe.name,
      prepTimeMinutes: recipe.prepTimeMinutes,
      difficulty: recipe.difficulty,
      cuisine: recipe.cuisine,
      mealType: recipe.mealType,
      image: recipe.image,
    });
  };

  const handleSave = async (id: number) => {
    try {
      const updated = await updateRecipeApi(id, editData);
      setRecipes((prev) => prev.map((r) => (r.id === id ? updated.data : r)));
      setEditingId(null);
      toast.success("Recipe updat successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to updat recipe");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className=" rounded-2xl p-4 shadow-2xl hover:shadow-lg transition"
        >
          {editingId === recipe.id ? (
            <>
              <input
                type="text"
                value={editData.name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="w-full mb-2 border p-1 rounded"
              />
              <input
                type="number"
                value={editData.prepTimeMinutes || 0}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    prepTimeMinutes: Number(e.target.value),
                  })
                }
                className="w-full mb-2 border p-1 rounded"
              />
              <input
                type="text"
                value={editData.difficulty || ""}
                onChange={(e) =>
                  setEditData({ ...editData, difficulty: e.target.value })
                }
                className="w-full mb-2 border p-1 rounded"
              />
              <input
                type="text"
                value={editData.cuisine || ""}
                onChange={(e) =>
                  setEditData({ ...editData, cuisine: e.target.value })
                }
                className="w-full mb-2 border p-1 rounded"
              />
              <input
                type="text"
                value={editData.image || ""}
                onChange={(e) =>
                  setEditData({ ...editData, image: e.target.value })
                }
                className="w-full mb-2 border p-1 rounded"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleSave(recipe.id)}
                  className="bg-fuchsia-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <img
                src={recipe.image || "/placeholder.png"}
                alt={recipe.name}
                className="w-full h-40 object-cover rounded-base mb-2"
              />
              <h3 className="font-bold">{recipe.name}</h3>
              <p>Prep Time: {recipe.prepTimeMinutes} mins</p>
              <p>Difficulty: {recipe.difficulty}</p>
              <p>Cuisine: {recipe.cuisine}</p>
              <div className="flex justify-center gap-5 mt-2">
                <button
                  onClick={() => handleEdit(recipe)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="bg-fuchsia-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ControlView;
