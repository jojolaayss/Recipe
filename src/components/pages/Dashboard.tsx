import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Recipe } from "../../types/recipetype";
import { getAllRecipesApi } from "../../apis/recipes";
import ControlAdd from "../recipe/ControlAdd";
import ControlView from "../recipe/Changedata";
import RecipeFilter from "../recipe/RecipeFilter";
import SearchBar from "../recipe/SearchBar";
import api from "../../apis/userapi";

interface User {
  id: number;
  username: string;
  email: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;

      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
        fetchUser();
      }
    } else {
      fetchUser();
    }
  }, []);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [filters, setFilters] = useState<{
    difficulty?: string;
    cuisine?: string;
    mealType?: string;
  }>({});

  const [activeView, setActiveView] = useState<
    "recipes" | "controlView" | "controlAdd"
  >("recipes");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const data = await getAllRecipesApi();
        setAllRecipes(data);
        setFilteredRecipes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="relative min-h-screen">
      <nav className="top-0 left-0 right-0 z-10 w-full bg-fuchsia-200 border-default flex items-center px-4 py-3 gap-4">
        <div className="mr-2">
          {" "}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 bg-fuchsia-200 text-black rounded-md"
          >
            ☰
          </button>
        </div>
        <p className="font-bold text-lg ml-2">FOODY</p>{" "}
        <div className="flex-1 flex justify-center">
          <SearchBar
            allRecipes={allRecipes}
            filters={filters}
            onResults={(recipes) => {
              setFilteredRecipes(recipes);
            }}
          />
        </div>
        <div className="relative ml-4">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
          >
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="user"
            />
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border  rounded-2xl shadow-lg z-50">
              <div className="px-4 py-3  border-default-medium">
                <p className="text-sm font-medium text-heading">
                  {user?.username || "Guest"}
                </p>
                <p className="text-sm text-body truncate">
                  {user?.email || "guest@example.com"}
                </p>
              </div>
            </div>
          )}
        </div>
      </nav>

      <aside
        className={`
    fixed top-0 left-0 z-20 w-64 h-full bg-fuchsia-200 border-default
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    flex flex-col justify-between
  `}
      >
        <div>
          <div className="flex justify-end p-2">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-black bg-fuchsia-200 p-1 rounded-md hover:bg-fuchsia-400"
            >
              ✕
            </button>
          </div>

          <ul className="space-y-5 font-medium p-4 mt-4 sm:mt-0">
            <li className="block ">
              <p className="text-lg font-semibold text-gray-500 uppercase mb-1">
                Main Menu
              </p>
            </li>
            <li className="mt-2 sm:mt-4 lg:mt-0">
              <button
                onClick={() => setActiveView("recipes")}
                className={`w-full text-left p-2 rounded ${
                  activeView === "recipes"
                    ? "bg-neutral-tertiary text-heading"
                    : "hover:bg-neutral-tertiary hover:text-heading"
                }`}
              >
                Recipes
              </button>
            </li>
            <li>
              <details className="group">
                <summary className="cursor-pointer p-2 rounded hover:bg-neutral-tertiary hover:text-heading">
                  Controls
                </summary>
                <ul className="pl-4 mt-1 space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveView("controlView")}
                      className={`w-full text-left p-2 rounded ${
                        activeView === "controlView"
                          ? "bg-neutral-tertiary text-heading"
                          : "hover:bg-neutral-tertiary hover:text-heading"
                      }`}
                    >
                      View & edit Recipes
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveView("controlAdd")}
                      className={`w-full text-left p-2 rounded ${
                        activeView === "controlAdd"
                          ? "bg-neutral-tertiary text-heading"
                          : "hover:bg-neutral-tertiary hover:text-heading"
                      }`}
                    >
                      Add Recipe
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <div className="p-4">
          <button
            onClick={logout}
            className="w-full text-center p-2 rounded shadow-2xl border-b-2 border-fuchsia-700 bg-fuchsia-400 hover:bg-fuchsia-700 hover:text-white transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="p-4 mt-20 mx-auto max-w-6xl">
        {activeView === "recipes" && (
          <div className="flex justify-center mb-6">
            <RecipeFilter
              recipes={allRecipes}
              onFilterChange={(newFilters) => setFilters(newFilters)}
            />
          </div>
        )}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                role="status"
                className="max-w-sm p-4 border border-default rounded-base shadow-xs animate-pulse md:p-6"
              >
                <div className="flex items-center justify-center h-48 max-w-sm bg-neutral-quaternary rounded-base animate-pulse mb-4 sm:mb-6">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ))}
          </div>
        ) : activeView === "recipes" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="  rounded-2xl p-4 shadow hover:shadow-2xl transition  outline-gray-300"
              >
                <img
                  src={recipe.image || "/placeholder.png"}
                  alt={recipe.name}
                  className="w-full h-40 object-cover rounded-base mb-2"
                />
                <h3 className="font-bold">{recipe.name}</h3>
                <p>Prep Time: {recipe.prepTimeMinutes} mins</p>
                <p>Difficulty: {recipe.difficulty}</p>
              </div>
            ))}
          </div>
        ) : activeView === "controlView" ? (
          <ControlView recipes={allRecipes} setRecipes={setAllRecipes} />
        ) : (
          <ControlAdd setRecipes={setAllRecipes} />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
