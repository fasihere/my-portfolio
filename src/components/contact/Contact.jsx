import { SpaRounded } from "@material-ui/icons";
import { useState } from "react";
import "./contact.scss"
import Axios from 'axios';

export default function Contact() {
    const url ="https://polar-earth-94779.herokuapp.com/email"
    const [message, setMessage] = useState(false)
    const [data, setData] = useState({
        email:"",
        text: ""
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post(url, {
            email: data.email,
            text: data.text
        })
        .then(res =>{
            console.log(res.data)
        })
        .catch((err) => console.log(err));
        setMessage(true);
    }
    const handle = (e) => {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }
    const afterSubmit = () => {
        if(message) setMessage(false);
    }
    return (
        <div className="contact" id="contacts" onClick={(e) => afterSubmit(e)}>
            <div className="left">
                <img src="assets/shake.svg" alt="" />
            </div>
            <div className="right">
                <h2>Contact.</h2>
                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => handle(e)} id="email" value={data.email} type="text" placeholder="Email"/>
                    <textarea onChange={(e) => handle(e)} id="text" value={data.text} placeholder="Message"></textarea>
                    <button type="submit">Send</button>
                    {message && <span>Thanks, I'll reply Asap :)</span>}
                </form>
            </div>
        </div>
    )
}
