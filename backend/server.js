import app from "./src/app.js";
import { config } from "./src/config/config.js";


const startServer= async () => {
  try {
    const PORT = config.port
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()