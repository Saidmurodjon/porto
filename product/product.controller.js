"use strict";
const Product = require("./product.model");

async function updateProduct(req, res) {
  try {
    const productId = req.params._id;
    let prod = Product.findByIdAndUpdate(
      productId,
      {
        id: "1",
        name: req.body.name,
        category: req.body.category,
        type: req.body.type,
        title: req.body.title,
        price: req.body.price,
      },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
    console.log(req.body.name);

    res.status(200).send(prod);
  } catch (err) {
    return res.status(400).send(err);
  }
}

const addProduct = async (req, res) => {
  try {
    let foo = await Product.find();
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
      };
      filesArray.push(file);
    });
    const multipleFiles = new Product({
      name: req.body.name,
      category: req.body.category,
      type: req.body.type,
      title: req.body.title,
      price: req.body.price,
      files: filesArray,
      id: foo.length + 1,
      count: req.body.count
     
    });
    await multipleFiles.save();
    res.status(201).send("Files Uploaded Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const files = await Product.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

async function deleteProduct(req, res) {
  try {
    const productId = req.params._id;
    await Product.findByIdAndDelete(productId);
    return res.status(200).json("productId ochirildi ");
  } catch (err) {
    return res.status(400).send(err);
  }
}

module.exports = {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};
