var $ = require('jquery');

var calculator = (function(){
    var $calculator, $key, $display;
    var init =  function(){
        cacheDOM();
        bindEvents();


    };

    var cacheDOM = function(){
        $calculator = $('.calculator');
        $key = $calculator.find('.key');
        $display = $calculator.find('#result');
        $display.val('0');
    };

    var bindEvents = function(){
        var currentEntry = '0';
        var firstNumber = '';
        var secondNumber = '';
        var result = '';
        var operation = '';

        var pendingOperation = false;
        $key.click(function(){

            //Assigned the id of the button(0,1,2...9 or operation key) to the keyPressed variable
            var keyPressed = $(this).attr('id');

            if($.isNumeric(keyPressed)){

                if(currentEntry === '0'){
                    currentEntry = keyPressed;
                }
                else{
                    currentEntry = currentEntry + keyPressed;
                }

                // if pendingOperation = false, we know the calculator state is fresh and we must get the first number
                if(!pendingOperation){
                    firstNumber = currentEntry;
                    result = firstNumber;
                }
                //otherwise, the operation is pending and we must get the second number
                else{
                    secondNumber = currentEntry;
                    result = secondNumber;
                }

                debug(firstNumber, secondNumber, operation, pendingOperation, currentEntry);
            }

            //reset the calculator
            else if(keyPressed == 'c'){
                currentEntry = '0';
                result = currentEntry;
                firstNumber = '';
                secondNumber = '';
                pendingOperation = false;
            }

            else if(isOperation(keyPressed)){

                operation = keyPressed;
                pendingOperation = true;


                if(firstNumber && secondNumber ){

                    result = operate(firstNumber, secondNumber, operation);
                    firstNumber = result;
                    secondNumber = '';

                }
                debug(firstNumber, secondNumber, operation, pendingOperation, currentEntry);

            }

            else if(keyPressed == 'equal'){
                if(firstNumber && secondNumber){
                    result = operate(firstNumber, secondNumber, operation);

                }
                firstNumber = result;
                secondNumber = '';
                currentEntry = '';
                pendingOperation = false;

                debug(firstNumber, secondNumber, operation, pendingOperation, currentEntry);

            }
            updateDisplay(result);
        });
    };
    var debug = function(firstNumber, secondNumber, operation, pendingOperation, currentEntry){
        console.log('****DEBUG DATA****');
        console.log('Current Entry: ' + currentEntry);
        console.log('First Number: ' + firstNumber);
        console.log('Second Number: ' + secondNumber);
        console.log('Pending Operation: ' + operation);
        console.log('Pending Operation State: ' + pendingOperation);
        console.log('****END DEBUG****');
        console.log('/n');


    };
    var isOperation = function(operation){
        var validOperation = false;
        if(operation == 'addition' || operation == 'subtraction'
            || operation == 'multiplication' || operation == 'division'){
            validOperation = true;
        }
        return validOperation;
    };

    var updateDisplay = function(content){
        $display.val(content);
    };

    var operate = function(x,y,operation){
        x = parseFloat(x);
        y = parseFloat(y);
        var result = '';
        if(operation == 'addition'){
            result = x + y;
        }
        else if(operation == 'subtraction'){
            result = x - y;
        }
        else if(operation == 'multiplication'){
            result = x * y;
        }
        else if(operation == 'division'){
            result = x / y;
        }
        return result;
    };

    return{

        init: init

    };
})();

module.exports = calculator;