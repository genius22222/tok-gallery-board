
var box = [];
var img = [];
var counterBox = 0;

(function($) {

   $(document).ready(function () {
       $('.tok_add_imagebox_button').click(function () {
           addC('box');
       });
   });
})( jQuery );


function addC(what, boxId, pic) {
    if (what === 'box'){
        box.push(counterBox); //Добавляем id из img
        img.push(counterBox); //Добавляем нулевой элемент в img
        img[counterBox] = []; //Инициализируем элемент массива как массив



        counterBox++;
    } else if((what === 'img') && (boxId !== undefined) && (pic !== undefined)){
        img[boxId].push(pic); //Добавляем изображения в инициализированный массив
    } else console.log('"what" or "boxId" or "pic" is empty!');
}