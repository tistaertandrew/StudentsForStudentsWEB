import NavBar from "../organisms/NavBar";
import SignIn from "../organisms/SignIn";
import {useState} from "react";

export default function Authentication() {
    const [type, setType] = useState(true)

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget)
        console.log([...data.values()])
    }

    if (type) {
        return (
            <div>
                <NavBar/>
                <SignIn handleSubmit={handleSubmit} handleType={() => setType(false)}/>
            </div>
        )
    } else {
        return (
            <p onClick={() => setType(true)}>WIP</p>
        )
    }
}