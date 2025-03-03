import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useParams, useNavigate } from "react-router-dom";
import TagsDropdown from "../components/TagsDropdown";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

// Define TypeScript interfaces
interface Category {
  title: string;
  objectID: string;
}

interface Tag {
  title: string;
  objectID: string;
}

interface Offer {
  _id: string;
  subject: string;
  description: string;
  tags: string[];
  price: number;
  date: Date;
  dure: number;
}

export default function Offers(): JSX.Element {
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const { offer_type } = useParams<{ offer_type: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all offers
    fetchOffers();

    // Fetch categories
    axiosInstance
      .get("/categories")
      .then((response) => {
        const categories_data = response.data.map((categ: any) => {
          return { title: categ.title, objectID: categ._id };
        });
        setCategories(categories_data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, [offer_type]);

  // Fetch offers with optional category and tags
  const fetchOffers = async (
    categoryId?: string,
    tagTitles?: string[]
  ): Promise<void> => {
    try {
      const endpoint = categoryId
        ? `/offers/${offer_type}/category/${categoryId}`
        : `/offers/${offer_type}/category/all`;

      const response = await axiosInstance.get(endpoint, {
        params: { tags: tagTitles || null },
      });

      setOffers(response.data);
    } catch (err) {
      console.error("Error fetching offers:", err);
    }
  };

  const handleCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    const categoryId = e.target.value;

    if (!categoryId) {
      // Reset selection
      setSelectedCategory(null);
      setSelectedTags([]);
      fetchOffers();
      return;
    }

    // Find selected category
    const category =
      categories.find((cat) => cat.objectID === categoryId) || null;
    setSelectedCategory(category);
    setSelectedTags([]);

    try {
      // Fetch tags for selected category
      const tagsResponse = await axiosInstance.get(
        `/categories/${category?.title}/tags`
      );
      const tags_data = tagsResponse.data.tags.map(
        (tag: string, index: number) => ({
          title: tag,
          objectID: `tag-${index}`, // Generate unique objectID
        })
      );

      setAvailableTags(tags_data);

      // Fetch offers for selected category
      fetchOffers(categoryId);
    } catch (error) {
      console.error("Error loading category data:", error);
    }
  };

  // Handle tag selection changes (used by TagsDropdown component)
  const handleTagsChange = async (updatedTags: Tag[]): Promise<void> => {
    setSelectedTags(updatedTags);

    if (!selectedCategory) return;

    // Extract tag titles for API call
    const tagTitles =
      updatedTags.length > 0 ? updatedTags.map((t) => t.title) : null;

    fetchOffers(selectedCategory.objectID, tagTitles);
  };

  const toggleView = (): void => {
    setIsGridView(!isGridView);
  };

  // Handler for the Create Offer button
  const handleCreateOffer = (): void => {
    navigate(`/offers/${offer_type}/create`);
  };

  // Render offer card - extracted to ensure consistency between views
  // Render offer card with improved professional design
  // Render offer card with simple, comfortable styling
  const renderOfferCard = (offer: Offer, isInGrid: boolean) => {
    return (
      <div
        key={offer._id}
        className={`overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
          isInGrid ? "h-full flex flex-col" : "w-full"
        }`}
      >
        {/* Card Header */}
        <div className="border-b border-gray-100 bg-gray-50 p-4">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {offer.subject}
          </h2>
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col h-full">
          {/* Description */}
          <div className="mb-4 flex-grow">
            <p className="text-gray-600 line-clamp-3">{offer.description}</p>
          </div>

          {/* Details Section */}
          <div className="mb-4 space-y-2">
            <div className="flex items-center">
              <div className="mr-2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="font-medium text-gray-700">${offer.price}</span>
            </div>

            <div className="flex items-center">
              <div className="mr-2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="font-medium text-gray-700">
                {offer.dure} {offer.dure === 1 ? "hour" : "hours"}
              </span>
            </div>

            <div className="flex items-center">
              <div className="mr-2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="font-medium text-gray-700">
                {new Date(offer.date).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {offer.tags.map((tag, index) => (
                <div
                  key={index}
                  className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Button */}
          <div className="mt-auto pt-2">
            <button
              type="button"
              onClick={() => bookSession(offer._id, offer.creator_id)}
              className="w-full rounded bg-gray-800 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Book this session
            </button>
          </div>
        </div>
      </div>
    );
  };
  const bookSession = async (offer_id, creator_id) => {
    // await axiosInstance
    //   .post("/payments/create-checkout-session", {
    //     offer_id,
    //     payer:user._id
    //   })
    //   .then((data) => {
    //     window.location.href = data.data.url;
    //   })
    //   .catch((error) => {
    //     toast.error("Error booking session");
    //   });

    // return;

    if (!user) {
      toast.error("Please login to book a session");
      return;
    }
    if (creator_id == user._id) {
      toast.error("You can't book your own session");
      return;
    }
    const tutor_id = offer_type == "find_tutor" ? creator_id : user._id;
    const student_id = offer_type == "student_id" ? creator_id : user._id;
    console.log("le tutor est ", tutor_id);
    console.log("le studnet est ", student_id);
    await axiosInstance
      .post("sessions/create", {
        student_id: student_id,
        tutor_id: tutor_id,
        offer_id: offer_id,
      })
      .then(() => {
        console.log("session created");
        navigate("/");
        toast.success("session has been created");
      })
      .catch(() => {
        toast.error("session creation failed");
      });
  };
  return (
    <>
      <div className="container mx-auto w-full px-4 mt-5">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex flex-col md:flex-row w-full md:w-auto gap-4 mb-4 md:mb-0">
            {/* Simple Category Dropdown */}
            <div className="w-full md:w-64">
              <select
                className="w-full p-2 border border-gray-200 rounded bg-white appearance-none"
                value={selectedCategory?.objectID || ""}
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.objectID} value={category.objectID}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Reusable Tags Dropdown Component */}
            <div className="w-full md:w-64">
              <TagsDropdown
                availableTags={availableTags}
                selectedTags={selectedTags}
                onTagsChange={handleTagsChange}
                disabled={!selectedCategory}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between">
            {/* View Toggle Button */}
            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
              <button
                onClick={toggleView}
                className={`p-2 ${
                  isGridView
                    ? "bg-teal-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                type="button"
                aria-label="Grid view"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={toggleView}
                className={`p-2 ${
                  !isGridView
                    ? "bg-teal-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                type="button"
                aria-label="List view"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Create Offer Button */}
            <button
              onClick={handleCreateOffer}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition duration-150 ease-in-out flex items-center whitespace-nowrap"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="hidden sm:inline">Create Offer</span>
              <span className="sm:hidden">Create</span>
            </button>
          </div>
        </div>

        {offers.length > 0 ? (
          isGridView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {offers.map((offer) => renderOfferCard(offer, true))}
            </div>
          ) : (
            // List view with consistent styling
            <div className="flex flex-col items-center gap-4 max-w-3xl mx-auto">
              {offers.map((offer) => renderOfferCard(offer, false))}
            </div>
          )
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <h1 className="text-xl text-gray-500">No offers available</h1>
          </div>
        )}
      </div>
    </>
  );
}
