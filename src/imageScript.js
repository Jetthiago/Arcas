var galery, galeryData;
lib.requestXhttp(location.pathname+"?glinfo=true","Object",function(imgData){
	galeryData = imgData;
	var pswpElement = document.querySelectorAll(".pswp")[0],
		items = imgData.items,
		options = {
			index: imgData.actual.index,
			closeOnScroll: false,
			closeOnVerticalDrag: false,
			pinchToClose: false,
			history: false,
			preload: [2,3]
		};

	galery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
	galery.init();
	function backgroundGalery(){
		var body = document.getElementsByTagName('body')[0];
		body.style.backgroundColor = "#101010";
		var backImage = document.createElement("img");
		/*backImage.onclick = function(event){
			var aNewPswpElement = document.querySelectorAll(".pswp")[0],
				aNewOption = {
					index: lib.parseQuery()["in"],
					closeOnScroll: false,
					closeOnVerticalDrag: false,
					pinchToClose: false,
					history: false,
					preload: [2,3],
					focus: false,
					showAnimationDuration: 0,
					hideAnimationDuration: 0
				},
				aNewGalery = new PhotoSwipe(aNewPswpElement, PhotoSwipeUI_Default, galeryData, aNewOption);
			aNewGalery.init();
			console.log("@@@");
		};*/
		backImage.src = document.location.pathname;
		backImage.style = "width:100%;height:100%";
		body.appendChild(backImage);
	}
	backgroundGalery();
});

