import axios from 'axios'

axiosNewsItems()

function axiosNewsItems() {
    axios.get('http://localhost:8080/demo_war_exploded/Controller?command=AllNewsItems')
        .then(response => console.log(response.data))
        .then(() => setTimeout(axiosNewsItems, 5000))
}