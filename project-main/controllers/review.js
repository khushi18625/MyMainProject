const Listing = require("../models/listing");
const Review = require("../models/review");
module.exports.createReview = async (req, res) => {
  console.log(req.params.id);
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  console.log(listing);
  req.flash("success", "New Review created !!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id: listingId, id2: reviewId } = req.params;
  let delreview = await Review.findByIdAndDelete(reviewId);
  let listing = await Listing.findByIdAndUpdate(
    listingId,
    { $pull: { reviews: reviewId } },
    { new: true }
  );
  req.flash("success", " Review Deleted !!");
  res.redirect(`/listings/${listingId}`);
};
