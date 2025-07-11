import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

function Dashboard() {
   return <div>
        <Appbar />
        <div className="m-8">
            <Balance />
            <Users />
        </div>
    </div>
}

export default Dashboard
