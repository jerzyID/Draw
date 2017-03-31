//buttons



$(function() {

    //set up fabric canvas

    var canvas = new fabric.Canvas('c', {
        backgroundColor: 'white' //canvas background white
    });

    //sizes

    //buttons
    var stateChange = document.getElementById('state');
    var clearCanvas = document.getElementById('clear');
    var addText = document.getElementById('text');

    var colorSelected = document.getElementById('chosen-color');
    var sizeSelected = document.getElementById('chosen-size');
    var fontSizeSelected = document.getElementById('font-size');
    var deleteObject = document.getElementById('delete');

    var chosenColor = colorSelected.value;
    var chosenSize = sizeSelected.value;
    var chosenFontSize = fontSizeSelected.value;
    var chosenSticker = '';
    var myFontSize;
    var activeObj = canvas.getActiveObject();

    var colorsArray = document.getElementsByClassName('color-option');
    var sizesArray = document.getElementsByClassName('size-option');
    var stickersArray = document.getElementsByClassName('cartoon-characters');
    var fontSizesArray = document.getElementsByClassName('size-font');

    if (chosenColor == null) { //if no color selected
        chosenColor = '#000000';
    }

    if (chosenSize == null) { //if no brush size selected
        chosenSize = '5';
    }

    if (chosenFontSize == null) { //if no font size selected
        chosenFontSize = '24';
    }

    //Brush colors
    function chooseBrushColor(chosenColor) {

        canvas.freeDrawingBrush.color = chosenColor;
        colorSelected.innerHTML = chosenColor;
        colorSelected.value = chosenColor;
    }

    for (var i = 0; i < colorsArray.length; i++) {
        var anchor = colorsArray[i];
        anchor.onclick = function() {
            var chosenColor = this.value;
            chooseBrushColor(chosenColor);
        }
    }


    //Brush size
    function chooseBrushSize(chosenSize) {

        canvas.freeDrawingBrush.width = chosenSize;
        sizeSelected.innerHTML = chosenSize + 'px';
        sizeSelected.value = chosenSize;
    }

    for (var i = 0; i < sizesArray.length; i++) {
        var anchorSize = sizesArray[i];
        anchorSize.onclick = function() {
            var chosenSize = this.value;
            chooseBrushSize(chosenSize);
        }
    }


    //Add stickers
    function chooseSticker(chosenSticker) {

        fabric.Image.fromURL(chosenSticker, function(img) {

            img.set({
                left: 10,
                top: 10,
                angle: 0
            });

            img.perPixelTargetFind = true;
            img.targetFindTolerance = 4;
            img.hasControls = img.hasBorders = false;

            img.scale(1);

            canvas.add(img);


            canvas.on({
                'object:moving': function(e) {
                    e.target.opacity = 0.5;
                },
                'object:modified': function(e) {
                    e.target.opacity = 1;
                }
            });

        });

    }


    for (var i = 0; i < stickersArray.length; i++) {
        var anchorSticker = stickersArray[i];
        anchorSticker.onclick = function() {
            var chosenSticker = this.src;
            chooseSticker(chosenSticker);
        }
    }

    //Font size
    function chooseFontSize(chosenFontSize) {

        fontSizeSelected.innerHTML = chosenFontSize + 'px';
        fontSizeSelected.value = chosenFontSize;
        myFontSize = chosenFontSize;
    }

    for (var i = 0; i < fontSizesArray.length; i++) {
        var anchorSizeFont = fontSizesArray[i];
        anchorSizeFont.onclick = function() {
            var chosenSizeFont = this.value;
            chooseFontSize(chosenSizeFont);
        }
    }

    //add Text
    addText.onclick = function() {

    	/*chooseFontSize(chosenFontSize);*/
        var newText = document.getElementById("customText").value;

        var customTextObject = new fabric.Text(newText, {
            fontFamily: "Ariel",
            left: 150,
            top: 100,
            fontSize: myFontSize,
            textAlign: "left",
            fill: "#000000"
        });

        customTextObject.perPixelTargetFind = true;
        customTextObject.targetFindTolerance = 4;
        customTextObject.hasControls = customTextObject.hasBorders = false;

        canvas.add(customTextObject);
        canvas.renderAll();

    };

    //save as a file
    $("#save").click(function() {
        $("#c").get(0).toBlob(function(blob) {
            saveAs(blob, "myIMG.png");
        });
    });

    //delete Object
    deleteObject.onclick = function() {

        canvas.remove(activeObj);

    };


    //clean canvas
    clearCanvas.onclick = function() {

        canvas.clear()

    };


    //draw/move state
    stateChange.onclick = function() {

        canvas.isDrawingMode = !canvas.isDrawingMode;

        if (canvas.isDrawingMode) {

            stateChange.innerHTML = 'Move';
            chooseBrushColor(chosenColor);
            chooseBrushSize(chosenSize);
            
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);

        } else {

            stateChange.innerHTML = 'Draw';
            chooseSticker(chosenSticker);

        }

    };



});
