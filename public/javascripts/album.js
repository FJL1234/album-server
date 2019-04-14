var albumList_li = document.querySelectorAll(".album-list li");
var albumList_a = document.querySelectorAll(".album-list .albumName");
var pageNavLi = document.querySelectorAll("nav>ul>li");
var pageNavLink = document.querySelectorAll("nav>ul>li>a");

// console.log(albumList_li);
// console.log(albumList_a);

albumList_a.forEach(a=>{   //相册列表a元素的点击事件
   a.onclick = function () {
     albumList_li.forEach(li=>{
       li.style.backgroundColor = "";
     });

     albumList_a.forEach(a=>{
        a.style.color = "#2C70DD";
      });

      a.parentNode.style.backgroundColor = "#C2C2C2";
      a.style.color = "white";
   }
})


function pageClick(pageNavLink,pageNavLi) {
  pageNavLink.forEach(a=>{   //分页区域的a元素的点击事件
    a.onclick = function () {
      pageNavLi.forEach(li=>{
        li.style.backgroundColor = "";
      });

      pageNavLink.forEach(a=>{
        a.style.color = "#2C70DD";
      });

      a.parentNode.style.backgroundColor = "#C2C2C2";
      a.style.color = "white";
    }
  })




//第一页的a元素和最后一页的a元素的点击事件(First 和 Last)
var firstadom = document.querySelector("nav>ul>li:first-child>a");  //first的a元素
var lastadom = document.querySelector("nav>ul>li:last-child>a");   //last的a元素

var firstLi = document.querySelector("nav>ul>li:nth-child(2)");  //第一页的li元素
var firstadom2 = document.querySelector("nav>ul>li:nth-child(2)>a");  //第一页的a元素

var lastaLi = document.querySelector("nav>ul>li:nth-last-child(2)");  //最后一页的li元素
var lastadom2 = document.querySelector("nav>ul>li:nth-last-child(2)>a")  //最后一页的a元素


firstadom.onclick = function (event) {   //first的a元素的点击事件
  pageNavLi.forEach(li=>{
    li.style.backgroundColor = "";
  });

  pageNavLink.forEach(a=>{
    a.style.color = "#2C70DD";
  });

  firstLi.style.backgroundColor = "#C2C2C2";
  firstadom2.style.color = "white";
}

lastadom.onclick = function (event) {  //last的a元素的点击事件
  pageNavLi.forEach(li=>{
    li.style.backgroundColor = "";
  });

  pageNavLink.forEach(a=>{
    a.style.color = "#2C70DD";
  });

  lastaLi.style.backgroundColor = "#C2C2C2";
  lastadom2.style.color = "white";
  }
}
pageClick(pageNavLink,pageNavLi);
