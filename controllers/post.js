exports.getPosts = async (req, res) => {
    // get current page from req.query or use default value of 1
   res.json({
      "message": "Hello world"
   })
};
