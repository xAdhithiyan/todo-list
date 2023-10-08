/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/compoenets/modalPage.js":
/*!*************************************!*\
  !*** ./src/compoenets/modalPage.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createDomElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createDomElements */ "./src/createDomElements.js");
/* harmony import */ var _todoList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todoList */ "./src/compoenets/todoList.js");



function createModalPage(){
    let form = document.querySelector("form")
    form.appendChild(template("Title", "text", "title"));
    form.appendChild(template("Description", "text", "description"));
    form.appendChild(template("Date", "date", "date"));
    form.appendChild(template("High", "radio", "priority", "high"));
    form.appendChild(template("Low", "radio", "priority", "low"));
    form.appendChild((0,_createDomElements__WEBPACK_IMPORTED_MODULE_0__["default"])("button", {type: "submit", class: "formSubmit"}, "submit"));
    form.appendChild((0,_createDomElements__WEBPACK_IMPORTED_MODULE_0__["default"])("button", {type: "button", class: "formClose"}, "close"));
}

function template(title, type , name, value = ""){
    let div = (0,_createDomElements__WEBPACK_IMPORTED_MODULE_0__["default"])("div");
    let label = (0,_createDomElements__WEBPACK_IMPORTED_MODULE_0__["default"])("label", {for: name}, title);
    let input = (0,_createDomElements__WEBPACK_IMPORTED_MODULE_0__["default"])("input", {type: type, id: name , name: name, required: "true", value: value})
    div.appendChild(label);
    div.appendChild(input);
    return div;
}



function modalPage(){
    let todos = document.querySelector(".todos");
    let modal = document.querySelector(".modal");
    let btn = (0,_createDomElements__WEBPACK_IMPORTED_MODULE_0__["default"])("button", {} , "Add");
    let submitBtn = document.querySelector(".formSubmit");
    let closeBtn = document.querySelector(".formClose");

    btn.addEventListener("click", () => modal.showModal());
    todos.appendChild(btn);

    closeBtn.addEventListener("click", () => modal.close());
    submitBtn.addEventListener("click", (e) => {
        if(document.querySelector("form").reportValidity()){
            e.preventDefault();
            let allInputs = document.querySelectorAll("input");
            
            //updated the todoList -> could have used pub/sub, but since only one module depends on these values i just imported that module
            _todoList__WEBPACK_IMPORTED_MODULE_1__["default"].updateTodos(allInputs[0].value, allInputs[1].value, allInputs[2].value, allInputs[3].value,);

            /* reset all the values */
            allInputs.forEach(e => {
                if(e.type != "radio"){
                    e.value = "";
                }
            })

            modal.close();

        }
    })
}

createModalPage();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalPage);


/***/ }),

/***/ "./src/compoenets/todoList.js":
/*!************************************!*\
  !*** ./src/compoenets/todoList.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pubSub */ "./src/pubSub.js");


// to display and update todoList(module pattern)
const todoList = function(){
    let todos = [];

    function allTodos(){
        return todos;
    }

    // to create a single todo and update the todoList
    function updateTodos(title, description, dueDate, priority, checklist){
        todos.push({
            title,
            description,
            dueDate,
            priority,
            checklist
        }); 
        console.log(todos)
    }

    return {
        allTodos,
        updateTodos
    }

}();

todoList.updateTodos("ads","sdasdads","9th","high","true");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todoList);













/***/ }),

/***/ "./src/createDomElements.js":
/*!**********************************!*\
  !*** ./src/createDomElements.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// a funciton to create elements dynamically -> element factory js

function elFactory(type, attribute, text){
    const el = document.createElement(type);

    for(let key in attribute){
        el.setAttribute(key , attribute[key]);
    }

    el.textContent = text;

    return el;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (elFactory);

/***/ }),

/***/ "./src/pubSub.js":
/*!***********************!*\
  !*** ./src/pubSub.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const pubsub = {
    events: {},
    subscribe: function(evName, fn) {
        //add an event with a name as new or to existing list
        this.events[evName] = this.events[evName] || [];
        this.events[evName].push(fn);
    },
    unsubscribe: function(evName, fn) {
        //remove an event function by name
        if (this.events[evName]) {
            this.events[evName] = this.events[evName].filter(f => f !== fn);
        }
    },
    publish: function(evName, data) {
        //emit|publish|announce the event to anyone who is subscribed
        if (this.events[evName]) {
            this.events[evName].forEach(f => {
            f(data);
            });
        }
    }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pubsub);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _compoenets_modalPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compoenets/modalPage */ "./src/compoenets/modalPage.js");



(0,_compoenets_modalPage__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTZDO0FBQ1g7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDhEQUFTLFlBQVksb0NBQW9DO0FBQzlFLHFCQUFxQiw4REFBUyxZQUFZLG1DQUFtQztBQUM3RTs7QUFFQTtBQUNBLGNBQWMsOERBQVM7QUFDdkIsZ0JBQWdCLDhEQUFTLFdBQVcsVUFBVTtBQUM5QyxnQkFBZ0IsOERBQVMsV0FBVyxrRUFBa0U7QUFDdEc7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDhEQUFTLGNBQWM7QUFDckM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxpREFBUTs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUEsaUVBQWUsU0FBUyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDM0RNOztBQUUvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBLGlFQUFlLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQnhCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUzs7Ozs7Ozs7Ozs7Ozs7QUNkeEI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxNQUFNOzs7Ozs7VUN2QnJCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTCtDOztBQUUvQyxpRUFBUyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvZW5ldHMvbW9kYWxQYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb21wb2VuZXRzL3RvZG9MaXN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jcmVhdGVEb21FbGVtZW50cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHViU3ViLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZWxGYWN0b3J5IGZyb20gXCIuLi9jcmVhdGVEb21FbGVtZW50c1wiO1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gXCIuL3RvZG9MaXN0XCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZU1vZGFsUGFnZSgpe1xuICAgIGxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvcm1cIilcbiAgICBmb3JtLmFwcGVuZENoaWxkKHRlbXBsYXRlKFwiVGl0bGVcIiwgXCJ0ZXh0XCIsIFwidGl0bGVcIikpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQodGVtcGxhdGUoXCJEZXNjcmlwdGlvblwiLCBcInRleHRcIiwgXCJkZXNjcmlwdGlvblwiKSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZCh0ZW1wbGF0ZShcIkRhdGVcIiwgXCJkYXRlXCIsIFwiZGF0ZVwiKSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZCh0ZW1wbGF0ZShcIkhpZ2hcIiwgXCJyYWRpb1wiLCBcInByaW9yaXR5XCIsIFwiaGlnaFwiKSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZCh0ZW1wbGF0ZShcIkxvd1wiLCBcInJhZGlvXCIsIFwicHJpb3JpdHlcIiwgXCJsb3dcIikpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZWxGYWN0b3J5KFwiYnV0dG9uXCIsIHt0eXBlOiBcInN1Ym1pdFwiLCBjbGFzczogXCJmb3JtU3VibWl0XCJ9LCBcInN1Ym1pdFwiKSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChlbEZhY3RvcnkoXCJidXR0b25cIiwge3R5cGU6IFwiYnV0dG9uXCIsIGNsYXNzOiBcImZvcm1DbG9zZVwifSwgXCJjbG9zZVwiKSk7XG59XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKHRpdGxlLCB0eXBlICwgbmFtZSwgdmFsdWUgPSBcIlwiKXtcbiAgICBsZXQgZGl2ID0gZWxGYWN0b3J5KFwiZGl2XCIpO1xuICAgIGxldCBsYWJlbCA9IGVsRmFjdG9yeShcImxhYmVsXCIsIHtmb3I6IG5hbWV9LCB0aXRsZSk7XG4gICAgbGV0IGlucHV0ID0gZWxGYWN0b3J5KFwiaW5wdXRcIiwge3R5cGU6IHR5cGUsIGlkOiBuYW1lICwgbmFtZTogbmFtZSwgcmVxdWlyZWQ6IFwidHJ1ZVwiLCB2YWx1ZTogdmFsdWV9KVxuICAgIGRpdi5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgZGl2LmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICByZXR1cm4gZGl2O1xufVxuXG5cblxuZnVuY3Rpb24gbW9kYWxQYWdlKCl7XG4gICAgbGV0IHRvZG9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2Rvc1wiKTtcbiAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsXCIpO1xuICAgIGxldCBidG4gPSBlbEZhY3RvcnkoXCJidXR0b25cIiwge30gLCBcIkFkZFwiKTtcbiAgICBsZXQgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtU3VibWl0XCIpO1xuICAgIGxldCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybUNsb3NlXCIpO1xuXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBtb2RhbC5zaG93TW9kYWwoKSk7XG4gICAgdG9kb3MuYXBwZW5kQ2hpbGQoYnRuKTtcblxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBtb2RhbC5jbG9zZSgpKTtcbiAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLnJlcG9ydFZhbGlkaXR5KCkpe1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IGFsbElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy91cGRhdGVkIHRoZSB0b2RvTGlzdCAtPiBjb3VsZCBoYXZlIHVzZWQgcHViL3N1YiwgYnV0IHNpbmNlIG9ubHkgb25lIG1vZHVsZSBkZXBlbmRzIG9uIHRoZXNlIHZhbHVlcyBpIGp1c3QgaW1wb3J0ZWQgdGhhdCBtb2R1bGVcbiAgICAgICAgICAgIHRvZG9MaXN0LnVwZGF0ZVRvZG9zKGFsbElucHV0c1swXS52YWx1ZSwgYWxsSW5wdXRzWzFdLnZhbHVlLCBhbGxJbnB1dHNbMl0udmFsdWUsIGFsbElucHV0c1szXS52YWx1ZSwpO1xuXG4gICAgICAgICAgICAvKiByZXNldCBhbGwgdGhlIHZhbHVlcyAqL1xuICAgICAgICAgICAgYWxsSW5wdXRzLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZS50eXBlICE9IFwicmFkaW9cIil7XG4gICAgICAgICAgICAgICAgICAgIGUudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIG1vZGFsLmNsb3NlKCk7XG5cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmNyZWF0ZU1vZGFsUGFnZSgpO1xuXG5leHBvcnQgZGVmYXVsdCBtb2RhbFBhZ2U7XG4iLCJpbXBvcnQgcHVic3ViIGZyb20gXCIuLi9wdWJTdWJcIjtcblxuLy8gdG8gZGlzcGxheSBhbmQgdXBkYXRlIHRvZG9MaXN0KG1vZHVsZSBwYXR0ZXJuKVxuY29uc3QgdG9kb0xpc3QgPSBmdW5jdGlvbigpe1xuICAgIGxldCB0b2RvcyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gYWxsVG9kb3MoKXtcbiAgICAgICAgcmV0dXJuIHRvZG9zO1xuICAgIH1cblxuICAgIC8vIHRvIGNyZWF0ZSBhIHNpbmdsZSB0b2RvIGFuZCB1cGRhdGUgdGhlIHRvZG9MaXN0XG4gICAgZnVuY3Rpb24gdXBkYXRlVG9kb3ModGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY2hlY2tsaXN0KXtcbiAgICAgICAgdG9kb3MucHVzaCh7XG4gICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgICAgIHByaW9yaXR5LFxuICAgICAgICAgICAgY2hlY2tsaXN0XG4gICAgICAgIH0pOyBcbiAgICAgICAgY29uc29sZS5sb2codG9kb3MpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWxsVG9kb3MsXG4gICAgICAgIHVwZGF0ZVRvZG9zXG4gICAgfVxuXG59KCk7XG5cbnRvZG9MaXN0LnVwZGF0ZVRvZG9zKFwiYWRzXCIsXCJzZGFzZGFkc1wiLFwiOXRoXCIsXCJoaWdoXCIsXCJ0cnVlXCIpO1xuXG5leHBvcnQgZGVmYXVsdCB0b2RvTGlzdDtcblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCIvLyBhIGZ1bmNpdG9uIHRvIGNyZWF0ZSBlbGVtZW50cyBkeW5hbWljYWxseSAtPiBlbGVtZW50IGZhY3RvcnkganNcblxuZnVuY3Rpb24gZWxGYWN0b3J5KHR5cGUsIGF0dHJpYnV0ZSwgdGV4dCl7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuXG4gICAgZm9yKGxldCBrZXkgaW4gYXR0cmlidXRlKXtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKGtleSAsIGF0dHJpYnV0ZVtrZXldKTtcbiAgICB9XG5cbiAgICBlbC50ZXh0Q29udGVudCA9IHRleHQ7XG5cbiAgICByZXR1cm4gZWw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVsRmFjdG9yeTsiLCJjb25zdCBwdWJzdWIgPSB7XG4gICAgZXZlbnRzOiB7fSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKGV2TmFtZSwgZm4pIHtcbiAgICAgICAgLy9hZGQgYW4gZXZlbnQgd2l0aCBhIG5hbWUgYXMgbmV3IG9yIHRvIGV4aXN0aW5nIGxpc3RcbiAgICAgICAgdGhpcy5ldmVudHNbZXZOYW1lXSA9IHRoaXMuZXZlbnRzW2V2TmFtZV0gfHwgW107XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2TmFtZV0ucHVzaChmbik7XG4gICAgfSxcbiAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24oZXZOYW1lLCBmbikge1xuICAgICAgICAvL3JlbW92ZSBhbiBldmVudCBmdW5jdGlvbiBieSBuYW1lXG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldk5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldk5hbWVdID0gdGhpcy5ldmVudHNbZXZOYW1lXS5maWx0ZXIoZiA9PiBmICE9PSBmbik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKGV2TmFtZSwgZGF0YSkge1xuICAgICAgICAvL2VtaXR8cHVibGlzaHxhbm5vdW5jZSB0aGUgZXZlbnQgdG8gYW55b25lIHdobyBpcyBzdWJzY3JpYmVkXG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldk5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldk5hbWVdLmZvckVhY2goZiA9PiB7XG4gICAgICAgICAgICBmKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwdWJzdWI7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcbmltcG9ydCBtb2RhbFBhZ2UgZnJvbSBcIi4vY29tcG9lbmV0cy9tb2RhbFBhZ2VcIjtcblxubW9kYWxQYWdlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9