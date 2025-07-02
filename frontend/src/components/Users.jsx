import { useEffect, useState } from "react";
import { Button } from "./Button";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../store/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const user = useRecoilValue(UserAtom);

  useEffect(() => {
    async function getUsers() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(
          `/api/v1/user/bulk?filter=${filter}`,
          config,
        );
        setUsers(data.user);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, [filter, user.token]);
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex  justify-center h-ful">
        <Button
          onClick={() =>
            navigate(`/send?id=${user._id}&name=${user.firstName}`)
          }
          label={"Send Money"}
        />
      </div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object,
};
