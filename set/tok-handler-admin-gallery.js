
var box = [];
var img = [];
var counterBox = 0;

// Удаление элемента из массива.
// String value: значение, которое необходимо найти и удалить.
// return: массив без удаленного элемента; false в противном случае.
function removeElemArr(value, arr) {
    var x;
    x = arr.indexOf(+value);
    if (x === -1) return false;
    arr.splice(x, 1);
    return arr;
}


(function($) {

   $(document).ready(function () {
       $('.tok_add_imagebox_button').click(function () {
           addC('box');
       });

       function addBox() {
           var currentId;
           var currentBox;
           var newId;
           var deleteButton;
           currentId = 'n'+(box.length - 1);
           currentBox = '#'+(currentId);
           newId = 'n'+box.length;
           currentHtml = '<div id="'+newId+'" class="tok_imagebox"><div id="tki0" class="tok_image"><div class="image"></div><input type="text" id="tok-link"></div><div class="tok_close_button">'+box.length+'</div></div>';
           $(currentHtml).insertAfter(currentBox); //Выводим новый бокс с изображениями
           deleteButton = document.getElementById(newId); //Получаем новый элемент по id
           deleteButton = deleteButton.childNodes[1]; //Получаем его кнопку удаления

           $(deleteButton).bind('click', function (event) { //Обработчик кнопки удаления, для всех разный
               delButElem = event.target; //Получаем нажатую кнопку удаления
               BoxElemId = $(delButElem).html(); //Получаем её содержимое, туда мы сохранили id бокса изображений
               deleteBox(BoxElemId); //Вызываем функцию удаления бокса изображений
           });
       }
       function deleteBox(elem) {
           if (elem !== undefined){
               x = removeElemArr(elem, box);
               if (x !== false) box = x;
           } else {
               console.log('deleteBox: Elem is undefined!');
           }
       }
       function addC(what, boxId, pic) {
           if (what === 'box'){
               box.push(counterBox); //Добавляем id из img
               img.push(counterBox); //Добавляем нулевой элемент в img
               img[counterBox] = []; //Инициализируем элемент массива как массив
               addBox(); //Добавляем новый бокс


               counterBox++;
           } else if((what === 'img') && (boxId !== undefined) && (pic !== undefined)){
               img[boxId].push(pic); //Добавляем изображения в инициализированный массив
           } else console.log('"what" or "boxId" or "pic" is empty!');
       }
   });
})( jQuery );


