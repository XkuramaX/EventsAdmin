import React from 'react'

function TypesTableItem({item, remove}) {
    console.log("here", item)
    return (
        <tr>
            <td>{item.name}</td>
            <td><button className="btn btn-danger" onClick={()=>{remove(item)}}>Delete</button>
            </td>
        </tr>
    )
}

export default TypesTableItem
