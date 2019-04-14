var express = require("express");
var router = express.Router();
var albumName = require("./albumName");
var photoList = require("./photoList");
var fs = require("fs");
var path = require("path");
var multer = require("multer");

var upload = multer({
  dest: path.join(__dirname,"photosFolder")
});
var addPhoto = upload.single("singlePhoto");

var currentAlbum = "default";
var photoPerPage = 3;
var currentPage = 1;
var pageContent = [];  //当前要显示的图片

function displayPhotoPage(currentPage,currentAlbum) {  //当前要显示的图片的函数
  pageContent = [];
  for(let i=(currentPage-1)*photoPerPage; i<currentPage*photoPerPage; i++) {
    if (photoList[currentAlbum] && photoList[currentAlbum][i] !== undefined && photoList[currentAlbum][i] !== null) {
      pageContent.push(photoList[currentAlbum][i]);
    }
    else {
      console.log('没有图片');
    }
  }
}

//init
router.get('/',function (req,res) {
  displayPhotoPage(currentPage,currentAlbum);
  res.render("album",{albumName,photoList,currentAlbum,photoPerPage,currentPage,pageContent});
  //相册列表，图片列表，当前要显示的相册名，每页显示的图片数量，当前的页数，当前要显示的图片
});


//相册创建路由
router.post("/addAlbumName",function (req,res) {
  const albName = req.body["new-album"];
  albumName.push(albName);  //将相册名加入相册文件
  photoList[albName] = [];   //在图片文件中加入一个新的数组

  //将数据写入文件
  fs.writeFileSync(path.join(__dirname,"albumName.json"),JSON.stringify(albumName)); //这里要进行格式转换才能写入
  fs.writeFileSync(path.join(__dirname,"photoList.json"),JSON.stringify(photoList));
  res.redirect("back");
});


//图片上传路由
router.post("/addPhotos",addPhoto,function (req,res) {
  // console.log(req.file);
  photoList[currentAlbum].push(req.file.filename);
  fs.writeFileSync(path.join(__dirname,"photoList.json"),JSON.stringify(photoList));
  // displayPhotoPage(currentPage,currentAlbum);
  res.redirect("back");
});

//图片路径的读取路由
router.get("/show/:imgname",function (req,res) {
  let rs = fs.createReadStream(path.join(__dirname,"photosFolder/") + req.params.imgname);
  rs.pipe(res);
})

//删除图片的路由
router.get("/del/photos/:pct",function (req,res) {
  let index = photoList[currentAlbum].indexOf(req.params.pct);
  photoList[currentAlbum].splice(index,1);
  currentPage = Math.ceil(photoList[currentAlbum].length/photoPerPage);
  fs.writeFileSync(path.join(__dirname,"albumName.json"),JSON.stringify(albumName));
  fs.writeFileSync(path.join(__dirname,"photoList.json"),JSON.stringify(photoList));
  res.redirect("back");
});

//切换相册的路由
router.get("/albums/:albumName",function (req,res) {
  currentAlbum = req.params.albumName;
  currentPage = 1;
  clbContent = photoList[currentAlbum];
  displayPhotoPage(currentPage,currentAlbum);
  res.send({currentAlbum,photoPerPage,pageContent,clbContent});
});

//删除相册的路由
router.get("/del/album-list/:albn",function (req,res) {
  delete photoList[req.params.albn];
  let index = albumName.indexOf(req.params.albn);
  albumName.splice(index,1);
  currentPage = 1;
  var delalbumName = req.params.albn;
  var delCurralbum = currentAlbum;
  if(delalbumName === currentAlbum){
    currentAlbum = "default";
  }
  var defaultContent = photoList[currentAlbum];
  displayPhotoPage(currentPage,currentAlbum);
  fs.writeFileSync(path.join(__dirname,"albumName.json"),JSON.stringify(albumName));
  fs.writeFileSync(path.join(__dirname,"photoList.json"),JSON.stringify(photoList));
  res.send({delalbumName,delCurralbum,defaultContent,currentAlbum,photoPerPage,pageContent});
  console.log(photoPerPage);
});

//切换页数的路由
router.get("/albums/page/:pageNum",function (req,res) {
  currentPage = Number(req.params.pageNum)+1;
  displayPhotoPage(currentPage,currentAlbum);
  res.send(pageContent);
})


//First按钮和Last按钮跳转路由
router.get("/albums/page2/:pageNum",function (req,res) {
  if(req.params.pageNum === "first"){
    currentPage = 1;
  }else if(req.params.pageNum === "last"){
    currentPage = Math.ceil(photoList[currentAlbum].length/photoPerPage);
  }
  displayPhotoPage(currentPage,currentAlbum);
  res.send(pageContent);
})




module.exports = router;
