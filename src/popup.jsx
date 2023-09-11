import React from "react";
import {render} from "react-dom";

function Popup() {
    return (
        <div>
            <h1>Hello, World!</h1>
        </div>
    );
}

render(<Popup />, document.getElementById("react-target"));

// import React from "react";
// import {createRoot} from "react-dom/client";

// const test = (
//     <div>
//         <h1>Hellow world</h1>
//         <p>aj jefalfjaw jfla;fkwa kkf alfkwjae; oalf jasflkjas;eflkjwa;fkf lksf lwakf ;e</p>
//     </div>
// )

// const container = document.createElement('div')
// document.body.appendChild(container)
// const root = createRoot(container)
// root.render(test)