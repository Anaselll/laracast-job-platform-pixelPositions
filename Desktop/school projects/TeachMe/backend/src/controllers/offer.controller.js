import Offer from "../models/offer.model.js";
import Category from "../models/category.model.js";
export const createOffer = async (req, res) => {
  try {
    const {
      creator_id,
      offer_type,
      subject,
      description,
      category,
      tags,
      dure,
      date,price
    } = req.body;
    
    if (!creator_id || !offer_type || !subject || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }
console.log(date)
  


    const newOffer = new Offer({
      creator_id,
      offer_type,
      subject,
      description,
      date,
      dure,
 price,
      category: category,
      tags: tags || [],
    });

    await newOffer.save();

    return res
      .status(201)
      .json({ message: "Offer created successfully", offer: newOffer });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const showOffers = async (req, res) => {
  try {
    const { category_type, offer_type } = req.params;
    let tags = req.query.tags;

    // Convert tags to array if it's a string
    if (tags && !Array.isArray(tags)) {
      tags = [tags];
    }

    // Case 1: Show all offers of a specific type
    if (category_type === "all") {
      const offers = await Offer.find({ offer_type,status:"open" });
      return res.status(200).json(offers);
    }

    // Find the category by title
    console.log(category_type);

    const category = await Category.findOne({
      _id: category_type,
    });
    console.log(category)
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Case 2: Filter by category only
    if (!tags || tags.length === 0) {
      const offers = await Offer.find({
        offer_type,
        category: category_type,
        status: "open",
      });
      return res.status(200).json(offers);
    }

    // Case 3: Filter by both category and tags
    const offers = await Offer.find({
      offer_type,
      category: category_type,

      tags: { $all: tags },
      status: "open",
    });

    return res.status(200).json(offers);
  } catch (error) {
    console.error("Error in showOffers:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
