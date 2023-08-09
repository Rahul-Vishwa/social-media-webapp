import AppBar from "./AppBar";
import withAuthorization from "./NotAuthorized";

function PostCreated(){
    return <div>
        <AppBar />
        <div className="font post-created align-center">
            Post created
        </div>
    </div>
}

export default withAuthorization(PostCreated)