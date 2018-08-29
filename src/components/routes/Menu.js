import React from 'react';
import './../../App.css';
import list from '../menuList.json';

function listMenu (input){
    return input.map((objekt) => (
        <div key={objekt.id}>
            <div className="produkt">
                <h4>{objekt.title}</h4>
                <p>{objekt.description}</p>
            </div>
            {objekt.price ? (<div className="price">{objekt.price}</div>) 
            : (<React.Fragment><div className="priceGlas">{objekt.priceGlas}</div>
               <div className="priceBottle">{objekt.priceBottle}</div></React.Fragment>
            )}
        </div>
    ))
}
function Menu() {
    console.log(list)
    return (
        <React.Fragment>
            <div className="headerImg">
                <h2>Meny</h2>
            </div>
            <div className="menu">
                <div className="starters">
                    <h3>FÖRRÄTTER</h3>
                    {listMenu(list.starters)}
                </div>
                <div className="mainCourse">
                    <h3>VARMRÄTTER</h3>
                    {listMenu(list.mainCourse)}
                </div>
                <div className="deserts">
                    <h3>EFTERRÄTTER</h3>
                    {listMenu(list.deserts)}
                </div>
                <div className="white">
                    <h3>Vita viner</h3>
                    {listMenu(list.white)}
                </div>
                <div className="red">
                    <h3>Röda viner</h3>
                    {listMenu(list.red)}
                </div>
                <div className="other">
                    <h3>Övrig dryck</h3>
                    {listMenu(list.other)}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Menu;