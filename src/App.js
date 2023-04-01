import AccountsPage from "./Routes/AccountsPage"
import AuthPage from "./Routes/AuthPage"
import {BrowserRouter,Routes,Route} from 'react-router-dom'

const App = ()=>{
  return (
    <>
    <BrowserRouter>
        <Routes>   
            <Route path="/" element= {<AccountsPage policyTypes={false} />}/>
            <Route path="/?profile" element= {<AuthPage policyTypes={false} />}/> 
        </Routes>
    </BrowserRouter> 
    </>
  )
}
export default App