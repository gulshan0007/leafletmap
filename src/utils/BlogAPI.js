
import axios from 'axios';

export const FetchBlogList = async () => {
    try {
        const response = await axios.get('http://localhost:8000/blogs');
        return response.data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
};


export const FetchBlog = async (id) => {
    try {
        console.log(`http://localhost:8000/blogs/${id}`)
        const response = await axios.get(`http://localhost:8000/blogs/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
};