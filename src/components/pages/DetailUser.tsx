import * as React from "react"
import moment from "moment"
import { GlobalContext } from "../context/globalContext";
import withAuth from "../hocs/withAuth";
import Button from "../reusable/Button";

const DetailUser = () => {
  const dataUser = localStorage.getItem("detail-user")
    ? JSON.parse(localStorage.getItem("detail-user") as string)
    : null;
  
  const { addToGroup, logout }: any = React.useContext(GlobalContext)

  const name = dataUser ? `${dataUser.name.title} ${dataUser.name.first} ${dataUser.name.last}` : ""

  return (
    <div className="flex flex-col justify-center h-screen px-6 w-full">
      <div className="m-auto container-detail-user relative">
        <div className="absolute top-3 right-0">
          <Button color="danger" onClick={logout}>Logout</Button>
        </div>
        <h2 className="mb-3 text-xl font-semibold">Detail User</h2>
        <h2 className="mb-8 text-3xl font-bold">{name}</h2>
        <div className="flex">
          <table className="table-detail-user flex-1">
            <tr>
              <td>Age</td>
              <td className="px-3">:</td>
              <td>{dataUser?.dob?.age ?? "-"}</td>
            </tr>
            <tr>
              <td>Birthday</td>
              <td className="px-3">:</td>
              <td>{dataUser?.dob?.date ? moment(dataUser.dob.date).format("DD MMM YYYY") : "-"}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td className="px-3">:</td>
              <td>{dataUser?.gender === "female" ? "Female" : dataUser?.gender === "male" ? "Male" : "-"}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td className="px-3">:</td>
              <td>{dataUser?.phone ?? "-"}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td className="px-3">:</td>
              <td>{dataUser?.email ?? "-"}</td>
            </tr>
          </table>
          <div>
            <img className="w-[200px]" src={dataUser?.picture?.large ?? ""} alt="name" />
          </div>
        </div>
        <div className="mt-10">
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md" onClick={() => addToGroup(dataUser)}>Add User to Group</button>
        </div>
      </div>
    </div>
  )
}

export default withAuth(DetailUser)