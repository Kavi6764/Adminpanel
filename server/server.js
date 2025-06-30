const express = require("express")
const app =express()
const cors =require("cors")

const HRRouter = require("./Router/Admin-Login-Router")
const EmpRouter = require("./Router/EmployeeRouter")
app.use(express.json())
app.use(cors())


app.use("/HR",HRRouter)
app.use("/Emp",EmpRouter)
app.listen(5000,()=>{
    console.log("Port runnuing")
})

