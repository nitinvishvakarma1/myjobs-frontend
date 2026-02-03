import { useLocation, useNavigate } from "react-router-dom";

function FallbackUIComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log('location.state in FallbackUIComponent ', location.state);
    return (<>
        <div className="container-fluid p-5 mt-5" >
            <div className="container p-5" style={{ backgroundColor: 'skyblue'}}>
                <h4 className="text-danger">Something Went Wrong</h4>
            <p>{location.state.message}</p>
            <input type="button" value="Back To Home" className="btn btn-lg btn-primary" onClick={()=>navigate('/')}/>

            </div>
        </div>
    </>);
}

export default FallbackUIComponent;