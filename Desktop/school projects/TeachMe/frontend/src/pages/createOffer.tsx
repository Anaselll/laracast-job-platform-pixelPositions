import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import TagsDropdown from "../components/TagsDropdown";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

interface Category {
  _id: string;
  title: string;
  tags: string[];
}

interface Tag {
  title: string;
  objectID: string;
}

export default function CreateOffer() {
  const {user}=useContext(AuthContext)
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();
  const { offer_type } = useParams<{ offer_type: string }>();

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    price: "",
    category: "",
    date:"",
    dure:""
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, category: categoryId });
    setSelectedTags([]);

    if (!categoryId) {
      setAvailableTags([]);
      return;
    }

    // Find the selected category
    const category = categories.find((cat) => cat._id === categoryId);

    if (category) {
      // Convert tags to the format expected by TagsDropdown
      const tags_data = category.tags.map((tag: string, index: number) => ({
        title: tag,
        objectID: `tag-${index}`, // Generate unique objectID
      }));
      setAvailableTags(tags_data);
    }
  };

  const handleTagsChange = (updatedTags: Tag[]) => {
    setSelectedTags(updatedTags);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
console.log(formData)

    try {
      const datenow=new Date()
      const dateform = new Date(formData.date);
      console.log(datenow,"now",datenow.toLocaleString())
      console.log(dateform,"form",dateform.toLocaleString());
      if(datenow.getTime()>=dateform.getTime()){
        toast.error('you have to choose a future date')
        return
      }
      
      // Extract tag titles for API
      const tagTitles = selectedTags.map((tag) => tag.title);

      const offerData = {
        ...formData,
        tags: tagTitles,
        offer_type,
        creator_id:user._id
      };
      console.log(offerData)

      await axiosInstance.post("/offers/create", offerData);
      navigate(`/offers/${offer_type}`);
    } catch (error) {
      console.error("Error submitting offer:", error);
    }
  };

  return (
    <div className="m-auto border mt-5 w-full max-w-xl p-6 bg-white shadow-lg rounded-lg">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Subject */}
        <div className="flex flex-col">
          <label className="font-semibold">Subject:</label>
          <input
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            type="text"
            name="subject"
            placeholder="Enter the subject"
            className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-semibold">Description:</label>
          <textarea
            value={formData.description}
            name="description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter the description"
            className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          ></textarea>
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="font-semibold">Price:</label>
          <input
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            type="number"
            name="price"
            placeholder="Enter the price"
            className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        {/* // date */}
        <div className="flex flex-col">
          <label className="font-semibold">date:</label>
          <input
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            type='datetime-local'
            name="date"
            placeholder="Enter the price"
            className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        {/* dure by hour */}
        <div className="flex flex-col">
          <label className="font-semibold">dure:</label>
          <input
            value={formData.dure}
            onChange={(e) =>
              setFormData({ ...formData, dure: e.target.value })
            }
            type="number"
            name="dure"
            placeholder="Enter the dure by hour"
            className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        {/* Category - Simple Select */}
        <div className="flex flex-col">
          <label className="font-semibold">Category:</label>
          <select
            value={formData.category}
            onChange={handleCategoryChange}
            name="category"
            className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Tags - Using the reusable component */}
        <div className="flex flex-col">
          <label className="font-semibold">Tags:</label>
          <TagsDropdown
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagsChange={handleTagsChange}
            disabled={!formData.category}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/3 bg-blue-500 text-white p-2 rounded-2xl hover:bg-blue-600"
          >
            Submit Offer
          </button>
        </div>
      </form>
    </div>
  );
}
