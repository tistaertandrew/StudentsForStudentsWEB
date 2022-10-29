import NavBar from "../organisms/NavBar";
import SignIn from "../organisms/SignIn";
import {useState} from "react";
import SignUp from "../organisms/SignUp";

export default function Authentication() {
    const [type, setType] = useState(true)
    const [value, setValue] = useState(undefined)

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget)
        console.log([...data.values()])
    }
    const handleChange = (event) => {
        setValue(event.target.value)
    }

    if (type) {
        return (
            <div className={'full-height'}>
                <NavBar/>
                <SignIn handleSubmit={handleSubmit} handleType={() => setType(false)}/>
            </div>
        )
    } else {
        return (
            <div className={'full-height'}>
                <NavBar/>
                <SignUp handleSubmit={handleSubmit} handleType={() => setType(true)} handleChange={handleChange}/>
            </div>
        )
    }
}