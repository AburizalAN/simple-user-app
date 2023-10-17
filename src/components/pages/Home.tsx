import * as React from "react"
// import useFetch from "../hooks/useFetch"
import Pagination from "../reusable/Pagination"
import useSWRHandler from "../../hooks/useSWR"
import Skeleton from 'react-loading-skeleton'
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { BsThreeDots, BsTrash } from "react-icons/bs"
import Dropdown from "../reusable/Dropdown"
import { useNavigate } from "react-router-dom"
import Modal from "../reusable/Modal"
import EmptyState from "../../assets/empty-state.jpg"
import clsx from "clsx"
import { GlobalContext } from "../context/globalContext"
import withAuth from "../hocs/withAuth"
import Button from "../reusable/Button"

const useFetchUser = (payload: any) => {
  const params = decodeURIComponent(new URLSearchParams(payload).toString())
  const url = `https://randomuser.me/api?seed=abc${params !== "" ? "&" + params : ""}`
  const fetcher = async () => {
    const res = await fetch(url)
    const data = await res.json()
    if (data) {
      return data
    }
  }
  return useSWRHandler(url, fetcher)
}

const Home = () => {
  const navigate = useNavigate()
  const [ params, setParams ] = React.useState({
    page: 1,
    results: 10,
  })
  const[isOpen, setIsOpen] = React.useState(false)
  const { data, isValidating }: any = useFetchUser(params)
  const { addToGroup, removeFromGroup, group, logout }: any = React.useContext(GlobalContext)

  const users = data?.results ?? []

  const handleSetParams = (payload: { page?: number, results?: number }) => {
    setParams((prev) => ({
      ...prev,
      ...payload,
    }))
  }

  const handleDetail = (user: any) => {
    const data = JSON.stringify(user)
    localStorage.setItem("detail-user", data)
    navigate("/detail-user")
  }

  return (
    <div className="flex flex-col justify-center h-screen px-6 w-full">
      <div className="m-auto container relative">
        <div className="absolute top-3 right-0">
          <Button color="danger" onClick={logout}>Logout</Button>
        </div>
        <h2 className="mb-3 text-3xl font-semibold">Hello World!</h2>
        <p>Silakan pilih anggota group anda</p>
        <div className="flex justify-end items-center gap-x-4 mt-8">
          <div className={clsx("text-sm", group.length <= 0 ? "text-red-500" : "text-green-600")}>
            Jumlah User dalam group: {group.length}
          </div>
          <div onClick={() => setIsOpen(true)} className="py-2 px-4 border cursor-pointer">
            <AiOutlineUsergroupAdd />
          </div>
        </div>
        <div className="mt-3 table-users">
          {isValidating ? (
            <Skeleton count={10} height={45} />
          ) : users && users.length > 0 ? (
            users.map((user: any, i: number) => (
              <div key={i} className="table-user">
                <div>
                  {`${user.name.title} ${user.name.first} ${user.name.last}`}
                </div>
                <Dropdown
                  list={[
                    { content: <button onClick={() => handleDetail(user)}>Detail</button> },
                    // { content: <button onClick={() => {}}>Pilih</button> },
                    { content: <button onClick={() => addToGroup(user)}>Add to Group</button> },
                  ]}
                >
                  {({ openDropdown }) => (
                    <div onClick={openDropdown} className="cursor-pointer px-2 py-2 hover:bg-slate-100 transition-all duration-200">
                      <BsThreeDots />
                    </div>
                  )}
                </Dropdown>
              </div>
            ))
          ) : "no data"}
        </div>
        <div className="mt-10">
          <Pagination
            className="ml-auto"
            handleChange={(num: number) => handleSetParams({ page: num })}
            totalPage={5}
          />
        </div>
      </div>
      <Modal title="List User yang dipilih" visible={isOpen} onCancel={() => setIsOpen(false)}>
        {group.length > 0 ? (
          <div className="table-users">
            {group.map((user: any, i: number) => (
              <div key={i} className="table-user">
                <div>
                  {`${user.name.title} ${user.name.first} ${user.name.last}`}
                </div>
                <div onClick={() => removeFromGroup(i)} className="cursor-pointer px-2 py-2 hover:bg-slate-100 transition-all duration-200 text-red-400">
                  <BsTrash />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center h-[400px] justify-center">
            <img src={EmptyState} className="empty-state" />
            <p className="text-center text-gray-400 mt-4">
              No Data
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default withAuth(Home);