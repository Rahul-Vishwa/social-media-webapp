import AppBar from "./AppBar"
import withAuthorization from "./NotAuthorized"
import ShowPublicPosts from "./ShowPublicPosts"

function Explore(){
    return <div>
        <AppBar />
        <div>
            <ShowPublicPosts />
        </div>
    </div>
}
export default withAuthorization(Explore)