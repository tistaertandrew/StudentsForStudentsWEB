import {DisplayUser} from "../molecules/DisplayUser";
import EmptyContent from "../molecules/EmptyContent";

export default function DisplayUsers({handleEdit, handleBlock, handleDelete, users}) {

    if(users.length === 0) {
        return (
            <EmptyContent message={'Aucun utilisateur correspondant'}/>
        )
    }

    return (
        <div className={'file-container'}>
            {users.map((user) => <DisplayUser firstname={user.firstname} lastname={user.lastname} email={user.email}
                                              isAdmin={user.isAdmin} isBanned={user.isBanned} handleBlock={handleBlock}
                                              handleDelete={handleDelete} handleEdit={handleEdit}/>)}
        </div>
    )
}