import express from 'express';
import cors from 'cors';
import e from 'express';

// App Configuration
const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.status(200).send('Hello Backend');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Export the app for testing