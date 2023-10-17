import * as React from "react"
import message from "../reusable/message"
import Cookies from "js-cookie"

export const GlobalContext = React.createContext({})

const withContext = <P extends object>(Component: React.ComponentType<P>) => {
  const WithContext = (props: P) => {
    const [group, setGroup] = React.useState<any[]>([])

    const addToGroup = (user: any) => {
      if (group.length >= 5) {
        message({ type: "error", content: "Maksimal 5 user dalam group" })
        return
      }
  
      const findUser = group.find((userGroup) => userGroup.id.value === user.id.value )
      if (findUser) {
        message({ type: "error", content: "User sudah ada" })
        return
      }
  
      message({ type: "success", content: "Berhasil menambahkan user" })
      setGroup((prev) => ([ ...prev, user ]))
    }
  
    const removeFromGroup = (index: number) => {
      const copyGroup = structuredClone(group)
      copyGroup.splice(index, 1)
      setGroup(copyGroup)
    }

    const logout = () => {
      Cookies.remove("jwtToken");
      window.location.reload();
    }

    return (
      <GlobalContext.Provider
        value={{
          addToGroup,
          removeFromGroup,
          logout,
          group,
        }}
      >
        <Component { ...props } />
      </GlobalContext.Provider>
    )
  }
  return WithContext
}


export default withContext
