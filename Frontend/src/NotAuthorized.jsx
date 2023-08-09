const withAuthorization=(Component)=>{
    const Authorization=()=>{
        if (!localStorage.getItem('token')){
            return <div>Not Authorized.</div>
        }
        return <Component />
    }
    return Authorization
}

export default withAuthorization