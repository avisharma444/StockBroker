import { Link,useNavigate } from "react-router-dom";
import "./register.scss";
import { useState ,useContext} from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Register = () => {
  const { login } = useContext(AuthContext);
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
  const [err,setErr] = useState(false);

  const handleChange = e=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  const handleClick = async e=>{
    e.preventDefault()
    try{
      console.log(inputs)
      await axios.post("http://localhost:8080/server/auth/register",inputs)
      await login(inputs)
        navigate("/")
      // await login(inputs)
      //   navigate("/")
    }catch(err){
        setErr(err.response.data)
    }
  }
  console.log(err)
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Zerodha</h1>
          <p>
            Invest in everything
            Online platform to invest in stocks, derivatives, mutual funds, and more
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="Name" placeholder="name" name = "name" onChange={handleChange}/>
            <input type="email" placeholder="Email" name = "email" onChange={handleChange} />
            <input type="password" placeholder="Password" name = "password" onChange={handleChange}/>
            <input type="aadhar" placeholder="adhaar" name = "adhaar" onChange={handleChange} />
            <input type="pancard" placeholder="PAN_card" name = "PAN_card" onChange={handleChange}/>
            <input type="phone_no" placeholder="phone_no" name = "phone_no" onChange={handleChange}/>
            {err&&err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
