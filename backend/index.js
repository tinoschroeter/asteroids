import express from 'express'
const app = express()

app.get('/api', (req, res) => {
const i2 = Math.floor(Math.random() * 140 + 10);
const i3 = Math.floor(Math.random() * 50);
const i4 = Math.floor(Math.random() * 40)
const i5 = Math.floor(Math.random() * 20)
const requests = i2 + i3 + i4 + i5

    const data = {
      status_2xx: i2,
      status_3xx: i3,
      status_4xx: i4,
      status_5xx: i5,
      requests: requests,
    }
    
    res.json(data)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is runngin on Port ${port}`)
})
