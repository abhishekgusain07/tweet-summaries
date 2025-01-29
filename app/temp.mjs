import { Rettiwt } from 'rettiwt-api';
const key = "a2R0PThoa1BPek1LVVhEU2JESGV4a1ZoUUYwNlZnRFltUGozWGwxbExNdWU7YXV0aF90b2tlbj1mMjQ5NDBlNTZhM2IyZTZjZDY0ZmQ2N2ZhNWU3OWFlYmY4NmUxNDkzO2N0MD1mODJkYmNiNWQyYjUxY2NlZDNlZWE0ZjMyYmQwZThmMGE5Yzc1ZTk1MDA2NWQzNzU3NjkxYzc0YTZjNzg3MzIzYjFiMTMxNWViOTkyNWM0ZTc1ZGY1YjlkZWJjZWE0Y2UyN2U4OWFhZGJiNTAwNDM3NDEzZTcxZDIwM2FjZDE5NjM1ZDg4NjcwODI5Mzk1ZWI0MWIxNjhjNjIyZDQyOGFjO3R3aWQ9dSUzRDE4MjcyMzA2NzM3MTI1Nzg1NjA7"
// Creating a new Rettiwt instance using the given 'API_KEY'
const rettiwt = new Rettiwt({ apiKey: key });

// Fetching the first 20 timeline tweets of the User with id '1234567890'
rettiwt.user.timeline('44196397')
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err);
});