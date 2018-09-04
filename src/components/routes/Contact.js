import React from 'react';
import './../../App.css';
import GoogleMapReact from 'google-map-react';


function Contact() {
    return (
        <React.Fragment>
            <div className="headerImg">
                <h2>Kontakta oss</h2>
            </div>
            <div className="contact">
            <div className="contactInfo">
                <h3>HITTA TILL OSS</h3>
                <p className="addressText">Restaurant FoodFusion hittar du på Tulegatan 0 på Odenplan i Stockholm.
                Vill du komma i kontakt med oss är du välkommen att ringa till oss på 070-000 00 00 eller maila på FoodFusion@FoodFusion.com.
                </p>
                <h4>Öppettider</h4> 
                <p className="openHours">
                Måndag-Torsdag   11:30- 24:00<br />
                Fredag 11:30- 01:00<br />
                Lördag   17:00 – 01:00<br />
                Söndag  STÄNGT</p>
                <p className="italic">Observera att vi inte tar emot bokningar på epostadressen utan att du måste använda bokningen här på hemsidan.</p>
            </div>
            <form>
            <h3>SKICKA GÄRNA FRÅGOR</h3>
            <label labelfor="name">Namn:</label>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="t.ex. Bert"
                />
                <label labelfor="email">Email:</label>
                <input 
                    type="text" 
                    name="email" 
                    placeholder="t.ex. test@test.com"
                />
                <label labelfor="message">Message:</label>
                <input 
                    type="text" 
                    name="message" 
                    placeholder="Här skriver du ditt meddelande..."
                />
                <button className="nextButton">SKICKA NU</button>
            </form>
            </div>
            <div className="map" style={{ height: '300px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCtkvZ8dVnzdTpt6OFEHYtd-fI8Oq-hIhM" }}
                defaultCenter={{lat: 59.344629, lng: 18.059911}}
                defaultZoom={17}
            >
            </GoogleMapReact>
            </div>
        </React.Fragment>
    );
}

export default Contact;