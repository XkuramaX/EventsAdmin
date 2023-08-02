import React, {useState, useEffect} from 'react'
import config from '../../config.json'
import EventsTable from './MembersTableItem'
import CsvDownload from 'react-json-to-csv'

function Members(user) {
        // console.log(user)
        let BaseUrl = config.baseUrl + "/api/members"
        let MembersUrl = config.baseUrl + "/api/members/all"

        const [members, setMembers] = useState([])
        
        let key = JSON.parse(localStorage.getItem("apiKey"))

        let fetchData = async(url) =>{
            let response = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": key
                //   'Content-Type': 'application/x-www-form-urlencoded',
                },
              })
            let resp = await response.json()
            return resp
        }

        let deleteItem = async (url) => {
            let response = await fetch(url, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": key
                //   'Content-Type': 'application/x-www-form-urlencoded',
                },
              })
            let resp = await response.json()
            return resp
        }

        const [csvData, setCsvData] = useState([]);

        async function makeCSV(response) {
            let arr = [];
            response.map((item)=> {
                let obj = {};
                obj.Name = item.first_name;
                obj.Phone = item.phone_number;
                arr.push(obj);
            })
            setCsvData(arr);
        }

        useEffect(()=>{
            fetchData(MembersUrl).then((response)=>{
                console.log(response);
                if (response.success) {

                    let resp = response.response;
                    
                    makeCSV(resp);

                    console.log("success",response)
                    setMembers(response.response)

            } else {
                console.log(response)
            }    
        })},[])

        
        async function removeItem(item){
            let response = await deleteItem(BaseUrl+"/"+item._id)
            if(response.success){
                setMembers(members.filter((lead)=>lead._id !== item._id))
            } else {
                console.log("Cannot delete")
            }
        }

        

        


    return (
        <div className="container-fluid">

                    <h1 className="h3 mb-2 text-gray-800 heading">Members Table</h1> <CsvDownload data={csvData} />

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Members</h6>
                        </div>
                                <div className="container" width="100%">
                                    
                                    {members.map((item)=>(
                                        <EventsTable key={item._id} item={item} remove={removeItem}></EventsTable>
                                    ))}
                                </div>
                    </div>

    </div>
                
                
    )
}

export default Members
