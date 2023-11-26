import React from "react";
import {createRoot} from "react-dom/client";

const test = (
    <div style={{width:"500px"}}>
        <h1>abcdefGPT 아파트 분석 확장프로그램</h1>
    </div>
)

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(test)