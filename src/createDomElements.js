// a funciton to create elements dynamically -> element factory js

function elFactory(type, attribute, text){
    const el = document.createElement(type);

    for(let key in attribute){
        el.setAttribute(key , attribute[key]);
    }

    el.textContent = text;

    return el;
}

export default elFactory;