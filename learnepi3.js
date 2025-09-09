import React from "react";
import ReactDOM from "react-dom/client";

const heading=React.createElement("h1",{id:"heading"},"Hello Aniket🚀😎🌟");

//jsx --html like or xml -like syntax
const jsxHeading=(<h1 className="heading">Namaste React by JSX</h1>)
console.log(jsxHeading);

//React component
//class component
//functional component--NEW

//functional compomnent
// const HeadingComponent=()=>{
//     return <h1 className="heading1">functional Componennt</h1>
// };  

const Title=()=>(
    <h1 className="headdd">Nammmmmmmmmmmmmm</h1>
);

//to rendering the react component--------> root.render(<HeadingComponent/>)
const HeadingComponent1=()=>(
    <>
    <Title/>
    <h1 className="headingqq">functional Componennt</h1>
    </>   
);

// //or
// const func=()=>true;

const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent1/>); 
// root.render(heading); 