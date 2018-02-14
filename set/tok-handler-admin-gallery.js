
var tok_hag_box = [0];
var tok_hag_img = [];
var tok_hag_counterBox = 0;

// Удаление элемента из массива.
// String value: значение, которое необходимо найти и удалить.
// return: массив без удаленного элемента; false в противном случае.
function tok_hag_removeElemArr(value, arr, index) {
    var x;
    if (index !== undefined){
        x = Number(index);
    } else {
        x = arr.indexOf(value);
        if (x === -1) return false;
    }
    arr.splice(x, 1);

    return arr;
}



(function($) {

       $(document).ready(function () {
           tok_hag_getOption();
           $('.tok_hag_add_imagebox_button').bind('click', tok_hag_add_imgBox);
           $('.tok_hag_add_button').bind('click', tok_hag_addImg);
       });






       function tok_hag_add_imgBox(){
           tok_hag_box.push(tok_hag_box[tok_hag_box.length - 1] + 1);
           tok_hag_getDisplay();
       }




       function tok_hag_deleteBox(){
           var boxId = this.parentNode.id;
           var cacheArr = [];
           boxId = boxId.replace(/[^0-9]/gim,'');
           boxId = +boxId;
           tok_hag_removeElemArr(boxId, tok_hag_box);

           //Удалим все связанные изображения
           tok_hag_img.forEach(function (itemImg, iImg, tok_hag_img) {
               if (itemImg[1] === boxId){
                   cacheArr.push(iImg);
               }
           });
           var counterDeleteEl = 0;
           cacheArr.forEach(function (itemCacheArr, iCacheArr, cacheArr) {
               tok_hag_removeElemArr('', tok_hag_img, cacheArr[iCacheArr] - counterDeleteEl);
               counterDeleteEl++;
           });

           //Упорядочим массив с боксами
           cacheArr = []; //Очищаем временный массив
           tok_hag_box.forEach(function (itemBox, iBox, tok_hag_box) {
               if (itemBox > boxId){
                   cacheArr.push(itemBox); //Получаем id элментов, которые нужно сдвинуть
               }
           });
           cacheArr.forEach(function (itemCacheArr, iCacheArr, cacheArr) {
               var currentBoxId = itemCacheArr - 1;
               tok_hag_box.forEach(function (itemBox, iBox, tok_hag_box) {
                   if (tok_hag_box[iBox] === itemCacheArr) {
                       tok_hag_box[iBox] = currentBoxId;
                   }
               });
               tok_hag_img.forEach(function (itemImg, iImg, tok_hag_img) {
                   if (tok_hag_img[iImg][1] === itemCacheArr){
                       tok_hag_img[iImg][1] = currentBoxId;
                       tok_hag_img[iImg][4] = tok_hag_img[iImg][0] + '&' + tok_hag_img[iImg][1] + '&' + tok_hag_img[iImg][2] + '&' + tok_hag_img[iImg][3];
                   }
               });
           });

           tok_hag_getDisplay();
       }




       function tok_hag_addImg(){
           var boxId = this.parentNode.id;
           var haveimages = false;
           var lastImage = undefined;
           var currentImage = [];
           boxId = boxId.replace(/[^0-9]/gim,'');
           boxId = +boxId;

           tok_hag_img.forEach(function (itemImg, iImg, tok_hag_img) {
               if (boxId === itemImg[1]){
                   lastImage = itemImg;
               }
           });
           if (lastImage === undefined){
               currentImage[0] = 0;
               currentImage[1] = boxId;
               currentImage[2] = 'none';
               currentImage[3] = 'none';
               currentImage[4] = currentImage[0]+'&'+currentImage[1]+'&'+currentImage[2]+'&'+currentImage[3];
           } else {
               currentImage[0] = lastImage[0] + 1;
               currentImage[1] = boxId;
               currentImage[2] = 'none';
               currentImage[3] = 'none';
               currentImage[4] = currentImage[0]+'&'+currentImage[1]+'&'+currentImage[2]+'&'+currentImage[3];
           }
           tok_hag_img.push(currentImage);
           tok_hag_getDisplay();
       }



       function tok_hag_sortArray(arr) {
           if (!(arr === undefined) || !(arr.length === 0)){
               var count = arr.length - 1;
               var buffer;
               for (var i = 0; i < count; i++){
                  for (var j = 0; j < count; j++){
                       if (arr[j] > arr[j + 1]) {
                           buffer = arr[j];
                           arr[j] = arr[j + 1];
                           arr[j + 1] = buffer;
                       }
                   }
               }
               return arr;
           } else {
               console.log('Функция сортировки массива: массив пуст или ещё не создан!');
           }
       }


       //Редактирование ссылки
       function tok_hag_edit_imageLink() {
           var thisImgLink = $(this).val();
           var currentImage = ((this.parentNode.id).match(/[0-9]_[0-9]/))[0];
           var currentImageId = +(currentImage.split(/_/))[1];
           var currentImageBox = +(currentImage.split(/_/))[0];
           var i = 0;
           tok_hag_img.forEach(function (itemImg, iImg, tok_hag_img) {
               if ((currentImageId === itemImg[0]) && (currentImageBox === itemImg[1])){
                   itemImg[3] = thisImgLink;
                   itemImg[4] = itemImg[0]+'&'+itemImg[1]+'&'+itemImg[2]+'&'+itemImg[3];
                   return false;
               }
           });
           tok_hag_writeOption();
       }



       function tok_hag_edit_Image(){
           var tok_hag_send_attachment = wp.media.editor.send.attachment;
           var imageUrl;
           var currentImage = ((this.parentNode.id).match(/[0-9]_[0-9]/))[0];
           var currentImageId = +(currentImage.split(/_/))[1];
           var currentImageBox = +(currentImage.split(/_/))[0];
           wp.media.editor.send.attachment = function (props, attachment) {
               imageUrl = attachment.url;
               wp.media.editor.send.attachment = tok_hag_send_attachment;
               tok_hag_img.forEach(function (itemImg, iImg, tok_hag_img) {
                   if ((currentImageId === itemImg[0]) && (currentImageBox === itemImg[1])){
                       itemImg[2] = imageUrl;
                       itemImg[4] = itemImg[0]+'&'+itemImg[1]+'&'+itemImg[2]+'&'+itemImg[3];
                       return false;
                   }
               });
               tok_hag_getDisplay();
           }
           wp.media.editor.open();
       }



       function tok_hag_deleteImage(){
           var currentImage = ((this.parentNode.id).match(/[0-9]_[0-9]/))[0];
           var currentImageId = +(currentImage.split(/_/))[1];
           var currentImageBox = +(currentImage.split(/_/))[0];
           var i = 0;
           tok_hag_img.forEach(function (itemImg, iImg, tok_hag_img) {
               if ((currentImageId === itemImg[0]) && (currentImageBox === itemImg[1])){
                   tok_hag_removeElemArr('', tok_hag_img, iImg);
                   return false;
               }
           });

           //Сортируем массив изображений в боксе
           tok_hag_img.forEach(function (itemImg, iImg, tok_hag_img) {
               if (itemImg[1] === currentImageBox) {
                   if (itemImg[0] > currentImageId) {
                       itemImg[0] = itemImg[0] - 1;
                   }
               }
           });

           tok_hag_getDisplay();
       }


       function tok_hag_getDisplay() {
           $('.wrapper-box').empty();
           $('.wrapper-box').html('<div id="n0" class="tok_hag_imagebox"><div id="box_start_0" class="box_start"></div><div class="tok_hag_add_button">+</div></div>');

           var currentBoxHtml;
           var currentBoxId = '#n0';
           var currentImgHtml;
           var currentImgId;

           tok_hag_box.forEach(function(itemBox, iBox, tok_hag_box){
               if (itemBox !== 0) {
                   currentBoxHtml = '<div id="n'+itemBox+'" class="tok_hag_imagebox"><div id="box_start_'+itemBox+'" class="box_start"></div><div class="tok_hag_add_button">+</div><div class="tok_hag_delete_button"></div></div>';
                   $(currentBoxHtml).insertAfter(currentBoxId);
                   currentBoxId = '#n'+itemBox;
               }
           });
           currentBoxId = '#n0';

           tok_hag_box.forEach(function (itemBox, iBox, tok_hag_box) {
               tok_hag_img.forEach(function (itemImg, iImg, tok_hag_img) {
                   if (itemImg[1] === itemBox){
                       if (itemImg[0] === 0){
                           currentImgId = '#box_start_'+itemBox;
                       } else {
                           currentImgId = '#tok_image_n'+itemBox+'_'+(itemImg[0] - 1);
                       }
                       var fixHangLink = (itemImg[2] !== 'none') ? "'"+itemImg[2]+"'" : '';
                       currentImgHtml = '<div id="tok_image_n'+itemBox+'_'+itemImg[0]+'" class="tok_image"><div class="image" style="background-image: url('+fixHangLink+');"></div><input id="tok_hag_input_link" type="text" placeholder="link location..." value="'+((itemImg[3] === 'none')? '' : itemImg[3])+'"><div class="tok_hag_delete"></div><input id="tok_hag_img_serial_number" type="hidden" value="'+itemImg[0]+'"><input id="tok_hag_box_number" type="hidden" value="'+itemImg[1]+'"><input id="tok_hag_image_url" type="hidden" value="'+itemImg[2]+'"><input id="tok_hag_link" type="hidden" value="'+itemImg[3]+'"><input id="tok_hag_summ" type="hidden" value="'+itemImg[4]+'"></div>';
                       $(currentImgHtml).insertAfter(currentImgId);
                       currentImgHtml = '';
                       currentImgId = '';
                   }
               });
           });


           $('.tok_hag_delete_button').bind('click', tok_hag_deleteBox);
           $('.tok_hag_add_button').bind('click', tok_hag_addImg);
           $('.tok_hag_delete').bind('click', tok_hag_deleteImage);
           $('#tok_hag_input_link').keyup(tok_hag_edit_imageLink);
           $('.image').bind('click', tok_hag_edit_Image);
           tok_hag_writeOption();
       }
       function tok_hag_writeOption() {
           var summArr = [];
           var jsonEn;
           summArr[0] = tok_hag_box;
           summArr[1] = tok_hag_img;

           jsonEn = JSON.stringify(summArr);
           $('#tok_gallery_board_select_settings').val('');
           $('#tok_gallery_board_select_settings').val(jsonEn);
       }
       function tok_hag_getOption() {
           var summArr = [];
           summArr = JSON.parse($('#tok_gallery_board_select_settings').val());
           tok_hag_box = summArr[0];
           tok_hag_img = summArr[1];
           tok_hag_getDisplay();
       }
})( jQuery );


