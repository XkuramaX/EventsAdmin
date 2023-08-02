
function EventOptions({event, setOptions, deleteEvent, setPageOptions, setDetails}) {
    let user = JSON.parse(localStorage.getItem("user"));
    let isUserRegistered = false;
    event.registrations.forEach((registration) => {
        if (registration.member._id == user.id) {
            isUserRegistered = true;
        }
    })
    return <>
        <div className="card-footer">
            <button className="btn btn-primary" onClick={()=>{setOptions(1)}} disabled={isUserRegistered}>Register</button>
        </div>
    {user.isAdmin || user.isSuper?<>
    <div className="card-footer">
        <button className="btn btn-secondary" onClick={()=>{setOptions(2)}}>View Members</button>
    </div>
    <div className="card-footer">
        <button className="btn btn-secondary" onClick={()=>{setOptions(3); setDetails(event)}}>Edit Event</button>
    </div>
    <div className="card-footer">
        <button className="btn btn-danger" onClick={()=>{setOptions(0);deleteEvent(event._id);setPageOptions(0)}}>Cancel Event</button>
    </div></>:<></>}
    </>
}

export default EventOptions