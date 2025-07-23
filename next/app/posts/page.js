const getPosts = async()=>{
    const res = await fetch('http://localhost:8000/api/posts',{
        method:'GET',
        cache:'no-store'
    })
    if(res.ok){
        const data = await res.json()
        return data.posts;
    }else{
        throw new Error(res.status)
    }
}
export default async function Posts()
{
    const posts = await getPosts()
    return (
                <div className="container mt-5">
            <div className="row g-3">
                {posts.map(post => (
                    <div key={post.id} className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}