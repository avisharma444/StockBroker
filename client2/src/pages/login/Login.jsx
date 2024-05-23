import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [err,setErr] = useState(false);
  const navigate  = useNavigate()
  const [inputs,setInputs] = useState({
    adhaar:"",
    PAN_card:"",
    phone_no:"",
    email:"",
    password:"",
    dob:"",
    name:"",
  })
  const handleChange = e=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  const handleLogin = async (e) => {
    e.preventDefault()
      try{
        await login(inputs)
        navigate("/")
      }catch(err){
        setErr(err.response.data)
      }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Zerodha</h1>
          <p>
            Invest in everything
            Online platform to invest in stocks, derivatives, mutual funds, and more
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="email" placeholder="email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name = "password" onChange={handleChange} />
            {err&&err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
