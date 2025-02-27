import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retrieveHelloWorldPathVariable } from "./api/HelloWorldAPIService";

export default function WelcomeComponent()
{
    const {username} = useParams();

    const [ message, setMessage ] = useState(null);

    function callHelloWorldRestAPI()
    {
        retrieveHelloWorldPathVariable('Bharath')
            .then( (response) => successResponse(response) )
            .catch( (error) => errorResponse(error))
            .finally( () => console.log("Clean Up") );
    }

    function successResponse(response)
    {
        console.log(response);
        setMessage(response.data.message);
    }

    function errorResponse(error)
    {
        console.log(error);
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                Manage Your todos - <Link to="/todos">Go here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestAPI}>Call Hello World</button>
            </div>
            <div className="text-info">
                {message}
            </div>
        </div>
    );
}