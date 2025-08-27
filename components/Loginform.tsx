import { useState } from "react"

type FormInputType = {
  username: string,
  password: string,
  role?: "user" | "admin"
}

type FormErrorTypes = {
  username?: string,
  password?: string,
  role?: string
}

export default function LoginForm(){
const [formInput, setFormInput] = useState<FormInputType>({
  username: "",
  password: ""
})
const [error, setError] = useState<FormErrorTypes>()

return (
  <form>
    <label htmlFor="username">Username</label>
    <input id="username" value={formInput.username} type="text" />
  </form>
)  
}
