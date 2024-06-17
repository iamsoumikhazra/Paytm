import app from "./src/app.js";
import { config } from "./src/config/config.js";
import connectDB from "./src/models/db.js";

const startServer= async () => {

  await connectDB()
  
  try {
    const PORT = config.port
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

await startServer()