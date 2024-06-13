const userUrl = 'https://jsonplaceholder.typicode.com/users'

export const checkResponseStatus = () => {
    return fetch(userUrl)
    .then((response) => {
        return {
            ok: response.ok,
            status: response.status,
            url: response.url
        }
        // return response.json()
    })
};

export const getUsers = () => {
    return fetch(userUrl)
    .then((response) => {
        return response.json()
    })
};

export const getUserPosts = (userId, maxNumPosts=3) => {
    // const response = await fetch(userUrl);
    // const posts = await response.json();
    // return posts.slice(0, maxNumPosts);
    const newUrl = `${userUrl}/${userId}/posts`
    // console.log(newUrl, '1234')
    return fetch(newUrl)
    .then((response) => {
        return response.json();
    })
    // .then ((posts) => {
    //     return posts.slice(0, maxNumPosts);
    // })
    .then(posts => posts.slice(0, maxNumPosts));
};

export const createNewUser = (newUserData) => {
    return fetch(userUrl, {
        method: "POST",                      // The type of HTTP request
        body: JSON.stringify(newUserData),       // The data to be sent to the API
        headers: {
            "Content-Type": "application/json"
        }
        }).then((response) => {
            return response.json();
        })
}
