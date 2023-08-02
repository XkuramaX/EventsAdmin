import { useState } from 'react'
import config from '../../config.json'


function ViewMembersTableItem ({event, item}) {
    let imageUrl = config.baseUrl + "/api/images"
    let eventUrl = config.baseUrl + "/api/events"

    console.log("item", item)
    let user = JSON.parse(localStorage.getItem("user"))
    const [data, setData] = useState({
        _id: item._id,
        name: item.member.firstName + " " + item.member.lastName,
        batch: item.member.batch,
        position: item.member.position,
        url: item.transaction.image?item.transaction.image:"",
        approved: item.confirm
    })

    let openImage = async (id) => {
        // href={config.baseUrl+"/"+data.url}
        let response = await fetch(imageUrl+"/"+id, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              "Authorization": JSON.parse(user.accesstoken)
            //   'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        response = await response.json();
        if (response.success) {
            window.open(config.baseUrl+"/"+response.response.url);
        }
    }

    let approveRegistration = async (id) => {
        let response = await fetch(eventUrl+"/"+id,{
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              "Authorization": JSON.parse(user.accesstoken)
            //   'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        response = await response.json();
        if (response.success) {
            let event = response.response;
            let registrations = []
            event.registrations.forEach((registration) => {
                if (item.member._id === registration.member) {
                    registration.confirm = true;
                }
                registrations.push(registration)
            });
            let formData = {
                registrations: registrations
            };
            response = await fetch(eventUrl+"/"+id,{
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": JSON.parse(user.accesstoken)
                //   'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(formData)
            })
            response = await response.json();
            if (response.success) {
                setData({...data, approved: true})
            }
        }
    }

    return                        <tr key={data._id}>
                                    <td>{data.name}</td>
                                    <td>{data.batch}</td>
                                    <td>{data.position}</td>
                                    <td><button className='btn btn-link' onClick={()=>{openImage(data.url)}}>Image</button></td>
                                    <td><button className='btn btn-primary' onClick={()=>{approveRegistration(event._id)}} disabled={data.approved}>Approve</button></td>
                                    <td><button className='btn btn-danger'>Remove</button></td>
                                  </tr>  
}

export default ViewMembersTableItem