import config from '../../config.json'
import ViewMembersTableItem from './ViewMembersTableItem';

function ViewMembers ({event, details, setDetails, setEvent, setOptions}) {
    let registrations = event.registrations;
    console.log(registrations)

    return <div className="card-body">
                <button className="btn btn-secondary">Pending</button>
                <button className="btn btn-primary">Confirmed</button>
                <button className='btn btn-secondary' onClick={()=>{setOptions(0)}}>Back</button>
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Batch</th>
                                <th>Position</th>
                                <th>Transaction</th>
                                <th>Approve</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((item, i)=>(
                                  <ViewMembersTableItem event={event} item={item}></ViewMembersTableItem>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
    
}

export default ViewMembers