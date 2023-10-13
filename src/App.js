import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import { useEffect } from "react"
import { getUserAuth } from "./actions"
import { connect } from "react-redux"

function App(props) {

  useEffect(()=>{
    props.getUserAuth()
  },[])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path:"/home",
      element:<Home/>
    }
  ])

  return (
      <RouterProvider router={router} />
  )
}

const mapStateToProps = (state) =>{
  return{}
}

const mapDispatchToProps = (dispatch)=>(
  {
    getUserAuth:()=>dispatch(getUserAuth())
  }
)

export default connect(mapStateToProps,mapDispatchToProps)(App);

