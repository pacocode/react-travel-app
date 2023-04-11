const PORT = 8000;
const { default: axios } = require('axios');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

//Default
app.get('/', (req, res) => {
    res.status(200).json('Welcome to my traventure app');
})

//Gel all posts
app.get('/posts', async (req, res) => {
    const url = `${process.env.ASTRA_URL}?page-size=20`

    const options = {
        method: "GET",
        headers: {
            "X-Cassandra-Token": process.env.TOKEN
        }
    }

    try {
        const respone = await axios(url, options);
        res.status(200).json(respone.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
})

// Get a post
app.get('/posts/:postId', async (req, res) => {

    const id = req.params.postId;

    const url = `${process.env.ASTRA_URL}/${id}`;
    const options = {
        method: "GET",
        headers: {
            "X-Cassandra-Token": process.env.TOKEN
        }
    }

    try {
        const response = await axios(url, options);
        res.status(200).json(response.data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
})

// Update Post
app.put('/edit/:postId', async (req, res) => {
    const id = req.params.postId;
    const data = req.body.data;

    const url = `${process.env.ASTRA_URL}/${id}`

    const options = {
        method: "PUT",
        headers: {
            "X-Cassandra-Token": process.env.TOKEN,

        },
        data
    }

    try {
        const response = await axios(url, options);
        res.status(200).json(response.data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error })
    }
});

// Add a post
app.post('/create', async (req, res) => {
    const data = req.body.data;
    const url = process.env.ASTRA_URL;

    const options = {
        method: "POST",
        headers: {
            "X-Cassandra-Token": process.env.TOKEN,

        },
        data
    }

    try {
        const response = await axios(url, options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error })
    }
});

// Delete a post
app.delete('/delete/:postId', async (req, res) => {
    const id = req.params.postId;
    const url = `${process.env.ASTRA_URL}/${id}`;

    const options = {
        method: "DELETE",
        headers: {
            "X-Cassandra-Token": process.env.TOKEN,
        }
    }

    try {
        const response = await axios(url, options)
        res.status(200).json(response.data)
    } catch (rror) {
        console.error(error);
        res.status(500).json({ message: error })
    }
})

app.listen(PORT, console.log('Server is running on PORT: ' + PORT))