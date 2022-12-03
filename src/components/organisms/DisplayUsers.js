import {DisplayUser} from "../molecules/DisplayUser";

export default function DisplayUsers({handleEdit, handleBlock, handleDelete, users}) {
    return (
        <div className={'file-container'}>
            {users.map((user) => <DisplayUser firstname={user.firstname} lastname={user.lastname} email={user.email}
                                              isAdmin={user.isAdmin} isBanned={user.isBanned} handleBlock={handleBlock}
                                              handleDelete={handleDelete} handleEdit={handleEdit}/>)}
        </div>
    )
}