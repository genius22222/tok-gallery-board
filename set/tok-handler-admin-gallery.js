
var tok_hag_box = [0];
var tok_hag_img = [];
var tok_hag_counterBox = 0;

// Удаление элемента из массива.
// String value: значение, которое необходимо найти и удалить.
// return: массив без удаленного элемента; false в противном случае.
function tok_hag_removeElemArr(value, arr, index) {
    var x;
    console.log(value+' '+arr+' '+index)
    if (index !== undefined){
        x = value;
    } else {
        x = arr.indexOf(+value);
        if (x === -1) return false;
    }
    arr.splice(x, 1);

    return arr;
}


(function($) {

       $('.tok_hag_add_button').bind('click', tok_hag_getDisplay);
       function tok_hag_getDisplay() {
           $('.wrapper-box').empty();
           $('.wrapper-box').html('<div id="n0" class="tok_hag_imagebox"><div id="box_start_0" class="box_start"></div><div class="tok_hag_add_button">+</div></div>');

           var currentBoxHtml;
           var currentBoxId = '#n0';
           var currentImgHtml;
           var currentImgId;

           tok_hag_box.forEach(function(itemBox, iBox, tok_hag_box){
               if (itemBox !== 0) {
                   currentBoxHtml = '<div id="n'+itemBox+'" class="tok_hag_imagebox"><div id="box_start_'+itemBox+'" class="box_start"></div><div class="tok_hag_add_button">+</div><div class="tok_hag_close_button"></div></div>';
                   $(currentBoxHtml).insertAfter(currentBoxId);
                   currentBoxId = '#n'+itemBox;
               }
           });
           currentBoxId = '#n0';
           tok_hag_img.forEach(function (itemImg, iImg, tok_hag_img) {
               currentBoxId = 'n'+itemImg[0];
               console.log(currentBoxId);
               var lastImage = document.getElementById(currentBoxId);
               var currentBoxStart = '#box_start_'+itemImg[0];
               lastImage = lastImage.getElementsByClassName('tok_hag_images');
               currentImgHtml = '<div id="image_'+iImg+'" class="tok_hag_images"><input id="tok_hag_imgBoxId" type="hidden" value="'+itemImg[0]+'"><input id="tok_hag_img" type="hidden" value="'+itemImg[1]+'"><input id="tok_hag_link" type="hidden" value="'+itemImg[2]+'"><input id="tok_hag_control" type="hidden" value="'+itemImg[3]+'"></div>';
               console.log(lastImage);
               console.log(currentBoxStart);
               if (lastImage.length !==0){
                   console.log(1);
                   lastImage = lastImage[lastImage.length - 1];
                   $(currentImgHtml).insertAfter(lastImage);
               } else {
                   console.log(2);
                   $(currentImgHtml).insertAfter(currentBoxStart);
               }
           });
           currentBoxHtml = '';
           currentBoxId = '#n0';
           currentImgHtml = '';
           currentImgId = '';

       }
})( jQuery );


