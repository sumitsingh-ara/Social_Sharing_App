import {useState,useEffect} from "react";
import styles from './FriendsPending.module.css';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
export const FriendsPending = () => {
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(false);
    const {token} = useSelector((store) => store.auth);
    const [flag,setFlag] = useState(false);
    const url ="https://c.tenor.com/ueth-WpGsukAAAAd/mee6-wii-chicken.gif"
    useEffect(() => {
        const getFriends = async() => {
            setLoading(true);
            try{
                let data = await fetch('https://socialsharekaro.herokuapp.com/social/user/specificuser/allFriends/pending',{
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                data = await data.json();
                setData(data);
                setLoading(false);
            }catch(err){
                setError(true);
            }
        }
        getFriends();
    },[token,flag])

    const acceptFriendRequest = async(senderId) => {
        setLoading(true);
        try{
            let respo = await fetch(`https://socialsharekaro.herokuapp.com/social/user/specificuser/respondAccept/${senderId}`,{
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            respo = await respo.json();
            if(respo.status)setFlag(!flag);
        }catch(err){
            setError(true);
        }
    }

    const declineFriendRequest = async(senderId) =>{
        setLoading(true);
        try{
            let respo = await fetch(`https://socialsharekaro.herokuapp.com/social/user/specificuser/declineAccept/${senderId}`,{
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            respo = await respo.json();
            if(respo.status)setFlag(!flag);
        }catch(err){
            setError(true);
        }
    }
    const unFriend = async(friendId) => {
        setLoading(true);
        try{
            let respo = await fetch(`https://socialsharekaro.herokuapp.com/social/user/specificuser/unfriending/${friendId}`,{
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            respo = await respo.json();
            if(respo.status)setFlag(!flag);
        }catch(err){
            setError(true);
        }
    }
    return (
        <div className={styles.container}>
            <h3>Pending Requests ({loading?"Loading...":data.pendingFriends?data.pendingFriends.length:0})</h3>
            {loading?<h1>Loading...</h1>:error?<h1>Error...</h1>:data.pendingFriends ?
            data.pendingFriends.map((item)=>(
                <div onClick={()=>{
                    navigate(`/user/${item.user.username}`)
                }} className={styles.profiler} key={item.user._id}>
                <div className={styles.imager}><img className={styles.imager} src={item.user.profilePic.image?item.user.profilePic.image:url} alt="" /></div>
                <div className="mx-1">
                    <h4 >{item.user.name} <span className="text-muted" style={{ fontSize: "2.5vh" }}>
                  ({item.user.username})
                </span></h4>
                    <div className={styles.accept}>
                        <button onClick={(e)=>{
                            e.stopPropagation();
                            acceptFriendRequest(item.user._id)
                        }} className="btn btn-outline-success">Accept</button>
                        <button className="btn btn-outline-danger" onClick={(e)=>{
                            e.stopPropagation();
                            declineFriendRequest(item.user._id)
                        }} >Reject</button>
                    </div>
                </div>
            </div>
            )):""}
            <br/>
            {/* Logic for friends display and unfriending them */}
            <div className="text-center w-100">
            <h3>My Friends ({loading?"Loading...":data.friends?data.friends.length:0})</h3>
            {loading?<h1>Loading...</h1>:error?<h1>Error...</h1>:data.friends ?
            data.friends.map((item)=>(
                <div onClick={()=>{
                    navigate(`/user/${item.user.username}`)
                }} className={styles.profiler} key={item.user._id}>
                <div className={styles.imager}><img className={styles.imager} src={item.user.profilePic.image?item.user.profilePic.image:url} alt="" /></div>
                <div className="mx-1">
                    <h4 >{item.user.name} <span className="text-muted" style={{ fontSize: "2.5vh" }}>
                  ({item.user.username})
                </span></h4>
                    <div className={styles.accept}>
                        <button onClick={(e)=>{
                            e.stopPropagation();
                            unFriend(item.user._id);
                        }} className="btn btn-outline-danger">Unfriend</button>
                    </div>
                </div>
            </div>
            )):""}
            </div>
        </div>
    )
}