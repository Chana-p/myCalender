import { useSelector } from "react-redux"

export const Token=()=>{

const t=useSelector(state=>state.user.token);
    return <div>
{t}
    </div>
}