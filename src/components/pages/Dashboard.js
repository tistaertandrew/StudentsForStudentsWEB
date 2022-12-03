import {ObservedNavBar} from "../templates/NavBar";
import {observer} from "mobx-react";
import {useEffect} from "react";
import {adminStore} from "../../stores/AdminStore";
import {ObservedDashboardContent} from "../templates/DashboardContent";
import {ObservedSnackBar} from "../molecules/SnackBar";

function Dashboard() {
    useEffect(() => {
        adminStore.init()
    }, [])

    const handleAdd = (event) => {
        event.preventDefault()
        let data = new FormData(event.currentTarget)
        adminStore.handleAdd([...data.values()])
    }

    const handleEdit = (event) => {
        event.preventDefault()
        let data = new FormData(event.currentTarget)
        console.log([...data.values()])
        //adminStore.handleEdit([...data.values()])
    }

    const handleBlock = (email) => {
        adminStore.handleBlock(email)
    }

    const handleDelete = (email) => {
        adminStore.handleDelete(email)
    }

    return (
        <div>
            <ObservedNavBar/>
            <ObservedDashboardContent handleAdd={handleAdd} handleEdit={handleEdit} handleBlock={handleBlock} handleDelete={handleDelete}/>
            <ObservedSnackBar open={adminStore.open} message={adminStore.message} severity={adminStore.severity}/>
        </div>
    )
}

export const ObservedDashboard = observer(Dashboard)