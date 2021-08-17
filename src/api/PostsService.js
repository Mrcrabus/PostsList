import axios from "axios";

export default class PostsService {
    static async getAll() {

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return response.data


    }
}