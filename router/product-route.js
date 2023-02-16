const router = require("express").Router();
const products = require("../models/product");
const _ = require("lodash");
router.get("/", async (req, res) => {
  let pageNumber = 1;
  let pageSize = 10;
  const query = {};
  var product = await products.find();
  let totalPages = Math.floor(product.length / pageSize);
  pageNumber =
    req.query.pageNumber == null || req.query.pageNumber < 1
      ? 1
      : +req.query.pageNumber;
  pageSize =
    req.query.pageSize >= 50 || req.query.pageSize == null
      ? 10
      : +req.query.pageSize;

    //  var Gooo = req.query.Gooo;
    // if (Gooo) {
    //   Gooo = Gooo.trim();

    //   }   
      

  var keyword = req.query.keyword;
  if (keyword) {
    keyword = keyword.trim();
    query.$or = [{ title: { $regex: keyword, $options: "i" } }];
    var productSortSearch = await products.find({}, { _id:1,title:1,description:1,price:1 })
      .find((query))
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize);

      var includeColors = req.query.includeColors;
      var includeSizes = req.query.includeSizes;
      if(includeColors == "true"){
        productSortSearch = await products.find({}, { _id:1,title:1,description:1,price:1 ,colors:1})
        .find(query)
        .limit(pageSize)
        .skip((pageNumber - 1) * pageSize)
      }
      if(includeSizes == "true"){
        productSortSearch = await products.find({}, { _id:1,title:1,description:1,price:1,sizes:1 })
        .find(query)
        .limit(pageSize)
        .skip((pageNumber - 1) * pageSize)
      }
      if(includeSizes == "true"&& includeColors == "true"){
        productSortSearch = await products.find({}, { _id:1,title:1,description:1,price:1,colors:1,sizes:1 })
        .find(query)
        .limit(pageSize)
        .skip((pageNumber - 1) * pageSize)
      }
    var _product = (await products.find(query)).length;
    totalPages = +(_product / pageSize);

    const paginationMetaData = {
      pageSize: pageSize,
      pageNumber: pageNumber,
      previousPage: pageNumber - 1,
      nextPage: pageNumber + 1,
      totalCount: (await products.find(query)).length,
      totalPages: parseInt(totalPages),
    };

    return res
      .header("X-Pagination", JSON.stringify(paginationMetaData))
      .json(productSortSearch);
  }
  ///////////////////////////////////////////////////////////////
  var includeColors = req.query.includeColors;
  var includeSizes = req.query.includeSizes;

  let productSort = await products
    .find({}, { _id:1,title:1,description:1,price:1 })
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
  if(includeColors == "true"){
    productSort = await products
    .find({}, { _id:1,title:1,description:1,price:1,colors:1 })
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
  }
  if(includeSizes == "true"){
    productSort = await products
    .find({}, { _id:1,title:1,description:1,price:1,sizes:1 })
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
  }
  if(includeSizes == "true"&& includeColors == "true"){
    productSort = await products
    .find({}, { _id:1,title:1,description:1,price:1,sizes:1,colors:1 })
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
  }
  const paginationMetaData = {
    pageSize: pageSize,
    pageNumber: pageNumber,
    previousPage: pageNumber - 1,
    nextPage: pageNumber + 1,
    totalCount: (await products.find(query)).length,
    totalPages: parseInt(totalPages),
  };
  return res
    .header("X-Pagination", JSON.stringify(paginationMetaData))
    .send(productSort);
  
  ///////////////////////////////////////////
   
});

module.exports = router;
