import React from 'react'
import config from '../../config.json'
function ImagesTableItem({item, remove}) {
    console.log("here", item)

    let menuHandler = ()=> {
        window.location.href = config.baseUrl + "/" + item.url;
    }

    return (
        <tr className="row">
            <td className="col-6"><a onClick={menuHandler}>Click Here to view the menu card</a></td>
            <td className="col-3"><button className="btn btn-danger" onClick={()=>{remove(item)}}>Delete</button></td>
            
        </tr>
    )
}

export default ImagesTableItem
