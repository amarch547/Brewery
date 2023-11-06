const { Review } = require("../model/Review");
exports.createReview = async (req, res) => {
    const review = new Review({
      rating: req.body.rating,
      review: req.body.review,
    });
    try {
      const doc = await review.save();
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  exports.fetchReview = async (req, res) => {
    const review = Review.find({})
    try {
      const doc = await review.exec();
      res.status(200).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };